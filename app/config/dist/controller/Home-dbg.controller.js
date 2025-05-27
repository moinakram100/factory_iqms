sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.ingenx.qms.config.controller.Home", {
        onInit(){
        },
        onConfigTile : function(){
            let oRouter = this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteConfigHome")
        },
        onStatusTile : function(){
            let oRouter = this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteStatusHome")
        }
    });
});