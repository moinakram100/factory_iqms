sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
  ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
      "use strict";
  
      let getModelData = []
      let DeliveryNoValidation
      let ParkingNoValidation
      let oView
  
  
      return Controller.extend("com.ingenx.qms.billingcreation.controller.Home", {
  
        onInit: async function () {
          oView = this.getView();
  
          let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.getRoute("RouteHome").attachMatched(this._onObjectMatched, this);
  
          let oModel = new sap.ui.model.json.JSONModel();
          oView.setModel(oModel, "dataModel");
          // let oModel3 = this.getOwnerComponent().getModel();
          // if (oModel3 instanceof sap.ui.model.odata.v4.ODataModel) {
          //     oModel3.getMetaModel().requestObject("/").then(() => {
          //         console.log("Metadata loaded successfully.");
          //         this._onObjectMatched();
          //     }).catch(err => console.error("Metadata load failed:", err));
          // }
          
      },
        async _onObjectMatched() {
  
          let oModel3 = this.getOwnerComponent().getModel();
          let oBindList3 = oModel3.bindList("/BillingInvoice()");
          let oModel = oView.getModel('dataModel');
          sap.ui.core.BusyIndicator.show(0);
  
          getModelData = []; // empty first
          oBindList3.requestContexts(0, Infinity).then(function (aContexts) {
            aContexts.forEach(function (oContext) {
              getModelData.push(oContext.getObject());
            });
            oModel.setData(getModelData);
            sap.ui.core.BusyIndicator.hide();
  
          }.bind(this))
          console.log("mydata", getModelData)
  
        },
  
        onHandleParkingNo: async function (oEvent) {
          this._handleSearch("onParkingSearch", "ParkingNo", "onVehicleSearch", "VehicleNumber");
        },
  
        onHandleVehicle: function (oEvent) {
          this._handleSearch("onVehicleSearch", "VehicleNumber", "onParkingSearch", "ParkingNo");
        },
  
        _handleSearch: async function (searchFieldId, searchProperty, otherFieldId, otherField) {
          const oSearchInput = this.byId(searchFieldId);
          const sSearchValue = oSearchInput.getValue().trim();
          const oOtherInput = this.getView().byId(otherFieldId);
          const oTable = this.byId("billingTable");
          const oBinding = oTable.getBinding("rows");
  
          if (!sSearchValue) {
            oBinding.filter([]); // Clear filter
            oOtherInput.setValue("").setEnabled(true); // Enable other field search
            return;
          }
  
          const oFilter = new sap.ui.model.Filter(searchProperty, sap.ui.model.FilterOperator.EQ, sSearchValue);
          oBinding.filter([oFilter]);
  
          let aFilteredItems = oBinding.getContexts();
          oOtherInput.setValue(""); // Clear other field input
  
          if (aFilteredItems.length > 0) {
            const sOtherValue = aFilteredItems[0].getProperty(otherField);
            console.log(`${searchProperty}: ${sSearchValue} - ${otherField}: ${sOtherValue}`);
  
            if (sOtherValue) {
              oOtherInput.setValue(sOtherValue).setEnabled(false);
            } else {
              oOtherInput.setEnabled(true);
            }
          } else {
            console.log(`No results found for ${searchProperty}:`, sSearchValue);
          }
        },
  
        onSelectTable: function (oEvent) {
          const oTable = this.byId("billingTable");
          const aSelectedIndices = oTable.getSelectedIndices();
          const iClickedIndex = oEvent.getParameter("rowIndex");
  
          if (aSelectedIndices.length > 1) {
            oTable.clearSelection();
            oTable.addSelectionInterval(iClickedIndex, iClickedIndex);
            aSelectedIndices = [iClickedIndex];
          }
  
          const aSelectedData = aSelectedIndices.map(function (iIndex) {
            let oContext = oTable.getContextByIndex(iIndex);
            return {
              ParkingNo: oContext.getProperty("ParkingNo"),
              DeliveryNo: oContext.getProperty("DeliveryNo"),
  
            };
          });
  
          if (aSelectedData.length === 0) {
            ParkingNoValidation = undefined;
            DeliveryNoValidation = undefined;
  
            console.log("Selection cleared. Validation variables reset to undefined.");
          } else if (aSelectedData.length === 1) {
  
            ParkingNoValidation = aSelectedData[0].ParkingNo;
            DeliveryNoValidation = aSelectedData[0].DeliveryNo;
  
            console.log("ParkingNo:", ParkingNoValidation);
            console.log("DeliveryNo:", DeliveryNoValidation);
          }
  
          // Log selected data for debugging
          console.log("Selected Data:", aSelectedData);
        },
        createBilling: async function () {
          const oModel = this.getOwnerComponent().getModel();
          const that = this;
  
          try {
            // Validate ParkingNo before proceeding
            if (!ParkingNoValidation) {
              sap.m.MessageBox.warning("Please select Parking No.");
              return;
            }
  
            // Show Busy Indicator
            sap.ui.core.BusyIndicator.show(0);
  
            // Get current date & time
            const currentDate = new Date().toISOString().split('T')[0] + "T00:00:00Z";
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
  
            const time = `${hours}:${minutes}:${seconds}`;
  
            // Prepare payload for invoice creation
            let payloadCreateBilling = {
              "Vbeln": "",
              "to_items": [
                { 
                  "Vbeln": DeliveryNoValidation, 
                  "Posnr": "000010" 
                }],
              "invoice_numSet": [{ "Vbeln": "" }]
            };
  
            let oBindList4 = oModel.bindList("/Invoice_createSet");
            let oContext;
  
            // Try to create an invoice
            oContext = await new Promise((resolve, reject) => {
              const context = oBindList4.create(payloadCreateBilling, true);
              oBindList4.attachCreateCompleted((oEvent) => {
                const params = oEvent.getParameters();
                params.success ? resolve(params.context) : reject(new Error("Invoice creation failed"));
              });
            });
  
            // Extract Invoice Number
            let response = oContext.getObject();
            let oVbeln = response.Vbeln;
  
            // Update BillingNo in park_so_documentSet & Status in park_itemSet
            try {
              let oBindList = oModel.bindList("/park_so_documentSet");
              let aFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, ParkingNoValidation);
              let aContexts = await oBindList.filter([aFilter]).requestContexts();
  
              if (aContexts.length === 0) throw new Error("No matching parking record found.");
              aContexts[0].setProperty("BillingNo", oVbeln);
  
              let oBindListItem = oModel.bindList("/park_itemSet");
              let aContextsItem = await oBindListItem.filter([aFilter]).requestContexts();
  
              if (aContextsItem.length === 0) throw new Error("No parking item record found.");
              aContextsItem[0].setProperty("Status", "Invoiced");
              aContextsItem[0].setProperty("BilledTime", time);
              aContextsItem[0].setProperty("BilledDate", currentDate);
  
              await oModel.submitBatch(oModel.getUpdateGroupId()); // Submit all changes in batch
            } catch (err) {
              throw new Error("Failed to update billing/parking details: " + err.message);
            }
  
            // Show Success Message & Refresh UI
            await new Promise((resolve) => {
              sap.m.MessageBox.success(`Invoiced ${oVbeln} created`, {
                title: "Success",
                actions: [sap.m.MessageBox.Action.OK],
                onClose: resolve
              });
            });
  
            that._onObjectMatched();
  
          } catch (error) {
            console.error("Error in createBilling:", error);
            sap.m.MessageBox.error(error.message || "An unexpected error occurred.");
          } finally {
            sap.ui.core.BusyIndicator.hide(); // Hide Busy Indicator in all cases
          }
        }
        ,
  
        // createBilling: function () {
  
        //   if (!ParkingNoValidation) {
        //     sap.m.MessageBox.warning("Please select Parking No.");
        //     return;
  
        //   }
        //   sap.ui.core.BusyIndicator.show(0);
        //   const currentDate = new Date().toISOString().split('T')[0]
        //   let createdDate = currentDate + "T00:00:00Z"
        //   const now = new Date();
        //   const hours = String(now.getHours()).padStart(2, '0');
        //   const minutes = String(now.getMinutes()).padStart(2, '0');
        //   const seconds = String(now.getSeconds()).padStart(2, '0');
  
        //   const time = `${hours}:${minutes}:${seconds}`;
  
        //   let payloadCreateBilling = {
        //     "Vbeln": "",
        //     "to_items": [
        //       {
        //         "Vbeln": DeliveryNoValidation,
        //         "Posnr": "000010"
        //       }
        //     ],
        //     "invoice_numSet": [
        //       {
        //         "Vbeln": "" // This can also be filled as needed
        //       }
        //     ]
        //   };
  
        //   let oModel = this.getOwnerComponent().getModel();
        //   let oBindList4 = oModel.bindList("/Invoice_createSet");
  
        //   oBindList4.create(payloadCreateBilling, true);
  
        //   const that = this;
        //   oBindList4.attachCreateCompleted((oEvent) => {
        //     let params = oEvent.getParameters();
  
        //     if (params.success) {
        //       let response = params.context.getObject();
  
        //       console.log("response", response)
        //       let oVbeln = response.Vbeln;
  
        //       console.log("veblen", oVbeln);
        //       let oBindList = oModel.bindList("/park_so_documentSet");
  
        //       let aFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, ParkingNoValidation);
  
        //       oBindList.filter(aFilter).requestContexts().then(function (aContexts) {
        //         aContexts[0].setProperty("BillingNo", oVbeln);
        //       });
        //       sap.ui.core.BusyIndicator.hide();
  
        //       sap.m.MessageBox.show("Invoiced " + oVbeln + " created", {
        //         title: "Success",
        //         icon: sap.m.MessageBox.Icon.SUCCESS,
        //         actions: [sap.m.MessageBox.Action.OK],
        //         onClose: function (oAction) {
        //           if (oAction === sap.m.MessageBox.Action.OK) {
  
        //             const oBindListitem = oModel.bindList("/park_itemSet");
  
        //             const aFilteritem = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, ParkingNoValidation);
        //             console.log("aFiltervansh", aFilteritem)
  
        //             oBindListitem.filter(aFilteritem).requestContexts().then(function (aContexts) {
        //               aContexts[0].setProperty("Status", "Invoiced");
        //               aContexts[0].setProperty("BilledTime", time);
        //               aContexts[0].setProperty("BilledDate", createdDate);
        //             });
        //             that._onObjectMatched();
        //           } else {
        //             that.byId('billingTable').setSelectionMode('None');
        //           }
        //         }
        //       });
  
        //     }
  
        //   });
  
        // },
        EmptyOut: async function () {
          const oModel = this.getOwnerComponent().getModel();
          const oBindList = oModel.bindList("/park_itemSet");
          const that = this;
  
          // Validate ParkingNo before proceeding
          if (!ParkingNoValidation) {
            sap.m.MessageBox.error("Please Select a Parking No.");
            return;
          }
  
          // Apply filter to fetch relevant data
          const aFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, ParkingNoValidation);
          oBindList.filter([aFilter]);
  
          try {
            // Confirmation Dialog
            sap.m.MessageBox.confirm("Are you sure you want to 'Empty-Out'?", {
              title: "Confirmation",
              icon: sap.m.MessageBox.Icon.QUESTION,
              actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
              onClose: async function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {
                  try {
                    // Fetch filtered contexts
                    let aContexts = await oBindList.requestContexts();
                    if (aContexts.length === 0) {
                      sap.m.MessageBox.warning("No matching parking record found.");
                      return;
                    }
  
                    // Update the first matched record
                    aContexts[0].setProperty("Status", "Empty-Out");
  
                    // Submit the changes to backend
                    await oModel.submitBatch(oModel.getUpdateGroupId());
  
                    // Success Message
                    sap.m.MessageBox.success("Truck status updated to 'Empty-Out'", {
                      onClose: function () {
                        that._onObjectMatched(); // Refresh data
                      }
                    });
                  } catch (error) {
                    console.error("Error updating status:", error);
                    sap.m.MessageBox.error("Failed to update truck status. Please try again.");
                  }
                } else {
                  that.byId('billingTable').setSelectionMode('None');
                }
              }
            });
          } catch (error) {
            console.error("Error processing request:", error);
            sap.m.MessageBox.error("An unexpected error occurred. Please try again.");
          }
        }
  
  
  
      });
    });
  