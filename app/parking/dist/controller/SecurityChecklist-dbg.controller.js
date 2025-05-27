

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, MessageBox) {
        "use strict";
        let oRouter;
        let aSelectedData = null;
        let oView;


        return Controller.extend("com.ingenx.qms.parking.controller.SecurityChecklist", {
            onInit: function () {
                oView = this.getView();

                oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                let oJsonModel = new sap.ui.model.json.JSONModel({});
                this.getOwnerComponent().setModel(oJsonModel,"data");


                oRouter.getRoute("RouteHome").attachMatched(this._onRouteMatched, this);

            },

            onRadioSelect: function () {
                let radioButton = oView.byId("radioGroup").getSelectedButton();

                if (radioButton.getText() === "Parking List") {

                    oRouter.navTo("RouteParkinglist");

                }

            },
            _onRouteMatched () {
                let radioButtonGroup = oView.byId("radioGroup");
                console.log(radioButtonGroup);
                if( radioButtonGroup){
                    radioButtonGroup.setSelectedIndex(0);
                }
                

            },

            onCheckListPress: function () {

                // debugger
                const radioButton = oView.byId("radioGroup").getSelectedButton();
                console.log("radio", radioButton);

                const parkingNo = oView.byId("_InputParkingNo").getValue();
                const parkingGate = oView.byId("parkingGate_id");
                const parkingArea = oView.byId("parkingArea_id");
                const ParkingNoRefresh = oView.byId("_InputParkingNo");
                const RemarkId = oView.byId("remark_id");

                const oRouter = this.getOwnerComponent().getRouter();
                if (radioButton.getText() === "Parking No") {
                    if (!parkingNo) {
                        sap.m.MessageBox.warning("Please enter Parking Number", {
                            title: "Warning",
                            actions: [sap.m.MessageBox.Action.OK]
                        });
                        return;
                    }
                    if (!parkingArea.getValue() && !parkingGate.getValue()) {

                        MessageBox.warning("Please fill Parking No and Enter");
                        return

                    }

                    oRouter.navTo("RouteVehicleChecklist");
                    setTimeout(function () {
                        parkingGate.setValue("");
                        parkingArea.setValue("");
                        ParkingNoRefresh.setValue("");
                        RemarkId.setValue("");
                    }, 700);
                } else {

                    // oRouter.navTo("ParkingList");

                }

            },
            onPakingInputSubmit: async function (oEvent) {
                let sParkingNo = oEvent.getSource().getValue().trim();
            
                // Validate if Parking No. is empty
                if (!sParkingNo) {
                    MessageBox.error("Fill the Parking No.");
                    return;
                }
            
                // Remove all whitespaces and leading zeros, then pad with zeros to make 10 digits
                sParkingNo = sParkingNo.replace(/\s+/g, '').replace(/^0+/, '');
                sParkingNo = sParkingNo.padStart(10, '0'); // Adds leading zeros to make total 10 characters
            
                // Validate if it's exactly 10 digits
                if (!/^\d{10}$/.test(sParkingNo)) {
                    MessageBox.error("Please enter a valid 10-digit Parking No.");
                    return;
                }
            
                if (sParkingNo) {
                    let oModel = this.getOwnerComponent().getModel();
                    let sPath = `/getParkingNoData(ParkingNo='${sParkingNo}')`;
            
                    // Create BusyDialog instance if not already created
                    if (!this._oBusyDialog) {
                        this._oBusyDialog = new sap.m.BusyDialog({
                            text: "Fetching Security Related Parking Data...",
                        });
                    }
                    this._oBusyDialog.open();
            
                    try {
                        const oBinding = oModel.bindContext(sPath, null, {});
                        const oData = await oBinding.requestObject();
            
                        if (oData && oData.value && oData.value.length > 0) {
                            let resultObj = oData.value[0];
                            console.log("Parking result", oData.value);
                            aSelectedData = resultObj;
            
                            oView.byId("parkingGate_id").setValue(resultObj.ParkingGate);
                            oView.byId("parkingArea_id").setValue(resultObj.ParkingArea);
                            oView.byId("remark_id").setValue(resultObj.Status);
            
                            let localModel = this.getOwnerComponent().getModel("data");
                            localModel.setProperty("/parkObj", resultObj);
                        } else {
                            oView.byId("parkingGate_id").setValue("");
                            oView.byId("parkingArea_id").setValue("");
                            oView.byId("remark_id").setValue("");
                            MessageBox.information("Parking data not found");
                        }
                    } catch (oError) {
                        console.log("Error fetching Parking data:", oError.message);
                        MessageBox.error(oError.message);
                    } finally {
                        this._oBusyDialog.close();
                    }
                }
            },
            

            onPakingInputSubmit1: async function (oEvent) {
                let sParkingNo = oEvent.getSource().getValue().trim();

                // Validate if Parking No. is empty
                if (!sParkingNo) {
                    MessageBox.error("Fill the Parking No.");
                    return;
                }

                // Remove leading zeros
                sParkingNo = sParkingNo.replace(/^0+/, '');

                // Check if the Parking No. is a 7-digit number and starts with "1"
                if (!/\d{9}$/.test(sParkingNo)) {
                    MessageBox.error("Please enter a 10-digit Parking No");
                    return;
                }
                if (sParkingNo) {
                    let oModel = this.getOwnerComponent().getModel();
                    let sPath = `/getParkingNoData(ParkingNo='${sParkingNo.trim()}')`;

                    // Create BusyDialog instance if not already created
                    if (!this._oBusyDialog) {
                        this._oBusyDialog = new sap.m.BusyDialog({
                            text: "Fetching Security Related Parking Data...",
                        });
                    }
                    this._oBusyDialog.open();

                    try {
                        // Binding context for the OData service call
                        const oBinding = oModel.bindContext(sPath, null, {});

                        // Requesting data from the bound context
                        const oData = await oBinding.requestObject();

                        // Check if data exists and handle accordingly
                        if (oData && oData.value && oData.value.length > 0) {
                            let resultObj = oData.value[0];
                            console.log("Parking result", oData.value);
                            aSelectedData = resultObj;

                            oView.byId("parkingGate_id").setValue(resultObj.ParkingGate);
                            oView.byId("parkingArea_id").setValue(resultObj.ParkingArea);
                            oView.byId("remark_id").setValue(resultObj.Status);

                            let localModel = this.getOwnerComponent().getModel("data");
                            localModel.setProperty("/parkObj", resultObj);
                        } else {
                            oView.byId("parkingGate_id").setValue("");
                            oView.byId("parkingArea_id").setValue("");
                            oView.byId("remark_id").setValue("");
                            MessageBox.information("Parking data not found");
                        }
                    } catch (oError) {
                        console.log("Error:", oError.message);
                        MessageBox.error(oError.message);
                    } finally {
                        // Close BusyDialog in all cases (success or error)
                        this._oBusyDialog.close();
                    }
                }
            },
            onInputLiveChange: function (oEvent) {
                let sValue = oEvent.getSource().getValue();
                let iLength = sValue.length;
                // Remove leading zeros
                sValue = sValue.replace(/^0+/, '');

                // Check if the value is a valid number
                if (isNaN(sValue)) {
                    oEvent.getSource().setValueState("Error");
                    oEvent.getSource().setValueStateText("Please enter a valid number.");
                } else if (iLength > 10) {
                    // Limit input to 10 digits
                    oEvent.getSource().setValue(sValue.slice(0, 7));
                // } else if (iLength < 10 && iLength > 0) {
                //     // Show error if less than 10 digits
                //     oEvent.getSource().setValueState("Error");
                //     oEvent.getSource().setValueStateText("Enter exactly 10 digits.");
                } else {
                    // Clear error state when input is valid
                    oEvent.getSource().setValueState("None");
                    oEvent.getSource().setValueStateText("");
                }
            },
            onParkOut: function () {
                let ParkNo = oView.byId("_InputParkingNo").getValue();
                console.log(aSelectedData);
                if (!aSelectedData) {
                    MessageBox.warning("Please Select Parking No.")
                    return
                }
                let status = aSelectedData.Status;
                if( status === 'Park-Out'){
                    sap.m.MessageToast("Vehicle is already Parked-Out.");
                    return;
                }

                let oModel = this.getOwnerComponent().getModel(); // OData V4 Model
                let oListBinding = oModel.bindList("/Park_headerSet2"); // Bind list to the entity set

                let sParkingNo = aSelectedData.ParkingNo; // Ensure 'ParkingNo' is the key field
                let that = this;
                // Confirmation Dialog
                sap.m.MessageBox.confirm(
                    "Are you sure you want to Park-Out ?", {
                    icon: sap.m.MessageBox.Icon.QUESTION,
                    title: "Confirm Park-Out",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function (sAction) {
                        if (sAction === sap.m.MessageBox.Action.YES) {
                            // Create a filter for ParkingNo
                            const oFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, sParkingNo);

                            // Request the binding context
                            oListBinding.filter(oFilter).requestContexts().then(async function (aContexts) {

                                if (aContexts.length) {
                                    let oItemContext = aContexts[0];
                                    if (oItemContext.getProperty("ParkingNo") === sParkingNo) {
                                        // Update the Status field
                                        oItemContext.setProperty("Status", "Park-Out");              
                                        
                                    }
                                }
                                
                                sap.m.MessageBox.success("Vehicle Parked Out.");
                                oView.byId("parkingGate_id").setValue("");
                                oView.byId("parkingArea_id").setValue("");
                                oView.byId("remark_id").setValue("");
                            }).catch(function (oError) {
                                console.log("Error in park-Out ", oError);

                                sap.m.MessageBox.error("Error in Parking out.");
                            });
                        }
                    }.bind(this)
                }
                );


            },

            // onParkOut: function () {
            //     let ParkNo = oView.byId("_InputParkingNo").getValue()

            //     var getModelData = []
            //     let oModel2 = new sap.ui.model.json.JSONModel();
            //     oView.setModel(oModel2, "dataModel");
            //     let oModel3 = this.getOwnerComponent().getModel();
            //     let oBindList = oModel3.bindList("/SecurityStatus");
            //     oBindList.requestContexts(0, Infinity).then(function (aContexts) {
            //         aContexts.forEach(function (oContext) {
            //             getModelData.push(oContext.getObject());
            //         });
            //         oModel2.setData(getModelData);
            //         let parkOutStatus = 20

            //         let filterData = getModelData.filter(function (data) {
            //             return data.StatusNo === parkOutStatus
            //         })

            //         let StatusText = filterData[0].StatusText

            //         let oModel = this.getOwnerComponent().getModel();
            //         let oBindList3 = oModel.bindList("/parkingNoCreation");
            //         let aFilter = new sap.ui.model.Filter("Id", sap.ui.model.FilterOperator.EQ, ParkNo);

            //         oBindList3.filter(aFilter).requestContexts().then(function (aContexts) {
            //             if (aContexts.length > 0) {
            //                 let currentStatus = aContexts[0].getProperty("Status");
            //                 if (currentStatus === "Security Pending" || currentStatus === "Security Failed" || currentStatus === "Security Cleared") {
            //                     aContexts[0].setProperty("Status", StatusText);
            //                 }
            //             }
            //             sap.m.MessageBox.show("Vehicle Park-Out", {
            //                 title: "Success",
            //                 icon: sap.m.MessageBox.Icon.SUCCESS,
            //                 actions: [sap.m.MessageBox.Action.OK],
            //             });
            //         });

            //     }.bind(this))


            // }
        });
    });
