

sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageBox",
        "external/PDF",
        "external/AUTOTABLE",
    ],
    function (BaseController, JSONModel, MessageBox, PDF, AUTOTABLE) {
        "use strict";

        let schedulingArray = [];
        let oView;

        return BaseController.extend("com.ingenx.qms.truckassignment.controller.Home", {
            onInit: function () {
                oView = this.getView();

                // Set up calendar model
                const oModel = this.getOwnerComponent().getModel();
                const oCalendarModel = new sap.ui.model.json.JSONModel();
                oView.setModel(oCalendarModel, "schedulingArray");

                this._loadSchedulingData(oModel, oCalendarModel);
            },

            _loadSchedulingData: async function (oModel, oCalendarModel) {
                try {
                  const oBindList = oModel.bindList("/xIQMSxscheduling_cds");

                  const aContexts = await oBindList.requestContexts(0, Infinity);
                  const aData = aContexts.map(ctx => ctx.getObject());
              
                  // Get today's date in yyyy-mm-dd format (UTC to match Zulu time)
                  const today = new Date();
                  const todayStr = today.toISOString().split("T")[0];
              
                  // Filter entries with Createddate matching today (compare only the date part)
                  const filteredData = aData.filter(item => {
                    const createdDateStr = new Date(item.Createddate).toISOString().split("T")[0];
                    return createdDateStr === todayStr && !item.DeliveryNo && !item.Parkingno;
                  });
                    // Add DocType and documentNo only to today's items...
                    filteredData.forEach(item => {

                        if (item.SalesOrder && item.SalesOrder !== 'X') { 
                            item.DocType = "SO";
                            item.documentNo = item.SalesOrder;
                        } else if (item.Stockorder) {
                            item.DocType = "STO";
                            item.documentNo = item.Stockorder;
                        } else {
                            item.DocType = "N/A";
                            item.documentNo = "N/A";
                        }
                    });

                    oCalendarModel.setData(filteredData);
                    console.log("Filtered SchedulingSet Data (Calendar):", filteredData);
              
                  oCalendarModel.setData(filteredData); // assign the filter data
                  console.log("Filtered SchedulingSet Data (Calendar):", filteredData);
                } catch (error) {
                  console.error("Failed to load SchedulingSet data:", error);
                }
              },
                                          
            formatQuantityInfo: function (quantity, uom) {
                if (!quantity || isNaN(quantity)) {
                    return "Qty: 0.0";
                }
                const fixedQty = parseFloat(quantity).toFixed(1); // 3 decimal places
                return `Qty(${uom}): ${fixedQty}`;
            },

            // formatTitle: function (vbeln,sto, matnr) {
            //     const docNum = vbeln || sto;
			// 	const material = matnr;

			// 	if (docNum && material) {
            //         const label = vbeln ? "SO" : "STO";
			// 		let spaces;
			// 		if(label === "SO"){

			// 			spaces = Array(20).join('\u00A0');
			// 		}else {
			// 			spaces = Array(4).join('\u00A0');
						
			// 		}
			// 		return label + ": " + docNum + spaces + "Material: " + material;
            //     }
            //     return "";
            // },
            formatTitle: function (vbeln, sto, matnr) {
                const isSO = vbeln && vbeln !== "X";
                const docNum = isSO ? vbeln : sto;
                const material = matnr;
            
                if (docNum && material) {
                    const label = isSO ? "SO" : "STO";
                    const spaces = Array(isSO ? 20 : 4).join('\u00A0');
                    return label + ": " + docNum + spaces + "Material: " + material;
                }
                return "";
            },



            // onSalesClick: function () {
            //     let oView = oView;
            //     if (!this._oInfoDialogSON) {
            //         this._oInfoDialogSON = sap.ui.xmlfragment(
            //             oView.getId(),
            //             "scheduling.fragments.salesNo",
            //             this
            //         );
            //         oView.addDependent(this._oInfoDialogSON);
            //     }
            //     // Bind the model to the fragment
            //     this._oInfoDialogSON.setModel(oView.getModel("salesModel"));
            //     this._oInfoDialogSON.open();
            // },

            onValueHelpSearchSON: function (oEvent) {
                let sValue = oEvent.getParameter("value");
                let oFilter = new sap.ui.model.Filter("Salesorderno", sap.ui.model.FilterOperator.Contains, sValue);
                oEvent.getSource().getBinding("items").filter([oFilter]);
            },

          


            onUpdateClick: function (oEvent) {
                // debugger;

                let oListItem = oEvent.getSource(); // Get the selected list item
                let oContext = oListItem.getBindingContext("schedulingArray"); // Get the binding context
                let oData = oContext ? oContext.getObject() : null; // Retrieve the data object

                console.log("Selected Item Data", oData);

                if (oData) {
                    // Safely retrieve data and provide default values where necessary
                    let material = oData.Material || "";
                    let quantity = oData.Quantity || "";
                    let startDate = oData.Startdate || "";
                    let soldToParty = oData.Soldtoparty || "";
                    let SalesOrder = oData.SalesOrder || "";
                    let startTime = oData.Starttime || "";
                    let  Stockorder = oData.Stockorder || ""
                    let plant = oData.Plant || ""
                    this.DocType = oData.DocType;
                    this.documentNo = oData.documentNo


                    if (startDate) {
                        startDate = startDate.split('T')[0];
                    }

                    this.flagSubmit = false;

                    // Safely access salesOrder properties if it exists
                    let VehicleNumber = oData.Vehicleno || "" ;
                    let cleanerName = oData.Cleaner || "" ;
                    let driverName = oData.Driver || "" ;

                    if (VehicleNumber && driverName && cleanerName) {
                        this.flagSubmit = true;

                    }

                    console.log("VehicleNumber:", VehicleNumber);
                    console.log("startDate:", startDate);
                    console.log("startTime:", startTime);

                    // Set values in the view if data is available
                    oView.byId('startDate_id').setValue(startDate)
                    oView.byId('reportTime_id').setValue(startTime);
                    oView.byId("Mat_id").setValue(material);
                    oView.byId("Qty_id").setValue(quantity);
                    if( this.DocType === 'SO'){
                        
                        oView.byId("Doc_id").setValue(SalesOrder);
                        oView.byId("Doc_label").setText("Sales Order No");
                        oView.byId("Destination_label").setText("Sold To Party");    

                    }else {
                        oView.byId("Doc_id").setValue(Stockorder);
                        oView.byId("Doc_label").setText("Stock Order No");
                        oView.byId("Destination_label").setText("Plant");        

                    }
                    oView.byId("STPOrPlant_id").setValue(soldToParty || plant);
                    oView.byId("STP_id").setValue(soldToParty || plant);

                    // Set the input values only if they are not empty
                    oView.byId("truck_id").setValue(VehicleNumber ? VehicleNumber : "");
                    oView.byId("DriName_id").setValue(driverName ? driverName : "");
                    oView.byId("Cleaner_id").setValue(cleanerName ? cleanerName : "");
                } else {
                    console.error("No data found for the selected item.");
                }
            },

            onValueHelpCancelSON: function () {
                this._oInfoDialogSON.close();
            },

            onSubmit: async function () {
                const oView = this.getView(); // make sure this is defined
                const documentNo = oView.byId("Doc_id").getValue();
                const material = oView.byId("Mat_id").getValue();
                const Qty = oView.byId("Qty_id").getValue();
                const soldtoparty = oView.byId("STPOrPlant_id").getValue();
                const shiptoparty = oView.byId("STP_id").getValue();
                const truckNo = oView.byId("truck_id").getValue();
                const driverName = oView.byId("DriName_id").getValue();
                const cleanerName = oView.byId("Cleaner_id").getValue();

                if (truckNo === "" || driverName === "" || cleanerName === "" || documentNo === "") {
                    sap.m.MessageBox.error("Please fill the mandatory fields");
                    return;
                }

                let payload = {
                    'salesOrderNo': this.DocType ==='SO' ? documentNo : "",
                    'material': material,
                    'shipToParty': shiptoparty,
                    'soldToParty': this.DocType ==='SO' ? soldtoparty : "",
                    'qty': parseFloat(Qty),
                    'assignTruckNo': truckNo,
                    'driverName': driverName,
                    'cleanerName': cleanerName,
                    'Stockorder':this.DocType === 'STO'? documentNo: "",
                    'Plant':this.DocType ==='STO' ? soldtoparty : ""
                };

                let oModel = this.getOwnerComponent().getModel();
                let oBindList = oModel.bindList('/SchedulingSet');
                // let aFilter = new sap.ui.model.Filter("SalesOrder", sap.ui.model.FilterOperator.EQ, salesOrder);
                let sKey = this.DocType === "SO" ? "SalesOrder" : "Stockorder";
            
                try {
                    await oBindList.requestContexts().then(function (aContexts) {
                        if (aContexts.length > 0) {
                            
                            let contextArr = aContexts.filter((context) => context.getObject()[sKey]=== documentNo);
                            if (contextArr.length) {

                                contextArr[0].setProperty("Vehicleno", truckNo);
                                contextArr[0].setProperty("Driver", driverName);
                                contextArr[0].setProperty("Cleaner", cleanerName);
                            }
                        } else {
                            sap.m.MessageBox.warning("No matching scheduling entry found for the Sales Order.");
                        }
                    });

                    // Save payload for later use
                    this.savedPayload = payload;
                    sap.m.MessageBox.success("Data saved successfully.");
                } catch (err) {
                    console.error("Error while updating data: ", err);
                    sap.m.MessageBox.error("An error occurred while saving the data. Please try again.");
                }
            }
            ,


            onGenerateQR: function () {
                let QRVbox = this.byId("QRVbox");
                if (!this.savedPayload) {
                    sap.m.MessageBox.error("No data found to generate QR code. Please submit the data first.");
                    return;
                }

                // Convert the saved payload to a JSON string
                const qrPayload = JSON.stringify(this.savedPayload);

                // Generate the QR code using the saved data
                const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrPayload);

                // Display the QR Code
                const oImage = oView.byId("qrCodeImage");
                oImage.setSrc(qrCodeUrl);

                // Open the QR dialog
                const oDialog = this.byId("qrCodeDialog");
                oDialog.open();
            },

            onPrintQR: function () {
                const qrCodeUrl = oView.byId("qrCodeImage").getSrc();

                // Open a new window for printing
                const newWindow = window.open("", "_blank");

                // Write the QR code to the new window
                newWindow.document.write(`
                    <html>
                    <head><title>Print QR Code</title></head>
                    <body style="text-align: center;">
                        <img src="${qrCodeUrl}" width="150px" height="150px" />
                       <br/><br/><br/><br/><br/> <br/><button onclick="window.print()">Print</button>
                    </body>
                    </html>
                `);

                // Close the document to apply styles
                newWindow.document.close();
                newWindow.focus();
            },


            onSendMail: function () {
                let qrCodeUrl = oView.byId("qrCodeImage").getSrc();

                // Example email sending logic (depends on your backend setup)
                sap.m.MessageBox.confirm("Do you want to send the QR code via email?", {
                    actions: ["Yes", "No"],
                    onClose: function (oAction) {
                        if (oAction === "Yes") {
                            // Trigger email sending
                            sap.m.MessageBox.success("QR code sent via email!");
                            // Backend logic would go here to actually send the email
                        }
                    }
                });
            },

            onCloseDialog: function () {
                this.byId("qrCodeDialog").close();
            },

            onGeneratePDF: function () {
                // Retrieve input field values
                const Sales_Order_No = oView.byId("Doc_id").getValue();
                const Ship_To_Party = oView.byId("STP_id").getValue();
                const Sold_To_Party = oView.byId("STPOrPlant_id").getValue();
                const Material = oView.byId("Mat_id").getValue();
                const Qty = oView.byId("Qty_id").getValue();
                const Reporting_Date = oView.byId("startDate_id").getValue();
                const Reporting_Time = oView.byId("reportTime_id").getValue();
                const Assign_Truck_No = oView.byId("truck_id").getValue();
                const Driver_Name = oView.byId("DriName_id").getValue();
                const Cleaner_Name = oView.byId("Cleaner_id").getValue();

                // Create PDF document
                const { jsPDF } = PDF;
                const doc = new jsPDF();

                // Set positions for labels and values with a 50px gap from the left side
                const startXLabel = 40;
                const startXValue = 120;
                const startY = 20;
                const lineHeight = 10;

                // Add content to PDF
                doc.text("1. Sales Order No:", startXLabel, startY);
                doc.text(Sales_Order_No, startXValue, startY);

                doc.text("2. Ship To Party:", startXLabel, startY + lineHeight);
                doc.text(Ship_To_Party, startXValue, startY + lineHeight);

                doc.text("3. Sold To Party:", startXLabel, startY + 2 * lineHeight);
                doc.text(Sold_To_Party, startXValue, startY + 2 * lineHeight);

                doc.text("4. Material:", startXLabel, startY + 3 * lineHeight);
                doc.text(Material, startXValue, startY + 3 * lineHeight);

                doc.text("5. Qty:", startXLabel, startY + 4 * lineHeight);
                doc.text(Qty, startXValue, startY + 4 * lineHeight);

                doc.text("6. Reporting Date:", startXLabel, startY + 5 * lineHeight);
                doc.text(Reporting_Date, startXValue, startY + 5 * lineHeight);

                doc.text("7. Reporting Time:", startXLabel, startY + 6 * lineHeight);
                doc.text(Reporting_Time, startXValue, startY + 6 * lineHeight);

                doc.text("8. Assign Truck No:", startXLabel, startY + 7 * lineHeight);
                doc.text(Assign_Truck_No, startXValue, startY + 7 * lineHeight);

                doc.text("9. Driver Name:", startXLabel, startY + 8 * lineHeight);
                doc.text(Driver_Name, startXValue, startY + 8 * lineHeight);

                doc.text("10. Cleaner Name:", startXLabel, startY + 9 * lineHeight);
                doc.text(Cleaner_Name, startXValue, startY + 9 * lineHeight);

                // Open PDF in a new window
                doc.output("dataurlnewwindow");
            },

            handleUploadPress: function (oEvent) {
                this._busyDialog = new sap.m.BusyDialog();
                if (this._busyDialog) {
                    this._busyDialog.open();
                }

                let oUploadButton = oEvent.getSource();
                let oHorizontalLayout = oUploadButton.getParent();
                let oFileUploader = oHorizontalLayout.getContent().find(function (content) {
                    return content instanceof sap.ui.unified.FileUploader;
                });
                let oDescriptionInput = oHorizontalLayout.getContent().find(function (content) {
                    return content instanceof sap.m.Input;
                });

                if (oFileUploader && oDescriptionInput) {
                    let fileDescription = oDescriptionInput.getValue().trim(); // Trim any leading/trailing spaces

                    // Check if the description input is filled
                    if (!fileDescription) {
                        sap.m.MessageToast.show("Please provide a description before uploading.");
                        this._busyDialog.close();
                        return;
                    }

                    let domRef = oFileUploader.getDomRef();
                    let file = domRef.querySelector("input[type='file']").files[0];

                    if (!file) {
                        sap.m.MessageToast.show("No file selected for upload.");
                        this._busyDialog.close();
                        return;
                    }

                    this.fileName = file.name.substring(0, 30);
                    this.fileType = file.type.substring(0, 30);
                    this.fileDescription = fileDescription;

                    let reader = new FileReader();
                    let that = this;
                    reader.onload = function (e) {
                        let arr = e.target.result.split(",");
                        let vContent1 = arr[1];
                        that.postToBackend("1000037", that.fileName, that.fileType, vContent1, that.fileDescription, oUploadButton, oDescriptionInput, oFileUploader);
                    };
                    reader.readAsDataURL(file);
                } else {
                    sap.m.MessageToast.show("FileUploader or Description Input not found in the row.");
                    this._busyDialog.close();
                }
            },


            OnfileUploadDelete: function (oEvent) {
                let oButton = oEvent.getSource();
                let oHorizontalLayout = oButton.getParent();
                let oVerticalLayout = this.byId("_IDGenVerticalLayout1");

                let isStaticRow = !this._aFileUploaders.find(function (item) {
                    return item.fileUploader.getParent() === oHorizontalLayout;
                });

                if (isStaticRow) {
                    let oDescriptionInput = oHorizontalLayout.getContent().find(function (content) {
                        return content instanceof sap.m.Input;
                    });
                    let oFileUploader = oHorizontalLayout.getContent().find(function (content) {
                        return content instanceof sap.ui.unified.FileUploader;
                    });

                    if (oDescriptionInput && oFileUploader) {
                        let descriptionValue = oDescriptionInput.getValue().trim();
                        let fileUploaderValue = oFileUploader.getValue();

                        if (descriptionValue === "" && fileUploaderValue === "") {
                            sap.m.MessageToast.show("Nothing to delete. The description and file uploader are empty.");
                            return;
                        } else {
                            sap.m.MessageBox.confirm("Are you sure you want to delete this item?", {
                                actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.Cancel],
                                onClose: function (oAction) {
                                    if (oAction === sap.m.MessageBox.Action.OK) {
                                        if (descriptionValue !== "") {
                                            oDescriptionInput.setValue("");
                                        }
                                        if (fileUploaderValue !== "") {
                                            oFileUploader.clear();
                                        }
                                        // sap.m.MessageToast.show(" Deleted Successfully");
                                    }
                                }.bind(this)
                            });
                        }
                    }
                } else {
                    sap.m.MessageBox.confirm("Are you sure you want to delete this item?", {
                        actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.Cancel],
                        onClose: function (oAction) {
                            if (oAction === sap.m.MessageBox.Action.OK) {
                                oVerticalLayout.removeContent(oHorizontalLayout);

                                var index = this._aFileUploaders.findIndex(function (item) {
                                    return item.fileUploader.getParent() === oHorizontalLayout;
                                });
                                if (index !== -1) {
                                    this._aFileUploaders.splice(index, 1);
                                }
                                sap.m.MessageToast.show(" Deleted Successfully");

                                var oSuccessIconButton = oHorizontalLayout.getContent().find(function (content) {
                                    return content instanceof sap.m.Button && content.getIcon() === "sap-icon://message-success";
                                });
                                if (oSuccessIconButton) {
                                    oSuccessIconButton.setVisible(false);
                                }
                            }
                        }.bind(this)
                    });
                }
            },
            postToBackend: function (voyageNo, filename, filetype, content, fileDescription, oUploadButton, oDescriptionInput, oFileUploader) {
                let oModel = this.getOwnerComponent().getModel();
                let bindList = oModel.bindList("/FileuploadSet");
                let that = this;

                bindList.attachCreateCompleted(async function (p) {
                    let params = p.getParameters();
                    let isSuccess = params.success;
                    that._busyDialog.close();

                    let oHorizontalLayout = oUploadButton.getParent();

                    let oSuccessIconButton = oHorizontalLayout.getContent().find(function (content) {
                        return content instanceof sap.m.Button && content.getIcon() === "sap-icon://message-success";
                    });

                    let oDeleteIconButton = oHorizontalLayout.getContent().find(function (content) {
                        return content instanceof sap.m.Button && content.getIcon() === "sap-icon://delete";
                    });

                    if (isSuccess) {
                        sap.m.MessageBox.success("File successfully uploaded");

                        if (oUploadButton) {
                            oUploadButton.setEnabled(false);
                        }
                        if (oFileUploader) {
                            oFileUploader.setEnabled(false);
                        }
                        if (oDescriptionInput) {
                            oDescriptionInput.setEnabled(false);
                        }
                        if (oSuccessIconButton) {
                            oSuccessIconButton.setType(sap.m.ButtonType.Accept);
                            oSuccessIconButton.setVisible(true);
                        }
                        if (oDeleteIconButton) {
                            oDeleteIconButton.setVisible(false);
                        }
                    } else {
                        let errMsgArr = params.context.oModel.mMessages[""];
                        let errMsg = errMsgArr[errMsgArr.length - 1].message;
                        if (errMsg.includes("Duplicate Key")) {
                            sap.m.MessageBox.error(`File with name "${filename}" already exists`);
                        } else {
                            sap.m.MessageBox.error(errMsg);
                        }
                    }
                });

                let payload = {
                    "Filedescription": fileDescription,
                    "Filename": filename,
                    "Filecont": content,
                    "Voyageno": voyageNo,
                    "Filetype": filetype,
                };

                bindList.create(payload, true);
            },


            handleValueChangeUpload: function (oEvent) {
                sap.m.MessageToast.show("Press 'Upload File' to upload file '" + oEvent.getParameter("newValue") + "'");
            },
            handleTypeMissmatch: function (oEvent) {
                let aFileTypes = oEvent.getSource().getFileType();
                aFileTypes.map(function (sType) {
                    return "*." + sType;
                });
                sap.m.MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
                    " is not supported. Choose one of the following types: " +
                    aFileTypes.join(", "));
            },
            onAddRowFileUpload: function () {
                const oInitialInput = this.byId("fileinput");
                const oInitialFileUploader = this.byId("fileUploader");

                if (oInitialInput && oInitialFileUploader) {
                    if (!oInitialInput.getValue() || !oInitialFileUploader.getValue()) {
                        sap.m.MessageToast.show("Please Upload file and add Description First ");
                        return;
                    }
                }

                if (this._aFileUploaders && this._aFileUploaders.length > 0) {
                    var lastUploader = this._aFileUploaders[this._aFileUploaders.length - 1];

                    if (!lastUploader.descriptionInput.getValue() || !lastUploader.fileUploader.getValue()) {
                        sap.m.MessageToast.show("Please upload a File and provide a Description before adding a New File.");
                        return;
                    }
                }

                let oVerticalLayout = this.byId("_IDGenVerticalLayout1");

                if (oVerticalLayout) {
                    let oHorizontalLayout = new sap.ui.layout.HorizontalLayout();

                    let oInput = new sap.m.Input({
                        width: "250px",
                        placeholder: "Description of file",
                        liveChange: this.Fileinputchange.bind(this)
                    });
                    oInput.addStyleClass("sapUiMarginTinyEnd");

                    let oFileUploader = new sap.ui.unified.FileUploader({
                        uploadUrl: "odata/v4/i-qmsservice/FileuploadSet",
                        sendXHR: true,
                        httpRequestMethod: sap.ui.unified.FileUploaderHttpRequestMethod.Post,
                        change: this.handleValueChangeUpload.bind(this),
                        tooltip: "Upload your file to the local server",
                        buttonText: "Choose File",
                        icon: "sap-icon://value-help",
                        fileType: "pdf",
                        typeMissmatch: this.handleTypeMissmatch.bind(this)
                    });
                    oFileUploader.addStyleClass("sapUiTinyMarginEnd");

                    let oUploadButton = new sap.m.Button({
                        text: "Upload File",
                        press: this.handleUploadPress.bind(this)
                    });
                    oUploadButton.addStyleClass("sapUiTinyMarginEnd");


                    let oDeleteButton = new sap.m.Button({
                        icon: "sap-icon://delete",
                        type: sap.m.ButtonType.Reject,
                        press: this.OnfileUploadDelete.bind(this)
                    });

                    let oSuccessIconButton = new sap.m.Button({
                        icon: "sap-icon://message-success",
                        visible: false
                    });

                    oHorizontalLayout.addContent(oInput);
                    oHorizontalLayout.addContent(oFileUploader);
                    oHorizontalLayout.addContent(oUploadButton);
                    oHorizontalLayout.addContent(oDeleteButton); // Add delete button to the layout
                    oHorizontalLayout.addContent(oSuccessIconButton);

                    oVerticalLayout.insertContent(oHorizontalLayout, oVerticalLayout.getContent().length - 1);

                    if (!this._aFileUploaders) {
                        this._aFileUploaders = [];
                    }
                    this._aFileUploaders.push({
                        fileUploader: oFileUploader,
                        uploadButton: oUploadButton,
                        deleteButton: oDeleteButton, // Store reference to delete button
                        successIconButton: oSuccessIconButton,
                        descriptionInput: oInput
                    });
                } else {
                    console.error("VerticalLayout with ID '_IDGenVerticalLayout1' not found.",);
                }
            },

            Fileinputchange: function (oEvent) {
                let oInput = oEvent.getSource();
                let sValue = oInput.getValue();

                if (sValue.length > 100) {
                    sValue = sValue.substring(0, 100);
                    oInput.setValue(sValue);
                    sap.m.MessageToast.show("Maximum length is 100 characters.");
                }

                if (/[^a-zA-Z0-9 ]/.test(sValue) || /^\s/.test(sValue)) {
                    sValue = sValue.replace(/[^a-zA-Z0-9 ]/g, '').replace(/^\s+/g, '');

                    oInput.setValue(sValue);
                    sap.m.MessageToast.show("Only Alphanumeric Characters are allowed");
                }
            },


        });
    }
);
