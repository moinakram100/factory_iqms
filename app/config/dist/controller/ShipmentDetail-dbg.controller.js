sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/core/Fragment',
    "sap/ui/model/odata/v4/ODataModel"
  ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, formatter, ODataModel) {
      "use strict";
 
  
      return Controller.extend("com.ingenx.qms.config.controller.ShipmentDetail", {
        formatter: formatter,
        onInit: function () {
  
  
        },
  
      });
    });
  