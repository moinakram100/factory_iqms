sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/ui/model/json/JSONModel"
  ], (Controller,JSONModel) => {
    "use strict";
  
    return Controller.extend("com.ingenx.qms.parking.controller.Home", {
        onInit: function () {
                        
        },  

        onCreateParkingTile : function(){
            let salesOrderRouter = this.getOwnerComponent().getRouter()
            salesOrderRouter.navTo("RouteParkingCreation")
        },
        onSecurityClearanceTile : function(){
            let salesOrderRouter = this.getOwnerComponent().getRouter()
            salesOrderRouter.navTo("RouteSecurityClearance")
        },
        onExitTile : function(){
            let salesOrderRouter = this.getOwnerComponent().getRouter()
            salesOrderRouter.navTo("RouteExit")
        },
  
    

    });
  });