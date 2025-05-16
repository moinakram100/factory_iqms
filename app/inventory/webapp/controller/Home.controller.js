sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.ingenx.qms.inventory.controller.Home", {
        onInit() {
            this.Router = this.getOwnerComponent().getRouter()
        },
        onInventoryDashboardTile : function(){
            this.Router.navTo("RouteInventoryDashboard")
        },
        onInventoryAnalyticsTile : function(){
            this.Router.navTo("RouteInventoryAnalytics")
        }
    });
});