sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
  ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
      "use strict";
      let DeliveryNoValidation
      let ParkingNoValidation
      let getModelData
      let oView
  
  
      return Controller.extend("com.ingenx.qms.parking.controller.Exit", {
  
        onInit: function () {
          oView = this.getView();
          let oModel = new sap.ui.model.json.JSONModel();
          oView.setModel(oModel, "dataModel");
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("RouteHome").attachPatternMatched(this.onObjectMatched, this);
  
        },
  
        async onObjectMatched() {
          let oModel3 = this.getOwnerComponent().getModel();
          let oBindList3 = oModel3.bindList('/ExitScreen');
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
  
        onSubmitParkingNo: async function (oEvent) {
          this._handleSearch("ParkingNoInput", "ParkingNo", "VehicleNumberInput", "VehicleNumber");
        },
  
        onSubmitVehicle: function (oEvent) {
          this._handleSearch("VehicleNumberInput", "VehicleNumber", "ParkingNoInput", "ParkingNo");
        },
  
        _handleSearch: async function (searchFieldId, searchProperty, otherFieldId, otherField) {
          const oSearchInput = this.byId(searchFieldId);
          const sSearchValue = oSearchInput.getValue().trim();
          const oOtherInput = this.getView().byId(otherFieldId);
          const oTable = this.byId("_IDGenTable2");
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
          const oTable = this.byId("_IDGenTable2");
          let aSelectedIndices = oTable.getSelectedIndices();
          const iClickedIndex = oEvent.getParameter("rowIndex");
  
          if (aSelectedIndices.length > 1) {
            oTable.clearSelection();
            oTable.addSelectionInterval(iClickedIndex, iClickedIndex);
            aSelectedIndices = [iClickedIndex];
          }
  
          let aSelectedData = aSelectedIndices.map(function (iIndex) {
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
  
        onSubmitParkingNo: function (oEvent) {
          const oInput = this.byId("ParkingNoInput");
          const sParkingNo = oInput.getValue();
          let sVehicleNumber;
          const oTable = this.byId("_IDGenTable2");
          const oBinding = oTable.getBinding("rows");
          if (sParkingNo.trim() === "") {
            oBinding.filter([]); // Clear the filter
            this.getView().byId("VehicleNumberInput").setValue("").setEnabled(true); // Enable the Vehicle Number search
            return; // Exit the function
          }
          const oFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, sParkingNo);
          oBinding.filter([oFilter]);
  
          const aFilteredItems = oBinding.getContexts();
          this.getView().byId("VehicleNumberInput").setValue(""); // Clear the Vehicle Number input
  
          if (aFilteredItems.length > 0) {
            aFilteredItems.forEach(function (oContext) {
              // Get the VehicleNumber from the context
              sVehicleNumber = oContext.getProperty("VehicleNumber");
              console.log("Parking No:", sParkingNo, " - Vehicle No:", sVehicleNumber);
            });
          } else {
            console.log("No results found for Parking No:", sParkingNo);
          }
          if (sVehicleNumber) {
            this.getView().byId("VehicleNumberInput").setValue(sVehicleNumber).setEnabled(false);
          } else {
            this.getView().byId("VehicleNumberInput").setEnabled(true); // Enable if no match
          }
        },
  
        onSubmitVehicle: function (oEvent) {
          // Get the value from the vehicle number input field
          const oInput = this.byId("VehicleNumberInput");
          const sVehicleNumber = oInput.getValue();
          let sParkingNo;
  
          // Get the table and its binding
          const oTable = this.byId("_IDGenTable2");
          const oBinding = oTable.getBinding("rows");
  
          // Check if the input is blank
          if (sVehicleNumber.trim() === "") {
            // If input is blank, clear the filter to show all data
            oBinding.filter([]); // Clear the filter
            this.getView().byId("ParkingNoInput").setValue("").setEnabled(true); // Enable the Parking Number search
            return; // Exit the function
          }
  
          // Create a filter for exact Vehicle Number
          const oFilter = new sap.ui.model.Filter("VehicleNumber", sap.ui.model.FilterOperator.EQ, sVehicleNumber);
  
          // Apply the filter to the binding
          oBinding.filter([oFilter]);
  
          // Get the filtered items and log ParkingNumbers
          const aFilteredItems = oBinding.getContexts();
  
          // Reset Parking Number input
          this.getView().byId("ParkingNoInput").setValue(""); // Clear the Parking Number input
  
          if (aFilteredItems.length > 0) {
            aFilteredItems.forEach(function (oContext) {
              // Get the ParkingNo from the context
              sParkingNo = oContext.getProperty("ParkingNo");
              console.log("Vehicle No:", sVehicleNumber, " - Parking No:", sParkingNo);
            });
          } else {
            console.log("No results found for Vehicle No:", sVehicleNumber);
          }
  
          // Set the Parking Number and disable the input if there's an exact match
          if (sParkingNo) {
            this.getView().byId("ParkingNoInput").setValue(sParkingNo).setEnabled(false);
          } else {
            this.getView().byId("ParkingNoInput").setEnabled(true); // Enable if no match
          }
        },
        onExitPress: async function () {
          if (!ParkingNoValidation) {
            sap.m.MessageBox.warning("Please select Parking No");
            return;
          }
  
          sap.ui.core.BusyIndicator.show(0);
  
          try {
            let currentDate = new Date().toISOString().split('T')[0];
            let createdDate = currentDate + "T00:00:00Z";
  
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const time = `${hours}:${minutes}:${seconds}`;
  
            let oModel = this.getOwnerComponent().getModel();
            let aFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, ParkingNoValidation);
  
            let oHeaderBindList = oModel.bindList("/Park_headerSet2");
            oHeaderBindList.filter(aFilter);
            let aHeaderContexts = await oHeaderBindList.requestContexts();
  
            if (aHeaderContexts.length > 0) {
              aHeaderContexts[0].setProperty("Status", "Exit");
            } else {
              throw new Error("No header record found for ParkingNo: " + ParkingNoValidation);
            }
            
            let oItemBindList = oModel.bindList("/park_itemSet2");
            oItemBindList.filter(aFilter);
            let aItemContexts = await oItemBindList.requestContexts();
  
            if (aItemContexts.length > 0) {
              aItemContexts[0].setProperty("ExitTime", time);
              aItemContexts[0].setProperty("ExitDate", createdDate);
            } else {
              throw new Error("No item record found for ParkingNo: " + ParkingNoValidation);
            }
  
            // Optional: Submit changes if using deferred groups
            // await oModel.submitChanges();
  
            let self = this;
  
            sap.m.MessageBox.success("Vehicle has exited successfully", {
              title: "Success",
              icon: sap.m.MessageBox.Icon.SUCCESS,
              actions: [sap.m.MessageBox.Action.OK],
              onClose: function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {
                  self.onObjectMatched();
                  self.byId('_IDGenTable2').clearSelection();
                }
              }
            });
  
          } catch (error) {
            console.error("Exit process failed:", error);
            sap.m.MessageBox.error("Failed to update vehicle exit: " + error.message);
          } finally {
            sap.ui.core.BusyIndicator.hide();
          }
        }
      });
    });
  