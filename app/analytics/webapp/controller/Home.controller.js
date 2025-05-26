sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.ingenx.qms.analytics.controller.Home", {
        onInit() {
            this.Router = this.getOwnerComponent().getRouter()
        },
        onanalyticsDashboardTile : function(){
            this.Router.navTo("RouteanalyticsDashboard")
        },
        onanalyticsAnalyticsTile : function(){
            this.Router.navTo("RouteanalyticsAnalytics")
        },
        onanalyticsAnalysisReport : function(){
            this.Router.navTo("RouteAnalysisReport")
        }
    });
});