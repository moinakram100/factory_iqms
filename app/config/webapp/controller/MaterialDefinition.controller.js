sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/core/Fragment',
    "sap/ui/model/odata/v4/ODataModel",
    "com/ingenx/qms/config/utils/helperFunctions"
  ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, ODataModel, helperFunctions) {
      "use strict";
      let oView;
  
      return Controller.extend("com.ingenx.qms.config.controller.MaterialDefinition", {
  
        onInit: function () {
          oView = this.getView();
  
        },
        onAddBtnPress: function () {
          const localData = {
            MaterialDefinition: "",
            Division: "",
            MaterialType: "",
            Material: ""
          };
          const materialModel = new JSONModel(localData);
          oView.setModel(materialModel, "materialModel");
          helperFunctions._openValueHelpDialog(this, "addMaterialDialog", "com.ingenx.qms.config.fragments.AddMaterialType");
  
        },
        // onAddBtnPress1: async function () {
        //   const oView = this.getView();
        //   const oModel = this.getOwnerComponent().getModel(); // OData V4 model
        
        //   try {
        //     // Bind to the collection
        //     const oListBinding = oModel.bindList("/xIQMSxMaterial_n");
        //     const aContexts = await oListBinding.requestContexts(0, 100); // adjust range if needed
        //     const aMaterials = aContexts.map(ctx => ctx.getObject());
        
        //     // Add composite unique ID
        //     const aProcessedMaterials = aMaterials.map((item, index) => ({
        //       ...item,
        //       uniqueId: `${item.matnr}_${item.vkorg}_${item.vtweg}_${index}`
        //     }));
        
        //     // Bind to JSON model
        //     const oJsonModel = new sap.ui.model.json.JSONModel(aProcessedMaterials);
        //     oView.setModel(oJsonModel, "materialVHModel");
        
        //     // Open the dialog
        //     helperFunctions._openValueHelpDialog(this, "addMaterialDialog", "com.ingenx.qms.config.fragments.AddMaterialType");
        
        //   } catch (err) {
        //     console.error("OData V4 read error:", err);
        //     // sap.m.MessageToast.show("Failed to load material data.");
        //   }
        // },      
        cancelMatDialog: function () {
          this.addMaterialDialog.close();
        },
  
        onMaterialValueHelp: function (oEvent) {
          helperFunctions._openValueHelpDialog(this, 'MaterialTypeDialog', 'com.ingenx.qms.config.fragments.MaterialType')
  
        },
        materialVavlueHelpClose: function (oEvent) {
          const oSelectedItem = oEvent.getParameter("selectedItem");
  
          oEvent.getSource().getBinding("items").filter([]);
  
          if (!oSelectedItem) return;
  
          const oMaterialInput = oView.byId("_InputMaterialCode");
          const sMaterialCode = oSelectedItem.getTitle();  // Get material code from the title (matnr)
  
          // console.log("Selected Material Code (matnr):", sMaterialCode);
  
          if (oMaterialInput) {
            oMaterialInput.setValue(sMaterialCode);
          } else {
            console.error("Material Code input control not found.");
          }
  
          const oDivisionInput = oView.byId("_InputMaterialDiv");
          const sDivision = oSelectedItem.getDescription();  // Get division description (spart)
  
          // console.log("Selected Division (spart):", sDivision);
  
          if (oDivisionInput) {
            oDivisionInput.setValue(sDivision);
          } else {
            console.error("Division input control not found.");
          }
        },
  
        materialVavlueHelpSearch: function (oEvent) {
          helperFunctions._valueHelpLiveSearchMutipleFilters(oEvent, ['matnr', 'spart'], false);
  
        },
        onSavePress: async function () {
          const oTable = oView.byId("MaterialDef_Table");
          const oTableItems = oTable.getItems();
          const oModel = oView.getModel("materialModel");
          const oODataModel = this.getOwnerComponent().getModel(); // OData V4 Model
          const data = oModel.getData();
  
          // Validate required fields
          if (!data.MaterialDefinition || !data.MaterialType || !data.Material) {
            sap.m.MessageBox.error("Please fill in all the required fields.");
            return;
          }
  
          // Check for duplicates in the table itself
          let isDuplicate = oTableItems.some(oItem => {
            let oRowData = oItem.getBindingContext().getObject();
            return (
              oRowData.MaterialDefinition === data.MaterialDefinition ||
              oRowData.Material === data.Material
            );
          });
  
          if (isDuplicate) {
            sap.m.MessageBox.error("This Material or Material Definition already exists in the table.");
            return;
          }
          let payload = {
            MaterialDefinition: data.MaterialDefinition,
            MaterialType: data.MaterialType,
            Division: data.Division,
            Material: data.Material
          };
          sap.ui.core.BusyIndicator.show(0);
  
          try {
            let oListBinding = oODataModel.bindList("/MaterialTypeDefinition");
            await oListBinding.create(payload); // Asynchronous creation
  
            let oTableBinding = oTable.getBinding("items");
            if (oTableBinding) oTableBinding.refresh(); // Ensures UI updates
  
            sap.m.MessageToast.show("Material successfully added!");
  
            this.addMaterialDialog.close();
          } catch (error) {
            // sap.m.MessageBox.error("Failed to add material.");
            console.log("Error:", error);
          } finally { sap.ui.core.BusyIndicator.hide(); }
        },
  
        onDeleteBtnPress: function () {
          this.toggleMaterialDefButtons(false);
          this.byId("MaterialDef_Table").setMode('MultiSelect'); // Change selection mode
        },
  
        toggleMaterialDefButtons: function (bool) {
          const addBtn = this.byId("MaterialDef_Create");
          const delBtn = this.byId("MaterialDef_Delete");
          const confirmDelBtn = this.byId("MaterialDef_Confrm");
          const cancelDelBtn = this.byId("MaterialDef_Cancel");
  
          addBtn.setVisible(bool);
          delBtn.setVisible(bool);
          confirmDelBtn.setVisible(!bool);
          cancelDelBtn.setVisible(!bool);
        },
  
        onCancelBtnDeletion: function () {
          this.byId("MaterialDef_Table").setMode('None'); // Reset selection mode
          this.toggleMaterialDefButtons(true);
        },
        onConfirmBtnDeletion: function () {
          let that = this;
          const oTable = this.byId("MaterialDef_Table");
          const oSelectedItems = oTable.getSelectedItems();
  
          if (oSelectedItems.length === 0) {
            sap.m.MessageToast.show("No Material selected for deletion.");
            return;
          }
  
          sap.m.MessageBox.confirm(
            "Are you sure you want to delete the selected Material(s)?",
            {
              actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
              onClose: async function (sAction) {
                if (sAction === sap.m.MessageBox.Action.OK) {
                  sap.ui.core.BusyIndicator.show(0);
  
                  try {
                    const oModel = that.getOwnerComponent().getModel();
                    let aPaths = oSelectedItems.map(oItem => oItem.getBindingContext().getPath());
  
                    // Delete selected items using their binding contexts
                    aPaths.forEach(sPath => {
                      oModel.delete(sPath);
                    });
  
                    // Submit batch deletion request
                    await oModel.submitBatch("$auto");
                    sap.m.MessageToast.show("Material(s) deleted successfully.");
  
                    that.onCancelBtnDeletion(); // Reset selection mode
  
                  } catch (oError) {
                    sap.m.MessageToast.show("Error occurred while deleting selected Material(s).");
                    console.log("Deletion Error:", oError);
                  } finally {
                    sap.ui.core.BusyIndicator.hide();
                  }
                } else if (sAction === sap.m.MessageBox.Action.CANCEL) {
                  that.onCancelBtnDeletion();
                }
              }
            }
          );
        },
  
  
      });
    });
  