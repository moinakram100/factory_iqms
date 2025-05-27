

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/IconPool",
], (Controller, IconPool) => {
    "use strict";

    return Controller.extend("com.ingenx.qms.billingcreation.controller.Home", {
        onInit:async  function () {
            this.oRouter = this.getOwnerComponent().getRouter();
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
        onGoodsIssue : function(){
            this.oRouter.navTo("RouteGoodIssue");
        },
        onBilling : function(){
            this.oRouter.navTo("RouteBillingCreation");
        },
    });
});