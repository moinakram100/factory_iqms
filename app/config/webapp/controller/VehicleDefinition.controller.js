sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/core/Fragment',
    "com/ingenx/qms/config/utils/helperFunctions"
  ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, helperFunctions) {
      "use strict";
      let oView
  
      return Controller.extend("com.ingenx.qms.config.controller.VehicleDefinition", {
  
        onInit: function () {
          // Defining oView to use in everywhere
          oView = this.getView();
        },
        onCreateVehicle: function () {
  
          const oVehicleData = {
            VehicleDefinition: "",
            VehicleType: ""
          };
          const vehicleModel = new JSONModel(oVehicleData);
          oView.setModel(vehicleModel, "vehicleModel");
          if (!this.openVehicleDailog) {
            this.openVehicleDailog = sap.ui.xmlfragment("com.ingenx.qms.config.fragments.AddVehicleType", this);
            oView.addDependent(this.openVehicleDailog);
          }
          this.openVehicleDailog.open();
        },
        onCanceleVehicleType: function () {
          this.openVehicleDailog.close();
        },
  
        valueHelpVehicleType: function (oEvent) {
  
          this.vehicleTypeControl = oEvent.getSource();
          helperFunctions._openValueHelpDialog(this, 'VehicleTypeDialog', 'com.ingenx.qms.config.fragments.VehicleType');
  
        },
  
        onVehicleTypeSearch: function (oEvent) {
          // reusable  function
          helperFunctions._valueHelpLiveSearch(oEvent, "VehType");
  
        },
  
        onVehicleTypeClose: function (oEvent) {
          const oSelectedItem = oEvent.getParameter("selectedItem");
          oEvent.getSource().getBinding("items").filter([]);
          if (!oSelectedItem) {
            return;
          }
          if (this.vehicleTypeControl) {
            // this.byId("_IDGenInput1").setValue(oSelectedItem.getTitle());
            this.vehicleTypeControl.setValue(oSelectedItem.getTitle());
          }
        },
  
        onSaveVehicleType: async function () {
          try {
            const oView = this.getView();
            const vehicleData = oView.getModel("vehicleModel").getData();
  
            if (!vehicleData.VehicleDefinition || !vehicleData.VehicleType) {
              sap.m.MessageBox.error("Please fill in all the fields.");
              return;
            }
  
            const oTable = oView.byId("tableVehicleDef"); // Get the table reference
            const oBinding = oTable.getBinding("items");  // Get the table binding
  
            if (!oBinding) {
              sap.m.MessageBox.error("Table binding not found.");
              return;
            }
  
            // Get the currently displayed data in the table
            const aItems = oBinding.getCurrentContexts().map(context => context.getObject());
  
            // Check for duplicate VehicleDefinition and VehicleType
            let isDuplicate = aItems.some(item =>
              item.VehicleType === vehicleData.VehicleType ||
              item.VehicleDefinition.toLowerCase() === vehicleData.VehicleDefinition.toLowerCase()
            );
  
            if (isDuplicate) {
              sap.m.MessageBox.error("Vehicle Definition or Vehicle Type already exists.");
              return;
            }
            // Proceed with creating a new entry if no duplicate is found
            let oModel = oView.getModel();
            let oBindList = oModel.bindList("/VehicleTypeDefinition");
  
            let payload = {
              VehicleDefinition: vehicleData.VehicleDefinition,
              VehicleType: vehicleData.VehicleType
            };
            await oBindList.create(payload, true);
  
            sap.m.MessageToast.show("Vehicle Type Created successfully.");
            oBinding.refresh(); // Refresh table binding
            this.openVehicleDailog.close();
  
          } catch (error) {
            console.log("Error in onSaveVehicleType:", error);
            sap.m.MessageBox.error("An unexpected error occurred in creation. Please try again.");
          }
        },
        // DELETE
        onDeleteVehicleBtn: function () {
          this.toggleBtnVisibility(true);
          this.byId('tableVehicleDef').setMode('MultiSelect');
  
        },
  
        onCancelVehicleBtn: function () {
          this.toggleBtnVisibility(false);
          this.byId('tableVehicleDef').setMode('None');
  
        },
        toggleBtnVisibility: function (bool) {
          const addVehicleBtn = this.byId("addVehicleDefBtn");
          const deleteVehBtn = this.byId("deleteVehicleDefBtn");
          const confirmDelBtn = this.byId("deleteVehicleCnfrmBtn");
          const cancelDelBtn = this.byId("cancelVehicleDefBtn");
  
          // Toggle Visibility
          addVehicleBtn.setVisible(!bool);
          deleteVehBtn.setVisible(!bool);
          confirmDelBtn.setVisible(bool);
          cancelDelBtn.setVisible(bool);
        },
  
        onConfirmVehicleDeletionBtn: function () {
  
          let that = this;
          const oTable = this.byId("tableVehicleDef");
          const oSelectedItems = oTable.getSelectedItems();
  
          if (oSelectedItems.length === 0) {
            sap.m.MessageToast.show("No item selected for deletion.");
            return;
          }
  
          sap.m.MessageBox.confirm(
            `Are you sure you want to delete the selected item(s)?`, {
            actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
            onClose: async function (sAction) {
              if (sAction === sap.m.MessageBox.Action.OK) {
                sap.ui.core.BusyIndicator.show(0);
  
                try {
                  const oModel = that.getOwnerComponent().getModel(); // Ensure you're using the correct model reference
                  let aPaths = oSelectedItems.map(oItem => oItem.getBindingContext().getPath());
  
                  // Remove selected items using binding contexts
                  aPaths.forEach(sPath => {
                    oModel.delete(sPath); // Get context for each path
  
                  });
                  // Submit batch deletion request
                  await oModel.submitBatch("$auto");
                  sap.m.MessageToast.show("Item(s) Deleted Successfully.")
  
                  that.onCancelVehicleBtn(false);
  
                } catch (oError) {
                  sap.m.MessageToast.show("Error occurred while deleting selected item(s).");
                  console.error("Deletion Error:", oError);
                } finally {
                  sap.ui.core.BusyIndicator.hide();
                }
              } else if (sAction === sap.m.MessageBox.Action.CANCEL) {
                that.onCancelVehicleBtn(true)
              }
            }
          }
          );
        },
  
      });
    });
  