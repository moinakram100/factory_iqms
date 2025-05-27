

sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/Filter",
      "sap/ui/model/FilterType",
      "sap/ui/model/FilterOperator",
      "sap/m/MessageBox"
  
    ],
    function (BaseController, Filter, FilterType, FilterOperator, MessageBox) {
      "use strict";
  
      let mergedData;
      let oParkingNo;
      let aSelectedData;
      let oJsonModel;
  
  
      return BaseController.extend("com.ingenx.qms.parking.controller.ParkingList", {
  
        onInit: async function () {
  
          const oRouter = this.getOwnerComponent().getRouter();
  
  
          let oJsonModel1 = new sap.ui.model.json.JSONModel({});
          this.getOwnerComponent().setModel(oJsonModel1,"data");
  
          oRouter.getRoute("ParkingList").attachPatternMatched(this.onObjectMatched, this);
  
          oJsonModel = new sap.ui.model.json.JSONModel();
          this.getView().setModel(oJsonModel, "mergedData");
  
  
        },
        onAfterRendering () {
          this.onReset();
        },
  
        async onObjectMatched (){
          // this.onReset();
          sap.ui.core.BusyIndicator.show(0);
  
          const sPath = `/getCustomizedParkingData()`;
  
          let oModel = this.getOwnerComponent().getModel();
          try {
            // Binding context for the OData service call
            const oBinding = oModel.bindContext(sPath, null, {});
  
            // Requesting data from the bound context
            const oData = await oBinding.requestObject();
  
            // Check if data exists and handle accordingly
            if (oData && oData.value && oData.value.length > 0) {
              console.log("result", oData.value);
                // Sort in descending order based on numeric value of ParkingNo
                oData.value.sort((a, b) => {
                  return parseInt(b.ParkingNo, 10) - parseInt(a.ParkingNo, 10);
              });
  
              oJsonModel.setData(oData.value);
            } else {
  
              this.byId('_parkListTable').setNoData("No Data Found");
            }
            oJsonModel.refresh();
            // this.getView().getModel('mergedData').getData();
          } catch (oError) {
            console.log("Error fetching Parking data:", oError.message);
  
            MessageBox.error(oError.message);
          } finally {
            sap.ui.core.BusyIndicator.hide();
          }
  
        },
        onStatusSelect: function (oEvent) {
          try {
            const oSelectedItem = oEvent.getParameter("selectedItem");
            if (!oSelectedItem) {
              console.log("No item selected");
              return;
            }
  
            let sSelectedText = oSelectedItem.getText();
            console.log("Selected text:", sSelectedText);
  
            const oTable = this.byId("_parkListTable");
            if (!oTable) {
              console.error("Table not found");
              return;
            }
  
            const oBinding = oTable.getBinding("rows");
            if (!oBinding) {
              console.error("Table binding not found");
              return;
            }
  
            // Changed from Contains to EQ for exact match
            const oFilter = new Filter("Status", FilterOperator.EQ, sSelectedText);
            oBinding.filter([oFilter]);
  
            console.log("Filter applied successfully with exact match");
          } catch (error) {
            console.error("Error in onStatusSelect:", error);
            MessageBox.error("Error processing selection: " + error.message);
          }
        },
  
        //changes by anurag for resetting back the table to normal state
        onReset: function () {
          try {
            const oTable = this.byId("_parkListTable");
            const oBinding = oTable.getBinding("rows");
            this.byId('_VehicleNoInput').setValue("").setEnabled(true);
            this.byId('_ParkingNoInput').setValue("").setEnabled(true);
            if (oBinding) {
              oBinding.filter([]);
              this.byId("selectStatus").setSelectedKey("");
              console.log("Reset successful");
            }
          } catch (error) {
            console.error("Error in onReset:", error);
            MessageBox.error("Error resetting filters");
          }
  
        },
  
        // formatter: {
        //   formatDate: function (dateString) {
        //     if (!dateString) return "";
  
        //     // Create a JavaScript Date object from the date string
        //     let date = new Date(dateString);
        //     // Format the date as YYYY-MM-DD
        //     let year = date.getFullYear();
        //     let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        //     let day = String(date.getDate()).padStart(2, '0');
  
        //     return `${year}-${month}-${day}`;
        //   },
        //   getStatus: function (items) {
        //     if (items && items.length > 0) {
        //       return items[0].Status || "Unknown";
        //     }
        //     return "Unknown";
        //   }
        // },
  
  
        // Helper function to handle the filter logic for both ParkingNo and VehicleNumber
        handleFilter: function (oInputId, sBindingProperty, sValue) {
          const oInput = this.byId(oInputId);
          const oTable = this.byId("_parkListTable");
          const oBinding = oTable.getBinding("rows");
  
          // Clear the other input field
          const otherInputId = oInputId === "_ParkingNoInput" ? "_VehicleNoInput" : "_ParkingNoInput";
          this.getView().byId(otherInputId).setValue(""); // Clear the other input field
  
          // Check if the input is blank
          if (sValue.trim() === "") {
            // If input is blank, clear the filter to show all data
            oBinding.filter([]); // Clear the filter
            this.getView().byId(otherInputId).setValue(""); // Clear the other input field
            return;
          }
  
          const oFilter = new sap.ui.model.Filter(sBindingProperty, sap.ui.model.FilterOperator.Contains, sValue);
  
          oBinding.filter([oFilter]);
  
          const aFilteredItems = oBinding.getContexts();
  
          if (aFilteredItems.length > 0) {
            aFilteredItems.forEach(function (oContext) {
              const sOtherValue = oContext.getProperty(oInputId === "_ParkingNoInput" ? "VehicleNumber" : "ParkingNo");
              console.log(`${oInputId === "_ParkingNoInput" ? 'Parking No' : 'Vehicle No'}:`, sValue, `- ${oInputId === "_ParkingNoInput" ? 'Vehicle No' : 'Parking No'}:`, sOtherValue);
            });
          } else {
            // console.log(`No results found for ${sValue}`);
            oTable.setNoData("No Data Found")
          }
  
          // Enable or disable the other input based on whether a match is found
          const otherInput = this.getView().byId(otherInputId);
          if (aFilteredItems.length > 0) {
            const sOtherValue = aFilteredItems[0].getProperty(oInputId === "_ParkingNoInput" ? "VehicleNumber" : "ParkingNo");
            if (sOtherValue) {
              otherInput.setValue(sOtherValue).setEnabled(true); // Disable if match found
            }
          } else {
            otherInput.setEnabled(true); // Enable if no match
          }
        },
  
        onEnterParkingNumber: function (oEvent) {
          const sParkingNo = this.byId("_ParkingNoInput").getValue();
          this.handleFilter("_ParkingNoInput", "ParkingNo", sParkingNo);  // Delegate the filtering logic to the helper function
        },
  
        onEnterVehicleNumber: function (oEvent) {
          const sVehicleNumber = this.byId("_VehicleNoInput").getValue();
          this.handleFilter("_VehicleNoInput", "VehicleNumber", sVehicleNumber);  // Delegate the filtering logic to the helper function
        }
        ,
  
        onSelectTable: function (oEvent) {
          let oTable = this.byId("_parkListTable");
          let aSelectedIndices = oTable.getSelectedIndices();
  
          // Get the clicked checkbox index from the event
          let iClickedIndex = oEvent.getParameter("rowIndex");
  
          // Check if more than one checkbox is selected
          if (aSelectedIndices.length > 1) {
            // Clear all previous selections and keep only the last clicked checkbox
            oTable.clearSelection();
            oTable.addSelectionInterval(iClickedIndex, iClickedIndex); // Select the latest clicked checkbox
            aSelectedIndices = [iClickedIndex]; // Update to hold only the latest selected index
          }
          aSelectedData = [];
          aSelectedData = aSelectedIndices.map(function (iIndex) {
            const oContext = oTable.getContextByIndex(iIndex);
            return oContext.getObject();
          });
  
          // Reset validation variables if no row is selected
          if (aSelectedData.length === 0) {
            oParkingNo = undefined;
  
            // console.log("Selection cleared. Validation variables reset to undefined.");
          } else if (aSelectedData.length === 1) {
            // Only one row is selected, assign the values
            oParkingNo = aSelectedData[0].ParkingNo;
  
            console.log("ParkingNo:", oParkingNo);
  
          }
        },
  
        // on Press check List
        onCheckListPress: function () {
          const oTable = this.byId("_parkListTable");  // Get the table by its ID
          const aSelectedIndices = oTable.getSelectedIndices();  // Get selected indices
  
  
          if (aSelectedIndices.length !== 1) {
            sap.m.MessageBox.warning("Please Select a Parking No.");
            return; // Stop further processing if selection is invalid
          }
  
  
          this.getOwnerComponent().getModel("data").setProperty("/parkObj", aSelectedData[0]);
          console.log(aSelectedData[0]);
  
  
          const ParkingNoNav = this.getOwnerComponent().getRouter();
          ParkingNoNav.navTo("RouteVehicleChecklist", {}, true);  // Navigate to the VehicleChecklist view
          oTable.clearSelection();
        },
  
  
      onParkOutPress:async function () {
  
          if (aSelectedData.length === 0) {
            sap.m.MessageBox.warning("Please select one row to proceed.");
            return;
          }
          let oModel = this.getOwnerComponent().getModel(); // OData V4 Model
          let oListBinding = oModel.bindList("/Park_headerSet2"); // Bind list to the entity set
  
          let oSelectedData = aSelectedData[0] // Retrieve selected row data
          let sParkingNo = oSelectedData.ParkingNo; // Ensure 'ParkingNo' is the key field
          let that = this;
  
          // Confirmation Dialog
          sap.m.MessageBox.confirm(
            "Are you sure you want to Park Out the Vehicle ?", {
            icon: sap.m.MessageBox.Icon.QUESTION,
            title: "Confirm Park Out",
            actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
            onClose: function (sAction) {
              if (sAction === sap.m.MessageBox.Action.YES) {
                // Create a filter for ParkingNo
                var oFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, sParkingNo);
  
                // Request the binding context
                oListBinding.filter(oFilter).requestContexts().then(async function (aContexts) {
                              if( aContexts.length){
                    let oItemContext = aContexts[0];
                    if (oItemContext.getProperty("ParkingNo") === sParkingNo) {
                      // Update the Status field
                      oItemContext.setProperty("Status", "Park-Out");
  
  
                    }
                    //  refreshing the model 
                    sap.m.MessageBox.success("Vehicle Parked-Out.");
                    await that.onObjectMatched();
                  }
                }).catch(function (oError) {
                  console.log("Error in park out ", oError);
  
                  sap.m.MessageBox.error("Error in Parking out.");
                });
              }
            }.bind(this)
          }
          );
        },
  
  
      });
    }
  );