
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.ingenx.qms.config.controller.BayStatus", {
        onInit: function () {
            this.updatedEntries = []; // Array to store modified entries
        },

    

        onStatusChange: function (oEvent) {
            let oTable = this.byId("statusTable");
            let oContext = oEvent.getSource().getBindingContext();
            let sPath = oContext.getPath();
            let oModel = oContext.getModel();

            // Add the modified entry to the updatedEntries array
            let oUpdatedEntry = oModel.getProperty(sPath);
            if (!this.updatedEntries.some(entry => entry.Id === oUpdatedEntry.Id)) {
                this.updatedEntries.push(oUpdatedEntry);
            }

            MessageToast.show("Status updated for " + oUpdatedEntry.BayLabel);
        }
    });
});