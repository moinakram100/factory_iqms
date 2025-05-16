sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageBox",
        "sap/m/MessageToast"
    ],
    function (BaseController, JSONModel, MessageBox, MessageToast) {
        "use strict";
        let oView;

        return BaseController.extend("com.ingenx.qms.config.controller.BayAllocation", {
            onInit: function () {
                oView = this.getView();
               
                let oModel = new JSONModel({
                    tableData: []
                });
                this.getView().setModel(oModel, "bayModel");
            },

            toggleBayAllocationButtons: function (bool) {
                this.byId("BayAllocation_Create").setVisible(bool);
                this.byId("BayAllocation_Delete").setVisible(bool);
                this.byId("BayAllocation_Confirm").setVisible(!bool);
                this.byId("BayAllocation_Cancel").setVisible(!bool);
                if (bool) {

                    this.byId("gantry_id").setValue(null);
                    this.byId("BayAllocation_id").setValue(null);
                }
            },

            onPressDelete: function () {
                this.toggleBayAllocationButtons(false);
                this.byId('tableMapping1').setMode('MultiSelect');
            },

            onPressCancel: function () {
                this.toggleBayAllocationButtons(true);
                this.byId('tableMapping1').setMode('None');
                this.byId("BayAllocation_Submit").setVisible(false);

                // Hide the table explicitly
                this.byId("tableMapping").setVisible(false);

                // Clear the table data
                let oModel = this.getView().getModel("bayModel");
                oModel.setProperty("/tableData", []);
            },

            onConfirmDelete: function (oEvent) {
                const oTable = this.byId("tableMapping1");

                let aSelectedItems = oTable.getSelectedItems();
                // return;
                console.log("Selected Items:", aSelectedItems);

                if (!aSelectedItems || aSelectedItems.length === 0) {
                    sap.m.MessageBox.warning("Please select at least one Bay");
                    return;
                }

                sap.m.MessageBox.confirm("Are you sure you want to delete the selected Bay(s)?", {
                    onClose:async function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.OK) {
                            sap.ui.core.BusyIndicator.show(0);

                            try {
                                const oModel = this.getOwnerComponent().getModel(); // Ensure you're using the correct model reference
                                let aPaths = aSelectedItems.map(oItem => oItem.getBindingContext().getPath());

                                // Remove selected items using binding contexts
                                aPaths.forEach(sPath => {
                                    oModel.delete(sPath); // Get context for each path

                                });
                                // Submit batch deletion request
                                await oModel.submitBatch("$auto");
                                sap.m.MessageToast.show("Bay(s) Deleted Successfully.")

                                this.byId('tableMapping1').setMode('None');
                                this.toggleBayAllocationButtons(true);

                            } catch (oError) {
                                sap.m.MessageToast.show("Error occurred while deleting selected item(s).");
                                console.error("Deletion Error:", oError);
                            } finally {
                                sap.ui.core.BusyIndicator.hide();
                            }
                         
                        }else {
                            this.onPressCancel();
                        }
                    }.bind(this)
                });
            },

            onSubmit: function () {

                const oTable = this.byId("tableMapping");
                let gantryName;
                let BayId;
                let duplicateFound = false; // Flag to track if a duplicate is found

                const oTable1 = this.byId("tableMapping1");
                // const dataModel = oTable1.getModel("dataModel");
                // const aData1 = dataModel.getData();
                const aData1 = oTable1.getItems().map(item => item.getBindingContext().getObject());
                const bayModel = oTable.getModel("bayModel");
                const tempData = bayModel.getProperty("/tableData");
                let duplicateIds = [];
                for (let i = 0; i < tempData.length; i++) {

                    let BayId = tempData[i].BayId;
                    let Material = tempData[i].Material;
                    if (BayId === "" || Material === "") {
                        MessageToast.show('Please fill all the fields');
                        return
                    }
                }
                tempData.forEach(function (data) {
                    gantryName = data.GantryName;
                    BayId = data.BayId;

                    console.log("Gantry Name:", gantryName);
                    console.log("BayId:", BayId);

                    const matchingDataArray = aData1.filter(function (item) {
                        return item.GantryName === gantryName;
                    });

                    matchingDataArray.forEach(function (matchingData) {
                        console.log("Matching BayId:", matchingData.BayId);

                        if (matchingData.BayId === BayId) {
                            duplicateFound = true;

                            duplicateIds.push(BayId);
                        }
                    });
                });
                if (!duplicateFound) { // Only execute if no duplicates were found
                    let oModel3 = this.getOwnerComponent().getModel();
                    let oBindListSP = oModel3.bindList("/BayAllocation");

                    for (let i = 0; i < tempData.length; i++) {
                        oBindListSP.create(tempData[i]);
                    }

                    // this.fetchBayAllocationData();
                    oTable.setVisible(false);
                    oModel3.refresh();
                    MessageToast.show("Bay(s) created successfully.")

                    // Clear the bayModel data after submission
                    bayModel.setProperty("/tableData", []);
                    this.byId("BayAllocation_Submit").setVisible(false);
                    this.toggleBayAllocationButtons(true);
                    oTable.setVisible(false);
                } else {
                    sap.m.MessageBox.show(`${duplicateIds.join(',')}` + " " + "BayId Already Exists", {
                        title: "Failed",
                        icon: sap.m.MessageBox.Icon.WARNING,
                        actions: [sap.m.MessageBox.Action.OK],
                    });
                }
            },

            onAddPress: function () {

                const sValue = this.getView().byId("BayAllocation_id").getValue();

                const gantryValue = this.getView().byId("gantry_id").getValue();

                if (!sValue && !gantryValue) {
                    sap.m.MessageBox.warning("Please Enter Gantry Name and No of Bays");
                    return;
                } else if (!sValue) {
                    sap.m.MessageBox.warning("Please enter No of Bays");
                    return;
                } else if (!gantryValue) {
                    sap.m.MessageBox.warning("Please enter Gantry Name");
                    return;
                }
                const addMap = this.byId("BayAllocation_Create");
                const delMap = this.byId("BayAllocation_Delete");
                const canDelMap = this.byId("BayAllocation_Cancel");
                const submit = this.byId("BayAllocation_Submit")

                delMap.setVisible(false);
                canDelMap.setVisible(true);
                addMap.setVisible(false);
                submit.setVisible(true);

                // Make the table visible
                const oTable = this.byId("tableMapping");
                oTable.setVisible(true);

                const obayModel = oView.getModel("bayModel");

                // Clear existing data before creating new entries
                obayModel.setProperty("/tableData", []);

                const iNumRows = parseInt(sValue);
                const oBinding = oView.byId("tableMapping1").getBinding("items");
                const aContexts = oBinding.getContexts();

                let iLastBayNumber = 0;
                if (aContexts.length > 0) {
                    let filteredContexts = aContexts.filter(function (context) {
                        return context.getObject().GantryName === gantryValue;
                    });

                    if (filteredContexts.length > 0) {
                        let lastBayLabel = filteredContexts[filteredContexts.length - 1].getObject().BayLabel;
                        iLastBayNumber = parseInt(lastBayLabel.split(" ")[1]) || 0;
                    }
                }

                let aNewData = [];
                for (let i = 0; i < iNumRows; i++) {
                    aNewData.push({
                        GantryName: gantryValue,
                        BayLabel: "Bay " + (iLastBayNumber + i + 1),
                        BayId: "",
                        Material: ""
                    });
                }

                let aExistingData = obayModel.getProperty("/tableData") || [];
                aExistingData = aExistingData.concat(aNewData);
                obayModel.setProperty("/tableData", aExistingData);
            }

        });
    }
);