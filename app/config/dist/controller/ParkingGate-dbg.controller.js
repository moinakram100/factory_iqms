

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
   "com/ingenx/qms/config/utils/helperFunctions"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, helperFunctions) {
        "use strict";

        let oView;

        return Controller.extend("com.ingenx.qms.config.controller.ParkingGate", {
            onInit: function () {
                // oView to use everywhere
                oView = this.getView();

            },

            onAddParkingGate: function () {
                helperFunctions._openValueHelpDialog(this, 'addParkingGate_dialog', 'com.ingenx.qms.config.fragments.AddParkingGate');

            },

            onCloseParkingGate: function () {
                this.getView().byId("parkgate_frag_id").setValue("");
                this.getView().byId("parkgate_frag_descrip_id").setValue("");
                this.addParkingGate_dialog.close();
            },
            onDeleteParkingGate : function () {
                this.byId('tableParkingGate').setSelectionMode('MultiToggle');
                this.toggleParkingGateBtns(false);

            },


            onSubmitParkingGate: function () {

                const parkingGate = oView.byId("parkgate_frag_id").getValue().trim();
                const description = oView.byId("parkgate_frag_descrip_id").getValue().trim();

                // Check if both fields are filled
                if (!parkingGate || !description) {
                    sap.m.MessageBox.error("Please enter both Gate No and Description.");
                    return;
                }

                const oTable = this.getView().byId("tableParkingGate");
                const oBinding = oTable.getBinding("rows");
                const aContexts = oBinding.getContexts();
                const aItems = aContexts.map(function (oContext) {
                    return oContext.getObject();
                });

                const payload = {
                    Gate_no: parkingGate,
                    Description: description
                };

                // Check for existing Gate_no and Description
                let gateExists = aItems.some(item => item.Gate_no.toLowerCase() === parkingGate.toLowerCase());
                let descriptionExists = aItems.some(item => item.Description.toLowerCase() === description.toLowerCase());

                if (gateExists) {
                    sap.m.MessageBox.warning("Gate no. Number already exists.");
                    return;
                }

                if (descriptionExists) {
                    sap.m.MessageBox.warning("Description already exists.");
                    return;
                }

                let oModel = oView.getModel();

                let oBindList = oModel.bindList("/AddParkingGate");
                oBindList.create(payload, true);
                this.onCancelParkingGate();
                oModel.refresh();

                oView.byId("parkgate_frag_id").setValue("");
                oView.byId("parkgate_frag_descrip_id").setValue("");

                this.addParkingGate_dialog.close();
            },


            onSubmitParkingArea: async function () {

                const parkingArea = oView.byId("parkarea_frag_id").getValue().trim();
                const parkAreaDesc = oView.byId("parkarea_frag_descrip_id").getValue().trim();

                if (!parkingArea || !parkAreaDesc) {
                    sap.m.MessageBox.error("Area Number and Description cannot be empty.");
                    return;
                }

                try {
                    let oModel = this.getOwnerComponent().getModel();
                    let oTable = oView.byId("tableParkingArea"); // Get the table
                    let oBinding = oTable.getBinding("rows");  // Get binding of the table
                    let aContexts = oBinding.getCurrentContexts();
                    let aItems = aContexts.map(context => context.getObject());

                    // Check for existing Gate_no and Description
                    let areaExists = aItems.some(item => item.Area_no.toLowerCase() === parkingArea.toLowerCase());
                    let descriptionExists = aItems.some(item => item.Description.toLowerCase() === parkAreaDesc.toLowerCase());

                    if (areaExists) {
                        sap.m.MessageBox.warning("Area Number already exists.");
                        return;
                    }

                    if (descriptionExists) {
                        sap.m.MessageBox.warning("Description already exists.");
                        return;
                    }

                    let payload = {
                        Area_no: parkingArea,
                        Description: parkAreaDesc
                    };

                    // Create new entry
                    let oBindList = oModel.bindList("/AddParkingArea");
                    oBindList.create(payload, true);
                    oModel.refresh();

                    // Clear input fields
                    oView.byId("parkarea_frag_id").setValue("");
                    oView.byId("parkarea_frag_descrip_id").setValue("");
                    this.addParkingArea_dialog.close();

                } catch (error) {
                    sap.m.MessageBox.error("An error occurred while submitting the parking area: " + error.message);
                }
            },

            onConfirmDeleteParkingGate: function () {

                let that = this;
                let oTable = this.byId("tableParkingGate");
                let aSelectedIndices = oTable.getSelectedIndices(); // Get selected row indices

                if (aSelectedIndices.length === 0) {
                    sap.m.MessageToast.show("No Item selected for deletion.");
                    return;
                }

                sap.m.MessageBox.confirm(
                    "Are you sure you want to delete the selected Item(s)?", {
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    onClose: async function (sAction) {
                        if (sAction === sap.m.MessageBox.Action.OK) {
                            sap.ui.core.BusyIndicator.show(0);

                            try {
                                let oBinding = oTable.getBinding("rows"); // Get table binding

                                if (!oBinding) {
                                    sap.m.MessageToast.show("Table binding not found.");
                                    return;
                                }
                                // Get only the selected contexts
                                let aSelectedContexts = aSelectedIndices.map(index => oTable.getContextByIndex(index));

                                if (aSelectedContexts.length === 0) {
                                    sap.m.MessageToast.show("No valid Item selected.");
                                    return;
                                }

                                // Batch delete all selected items
                                await Promise.all(aSelectedContexts.map(context => context.delete()));
                                // oBinding.refresh();

                                sap.m.MessageToast.show(aSelectedContexts.length === 1 ? "Selected Item Deleted successfully." : "Selected Items Deleted succesfully");
                            } catch (oError) {
                                sap.m.MessageToast.show("Error occurred while deleting selected Item(s).");
                                console.error("Deletion Error:", oError);
                            } finally {
                                sap.ui.core.BusyIndicator.hide();
                                that.onCancelParkingGate();

                            }
                        } else {
                            that.onCancelParkingGate();

                        }
                    }
                });
            },
            toggleParkingGateBtns: function (bool) {
                const addbtn = this.byId("addParkingGate");
                const deleteBtn = this.byId("deleteParkingGate");
                const confirmDelBtn = this.byId("ConfirmParkGate");
                const cancelBtn = this.byId("cancelParkingGate");

                addbtn.setVisible(bool);
                deleteBtn.setVisible(bool);
                confirmDelBtn.setVisible(!bool);
                cancelBtn.setVisible(!bool);

            },
            onCancelParkingGate : function () {
                this.byId("tableParkingGate").setSelectionMode('None');

                this.toggleParkingGateBtns(true);

            },

            onAddParkingArea: function () {

                helperFunctions._openValueHelpDialog(this, 'addParkingArea_dialog', 'com.ingenx.qms.config.fragments.AddParkingArea');

            },

            onCloseParkingArea: function () {
                oView.byId("parkarea_frag_id").setValue("");
                oView.byId("parkarea_frag_descrip_id").setValue("");
                this.addParkingArea_dialog.close();
            },

            onDeleteAreaMap: function () {
                this.toggleParkingAreaBtns(false)
                this.byId('tableParkingArea').setSelectionMode('MultiToggle');

            },
      
            toggleParkingAreaBtns: function (bool) {
                const addbtn = this.byId("addParkingArea");
                const deleteBtn = this.byId("deleteParkingArea");
                const confirmDelBtn = this.byId("ConfirmDeleteParkArea");
                const cancelBtn = this.byId("cancelParkArea")


                addbtn.setVisible(bool);
                deleteBtn.setVisible(bool);
                confirmDelBtn.setVisible(!bool);
                cancelBtn.setVisible(!bool);

            },

            onConfirmDeleteParkingArea: function () {
                let that = this;
                let oTable = this.byId("tableParkingArea");
                let aSelectedIndices = oTable.getSelectedIndices(); // Get selected row indices

                if (aSelectedIndices.length === 0) {
                    sap.m.MessageToast.show("No Item selected for deletion.");
                    return;
                }

                sap.m.MessageBox.confirm(
                    "Are you sure you want to delete the selected Item(s)?", {
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    onClose: async function (sAction) {
                        if (sAction === sap.m.MessageBox.Action.OK) {
                            sap.ui.core.BusyIndicator.show(0);

                            try {
                                let oBinding = oTable.getBinding("rows"); // Get table binding

                                if (!oBinding) {
                                    sap.m.MessageToast.show("Table binding not found.");
                                    return;
                                }

                                let aSelectedContexts = aSelectedIndices.map(index => oTable.getContextByIndex(index));

                                if (aSelectedContexts.length === 0) {
                                    sap.m.MessageToast.show("No valid Item selected.");
                                    return;
                                }

                                // Batch delete all selected items
                                await Promise.all(aSelectedContexts.map(context => context.delete()));
                                // oBinding.refresh();
                                console.log(aSelectedContexts.length);


                                sap.m.MessageToast.show(aSelectedContexts.length === 1 ? 'Selected Item Deleted successfully.' : 'Selected Items Deleted succesfully');
                            } catch (oError) {
                                sap.m.MessageToast.show("Error occurred while deleting selected Item(s).");
                                console.error("Deletion Error:", oError);
                            } finally {
                                sap.ui.core.BusyIndicator.hide();
                                that.onCancelParkingArea();
                            }
                        } else {
                            that.onCancelParkingArea();
                        }
                    }
                });
            },

            onCancelParkingArea: function () {
                this.byId("tableParkingArea").setSelectionMode('None');

                this.toggleParkingAreaBtns(true);
            },


        });
    });
