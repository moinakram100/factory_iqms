sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/json/JSONModel",
    "com/ingenx/qms/config/utils/helperFunctions"
    ],
    function (BaseController, JSONModel, helperFunctions) {
      "use strict";
      let sVehicleType
      let getChecklistData = [];
      let oView;
  
      return BaseController.extend("com.ingenx.qms.config.controller.ChecklistCreation", {
        onInit: function () {
          oView = this.getView();
  
          let oModel = new sap.ui.model.json.JSONModel();
          oView.setModel(oModel, "CheckCreRemark_Model");
  
          oModel.setData([{
            Remarks: ""
          }]);
        },
  
        fetchCheckListData: async function (vehType) {
  
  
          let oModel = this.getOwnerComponent().getModel();
          let checkListBindlist = oModel.bindList(`/ChecklistCreation`);
          // Apply filter
          let oFilter = new sap.ui.model.Filter("VehicleType", sap.ui.model.FilterOperator.EQ, vehType);
          checkListBindlist.filter([oFilter]);
  
          try {
            let aContexts = await checkListBindlist.requestContexts(0, Infinity);
            getChecklistData = aContexts.map(oContext => oContext.getObject());
  
  
            console.log("mydata", getChecklistData);
          } catch (error) {
            console.error("Error fetching contexts", error);
          }
        },
  
        onVehicleTypeSearch: function (oEvent) {
          console.log("s");
          
          helperFunctions._valueHelpLiveSearch(oEvent, 'VehicleDefinition');
  
        },
  
        onCreate: function () {
          helperFunctions._openValueHelpDialog(this, 'CheckCre_Dialog', 'com.ingenx.qms.config.fragments.ChecklistCreation');
  
        },
  
  
        onVehicleType: function () {
          helperFunctions._openValueHelpDialog(this, 'VehicleDialog', 'com.ingenx.qms.config.fragments.Vehicle');
  
        },
  
  
        onValueHelpCloseVehicle: async function (oEvent) {
  
          let oSelectedItem = oEvent.getParameter("selectedItem");
  
          oEvent.getSource().getBinding("items").filter([]);
  
          if (!oSelectedItem) {
            return;
          }
  
          this.byId("CheckCre_VehicleType").setValue(oSelectedItem.getTitle());
  
          let loc = oView.byId("CheckCre_VehicleType");
          sVehicleType = loc.getValue();
  
          await this.fetchCheckListData(sVehicleType);
  
          console.log('checkList data', getChecklistData);
  
          let checkListModel = new sap.ui.model.json.JSONModel();
          checkListModel.setData(getChecklistData);
  
          let oTable = oView.byId("CheckCre_table");
          oView.byId("CheckCre_delete").setEnabled(true);
          oView.byId("CheckCre_create").setEnabled(true);
  
          oTable.setModel(checkListModel, "checkListModel");
        },
  
        filterCheckList: async function () {
  
          await this.fetchCheckListData(sVehicleType);
  
          let checkListModel = new sap.ui.model.json.JSONModel();
          checkListModel.setData(getChecklistData);
  
          let oTable = oView.byId("CheckCre_table");
          oView.byId("CheckCre_delete").setEnabled(true);
          oView.byId("CheckCre_create").setEnabled(true);
  
          oTable.setModel(checkListModel, "checkListModel");
  
        },
  
  
        createRow: function () {
  
          const oTable = oView.byId("CheckCre_Frag_Table");
  
          const oModel = oTable.getModel("CheckCreRemark_Model");
  
          const aData = oModel.getProperty("/");
  
          aData.push({ Remark: ""});
  
          oModel.setProperty("/", aData);
  
        },
  
  
        onSubmit: async function (oEvent) {
          let oTable = oView.byId("CheckCre_Frag_Table");
          let aItems = oTable.getItems();
          let aChecklist = [];
  
          aItems.forEach(function (oItem) {
            let oInput = oItem.getCells()[0];
            let sRemark = oInput.getValue();
            let checklistItem = {
              VehicleType: sVehicleType,
              Remarks: sRemark
            };
            aChecklist.push(checklistItem);
          });
  
          await this.sendChecklistToHANA(aChecklist);
          let oModel = oTable.getModel("CheckCreRemark_Model");
          oModel.setProperty("/", [{ Remark: "" }]); // Ensure empty "Remark" field
          oTable.getModel().refresh();
  
          if (oTable.getItems().length > 0) {
            let oDefaultItem = oTable.getItems()[0];
            let oDefaultInput = oDefaultItem.getCells()[0];
            oDefaultInput.setValue("");
          }
          this.CheckCre_Dialog.close();
  
          console.log(aChecklist);
        },
  
  
        sendChecklistToHANA: async function (aChecklist) {
          let oModel = oView.getModel();
          let oBindListSP = oModel.bindList("/ChecklistCreation");
  
          aChecklist.forEach(function (checklistItem) {
            oBindListSP.create(checklistItem);
          });
  
          await this.filterCheckList(sVehicleType);
  
        },
  
        onChecklistFragmentCancel: function () {
          if (this.CheckCre_Dialog) {
  
            this.CheckCre_Dialog.close();
          }
        },
  
        onPressDelete: function () {
          this.toggleCheckCreationBtns(false);
          this.byId("CheckCre_table").setMode('MultiSelect');
        },
  
        toggleCheckCreationBtns: function (bool) {
          const addBtn = this.byId("CheckCre_create");
          const deleteBtn = this.byId("CheckCre_delete");
          const confirmDelBtn = this.byId("CheckCre_Confirm");
          const cancelDelBtn = this.byId("CheckCre_Cancel");
  
          addBtn.setVisible(bool);
          deleteBtn.setVisible(bool);
          confirmDelBtn.setVisible(!bool);
          cancelDelBtn.setVisible(!bool);
        },
  
        onPressCancel: function () {
          this.byId("CheckCre_table").setMode('None');
          this.toggleCheckCreationBtns(true);
        },
  
        removeRow: function (oEvent) {
  
          const oTable = oView.byId("CheckCre_Frag_Table");
  
          const oModel = oTable.getModel("CheckCreRemark_Model");
  
          const oItem = oEvent.getSource().getParent();
          let iIndex = oTable.indexOfItem(oItem);
  
          let aData = oModel.getProperty("/");
  
          aData.splice(iIndex, 1);
  
          oModel.setProperty("/", aData);
  
          oTable.getModel('CheckCreRemark_Model').refresh();
        },
  
        beforeopenCreateDialog: function (oEvent) {
          let oModel = oView.getModel('CheckCreRemark_Model');
          console.log(oModel);
          oModel.setProperty('/', [{ "Remarks": "" }]);
          oModel.refresh();
  
        },
  
        onConfirmDelete: function () {
          let that = this;
          const oTable = this.byId("CheckCre_table");
          const oSelectedItems = oTable.getSelectedItems();
  
          if (oSelectedItems.length === 0) {
            sap.m.MessageToast.show("No item selected for deletion.");
            return;
          }
  
          sap.m.MessageBox.confirm(
            "Are you sure you want to delete the selected fields?",
            {
              actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
              onClose: async function (sAction) {
                if (sAction === sap.m.MessageBox.Action.OK) {
                  sap.ui.core.BusyIndicator.show(0);
  
                  try {
                    let oModel3 = that.getOwnerComponent().getModel(); // OData model
                    let aFilters = [];
  
                    // Extract VehicleDefinition and Remarks from selected items
                    oSelectedItems.forEach(oItem => {
                      let oContext = oItem.getBindingContext("checkListModel");
                      let oData = oContext.getObject();
  
                      let oFilter1 = new sap.ui.model.Filter("VehicleType", sap.ui.model.FilterOperator.EQ, oData.VehicleType);
                      let oFilter2 = new sap.ui.model.Filter("Remarks", sap.ui.model.FilterOperator.EQ, oData.Remarks);
  
                      aFilters.push(new sap.ui.model.Filter({
                        filters: [oFilter1, oFilter2],
                        and: true
                      }));
                    });
  
                    // Create combined filter
                    let oCombinedFilter = new sap.ui.model.Filter({
                      filters: aFilters,
                      and: false
                    });
  
                    let oBindList3 = oModel3.bindList("/ChecklistCreation");
  
                    // Fetch matching records from OData
                    let aContexts = await oBindList3.filter(oCombinedFilter).requestContexts();
  
                    // Delete each matched entry from OData
                    for (let i = 0; i < aContexts.length; i++) {
                      await aContexts[i].delete();
                    }
  
                    // Refresh data
                    oModel3.refresh();
  
                    await that.filterCheckList(sVehicleType);
                    that.byId("CheckCre_table").getBinding("items").refresh();
  
                    sap.m.MessageToast.show("Item(s) Deleted Successfully.");
  
                    // Reset selection mode
                    that.toggleCheckCreationBtns(true);
                    oTable.setMode("None");
  
                  } catch (oError) {
                    sap.m.MessageToast.show("Error occurred while deleting selected item(s).");
                    console.error("Deletion Error:", oError);
                  } finally {
                    
                    sap.ui.core.BusyIndicator.hide();
                  }
                } else {
                  that.onPressCancel();
                }
              }
            }
          );
        }
  
      });
    }
  );
  
  