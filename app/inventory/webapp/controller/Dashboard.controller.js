
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    function (Controller, Fragment) {
        "use strict";
        let getModelData = []
        let BayAllocationData = []

        return Controller.extend("com.ingenx.qms.inventory.controller.Dashboard", {
            onInit: function () {
                let oModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModel, "dataModel");

                let oModel3 = this.getOwnerComponent().getModel();
                let oBindList3 = oModel3.bindList("/park_itemSet");

                oBindList3.requestContexts(0, Infinity).then(function (aContexts) {
                    aContexts.forEach(function (oContext) {
                        getModelData.push(oContext.getObject());
                    });

                    let today = new Date().toISOString().split('T')[0];

                    getModelData = getModelData.filter(item => item.Date === today);

                    oModel.setData(getModelData);

                    let newModel = new sap.ui.model.json.JSONModel(getModelData);
                    this.getView().setModel(newModel, "newModel");

                    let securityLoadedCount = getModelData.filter(item => item.Status === "Loaded").length;
                    let securityPendingCount = getModelData.filter(item => item.Status === "Security Pending").length;
                    let securityFailedCount = getModelData.filter(item => item.Status === "Security Failed").length;

                    let oCountModel = new sap.ui.model.json.JSONModel({
                        securityLoadedCount: securityLoadedCount,
                        securityPendingCount: securityPendingCount,
                        securityFailedCount: securityFailedCount
                    });
                    this.getView().setModel(oCountModel, "countModel");
                    console.log("getModel Dtaat", getModelData);
                    

                    // this._createButtonsFromModel();
                    this._getData2();
                }.bind(this));
            },


            // _createButtonsFromModel: function () {
            //     console.log("my finally data", getModelData);

            //     var oFlexBox = this.byId("_IDGenVBox1");
            //     getModelData.forEach(function (item) {
            //         var button = new sap.m.Button({
            //             type: "Ghost",
            //             icon: "sap-icon://shipping-status",
            //             press: this.onVehicleButtonPress.bind(this)
            //         });
            //         button.addStyleClass("customButton");
            //         button.addCustomData(new sap.ui.core.CustomData({
            //             key: "vehicleNumber",
            //             value: item.vehicleNumber
            //         }));


            //         switch (item.Status) {
            //             case "Security Cleared":
            //                 button.addStyleClass("clearStatus");
            //                 break;
            //             case "Security Pending":
            //                 button.addStyleClass("pendingStatus");
            //                 break;
            //             case "Security Failed":
            //                 button.addStyleClass("failedStatus");
            //                 break;
            //             default:
            //                 button.addStyleClass("defaultStatus");
            //                 break;
            //         }

            //         oFlexBox.addItem(button);
            //     }.bind(this));
            // },

            _getData2: function () {
                let oModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModel, "dataModel");
                let oModel3 = this.getOwnerComponent().getModel();
                let oBindList3 = oModel3.bindList("/BayAllocation");

                oBindList3.requestContexts(0, Infinity).then(function (aContexts) {
                    let BayAllocationData = [];

                    aContexts.forEach(function (oContext) {
                        BayAllocationData.push(oContext.getObject());
                    });

                    // Sort based on the numeric value inside BayLabel
                    BayAllocationData.sort((a, b) => {
                        let numA = parseInt(a.BayLabel.replace(/\D/g, ""), 10); // Extract number
                        let numB = parseInt(b.BayLabel.replace(/\D/g, ""), 10);
                        return numA - numB;
                    });

                    oModel.setData(BayAllocationData);
                    console.log("Sorted Data:", BayAllocationData);

                    this._createShapes(BayAllocationData);
                }.bind(this));
            },

            // _createShapes: function (BayAllocationData) {
            //     var vehicleLayout = this.byId("vehicle_layout");

            //     vehicleLayout.removeAllItems();

            //     var gantryNames = {};

            //     BayAllocationData.forEach(function (entry) {
            //         if (!gantryNames.hasOwnProperty(entry.GantryName)) {
            //             gantryNames[entry.GantryName] = [];
            //         }
            //         gantryNames[entry.GantryName].push(entry);
            //     });

            //     console.log("Gantry Names:", gantryNames);

            //     Object.keys(gantryNames).forEach(function (gantryName) {
            //         var aData = gantryNames[gantryName];

            //         var oGroupFlexBox = new sap.m.FlexBox({
            //             direction: "Row",
            //             wrap: "Wrap"
            //         });

            //         oGroupFlexBox.addStyleClass("groupBoxMargin");

            //         var oTitle = new sap.m.Title({
            //             text: gantryName
            //         }).addStyleClass("gantryNameTitle");

            //         oGroupFlexBox.addItem(oTitle);

            //         aData.forEach(function (entry, index) {
            //             var oShape;
            //             var oCircle;

            //             if (index % 2 === 0) {
            //                 oShape = new sap.m.VBox();
            //                 oShape.addStyleClass("arrow");

            //                 oCircle = new sap.m.VBox();
            //                 // oCircle.addStyleClass("circle");

            //                 if(entry.BayLabel==="Bay 1" || entry.BayLabel==="Bay 2" ){
            //                     console.log("even 1 or 2 detected");

            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle failed");
            //                 }
            //                 else if(entry.BayLabel==="Bay 3" || entry.BayLabel==="Bay 4"){
            //                     oCircle.addStyleClass("circle clear");
            //                 }
            //                 else if(entry.BayLabel==="Bay 5" || entry.BayLabel==="Bay 6"){
            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle underloading");
            //                 }
            //                 else if(entry.BayLabel==="Bay 7" || entry.BayLabel==="Bay 8"){
            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle failed");
            //                 }
            //                 else if(entry.BayLabel==="Bay 9" || entry.BayLabel==="Bay 10"){
            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle underloading");
            //                 }
            //                 else if(entry.BayLabel==="Bay 11" || entry.BayLabel==="Bay 12"){
            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle failed");
            //                 }
            //                 else if(entry.BayLabel==="Bay 13" || entry.BayLabel==="Bay 14"){
            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle underloading");
            //                 }
            //                 else if(entry.BayLabel==="Bay 15" || entry.BayLabel==="Bay 16"){
            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle failed");
            //                 }
            //                 else if(entry.BayLabel==="Bay 17" || entry.BayLabel==="Bay 18"){
            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle underloading");
            //                 }

            //                 // if (entry.Status === "Security Pending") {
            //                 //     oCircle.addStyleClass("pending");
            //                 // } else if (entry.Status === "Security Cleared") {
            //                 //     oCircle.addStyleClass("clear");
            //                 // } else {
            //                 //     oCircle.addStyleClass("SecurityFailed");
            //                 // }

            //                 oShape.addItem(oCircle);
            //             } else {
            //                 oShape = new sap.m.VBox();
            //                 oShape.addStyleClass("arrow2");

            //                 oCircle = new sap.m.VBox();
            //                 // oCircle.addStyleClass("circle2");

            //                 if(entry.BayLabel==="Bay 2" || entry.BayLabel==="Bay 1" ){
            //                     console.log("bay 1 or 2 detected");

            //                     oCircle.addStyleClass("circle2 clear"); 
            //                 }
            //                 else if(entry.BayLabel==="Bay 3" || entry.BayLabel==="Bay 4"){
            //                     console.log("bay 3 or 4 detected");

            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle2 failed");
            //                 }
            //                 else if(entry.BayLabel==="Bay 5" || entry.BayLabel==="Bay 6"){
            //                     console.log("bay 5 or 6 detected");

            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle2 underloading");
            //                 }
            //                 else if(entry.BayLabel==="Bay 7" || entry.BayLabel==="Bay 8" ){
            //                     oCircle.addStyleClass("circle2 clear");
            //                 }
            //                 else if(entry.BayLabel==="Bay 10" || entry.BayLabel==="Bay 9" ){
            //                     oCircle.addStyleClass("circle2 clear");
            //                 }
            //                 else if(entry.BayLabel==="Bay 12" || entry.BayLabel==="Bay 11" ){
            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle2 underloading");
            //                 }
            //                 else if(entry.BayLabel==="Bay 13" || entry.BayLabel==="Bay 14" ){
            //                     console.log("bay 13 or 14 detetecd");

            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle2 underloading");
            //                 }
            //                 else if(entry.BayLabel==="Bay 15" || entry.BayLabel==="Bay 16" ){
            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle2 underloading");
            //                 }
            //                 else if(entry.BayLabel==="Bay 17" || entry.BayLabel==="Bay 18" ){
            //                     oCircle = new sap.ui.core.Icon({
            //                         src: "sap-icon://shipping-status"
            //                     }).addStyleClass("circle2 failed");
            //                 }


            //                 // if (entry.Status === "Security Pending") {
            //                 //     oCircle.addStyleClass("pending");
            //                 // } else if (entry.Status === "Security Cleared") {
            //                 //     oCircle.addStyleClass("clear");
            //                 // } else {
            //                 //     oCircle.addStyleClass("SecurityFailed");
            //                 // }

            //                 oShape.addItem(oCircle);
            //             }

            //             oGroupFlexBox.addItem(oShape);
            //         });

            //         vehicleLayout.addItem(oGroupFlexBox);
            //     });

            //     console.log("Shapes created successfully!");
            // },
            //             _createShapes: function (BayAllocationData) {
            //                 var vehicleLayout = this.byId("vehicle_layout");

            //                 vehicleLayout.removeAllItems();

            //                 var gantryNames = {};

            //                 BayAllocationData.forEach(function (entry) {
            //                     if (!gantryNames.hasOwnProperty(entry.GantryName)) {
            //                         gantryNames[entry.GantryName] = [];
            //                     }
            //                     gantryNames[entry.GantryName].push(entry);
            //                 });

            //                 console.log("Gantry Names:", gantryNames);

            //                 Object.keys(gantryNames).forEach(function (gantryName) {
            //                     var aData = gantryNames[gantryName];

            //                     var oGroupFlexBox = new sap.m.FlexBox({
            //                         direction: "Row",
            //                         wrap: "Wrap",
            //                         width: "500%",
            //                         height: "400px" 
            //                     });

            //                     oGroupFlexBox.addStyleClass("groupBoxMargin");

            //                     var oTitle = new sap.m.Title({
            //                         text: gantryName
            //                     }).addStyleClass("gantryNameTitle");

            //                     oGroupFlexBox.addItem(oTitle);

            //                     aData.forEach(function (entry, index) {
            //                         var oShape;
            //                         var oCircle;

            //                         if (index % 2 === 0) {
            //                             oShape = new sap.m.VBox();
            //                             oShape.addStyleClass("arrow");

            //                             oCircle = new sap.ui.core.Icon({
            //                                 src: "sap-icon://shipping-status"
            //                             });

            //                             if (entry.Status === "Bay allocated") {
            //                                 oCircle.addStyleClass("circle clear");
            //                             } else if (entry.Status === "Bay Empty") {
            //                                 oCircle.addStyleClass("circle failed");
            //                             } else if (entry.Status === "underloading") {
            //                                 oCircle.addStyleClass("circle underloading");
            //                             }

            //                             var oLabel = new sap.m.Label({
            //                                 text: entry.Status || "No Bay Info"
            //                             }).addStyleClass("bayLabelStyle");

            //                             oShape.addItem(oCircle);
            //                             oShape.addItem(oLabel);
            //                         } else {
            //                             oShape = new sap.m.VBox();
            //                             oShape.addStyleClass("arrow2");

            //                             oCircle = new sap.ui.core.Icon({
            //                                 src: "sap-icon://shipping-status"
            //                             });

            //                             if (entry.Status === "Bay allocated") {
            //                                 oCircle.addStyleClass("circle2 clear");
            //                             } else if (entry.Status === "Bay Empty") {
            //                                 oCircle.addStyleClass("circle2 failed");
            //                             } else if (entry.Status === "underloading") {
            //                                 oCircle.addStyleClass("circle2 underloading");
            //                             }

            //                             var oLabel = new sap.m.Label({
            //                                 text: entry.Status || "No Bay Info"
            //                             }).addStyleClass("bayLabelStyle");

            //                             oShape.addItem(oCircle);
            //                             oShape.addItem(oLabel);
            //                         }

            //                         oGroupFlexBox.addItem(oShape);
            //                     });

            //                     vehicleLayout.addItem(oGroupFlexBox);
            //                 });

            //                 console.log("Shapes created successfully!");
            //             }
            // ,    

            //changes by anurag for refreshing the truck statuses
            onRefreshPress: function () {
                // Call the function to get new data and refresh the diagram
                this._getData2();
            },

            //changed createshapes function by anurag for loading bay data and coloring bays accordingly
            _createShapes: function (BayAllocationData) {
                var vehicleLayout = this.byId("vehicle_layout");

                vehicleLayout.removeAllItems();

                var gantryNames = {};

                BayAllocationData.forEach(function (entry) {
                    if (!gantryNames.hasOwnProperty(entry.GantryName)) {
                        gantryNames[entry.GantryName] = [];
                    }
                    gantryNames[entry.GantryName].push(entry);
                });

                console.log("Gantry Names:", gantryNames);

                Object.keys(gantryNames).forEach(function (gantryName) {
                    var aData = gantryNames[gantryName];

                    var oGroupFlexBox = new sap.m.FlexBox({
                        direction: "Row",
                        wrap: "Wrap",
                        width: "500%",
                        height: "100px"
                    });

                    oGroupFlexBox.addStyleClass("groupBoxMargin");

                    var oTitle = new sap.m.Title({
                        text: gantryName
                    }).addStyleClass("gantryNameTitle");

                    oGroupFlexBox.addItem(oTitle);

                    aData.forEach(function (entry, index) {
                        let oShape;
                        let oCircle;

                        if (index % 2 === 0) {
                            oShape = new sap.m.VBox();
                            oShape.addStyleClass("arrow");

                            oCircle = new sap.m.VBox();

                            if (entry.Status === "Bay allocated") {
                                oCircle = new sap.ui.core.Icon({
                                    src: "sap-icon://shipping-status"
                                });
                                console.log("Bay Allocated");

                                oCircle.addStyleClass("circle failed"); // Yellow for Bay Empty
                            } else if (entry.Status === "Bay Empty") {
                                console.log("Bay Empty");

                                oCircle.addStyleClass("circle clear"); // Green for Bay Allocated
                            } else if (entry.Status === "underloading") {
                                oCircle = new sap.ui.core.Icon({
                                    src: "sap-icon://shipping-status"
                                });
                                console.log("Bay Undrloading");

                                oCircle.addStyleClass("circle underloading");
                            }

                            let oLabel = new sap.m.Text({
                                text: entry.BayLabel || "No Bay Info"
                            }).addStyleClass("bayLabelStyle1");
                            // Wrap icon and label inside HBox
                        

                            oShape.addItem(oCircle);
                            oShape.addItem(oLabel);
                        
                        } else {
                            oShape = new sap.m.VBox();
                            oShape.addStyleClass("arrow2");

                            oCircle = new sap.m.VBox();

                            if (entry.Status === "Bay allocated") {
                                oCircle = new sap.ui.core.Icon({
                                    src: "sap-icon://shipping-status"
                                });
                                // console.log("Bay Allocated");

                                oCircle.addStyleClass("circle2 failed"); // Yellow for Bay Empty
                            } else if (entry.Status === "Bay Empty") {
                                console.log("Bay Empty");

                                oCircle.addStyleClass("circle2 clear"); // Green for Bay Allocated
                            } else if (entry.Status === "underloading") {
                                oCircle = new sap.ui.core.Icon({
                                    src: "sap-icon://shipping-status"
                                });
                                // console.log("Bay underloading");

                                oCircle.addStyleClass("circle2 underloading");
                            }

                            let oLabel = new sap.m.Text({
                                text: entry.BayLabel || "No Bay Info"
                            }).addStyleClass("bayLabelStyle2");
                    

                            oShape.addItem(oCircle);
                            oShape.addItem(oLabel);
                    
                        }

                        oGroupFlexBox.addItem(oShape);
                    });

                    vehicleLayout.addItem(oGroupFlexBox);
                });

                console.log("Shapes created successfully!");
            },

            onVehicleButtonPress: function (oEvent) {
                var oButton = oEvent.getSource();

                var sVehicleNumber = oButton.getCustomData().find(data => data.getKey() === "vehicleNumber").getValue();

                console.log("Button pressed with vehicle number:", sVehicleNumber);

                if (Array.isArray(getModelData)) {
                    var extractData = getModelData.filter(function (item) {
                        return item.vehicleNumber === sVehicleNumber
                    });
                    console.log("Filtered data:", extractData);
                } else {
                    console.error("Data is not an array:", getModelData);
                }
                this.openVehicleDetailsBox(oEvent, extractData);
            },

            openVehicleDetailsBox: function (oEvent, extractData) {
                var oButton = oEvent.getSource()
                var oView = this.getView();

                if (!this.detailsPopup) {
                    this.detailsPopup = Fragment.load({
                        id: oView.getId(),
                        name: "com.ingenx.qms.dashboard.view.VehicleDetail",
                        controller: this
                    }).then(function (oQuickView) {
                        oView.addDependent(oQuickView);
                        return oQuickView;
                    });
                }
                this.detailsPopup.then(function (oQuickView) {
                    var oModel = new sap.ui.model.json.JSONModel(extractData);
                    oQuickView.setModel(oModel, "pModel");
                    console.log("hello", oQuickView.getModel("pModel").getData());
                    oQuickView.openBy(oButton);
                });
            },



            removeCommas: function (sNumber) {
                if (!sNumber) {
                    return "";
                }
                return sNumber.replace(/,/g, "");
            },

        });
    });