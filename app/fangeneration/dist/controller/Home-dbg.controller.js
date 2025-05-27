sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.ingenx.qms.fangeneration.controller.Home", {
        onInit() {
            this.Router = this.getOwnerComponent().getRouter()
        },
        onSolidFanGenerationTile : function(){
             this.Router.navTo("RouteSolidFanGeneration")
        },
        onliquidFanGenerationTile : function(){
             this.Router.navTo("RouteLiquidFanGeneration")
        },
        onGasFanGenerationTile : function(){
             this.Router.navTo("RouteGasFanGeneration")
        },
        onMaterialFanGenerationTile : function(){
             this.Router.navTo("RouteMaterialFanGeneration")
        }
    });
});