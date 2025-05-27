
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageBox, Filter, FilterOperator, JSONModel) {
    "use strict";

    let sloc;            // Holds selected ParkingNo
    let aParkItemData;   // Holds the entire list from park_itemSet (sorted)
    let aFilteredData;   // Holds data filtered by ParkingNo
    let aSecurityStatus; // Holds the complete SecurityStatus data

    return Controller.extend("com.ingenx.qms.config.controller.ParkingStatus", {
        onInit: function () {
            // Initialize status model
            let oStatusModel = new JSONModel({
                items: []
            });
            this.getView().setModel(oStatusModel, "statusModel");
            this.getParkingStatus();

           
        },

        getParkingStatus : function(){
             // Load both park_itemSet and SecurityStatus data when the controller initializes
             this._loadParkItemData();
             this._loadSecurityStatusData();

        },

        /**
         * Loads all SecurityStatus data and stores it
         */
        _loadSecurityStatusData: function() {
            let oODataModel = this.getOwnerComponent().getModel();
            let oStatusBinding = oODataModel.bindList("/SecurityStatus");

            oStatusBinding.requestContexts(0, Infinity).then(function(aContexts) {
                aSecurityStatus = aContexts.map(function(oContext) {
                    return oContext.getObject();
                });
                
                // Sort by MsgNo
                aSecurityStatus.sort(function(a, b) {
                    return parseInt(a.MsgNo) - parseInt(b.MsgNo);
                });
                
                console.log("Loaded SecurityStatus:", aSecurityStatus);
            }).catch(function(oError) {
                console.error("Error loading SecurityStatus:", oError);
                MessageBox.error("Failed to load status data.");
            });
        },

        /**
         * Updates the status dropdown based on current status
         * @param {string} currentStatus - The current status text
         */
        _updateStatusDropdown: function(currentStatus) {
            // Find the MsgNo for the current status
            let currentStatusObj = aSecurityStatus.find(function(status) {
                return status.MessageText === currentStatus;
            });

            if (!currentStatusObj) {
                console.error("Current status not found in SecurityStatus list");
                return;
            }

            let currentMsgNo = parseInt(currentStatusObj.MsgNo);

            // Filter status options to only show statuses with lower MsgNo
            let availableStatuses = aSecurityStatus.filter(function(status) {
                return parseInt(status.MsgNo) < currentMsgNo;
            });

            // Update the status model
            let oStatusModel = this.getView().getModel("statusModel");
            oStatusModel.setData({
                items: availableStatuses
            });
        },

        // Your existing _loadParkItemData function remains the same
        _loadParkItemData: function () {
            let oModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oModel, "parkItemModel");

            let oODataModel = this.getOwnerComponent().getModel();
            // let oListBinding = oODataModel.bindList("/park_itemSet");
            let oListBinding = oODataModel.bindList("/Park_headerSet2");  // as pe new chnages status is in header table

            let that = this;

            oListBinding.requestContexts(0, Infinity).then(function (aContexts) {
                aParkItemData = aContexts.map(function (oContext) {
                    return oContext.getObject();
                });

                aParkItemData.sort(function (a, b) {
                    return a.ParkingNo.localeCompare(b.ParkingNo);
                });

                oModel.setData(aParkItemData);
                console.log("Sorted park_headerSSet2 Data:", aParkItemData);
            }).catch(function (oError) {
                console.error("Error loading Park_headerSet2:", oError);
                MessageBox.error("Failed to load data from parking data.");
            });
        },

        // Modified onParkingNoClose to update status dropdown
        onParkingNoClose: function (oEvent) {
            let oSelectedItem = oEvent.getParameter("selectedItem");
            oEvent.getSource().getBinding("items").filter([]);

            if (!oSelectedItem) {
                return;
            }

            let sSelectedParkingNo = oSelectedItem.getTitle();
            this.byId("parking_id").setValue(sSelectedParkingNo);
            sloc = sSelectedParkingNo;

            aFilteredData = aParkItemData.filter(function (data) {
                return data.ParkingNo === sloc;
            });

            if (aFilteredData.length > 0) {
                var sStatus = aFilteredData[0].Status;
                this.getView().byId("remark_id").setValue(sStatus);
                
                // Update status dropdown based on current status
                this._updateStatusDropdown(sStatus);
            }
        },

        // Rest of your existing functions remain the same
        onParkingNo: function () {
            var oView = this.getView();
            if (!this._oParkingDialog) {
                this._oParkingDialog = sap.ui.xmlfragment(
                    oView.getId(),
                    "com.ingenx.qms.config.fragments.ParkingNo",
                    this
                );
                oView.addDependent(this._oParkingDialog);
            }
            this._oParkingDialog.open();
        },

        onParkingNoSearch: function (oEvent) {
            console.log("called fragment search");
            
            let sQuery = oEvent.getParameter("value");
            let oFilter = new Filter("ParkingNo", FilterOperator.Contains, sQuery);
            let oSelectDialog = this.byId("ParkingNo");
            oSelectDialog.getBinding("items").filter([oFilter]);
        },

        onUpdate: function () {
            let sParkingNo = this.getView().byId("parking_id").getValue();
            let oStatusItem = this.getView().byId("statusDropdown").getSelectedItem();

            if (!sParkingNo || !oStatusItem) {
                MessageBox.warning("Please select a Parking Number and Status to update.");
                return;
            }

            let sNewStatus = oStatusItem.getText();
            let oODataModel = this.getOwnerComponent().getModel();
            let oListBinding = oODataModel.bindList("/Park_headerSet2"); // as per new changes status is in Parking header

            let that = this;

            MessageBox.confirm("Are you sure you want to update the status?", {
                icon: MessageBox.Icon.QUESTION,
                title: "Confirm Update",
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.YES) {
                        var oFilter = new Filter("ParkingNo", FilterOperator.EQ, sParkingNo);

                        oListBinding.filter(oFilter).requestContexts().then(function (aContexts) {
                            if (aContexts.length) {
                                var oItemContext = aContexts[0];
                                if (oItemContext.getProperty("ParkingNo") === sParkingNo) {
                                    oItemContext.setProperty("Status", sNewStatus);
                                }
                            }

                            MessageBox.success("Status updated successfully.");

                            that.getView().byId("parking_id").setValue("");
                            that.getView().byId("remark_id").setValue("");
                            that.getView().byId("statusDropdown").setValue("");

                           setTimeout( ()=> {
                            that._loadParkItemData();
                           }, 2500)
                        }).catch(function (oError) {
                            console.error("Error in update", oError);
                            MessageBox.error("Error updating status.");
                        });
                    }
                    that.getView().byId("statusDropdown").setValue("");
                }
                
            });
        }
    });
});