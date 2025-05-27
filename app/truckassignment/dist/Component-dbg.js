
sap.ui.loader.config({
    paths: {
        "external/PDF": "https://cdn.jsdelivr.net/npm/jspdf@3.0.0/dist/jspdf.umd.min",
        "external/AUTOTABLE": "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.4/jspdf.plugin.autotable.min"
    },
    shim: {
        "external/PDF": {
            amd: true,
            exports: "jspdf"
        },
        "external/AUTOTABLE": {
            deps: ["external/PDF"],
            amd: true,
            exports: "jspdf-autotable"
        }
    }
});

sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/ingenx/qms/truckassignment/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("com.ingenx.qms.truckassignment.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});