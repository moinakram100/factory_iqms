sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";
        let mergedData
        let InvoicedData
        let LoadedData
        let sapdocData

        return Controller.extend("com.ingenx.qms.inventory.controller.Analytics", {
            onInit: async function () {

                let oModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModel, "mergedData");

                let InvoicedModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(InvoicedModel, "InvoicedModel");

                let LoadedModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(LoadedModel, "LoadedModel");

                let sapDoc = new sap.ui.model.json.JSONModel();
                this.getView().setModel(sapDoc, "sapDoc")

                let oModel3 = this.getOwnerComponent().getModel();

                try {
                    // Fetch Park_headerSet data
                    let oBindList3 = oModel3.bindList("/Park_headerSet");
                    let parkHeaderData = [];
                    let aContexts3 = await oBindList3.requestContexts(0, Infinity);
                    aContexts3.forEach(oContext => parkHeaderData.push(oContext.getObject()));

                    // Fetch park_itemSet data and filter items based on specific status
                    let oBindList4 = oModel3.bindList("/park_itemSet");
                    let parkItemData = [];
                    let aContexts4 = await oBindList4.requestContexts(0, Infinity);
                    aContexts4.forEach(oContext => parkItemData.push(oContext.getObject()));

                    let filteredParkItemData = parkItemData.filter(item =>
                        item.Status === "Security Cleared" ||
                        item.Status === "Security Cleared, Vehicle Master Missing" ||
                        item.Status === "Security Pending, Vehicle Master Missing" ||
                        item.Status === "Security Pending"
                    );

                    // Merge Park_headerSet and filtered park_itemSet data with counts
                    let totalSecurityClearedCount = 0;
                    let totalSecurityFailedCount = 0;

                    mergedData = parkHeaderData.filter(header => {
                        let items = filteredParkItemData.filter(item => item.ParkingNo === header.ParkingNo);
                        return items.length > 0 && items.length === parkItemData.filter(item => item.ParkingNo === header.ParkingNo).length;
                    }).map(header => {
                        let items = filteredParkItemData.filter(item => item.ParkingNo === header.ParkingNo);

                        // Count statuses
                        let securityClearedCount = items.filter(item => item.Status === "Security Cleared" || item.Status === "Security Cleared , Vehicle Master Missing").length;
                        let securityFailedCount = items.filter(item => item.Status === "Security Pending" || item.Status === "Security Pending , Vehicle Master Missing").length;

                        // Update the total counts
                        totalSecurityClearedCount += securityClearedCount;
                        totalSecurityFailedCount += securityFailedCount;

                        return {
                            ...header,
                            items: items,
                            securityClearedCount: securityClearedCount,
                            securityFailedCount: securityFailedCount
                        };
                    });

                    // Set the merged data and the total counts to the model
                    oModel.setData({
                        mergedData: mergedData,
                        totalSecurityClearedCount: totalSecurityClearedCount,
                        totalSecurityFailedCount: totalSecurityFailedCount
                    });

                    // Log total counts
                    console.log("Total Security Cleared Count:", totalSecurityClearedCount);
                    console.log("Total Security Failed Count:", totalSecurityFailedCount);

                    var oVBox = this.byId("Hbox_id");
                    mergedData.forEach(function (item) {
                        var oButton = new sap.m.Button({
                            icon: "sap-icon://shipping-status",
                            // press: function () {
                            //     // Access the first item's status within each header
                            //     sap.m.MessageToast.show("Status: " + item.items[0].Status);
                            // },
                            // Set the CSS class for spacing
                        }).addStyleClass("button-spacing");

                        // Check status of the first item in the `items` array
                        if (item.items[0].Status === "Security Cleared" || item.items[0].Status === "Security Cleared, Vehicle Master Missing") {
                            oButton.setType("Accept");
                        } else if (item.items[0].Status === "Security Pending" || item.items[0].Status === "Security Pending, Vehicle Master Missing") {
                            oButton.setType("Reject");
                        }

                        // Add the button to the VBox aggregation
                        oVBox.addItem(oButton);
                    });




                    ////Sap Doc
                    let filteredSapdocItemData = parkItemData.filter(item =>
                        item.Status === "SO / STO Created" ||
                        item.Status === "Delivery Created" ||
                        item.Status === "LAN Created" ||
                        item.Status === "Security Cleared" ||
                        item.Status === "Security Cleared, Vehicle Master Missing"
                    );

                    let totalsapDocPending = 0;
                    let totalsapDocCleared = 0;

                    // Merge Park_headerSet and filtered park_itemSet data for invoiced items
                    sapdocData = parkHeaderData.filter(header => {
                        let items = filteredSapdocItemData.filter(item => item.ParkingNo === header.ParkingNo);
                        return items.length > 0 && items.length === parkItemData.filter(item => item.ParkingNo === header.ParkingNo).length;
                    }).map(header => {


                        let items = filteredSapdocItemData.filter(item => item.ParkingNo === header.ParkingNo);

                        // Count statuses
                        let sapDocPending = items.filter(item => item.Status === "Security Cleared" || item.Status === "Security Cleared, Vehicle Master Missing" || item.Status === "SO / STO Created" || item.Status === "Delivery Created").length;
                        let sapDocCleared = items.filter(item => item.Status === "LAN Created").length;

                        // Update the total counts
                        totalsapDocPending += sapDocPending;
                        totalsapDocCleared += sapDocCleared;

                        return {
                            ...header,
                            items: items,
                            sapDocPending: sapDocPending,
                            sapDocCleared: sapDocCleared
                        };
                    });

                    sapDoc.setData({
                        sapdocData: sapdocData,
                        totalsapDocPending: totalsapDocPending,
                        totalsapDocCleared: totalsapDocCleared
                    });
                    
               
                    console.log("totalsapDocCleared:", totalsapDocCleared);
                    console.log("totalsapDocPending:", totalsapDocPending);


                    var oHboxsapdocData = this.byId("HBoxsapdoc");

                    sapdocData.forEach(function (item) {
                        var oButton = new sap.m.Button({
                            icon: "sap-icon://shipping-status",
                            // press: function () {
                            //     // Access the first item's status within each header
                            //     sap.m.MessageToast.show("Status: " + item.items[0].Status);
                            // },
                            // Set the CSS class for spacing
                        }).addStyleClass("button-spacing");

                        // Check status of the first item in the `items` array
                        if (item.items[0].Status === "LAN Created") {
                            oButton.setType("Accept");
                        } else if (item.items[0].Status === "Security Cleared" || item.items[0].Status === "Security Cleared, Vehicle Master Missing" || item.items[0].Status === "SO / STO Created" || item.items[0].Status === "Delivery Created") {
                            oButton.setType("Reject");
                        }

                        // Add the button to the VBox aggregation
                        oHboxsapdocData.addItem(oButton);
                    });




                    /////Loaded

                    let filteredLoadedItemData = parkItemData.filter(item => item.Status === "Loaded" || item.Status === "LAN Created");

                    let totalLoadedPending = 0;
                    let totalLoadedCleared = 0;

                    // Merge Park_headerSet and filtered park_itemSet data for loaded items
                    LoadedData = parkHeaderData.filter(header => {
                        let items = filteredLoadedItemData.filter(item => item.ParkingNo === header.ParkingNo);
                        return items.length > 0 && items.length === parkItemData.filter(item => item.ParkingNo === header.ParkingNo).length;
                    }).map(header => {
                        let items = filteredLoadedItemData.filter(item => item.ParkingNo === header.ParkingNo);
                        // Count statuses
                        let sapLoadedPending = items.filter(item => item.Status === "LAN Created").length;
                        let sapLoadedCleared = items.filter(item => item.Status === "Loaded").length;

                        // Update the total counts
                        totalLoadedPending += sapLoadedPending;
                        totalLoadedCleared += sapLoadedCleared;

                        return {
                            ...header,
                            items: items,
                            sapLoadedPending: sapLoadedPending,
                            sapLoadedCleared: sapLoadedCleared
                        };
                    });

                    LoadedModel.setData({
                        LoadedData: LoadedData,
                        totalLoadedCleared: totalLoadedCleared,
                        totalLoadedPending: totalLoadedPending
                    });
                    var oHboxLoaded = this.byId("HBoxLoaded");

                    LoadedData.forEach(function (item) {
                        var oButton = new sap.m.Button({
                            icon: "sap-icon://shipping-status",
                            // press: function () {
                            //     // Access the first item's status within each header
                            //     sap.m.MessageToast.show("Status: " + item.items[0].Status);
                            // },
                            // Set the CSS class for spacing
                        }).addStyleClass("button-spacing");

                        // Check status of the first item in the `items` array
                        if (item.items[0].Status === "Loaded") {
                            oButton.setType("Accept");
                        } else if (item.items[0].Status === "LAN Created") {
                            oButton.setType("Reject");
                        }

                        // Add the button to the VBox aggregation
                        oHboxLoaded.addItem(oButton);
                    });


                    
                    ////For Invoiced

                    let filteredInvoicedItemData = parkItemData.filter(item => item.Status === "Invoiced" || item.Status === "Loaded");

                    let totalInvoicedPending = 0;
                    let totalInvoicedCleared = 0;

                    // Merge Park_headerSet and filtered park_itemSet data for invoiced items
                    InvoicedData = parkHeaderData.filter(header => {
                        let items = filteredInvoicedItemData.filter(item => item.ParkingNo === header.ParkingNo);
                        return items.length > 0 && items.length === parkItemData.filter(item => item.ParkingNo === header.ParkingNo).length;
                    }).map(header => {
                        let items = filteredInvoicedItemData.filter(item => item.ParkingNo === header.ParkingNo);
                        let invoicedPending = items.filter(item => item.Status === "Loaded").length;
                        let invoicedCleared = items.filter(item => item.Status === "Invoiced").length;

                        // Update the total counts
                        totalInvoicedPending += invoicedPending;
                        totalInvoicedCleared += invoicedCleared;

                        return {
                            ...header,
                            items: items,
                            invoicedPending: invoicedPending,
                            invoicedCleared: invoicedCleared
                        };
                    });

                    InvoicedModel.setData({
                        InvoicedData : InvoicedData,
                        totalInvoicedPending : totalInvoicedPending,
                        totalInvoicedCleared : totalInvoicedCleared
                    });
                    var oHboxInvoiced = this.byId("HboxInvoiced");

                    InvoicedData.forEach(function (item) {
                        var oButton = new sap.m.Button({
                            icon: "sap-icon://shipping-status",
                            // press: function () {
                            //     // Access the first item's status within each header
                            //     sap.m.MessageToast.show("Status: " + item.items[0].Status);
                            // },
                            // Set the CSS class for spacing
                        }).addStyleClass("button-spacing");

                        // Check status of the first item in the `items` array
                        if (item.items[0].Status === "Invoiced") {
                            oButton.setType("Accept");
                        } else if (item.items[0].Status === "Loaded") {
                            oButton.setType("Reject");
                        }

                        // Add the button to the VBox aggregation
                        oHboxInvoiced.addItem(oButton);
                    });


                } catch (error) {
                    console.error("Error fetching or processing data:", error);
                }
            },
        });
    });
