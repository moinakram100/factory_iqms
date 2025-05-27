sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/IconPool",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, IconPool) {
        "use strict";
        let oRouter;

        return Controller.extend("com.ingenx.qms.config.controller.ConfigHome", {
            onInit:async  function () {
                oRouter = this.getOwnerComponent().getRouter();
                await this._loadIcons();

            },
            _loadIcons: function () {
                const aFonts = [
                    {
                        fontFamily: "SAP-icons-TNT",
                        fontURI: sap.ui.require.toUrl("sap/tnt/themes/base/fonts/")
                    },
                    {
                        fontFamily: "BusinessSuiteInAppSymbols",
                        fontURI: sap.ui.require.toUrl("sap/ushell/themes/base/fonts/")
                    }
                ];

                aFonts.forEach(oFont => {
                    IconPool.registerFont(oFont);
                });
            },
            onParking : function(){
               
                oRouter.navTo("RouteParkingGate");
            },
            onVehhicleDefination : function(){
              
                oRouter.navTo("RouteVehicleDefinition");
            },
            onChecklistCreation : function(){
                
                oRouter.navTo("RouteChecklistCreation");
            },
            onMaterialDefinition : function(){
                
                oRouter.navTo("RouteMaterialDefinition");
            },
            onBayAllocation : function(){
               
                oRouter.navTo("RouteBayAllocation");
            },

            onShipmentDetail : function(){
               
                oRouter.navTo("RouteShipmentDetail");
            }
        });
    });
