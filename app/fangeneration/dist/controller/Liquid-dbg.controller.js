sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterType",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "external/PDF",
    "external/AUTOTABLE",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "com/ingenx/qms/fangeneration/utils/helperFunctions"
  ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterType, FilterOperator, Fragment, PDF, AUTOTABLE, MessageBox, MessageToast, helperFunctions) {
      "use strict";
  
      let CustCode
      let ShipToName
      let Destination
      let Shiptoparty
  
      let documentSet = []
      let mergedData = []
      let SalesOrderValidation
      let DeliveryNoValidation
      let shipmentNoValidation
      let statusValidation
      let ParkingNoValidation
      let oView;
      let oJsonModel;
  
      return Controller.extend("com.ingenx.qms.fangeneration.controller.Home", {
        onInit: async function () {
          oView = this.getView();
          oJsonModel = new sap.ui.model.json.JSONModel();
          oJsonModel.setData(mergedData);
          this.getView().setModel(oJsonModel, 'mergedData');
  
          let oModelLicense = new sap.ui.model.json.JSONModel();
          this.getView().setModel(oModelLicense, "dataModels");
  
          oModelLicense.setData({
            "data": [{
              Type: "",
              LicenseNumber: "",
              ValidFrom: "",
              ValidTo: ""
            }]
          });
  
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("RouteLiquidFanGeneration").attachPatternMatched(this.onObjectMatched, this);
  
          // sap.ui.core.BusyIndicator.show(0);
  
  
        },
        async onObjectMatched() {
          console.log("onObject called");
          sap.ui.core.BusyIndicator.show(0);
  
          let parkdata = await this.fetchCustomisedParkingData();
          sap.ui.core.BusyIndicator.hide();
          console.log("pdata", parkdata);
  
          mergedData = parkdata;
          oJsonModel.setData(mergedData);
          console.log("mergedData", mergedData);
  
          this.byId('_IDGenTable2').getModel('mergedData').refresh();
  
        },

        pressGoBtn: function () {
            let oView = this.getView(); // Assuming 'this' refers to the controller
            let oTable = oView.byId("_IDGenTable2"); // Table ID
            let oBinding = oTable.getBinding("rows"); // Table's binding
    
            let aFilters = []; // Array to hold the filters
    
            // Get control values
            let statusControl = oView.byId("status_Id"); // Select control
            let productControl = oView.byId("FANLiqProductSelect"); // Select control
            let parkingNoInput = oView.byId("parkingNo_ID"); // Input control
            let vehicleInput = oView.byId("vehicleNo_Id"); // Input control
    
            // Get selected/entered values
            let status = statusControl.getSelectedItem() ? statusControl.getSelectedItem().getText() : null;
            let product = productControl.getSelectedItem() ? productControl.getSelectedItem().getText() : null;
            let parkingNo = parkingNoInput.getValue();
            let vehicleNo = vehicleInput.getValue();
    
            // Add filters based on non-empty values
            if (status) {
              aFilters.push(new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, status));
            }
            if (product) {
              aFilters.push(new sap.ui.model.Filter("MaterialDesc", sap.ui.model.FilterOperator.EQ, product));
            }
            if (parkingNo) {
              aFilters.push(new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, parkingNo));
            }
            if (vehicleNo) {
              aFilters.push(new sap.ui.model.Filter("VehicleNumber", sap.ui.model.FilterOperator.EQ, vehicleNo));
            }
    
            // Combine filters using AND logic
            let oCombinedFilter = new sap.ui.model.Filter({
              filters: aFilters,
              and: true
            });
    
            // Apply the filter to the table
            oBinding.filter(oCombinedFilter);
          },


        // reusable function
        fetchCustomisedParkingData: async function () {
          let oModel = this.getOwnerComponent().getModel();
          let sPath = `/LiquidScreen`;
  
          try {
  
  
            const oBindinggetCust = oModel.bindContext(sPath, null, {});
  
            const oData = await oBindinggetCust.requestObject();
  
            if (oData && oData.value && oData.value.length > 0) {
              console.log("result ", oData.value);
  
              return oData.value; // returning array
            } else {
  
              return [];
            }
          } catch (oError) {
            console.error("Error fetching data:", oError);
            throw new Error("Failed to fetch  data. Please try again later.");
          }
        },
  
        formatter: {
          formatDate: function (dateString) {
            if (!dateString) return "";
  
            // Create a JavaScript Date object from the date string
            let date = new Date(dateString);
            // Format the date as YYYY-MM-DD
            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            let day = String(date.getDate()).padStart(2, '0');
  
            return `${year}-${month}-${day}`;
          },
  
        },
        fetchSoDialogOk: async function () {
          let oTable = this.byId("_FetchSOTable");
          let aSelectedIndices = oTable.getSelectedIndices();
  
          if (!aSelectedIndices.length) {
            this.fetchSoDialog.close();
            return;
          }
  
          let salesOrder = "",  sQuantity, sUom, materialSelected,  mFlag = false;
  
          aSelectedIndices.forEach(function (iIndex) {
            let oContext = oTable.getContextByIndex(iIndex);
  
            salesOrder = oContext.getProperty("Vbeln");
            sQuantity = parseFloat(oContext.getProperty('quantity'));
            sUom = oContext.getProperty('uom');
            materialSelected = oContext.getProperty('Matnr');
          });
  
          // Show confirmation dialog before proceeding
          let that = this;
          sap.m.MessageBox.confirm("Are you sure you want to proceed with the selected Sales Order?", {
            actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
            onClose: function (oAction) {
              if (oAction === sap.m.MessageBox.Action.OK) {
  
                that.processSalesOrderAssign(salesOrder, materialSelected, mFlag, sQuantity, sUom);
                
                that.byId("_FetchSOTable").clearSelection();
              }
  
            }
          });
        },
  
        processSalesOrderAssign: async function (salesOrder, materialSelected, mFlag, sQuantity, sUom) {
          let oTable = this.byId("_IDGenTable2");
          let aSelectedIndices = oTable.getSelectedIndices();
  
          let parkingNo, vehicleNo, Soldtoparty, Driver, Cleaner, material;
          aSelectedIndices.forEach(function (iIndex) {
            let oContext = oTable.getContextByIndex(iIndex);
            parkingNo = oContext.getProperty("ParkingNo");
            vehicleNo = oContext.getProperty("VehicleNumber");
            Soldtoparty = oContext.getProperty("Soldtoparty");
            Driver = oContext.getProperty("Driver");
            Cleaner = oContext.getProperty("Cleaner");
            material = oContext.getProperty("Product");
          });
  
          let oModel = this.getOwnerComponent().getModel();
          let oBindList4 = oModel.bindList("/SchedulingSet");
  
          let payload2 = {
            "Parkingno": parkingNo,
            "DeliveryNo": "",
            "ShipmentNo": "",
            "SalesOrder": salesOrder,
            "Soldtoparty": Soldtoparty,
            "BillingNo": "",
            "Stockorder": "",
            "Startdate": null,
            "Enddate": null,
            "Starttime": null,
            "Endtime": null,
            "Material": material,
            "Quantity": sQuantity,
            "Uom": "KG", // sUom to be bind
            "Bayno": "",
            "Shiptoparty": "",
            "Vehicleno": vehicleNo,
            "Driver": Driver,
            "Cleaner": Cleaner,
          };
  
          this.fetchSoDialog.close();
          oTable.clearSelection();
  
          if (payload2.SalesOrder !== "") {
            if (!material) {
              payload2.Material = materialSelected;
              mFlag = true;
            }
  
            let that = this;
            oBindList4.create(payload2, true);
            oBindList4.attachCreateCompleted(async (p) => {
              try {
                let params = p.getParameters();
  
                if (params.success) {
                  let obj = params.context.getObject();
                  if (mFlag) {
                    let oBindList = oModel.bindList('/Park_headerSet2');
                    let aFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, parkingNo);
  
                    try {
                      await oBindList.filter(aFilter).requestContexts().then(function (aContexts) {
                        if (aContexts.length > 0) {
                          aContexts[0].setProperty('Product', materialSelected);
                          aContexts[0].setProperty('Status', 'SO / STO Created');
  
                          setTimeout(() => {
                            sap.m.MessageToast.show("Refreshing Table Data...");
                            that.onObjectMatched();
                          }, 2500);
                        } else {
                          sap.m.MessageBox.error("No matching entry found.");
                        }
                      });
                    } catch (err) {
                      console.error("Error while updating data: ", err);
                      sap.m.MessageBox.error("An error occurred while saving the data. Please try again.");
                    }
                  }
                } else {
                  let errorMsg = params.context.oModel.mMessages[""] ? params.context.oModel.mMessages[""][0].message : "An unknown error occurred.";
                  sap.m.MessageBox.error(`Error while entry in SchedulingSet: ${errorMsg}`);
                }
              } catch (err) {
                console.error("Error during createCompleted callback:", err);
                sap.m.MessageBox.error("An unexpected error occurred during saving data into entity 'SchedulingSet.'");
              }
            });
          }
        }
        ,
  
        // fetchSoDialogOk1: async function () {
        //   // fragment table
        //   let oTable = this.byId("_FetchSOTable");
        //   let aSelectedIndices = oTable.getSelectedIndices();
        //   if (!aSelectedIndices.length) {
        //     this.fetchSoDialog.close();
        //     return;
        //   }
  
        //   let salesOrder = "", parkingNo, vehicleNo, sQuantity, sUom, materialSelected, material, Soldtoparty, Driver, Cleaner, mFlag = false;
  
        //   aSelectedIndices.forEach(function (iIndex) {
        //     let oContext = oTable.getContextByIndex(iIndex);
  
        //     salesOrder = oContext.getProperty("Vbeln");
        //     sQuantity = parseFloat(oContext.getProperty('quantity'));
        //     sUom = oContext.getProperty('uom');
        //     materialSelected = oContext.getProperty('Matnr');
  
        //     console.log("selcted data so", salesOrder, sQuantity, sUom);
        //   });
        //   // oTable.clearSelection();
        //   // Main parkingNo data table
        //   oTable = this.byId("_IDGenTable2");
        //   aSelectedIndices = oTable.getSelectedIndices();
  
        //   aSelectedIndices.forEach(function (iIndex) {
        //     let oContext = oTable.getContextByIndex(iIndex);
        //     parkingNo = oContext.getProperty("ParkingNo");
        //     vehicleNo = oContext.getProperty("VehicleNumber");
        //     Soldtoparty = oContext.getProperty("Soldtoparty");
        //     Driver = oContext.getProperty("Driver");
        //     Cleaner = oContext.getProperty("Cleaner");
        //     material = oContext.getProperty("Product");
  
        //     console.log("parkingNo", parkingNo);
        //     console.log("vehicleNo", vehicleNo);
        //   });
  
        //   let oModel = this.getOwnerComponent().getModel();
        //   let oBindList4 = oModel.bindList("/SchedulingSet");
  
        //   let payload2 = {
        //     "Parkingno": parkingNo,
        //     "DeliveryNo": "",
        //     "ShipmentNo": "",
        //     "SalesOrder": salesOrder,
        //     "Soldtoparty": Soldtoparty,
        //     "BillingNo": "",
        //     "Stockorder": "",
        //     "Startdate": null,
        //     "Enddate": null,
        //     "Starttime": null,
        //     "Endtime": null,
        //     "Material": material,
        //     "Quantity": sQuantity,
        //     "Uom": "KG",
        //     "Bayno": "",
        //     "Shiptoparty": "",
        //     "Vehicleno": vehicleNo,
        //     "Driver": Driver,
        //     "Cleaner": Cleaner,
        //   };
        //   this.fetchSoDialog.close();
        //   oTable.clearSelection();
        //   // temporary commmet to understand its use
  
  
        //   let that = this;
        //   if (payload2.SalesOrder !== "") {
  
        //     if (!material) {
        //       payload2.Material = materialSelected;
        //       mFlag = true;
  
        //     }
        //     oBindList4.create(payload2, true);
        //     oBindList4.attachCreateCompleted(async (p) => {
        //       try {
        //         let params = p.getParameters();
        //         console.log("Create parameters:", params);
  
        //         if (params.success) {
  
        //           let obj = params.context.getObject();
        //           console.log("Created object:", obj);
        //           if (mFlag) {
  
        //             let oBindList = oModel.bindList('/Park_headerSet2');
        //             let aFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, parkingNo);
  
        //             try {
        //               await oBindList.filter(aFilter).requestContexts().then(function (aContexts) {
        //                 if (aContexts.length > 0) {
  
        //                   if (aContexts.length) {
  
        //                     aContexts[0].setProperty('Product', materialSelected);
        //                     aContexts[0].setProperty('Status', 'SO/ STO Created');
  
        //                   }
        //                   setTimeout(() => {
  
        //                     sap.m.MessageToast.show("Refreshing Table Data...");
        //                     that.onObjectMatched();
        //                   }, 2500)
        //                 } else {
        //                   sap.m.MessageBox.error("No matching entry Found.");
        //                 }
        //               });
  
        //               // sap.m.MessageBox.success("Data saved successfully.");
        //             } catch (err) {
        //               console.error("Error while updating data: ", err);
        //               sap.m.MessageBox.error("An error occurred while saving the data. Please try again.");
        //             }
  
        //           }
  
        //         } else {
  
        //           let errorMsg = params.context.oModel.mMessages[""] ? params.context.oModel.mMessages[""][0].message : "An unknown error occurred.";
        //           sap.m.MessageBox.error(`Error while entry in schedulingSet: ${errorMsg}`);
        //         }
        //       } catch (err) {
  
        //         console.error("Error during createCompleted callback:", err);
        //         sap.m.MessageBox.error("An unexpected error occurred during saving data into entity 'SchedulingSet.'");
        //       }
  
        //     })
  
        //   }
  
        // },
  
        fetchSoDialogCancel: function () {
          this.fetchSoDialog.close();
          this.byId('_IDGenTable2').clearSelection();
          this.byId('_FetchSOTable').clearSelection();
        },
  
        fetchSoapi: async function (matnr, OidShip) {
  
          let oModelgetfetchSo = this.getOwnerComponent().getModel();
          let sPath = `/fetchSo(Matnr='${matnr}',OidShip='${OidShip}')`;
  
          let oJSONModel = new sap.ui.model.json.JSONModel([]);
          try {
            const oBindinggetCust = oModelgetfetchSo.bindContext(sPath, null, {});
            const oData = await oBindinggetCust.requestObject();
  
            console.log("oData", oData)
            oJSONModel.setData(oData.value);
  
            this.getView().setModel(oJSONModel, "fetchSoModel");
  
            // let SalesOrder = oData.value[0].Vbeln
            // let Material = oData.value[0].Matnr
            // let Shipto = oData.value[0].OidShip
  
            // return {SalesOrder ,Material , Shipto}
  
          } catch (oError) {
            console.log("Error fetching SO data:", oError);
            if (oError.message.includes('No data found')) {
              oJSONModel.setData([]);
  
              this.getView().setModel(oJSONModel, "fetchSoModel");
            }
  
  
          }
  
        },
  
        FetchSo: async function () {
  
          if (!ParkingNoValidation) {
            sap.m.MessageBox.warning("Please select Parking No");
            return;
          }
          if (SalesOrderValidation) {
            sap.m.MessageBox.error("Sales Order already created for this entry.");
            return;
          }
          const oTable = this.byId("_IDGenTable2");
          const aSelectedIndices = oTable.getSelectedIndices();
          let matnr
          let OidShip
  
          aSelectedIndices.forEach(function (iIndex) {
            var oContext = oTable.getContextByIndex(iIndex);
  
            matnr = oContext.getProperty("Product"); // Corrected property path
            OidShip = oContext.getProperty("Soldtoparty"); // Corrected property path
  
          });
          console.log("matcode", matnr)
          console.log("shipToParty", OidShip)
          if (!OidShip) {
            sap.m.MessageToast.show("Assign the Customer First.")
            return
          }
  
          const fetchMat = await this.fetchSoapi(matnr, OidShip);
          // console.log("fetchMat", fetchMat)
  
          helperFunctions._openValueHelpDialog(this, 'fetchSoDialog', 'com.ingenx.qms.fangeneration.fragments.FetchSo');
  
  
        },
        printFan: async function () {
          if (!ParkingNoValidation) {
              sap.m.MessageBox.warning("Please select Parking No");
              return;
          }
      
          const oTable = this.byId("_IDGenTable2");
          let aSelectedIndices = oTable.getSelectedIndices();
          let fetchModel = this.getOwnerComponent().getModel();
      
          let rowData = [];
          let matcode, shipToParty, parkingNo, vehicleNo, Destination, bayno;
      
          // Fetch all shipment value help data once
          let shipmentValueHelpContexts = await fetchModel.bindList("/xIQMSxshipTas_valuehelp").requestContexts();
          console.log(shipmentValueHelpContexts);
          
          let shipmentDataList = shipmentValueHelpContexts.map(ctx => ctx.getObject());
      
          for (let i = 0; i < aSelectedIndices.length; i++) {
              let iIndex = aSelectedIndices[i];
              let oContext = oTable.getContextByIndex(iIndex);
      
              matcode = oContext.getProperty("Product") || "N/A";
              shipToParty = oContext.getProperty("Soldtoparty") || "N/A";
              parkingNo = oContext.getProperty("ParkingNo") || "N/A";
              vehicleNo = oContext.getProperty("VehicleNumber") || "N/A";
              Destination = oContext.getProperty("Destination") || "N/A";
              let salesOrder = oContext.getProperty("SalesOrder") || "N/A";
              let DeliveryNo = oContext.getProperty("DeliveryNo") || "N/A";
              let ShipmentNo = oContext.getProperty("ShipmentNo") || "N/A";
              let Quantity = oContext.getProperty("Quantity") || "N/A";
              bayno = oContext.getProperty("Bayno") || "Unknown"
      
              let RfId = "N/A";
              let TouchKey = "N/A";
      
              if (ShipmentNo) {
                  let shipmentMatch = shipmentDataList.find(entry => entry.Shipment === ShipmentNo);
                  if (shipmentMatch) {
                      RfId = shipmentMatch.Rfid || "N/A";
                      TouchKey = shipmentMatch.Tochkey || "N/A";
                  }
              }
      
              rowData.push([salesOrder, DeliveryNo, ShipmentNo, matcode, Quantity, RfId, TouchKey]);
          }
      
          let filterDriverName = mergedData.filter(data => data.ParkingNo === parkingNo);
          let driverName = filterDriverName.length > 0 ? filterDriverName[0].Driver : "N/A";
      
          const { jsPDF } = PDF;
          const doc = new jsPDF();
      
          const startXLabel = 40;
          const startXValue = 120;
          const startY = 50;
          const lineHeight = 10;
      
          // Company Header
          doc.setFontSize(20);
          doc.setFont(undefined, 'bold');
          doc.text("XYZ Logistics Company Pvt. Ltd.", 105, 20, { align: "center" });
      
          doc.setFontSize(16);
          // doc.setTextColor(100); // Medium gray

          doc.setFont(undefined, 'normal');

          doc.text("Filling Advise Note", 105, 30, { align: "center" });
      
          doc.setFontSize(12);
      
          // Main Info
          doc.text("1. Parking No:", startXLabel, startY);
          doc.text(parkingNo, startXValue, startY);
      
          doc.text("2. Vehicle No:", startXLabel, startY + lineHeight);
          doc.text(vehicleNo, startXValue, startY + lineHeight);
      
          doc.text("3. Driver Name:", startXLabel, startY + 2 * lineHeight);
          doc.text(driverName, startXValue, startY + 2 * lineHeight);
      
          doc.text("4. Destination:", startXLabel, startY + 3 * lineHeight);
          doc.text(Destination, startXValue, startY + 3 * lineHeight);
      
          doc.text("5. Customer:", startXLabel, startY + 4 * lineHeight);
          doc.text(shipToParty, startXValue, startY + 4 * lineHeight);
      
          doc.text("6. Bay No:", startXLabel, startY + 5 * lineHeight);
          doc.text(bayno, startXValue, startY + 5 * lineHeight);
      
          // Table
          const tableStartY = startY + 7 * lineHeight;
          doc.autoTable({
              head: [['Sales Order', 'Delivery No.', 'Shipment No.', 'Material', 'Qty', 'RfId', 'TouchKey']],
              body: rowData,
              startY: tableStartY
          });
      
          // Signature section
          const signatureY = doc.lastAutoTable.finalY + 20;
          const lineWidth = 50;
      
          doc.setFontSize(12);
      
          doc.text("Authorized Signature", 20, signatureY);
          doc.line(20, signatureY + 2, 20 + lineWidth, signatureY + 2);
      
          doc.text("Driver Signature", 140, signatureY);
          doc.line(140, signatureY + 2, 140 + lineWidth, signatureY + 2);
      
          const row2Y = signatureY + 20;
          doc.text("Security Signature", 20, row2Y);
          doc.line(20, row2Y + 2, 20 + lineWidth, row2Y + 2);
      
          doc.text("Gate Signature", 140, row2Y);
          doc.line(140, row2Y + 2, 140 + lineWidth, row2Y + 2);
      
          // Date Line
          doc.text("Date:", 20, row2Y + 20);
          doc.line(35, row2Y + 20, 80, row2Y + 20);
      
          // // QR Code (requires QRious loaded globally via <script>)
          // let qr = new QRious({
          //     value: `ParkingNo: ${parkingNo}\nVehicleNo: ${vehicleNo}\nShipmentNo: ${rowData[0]?.[2] || 'N/A'}`,
          //     size: 100
          // });
          // let qrImage = qr.toDataURL();
          // doc.addImage(qrImage, 'PNG', 150, row2Y + 5, 40, 40);
      
          // Final output
          doc.output("dataurlnewwindow");
      
          // Clear table selection
          this.byId('_IDGenTable2').clearSelection();
      }
,      
      
  
        fetchMaterialData: async function (matcode) {
  
          let oModelgetCust = this.getOwnerComponent().getModel();
          let sPath = `/getfromMaterial(matnr='${matcode}')`;
  
          try {
            const oBindinggetMatnr = oModelgetCust.bindContext(sPath, null, {});
            const oData = await oBindinggetMatnr.requestObject();
  
            let SalesOrg = oData.value[0].vkorg
            let Division = oData.value[0].spart;
            let DistrChan = oData.value[0].vtweg;
            let Material = oData.value[0].matnr;
  
            return { SalesOrg, DistrChan, Division, Material };
  
          } catch (oError) {
            console.error("Error fetching data:", oError);
          }
        },
  
        onExit(){
          sap.ui.core.BusyIndicator.hide();
        },

        fetchVehicleMasterData: async function (Vehicle) {
          let oModelgetCust = this.getOwnerComponent().getModel();
          let sPath = `/getVehMaxvol(Vehicle='${Vehicle}')`;
  
          try {
            const oBindinggetCust = oModelgetCust.bindContext(sPath, null, {});
            const oData = await oBindinggetCust.requestObject();
  
            let VehMaxvol = oData.value[0].VehMaxvol;
  
            let trquant = oData.value[0].trquant;
            let TuNumber = oData.value[0].TuNumber
            return oData.value;
  
            return { VehMaxvol, trquant, TuNumber }
          } catch (oError) {
            console.error("Error fetching data:", oError);
  
          }
  
        },
        pressCreateSo: async function () {
          if (!ParkingNoValidation && !SalesOrderValidation && !DeliveryNoValidation && !shipmentNoValidation && !statusValidation) {
            sap.m.MessageBox.warning("Please Select a Parking No.");
            return;
          }
          if (SalesOrderValidation) {
            sap.m.MessageBox.warning("Sales Order already created.");
            return;
          }
          if (statusValidation && statusValidation.includes('Vehicle Master Missing')) {
            sap.m.MessageBox.warning("Please Create Vehicle Master Data first.");
            return;
          }
  
          try {
            // Open the fragment and wait for it to fully load
            let oDialog = await helperFunctions._openValueHelpDialog(this, 'assignMaterialQuantity_dialog', 'com.ingenx.qms.fangeneration.fragments.AssignMaterialQty');
  
            // Get the selected row from the table
            const oTable = this.byId("_IDGenTable2");
            let iIndex = oTable.getSelectedIndex();
  
            if (iIndex !== -1) {
              let oContext = oTable.getContextByIndex(iIndex);
              let matcode = oContext.getProperty("Product");
  
              // Find the Input field inside the loaded fragment
              // let oInput = Fragment.byId(this.getView().getId(), "matInput_frag_id");
              let oSelect = Fragment.byId(this.getView().getId(), "_IdMaterialSelect");
  
              if (oSelect) {
                oSelect.setSelectedKey(matcode);
              } else {
                console.error("Fragment input field not found!");
              }
            } else {
              sap.m.MessageToast.show("Please select a row first.");
            }
          } catch (error) {
            console.error("Error opening the dialog:", error);
          }
  
        },
        onSubmitMaterialQty: function () {
          let oView = this.getView();
          let oSelect = Fragment.byId(oView.getId(), '_IdMaterialSelect');
          let sMaterial = oSelect.getSelectedKey();
  
  
          // Access Quantity Input Field
          let oQtyInput = Fragment.byId(oView.getId(), "qty_frag_id");
          let sQuantity = oQtyInput.getValue(); // Get Quantity Value
  
          // Access UoM Select Field
          let oUomSelect = Fragment.byId(oView.getId(), "_IdUomSelect");
          let sUom = oUomSelect.getSelectedKey(); // Get Selected UoM Value
  
          // Log values (for debugging)
          console.log("Selected Quantity:", sQuantity);
          console.log("Selected UoM:", sUom);
  
          // Validation Check
          if (!sQuantity || isNaN(sQuantity)) {
            sap.m.MessageToast.show("Please enter a valid Quantity");
            return;
          }
          if (!sUom) {
            sap.m.MessageToast.show("Please select a Unit");
            return;
          }
  
          // Perform your further logic (e.g., saving data, closing dialog, etc.)
          // sap.m.MessageToast.show(`Submitted: ${sQuantity} ${sUom}`);
  
          // Close Dialog if needed
          let oDialog = Fragment.byId(oView.getId(), "assignMaterialQuantity_dialog");
          if (oDialog) {
            oDialog.close();
          }
  
          // Executing CreateSo fn with passing params - unit and Qty
          let qtyFloat = parseFloat(sQuantity);
          this.CreateSo(sUom, qtyFloat, sMaterial);
        },
  
        onCloseMaterialQtyDialog: function () {
          this.assignMaterialQuantity_dialog.close();
        },
  
        CreateSo: async function (sUom, sQuantity, selectedMaterial) {
          try {
            sap.ui.core.BusyIndicator.show(0);
  
            let currentDate = new Date().toISOString().split('T')[0];
            let createdDate = currentDate + "T00:00:00Z";
            let now = new Date();
            let time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  
            let matcode, Soldtoparty, parkingNo, Vehicle, Driver, Cleaner;
            let oTable = this.byId("_IDGenTable2");
            let aSelectedIndices = oTable.getSelectedIndices();
  
            aSelectedIndices.forEach(function (iIndex) {
              let oContext = oTable.getContextByIndex(iIndex);
              matcode = oContext.getProperty("Product");
              Soldtoparty = oContext.getProperty("Soldtoparty");
              parkingNo = oContext.getProperty("ParkingNo");
              Vehicle = oContext.getProperty("VehicleNumber");
              Driver = oContext.getProperty("Driver");
              Cleaner = oContext.getProperty("Cleaner");
            });
  
            console.log("Selected Customer Code:", matcode);
            console.log("shipToParty:", Soldtoparty);
            console.log("vehicleNo", Vehicle);
            console.log("date n time ", createdDate, time);
  
            if (!matcode) {
              matcode = selectedMaterial;
            }
            const materialData = await this.fetchMaterialData(matcode);
  
            if (!materialData) {
              throw new Error("Material data could not be retrieved.");
            }
  
            let { SalesOrg, Division, DistrChan, Material } = materialData;
  
            let payload = {
              "Vbeln": "",
              "VehicleNumber": Vehicle,
              "so_nav_head": [{
                "DocType": "ZGOR",
                "SalesOrg": SalesOrg,
                "DistrChan": DistrChan,
                "Division": Division,
                "PurchNoC": "TEST"
              }],
              "so_nav_item": [{
                "ItmNumber": "10",
                "Material": Material,
                "Plant": "GP01"
              }],
              "so_nav_partner": [{
                "PartnRole": "SH",
                "PartnNumb": Soldtoparty
              }, {
                "PartnRole": "SP",
                "PartnNumb": Soldtoparty
              }],
              "so_nav_schedule": [{
                "ItmNumber": "10",
                "ReqQty": sQuantity
              }],
              "so_nav_return": []
            };
  
            console.log("Payload ", payload);
  
            let oModel = this.getOwnerComponent().getModel();
            let oBindList4 = oModel.bindList("/so_createSet");
  
            let newPayload = {
              "Parkingno": parkingNo,
              "DeliveryNo": "",
              "ShipmentNo": "",
              "SalesOrder": "",
              "Soldtoparty": Soldtoparty,
              "BillingNo": "",
              "Stockorder": "",
              "Startdate": null,
              "Enddate": null,
              "Starttime": null,
              "Endtime": null,
              "Material": Material,
              "Quantity": sQuantity,
              "Uom": sUom,
              "Bayno": "",
              "Shiptoparty": "",
              "Vehicleno": Vehicle,
              "Driver": Driver,
              "Cleaner": Cleaner,
            };
  
            oBindList4.create(payload, true);
  
            let that = this;
            oBindList4.attachCreateCompleted(async (oEvent) => {
              try {
                let params = oEvent.getParameters();
                if (params.success) {
                  let response = params.context.getObject();
                  console.log('responseSO', response);
  
                  let vblen = response.Vbeln;
                  // pushing SO
  
                  let returnMessages = response.so_nav_return || [];
                  let errorMessages = returnMessages.filter(msg => msg.Type === "E");
  
                  if (errorMessages.length > 0 || !response.Vbeln) {
                    let errorText = errorMessages.map(msg => msg.Message).join("\n") || "Sales Order number is missing from backend response.";
                    throw new Error("Sales Order creation failed:\n" + errorText);
                  }
                  if (vblen) {
  
                    newPayload.SalesOrder = vblen;
                  }
  
                  sap.m.MessageBox.show("Sales Order " + vblen + " created", {
                    title: "Success",
                    icon: sap.m.MessageBox.Icon.SUCCESS,
                    actions: [sap.m.MessageBox.Action.OK],
                  });
  
                  // 1. Create entry in SchedulingSet
                  let oBindListSoDocument = oModel.bindList("/SchedulingSet");
                  oBindListSoDocument.create(newPayload, true);
  
                  // 2. Update park_itemSet2
                  let oBindListItem = oModel.bindList("/park_itemSet2");
                  let aFilterItem = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, parkingNo);
  
                  await oBindListItem.filter(aFilterItem).requestContexts().then(function (aContexts) {
                    if (aContexts.length > 0) {
  
                      aContexts[0].setProperty("Salesordertime", time);
                      aContexts[0].setProperty("Salesorderdate", createdDate);
                    } else {
                      console.warn("No matching entries found in park_itemSet2 for ParkingNo update.");
                    }
                  });
  
                  // 3. Update Park_headerSet2
                  let oBindListHeader = oModel.bindList("/Park_headerSet2");
                  let aFilterHeader = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, parkingNo);
  
                  await oBindListHeader.filter(aFilterHeader).requestContexts().then(function (aContexts) {
                    if (aContexts.length > 0) {
                      aContexts[0].setProperty("Status", "SO / STO Created");
                      aContexts[0].setProperty("Product", Material);
                    } else {
                      console.warn("No matching entries found in Park_headerSet2 for ParkingNo update.");
                    }
                  });
  
                  setTimeout(() => { that.onObjectMatched(); }, 2500);
                }
              } catch (error) {
                console.error("Error in create completion:", error);
                sap.m.MessageBox.error(error.message || "An error occurred while processing the Sales Order.");
              } finally {
                sap.ui.core.BusyIndicator.hide();
              }
            });
  
          } catch (error) {
            console.error("CreateSo failed:", error);
            sap.m.MessageBox.error(error.message);
          } finally {
            sap.ui.core.BusyIndicator.hide();
            this.byId('_IDGenTable2').clearSelection();
          }
        },
  
  
        // CreateSo: async function (sUom, sQuantity) {
  
        //   try {
  
        //     sap.ui.core.BusyIndicator.show(0);
  
        //     let currentDate = new Date().toISOString().split('T')[0];
        //     let createdDate = currentDate + "T00:00:00Z";
        //     let now = new Date();
        //     let time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  
        //     let matcode, shipToParty, parkingNo, Vehicle, Driver, Cleaner;
        //     let oTable = this.byId("_IDGenTable2");
        //     let aSelectedIndices = oTable.getSelectedIndices();
  
        //     aSelectedIndices.forEach(function (iIndex) {
        //       let oContext = oTable.getContextByIndex(iIndex);
        //       matcode = oContext.getProperty("Product");
        //       Soldtoparty = oContext.getProperty("Soldtoparty");
        //       parkingNo = oContext.getProperty("ParkingNo");
        //       Vehicle = oContext.getProperty("VehicleNumber");
        //     });
  
        //     console.log("Selected Customer Code:", matcode);
        //     console.log("shipToParty:", Soldtoparty);
        //     console.log("vehicleNo", Vehicle);
  
        //     const materialData = await this.fetchMaterialData(matcode);
        //     console.log("materialData", materialData);
  
        //     if (!materialData) {
        //       throw new Error("Material data could not be retrieved.");
        //     }
  
        //     let { SalesOrg, Division, DistrChan, Material } = materialData;
        //     // const VehicleMasterData = await this.fetchVehicleMasterData(Vehicle);
  
        //     // if (!VehicleMasterData || VehicleMasterData.length === 0) {
        //     //   throw new Error("Vehicle Master Data could not be retrieved.");
        //     // }
  
        //     // let VehObj = VehicleMasterData[0];
        //     // let VehMaxVol = Number(VehObj.VehMaxvol);
  
        //     // temporary payload
        //     let payload = {
        //       "Vbeln": "",
        //       "VehicleNumber": Vehicle,
        //       "so_nav_head": [
        //         {
        //           "DocType": "ZGOR",
        //           "SalesOrg": SalesOrg,
        //           "DistrChan": DistrChan,
        //           "Division": Division,
        //           "PurchNoC": "TEST"
        //         }
        //       ],
        //       "so_nav_item": [
        //         {
        //           "ItmNumber": "10",
        //           "Material": Material,
        //           "Plant": "GP01"
        //         }
        //       ],
        //       "so_nav_partner": [
        //         {
        //           "PartnRole": "SH",
        //           "PartnNumb": Soldtoparty
        //         },
        //         {
        //           "PartnRole": "SP",
        //           "PartnNumb": Soldtoparty
        //         }
        //       ],
        //       "so_nav_schedule": [
        //         {
        //           "ItmNumber": "10",
        //           "ReqQty": sQuantity
        //         }
        //       ],
        //       "so_nav_return": []
        //     };
  
  
        //     console.log("Payload ", payload);
  
  
        //     let oModel = this.getOwnerComponent().getModel();
        //     let oBindList4 = oModel.bindList("/so_createSet");
  
  
        //     // oBindList4.create(payload, true);
        //     let newPayload = {
        //       "Parkingno": parkingNo,
        //       "DeliveryNo": "",
        //       "ShipmentNo": "",
        //       "SalesOrder": "",
        //       "Soldtoparty":Soldtoparty ,
        //       "BillingNo": "",
        //       "Stockorder": "",
        //       "Startdate": null,
        //       "Enddate": null,
        //       "Starttime": null,
        //       "Endtime": null,
        //       "Material": Material,
        //       "Quantity": sQuantity,
        //       "Uom": sUom,
        //       "Bayno": "",
        //       "Shiptoparty": "",
        //       "Vehicleno": Vehicle,
        //       "Driver": Driver,
        //       "Cleaner": Cleaner,
        //     }  
        //     let that = this;
        //     oBindList4.attachCreateCompleted(async (oEvent) => {
        //       try {
        //         let params = oEvent.getParameters();
        //         if (params.success) {
        //           let response = params.context.getObject();
        //           console.log("response", response);
        //           let vblen = response.Vbeln;
  
        //           // let payload2 = {
        //           //   "ParkingNo": parkingNo,
        //           //   "VehicleNumber": Vehicle,
        //           //   "SalesOrder": vblen,
        //           //   "DeliveryNo": "",
        //           //   "ShipmentNo": "",
        //           //   "BillingNo": ""
        //           // };
        //           newPayload.Vbeln = vblen;
  
  
        //           sap.m.MessageBox.show("Sales Order " + vblen + " created", {
        //             title: "Success",
        //             icon: sap.m.MessageBox.Icon.SUCCESS,
        //             actions: [sap.m.MessageBox.Action.OK],
        //           });
  
        //           let oBindListSoDocument = oModel.bindList("/SchedulingSet");
        //           oBindListSoDocument.create(newPayload, true);
  
        //           let oBindList = oModel.bindList("/park_itemSet2");
        //           let aFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, parkingNo);
  
        //           await oBindList.filter(aFilter).requestContexts().then(function (aContexts) {
        //             if (aContexts.length > 0) {
        //               aContexts[0].setProperty("Status", "SO / STO Created");
        //               aContexts[0].setProperty("Salesordertime", time);
        //               aContexts[0].setProperty("Salesorderdate", createdDate);
        //             } else {
        //               console.warn("No matching entries found for ParkingNo update.");
        //             }
        //           });
  
        //           setTimeout(() => { that.onObjectMatched(); }, 2500);
        //         }
        //       } catch (error) {
        //         console.error("Error in create completion:", error);
        //         sap.m.MessageBox.error("An error occurred while processing the Sales Order.");
        //       } finally {
        //         sap.ui.core.BusyIndicator.hide();
  
        //       }
        //     });
  
        //   } catch (error) {
        //     console.error("CreateSo failed:", error);
        //     sap.m.MessageBox.error(error.message);
        //   } finally {
        //     sap.ui.core.BusyIndicator.hide();
        //     this.byId('_IDGenTable2').clearSelection();
  
        //   }
        // },
  
        createDelivery: async function () {
          sap.ui.core.BusyIndicator.show(0);
  
          try {
            //  Frontend validations
            if (!ParkingNoValidation && !SalesOrderValidation && !DeliveryNoValidation && !shipmentNoValidation && !statusValidation) {
              sap.m.MessageBox.warning("Please Select a Parking No.");
              return;
            } else if (!SalesOrderValidation) {
              sap.m.MessageBox.warning("Please create Sales Order first.");
              return;
            } else if (DeliveryNoValidation) {
              sap.m.MessageBox.warning("Delivery already created for this entry.");
              return;
            }
  
            //  Prepare Date & Time
            let currentDate = new Date().toISOString().split('T')[0];
            let createdDate = `${currentDate}T00:00:00Z`;
            let now = new Date();
            let time = now.toTimeString().split(" ")[0]; // HH:MM:SS
  
            //  Extract selected row details from table
            let parkingNo, Vehicle, salesOrder, Quantity;
            const oTable = this.byId("_IDGenTable2");
            let aSelectedIndices = oTable.getSelectedIndices();
  
            aSelectedIndices.forEach(iIndex => {
              const oContext = oTable.getContextByIndex(iIndex);
              salesOrder = oContext.getProperty("SalesOrder");
              Vehicle = oContext.getProperty("VehicleNumber");
              parkingNo = oContext.getProperty("ParkingNo");
              Quantity = parseFloat(oContext.getProperty("Quantity"));
            });
  
            //  Build delivery payload
            let payloadDelivery = {
              "DelivNumb": "",
              "NumDelivery": "",
              "del_nav_items": [
                {
                  "RefDoc": salesOrder,
                  "RefItem": "10",
                  "DlvQty": Quantity,
                  "SalesUnit": "l"
                }
              ],
              "del_nav_return": []
            };
  
            console.log("Payload Delivery:", payloadDelivery);
            let oModel = this.getOwnerComponent().getModel();
            let oBindList4 = oModel.bindList("/delivery_createSet");
  
            sap.m.MessageToast.show("Creating Delivery ...");
  
            //  Async create delivery via Promise
            const context = await new Promise((resolve, reject) => {
              const ctx = oBindList4.create(payloadDelivery, true);
              oBindList4.attachCreateCompleted((oEvent) => {
                let params = oEvent.getParameters();
                if (params.success) {
                  resolve(params.context);
                } else {
                  reject(new Error("Backend rejected delivery creation."));
                }
              });
            });
  
            //  Read delivery response
            let response = context.getObject();
            let DelivNumb = response.DelivNumb;
            let returnMessages = response.del_nav_return || [];
            console.log("delivery No, date and time", DelivNumb, createdDate, time);
            
  
            //  Check for backend error messages
            const errorMessages = returnMessages.filter(msg => msg.Type === "E");
            if (errorMessages.length > 0 || !DelivNumb) {
              const errorText = errorMessages.map(msg => msg.Message).join("\n") ||
                "Delivery number is missing from backend response.";
              throw new Error("Delivery creation failed:\n" + errorText);
            }
  
            //  Success Message
            sap.m.MessageBox.success("Delivery No " + DelivNumb + " created", {
              title: "Success",
              icon: sap.m.MessageBox.Icon.SUCCESS,
              actions: [sap.m.MessageBox.Action.OK]
            });
  
            //  Update Delivery Date & Time
            let oBindList = oModel.bindList("/Park_headerSet2");
            let aFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, parkingNo);
  
            await oBindList.filter(aFilter).requestContexts().then(function (aContexts) {
              if (aContexts.length > 0) {
                aContexts[0].setProperty("Status", 'Delivery Created');
              }
            });
  
            let oBindListItem = oModel.bindList("/park_itemSet2");
            let aFilterItem = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, parkingNo);
  
            await oBindListItem.filter(aFilterItem).requestContexts().then(function (aContexts) {
              if (aContexts.length > 0) {
                aContexts[0].setProperty("Deliverytime", time);
                aContexts[0].setProperty("Deliverydate", createdDate);
              }
            });
  
            //  Update SchedulingSet with Delivery Number
            const contextBinding = oModel.bindContext(`/SchedulingSet(SalesOrder='${salesOrder}',Stockorder='')`, null, { $$updateGroupId: "myUpdateGroup" });
            const obj = await contextBinding.requestObject();
  
            if (obj) {
              const contextSched = contextBinding.getBoundContext();
              contextSched.setProperty('DeliveryNo', DelivNumb);
              await oModel.submitBatch("myUpdateGroup");
            }
  
            // Refresh after success
            setTimeout(() => {
              sap.m.MessageToast.show("Refreshing table data ...");
              this.onObjectMatched();
            }, 2500);
  
          } catch (error) {
            console.error("Error in createDelivery function:", error.message);
            sap.m.MessageBox.error(error.message);
          } finally {
            sap.ui.core.BusyIndicator.hide();
            this.byId('_IDGenTable2').clearSelection();
          }
        }
        ,
  
  
        onClickShipment: function () {
          if (!ParkingNoValidation && !SalesOrderValidation && !DeliveryNoValidation && !shipmentNoValidation && !statusValidation) {
            sap.m.MessageBox.warning("Please Select a Parking No.");
            return
          }
  
          else if (!SalesOrderValidation && !DeliveryNoValidation) {
            sap.m.MessageBox.warning("Please create Sales Order and Delivery first.");
            return
          }
  
          else if (!SalesOrderValidation) {
            sap.m.MessageBox.warning("Please create Sales Order first.");
            return
          }
  
          else if (!DeliveryNoValidation) {
            sap.m.MessageBox.warning("Please create Delivery first.");
            return
          }
  
          else if (shipmentNoValidation) {
            sap.m.MessageBox.warning("Shipment already created for this entry.");
            this.byId('_IDGenTable2').clearSelection();
  
            return
          }
          helperFunctions._openValueHelpDialog(this, 'createShipmentDialog', 'com.ingenx.qms.fangeneration.fragments.ShipToTas');
  
        },
  
        onCloseShipment: function () {
          this.createShipmentDialog.close();
        },
  
        CreateShipment: async function () {
          try {
            // sap.ui.core.BusyIndicator.show(0);
  
            let TouchKey = this.getView().byId("TouchKey_ifvans").getValue();
            let rfidValue = this.getView().byId("Rfid_idvans").getValue();
            let parsedRfidValue = parseInt(rfidValue, 10);
            let oTable = this.getView().byId("_IDGenTable2");
            let Shnumber;
            let currentDate = new Date().toISOString().split('T')[0];
            let createdDate = currentDate + "T00:00:00Z";
            let now = new Date();
            let hours = String(now.getHours()).padStart(2, '0');
            let minutes = String(now.getMinutes()).padStart(2, '0');
            let seconds = String(now.getSeconds()).padStart(2, '0');
            let time = `${hours}:${minutes}:${seconds}`;
  
            console.log("TouchKey", TouchKey);
            console.log("rfid", parsedRfidValue);
  
            let Vehicle, parkingNo, salesOrder, DeliveryNo, Matcode, TuNumber, ShipTo;
  
            let aSelectedIndices = oTable.getSelectedIndices();
            aSelectedIndices.forEach(function (iIndex) {
              let oContext = oTable.getContextByIndex(iIndex);
              salesOrder = oContext.getProperty("SalesOrder");
              Matcode = oContext.getProperty("Product");
              Vehicle = oContext.getProperty("VehicleNumber");
              parkingNo = oContext.getProperty("ParkingNo");
              DeliveryNo = oContext.getProperty("DeliveryNo");
              ShipTo = oContext.getProperty("Soldtoparty");
            });
  
            const VehicleMasterDataShip = await this.fetchVehicleMasterData(Vehicle);
            let totalTrquat = Number(VehicleMasterDataShip[0].VehMaxvol);
            console.log("totalTrquat or vehmaxVol", totalTrquat);
            let trquant = Number(VehicleMasterDataShip[0].trquant);
            console.log("trquant", trquant);
  
            let to_oigisvmq = [];
            VehicleMasterDataShip.forEach(function (vehicleData, index) {
              TuNumber = vehicleData.TuNumber;
              to_oigisvmq.push({
                "Item": "00010",
                "DocTyp": "J",
                "DocNumber": DeliveryNo,
                "Posnr": "000010",
                "Vehicle": Vehicle,
                "TuNumber": TuNumber,
                "SeqNmbr": (index + 1).toString(),
                "Truom": "L",
                "TdAction": "1",
                "Matnr": Matcode,
                "Trqty": trquant,
                "Updateflag": "H"
              });
            });
  
            console.log("to_oigisvmq", to_oigisvmq);
  
            let createShipemtPayload = {
              "Shnumber": "",
              "to_header": [
                {
                  "Shtype": "TT01",
                  "Tplst": "ZT01",
                  "Updateflag": "H"
                }
              ],
              "to_oigisv": [
                {
                  "Vehicle": Vehicle,
                  "Updateflag": "H"
                }
              ],
              "to_oigisvd": [
                {
                  "Vehicle": Vehicle,
                  "Drivercode": "1",
                  "Updateflag": "H"
                }
              ],
              "to_oigisvmq": to_oigisvmq,
              "to_oigisiq": [
                {
                  "DocTyp": "J",
                  "DocNumber": DeliveryNo,
                  "Posnr": "000010",
                  "Trqty": totalTrquat,
                  "Updateflag": "H"
                }
              ],
              "to_oigisi": [
                {
                  "DocNumber": DeliveryNo,
                  "DocTyp": "J",
                  "Updateflag": "H"
                }
              ],
              "to_return": []
            };
  
            console.log("createShipemtPayload", createShipemtPayload);
  
            let oModel = this.getOwnerComponent().getModel();
            let oBindList4 = oModel.bindList("/PO_SHNUMBERSet");
  
            oBindList4.create(createShipemtPayload, true);
            let that = this;
  
            oBindList4.attachCreateCompleted(async (oEvent) => {
              try {
                let params = oEvent.getParameters();
  
                if (params.success) {
                  let response = params.context.getObject();
                  // console.log("response", response);
                  Shnumber = response.Shnumber;
                  console.log("Shipment no", Shnumber);
  
                  sap.m.MessageBox.show(`Shipment No ${Shnumber} created`, {
                    title: "Success",
                    icon: sap.m.MessageBox.Icon.SUCCESS,
                    actions: [sap.m.MessageBox.Action.OK],
                  });
                  this.rfidValue = parsedRfidValue;
                  this.TouchKey = TouchKey
  
                  let payloadShipToTas = {
                    "Shipment": Shnumber,
                    "Material": Matcode,
                    "Truckno": Vehicle,
                    "Tochkey": TouchKey,
                    "Rfid": parsedRfidValue,
                    "Bayno": "3",
                    "Errorcode": 2,
                    "Errordefin": "TEST"
                  };
                  console.log("payloadShipToTas", payloadShipToTas);
  
                  let oBindList1 = oModel.bindList("/shipTasSet");
                  
                  let oBindListiHeader= oModel.bindList("/Park_headerSet2");
                  const aFilterHeader = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, parkingNo);
                  
                  let aContexts = await oBindListiHeader.filter(aFilterHeader).requestContexts();
                  if (aContexts.length > 0) {
                    aContexts[0].setProperty("Status", "LAN Created");
                    
                  }
                  let oBindListitem = oModel.bindList("/park_itemSet2");
                  const aFilteritem = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, parkingNo);
                  
                  let aContexts1 = await oBindListitem.filter(aFilteritem).requestContexts();
                  if (aContexts1.length > 0) {
                    
                    aContexts1[0].setProperty("LanTime", time);
                    aContexts1[0].setProperty("LanDate", createdDate);
                  }
                  
                  let oBindList = oModel.bindList("/SchedulingSet");
                  // let aFilter = new sap.ui.model.Filter("SalesOrder", sap.ui.model.FilterOperator.EQ, salesOrder);
                  
                  let aContextsSo = await oBindList.requestContexts();
                  if (aContextsSo.length > 0) {
                    let acontext1 = aContextsSo.filter( item => item.getObject().SalesOrder === salesOrder);
                    acontext1[0].setProperty("ShipmentNo", Shnumber);
                  }
                  // creating ship to Tas
                  oBindList1.create(payloadShipToTas, true);
  
                } else {
                  console.error("Error in creating Shipment");
                  sap.m.MessageBox.error("Error in creating Shipment");
                }
              } catch (err) {
                console.error("Error in attachCreateCompleted:", err);
                sap.m.MessageBox.error("An unexpected error occurred.");
              } finally {
                that.createShipmentDialog.close();
                setTimeout(function () { that.onObjectMatched() }, 2500);
              }
            });
          } catch (error) {
            console.error("Error in CreateShipment function:", error);
            sap.m.MessageBox.error("An unexpected error occurred while creating the shipment.");
            // this.createShipmentDialog.close();
          } finally {
            this.createShipmentDialog.close();
            this.byId('_IDGenTable2').clearSelection();
  
          }
        },
  
  
        onUpdate: function () {
          helperFunctions._openValueHelpDialog(this, 'updateLicenseDialog', 'com.ingenx.qms.fangeneration.fragments.UpdateLicence');
  
        },
        onSelectFetchSOTable: function (oEvent) {
          const oTable = oEvent.getSource();
          let aSelectedIndices = oTable.getSelectedIndices();
  
          // Get the clicked checkbox index from the event
          const iClickedIndex = oEvent.getParameter("rowIndex");
  
          // Check if more than one checkbox is selected
          if (aSelectedIndices.length > 1) {
            // Clear all previous selections and keep only the last clicked checkbox
            oTable.clearSelection();
            oTable.addSelectionInterval(iClickedIndex, iClickedIndex); // Select the latest clicked checkbox
            aSelectedIndices = [iClickedIndex]; // Update to hold only the latest selected index
          }
  
        },
  
        onSelectTable: function (oEvent) {
          const oTable = oEvent.getSource();
          let aSelectedIndices = oTable.getSelectedIndices();
  
          // Get the clicked checkbox index from the event
          const iClickedIndex = oEvent.getParameter("rowIndex");
  
          // Check if more than one checkbox is selected
          if (aSelectedIndices.length > 1) {
            // Clear all previous selections and keep only the last clicked checkbox
            oTable.clearSelection();
            oTable.addSelectionInterval(iClickedIndex, iClickedIndex); // Select the latest clicked checkbox
            aSelectedIndices = [iClickedIndex]; // Update to hold only the latest selected index
          }
  
          const aSelectedData = aSelectedIndices.map(function (iIndex) {
            let oContext = oTable.getContextByIndex(iIndex);
            return {
              ParkingNo: oContext.getProperty("ParkingNo"),
              SalesOrder: oContext.getProperty("SalesOrder"),
              DeliveryNo: oContext.getProperty("DeliveryNo"),
              ShipmentNo: oContext.getProperty("ShipmentNo"),
              Status: oContext.getProperty("Status")
            };
          });
  
          // Reset validation variables if no row is selected
          if (aSelectedData.length === 0) {
            ParkingNoValidation = undefined;
            SalesOrderValidation = undefined;
            DeliveryNoValidation = undefined;
            shipmentNoValidation = undefined;
            statusValidation = undefined;
  
            console.log("Selection cleared. Validation variables reset to undefined.");
          } else if (aSelectedData.length === 1) {
            // Only one row is selected, assign the values
            ParkingNoValidation = aSelectedData[0].ParkingNo;
            SalesOrderValidation = aSelectedData[0].SalesOrder;
            DeliveryNoValidation = aSelectedData[0].DeliveryNo;
            shipmentNoValidation = aSelectedData[0].ShipmentNo;
            statusValidation = aSelectedData[0].Status;
  
            console.log("aSelectedData", aSelectedData[0]);
  
          }
  
          // Log selected data for debugging
          console.log("Selected Data:", aSelectedData);
        },
  
        onCustomerPress: function () {
  
          if (!ParkingNoValidation) {
            sap.m.MessageBox.warning("Please select Parking No");
            return;
          }
          helperFunctions._openValueHelpDialog(this, 'assignCustomerDialog', 'com.ingenx.qms.fangeneration.fragments.AssignCustomer');
  
        },
  
        onCreateVehicleMaster: function () {
          if (!ParkingNoValidation) {
            sap.m.MessageBox.warning("Please select Parking No.");
            return;
          }
  
  
          const oTable = this.byId("_IDGenTable2");
          const aSelectedIndices = oTable.getSelectedIndices();
  
          let TruckType, vehicleNumber, VehicleType;
          this.SalesOrder;
          let bVehicleMasterExists = false; // Flag to track if the master already exists
  
          aSelectedIndices.forEach( (iIndex)=> {
            const oContext = oTable.getContextByIndex(iIndex);
            let oData = oContext.getObject();
  
            vehicleNumber = oData.VehicleNumber;
            TruckType = oData.TruckType;
            this.SalesOrder = oData.SalesOrder || "";
  
            let status = oContext.getProperty("Status");
  
  
            // Check if the Status is "Security Cleared" or "Vehicle Master Missing"
            if (!status.includes('Vehicle Master Missing')) {
              bVehicleMasterExists = true;
              return false; // Break out of the loop if the condition is met
            }
          });
  
          // If Vehicle Master already exists, show message box and do not open the fragment
          if (bVehicleMasterExists) {
            sap.m.MessageBox.error("Vehicle Master already exists");
            return; // Exit the function to prevent fragment opening
          }
          // open dialog if  Vehicle Master data is Missing
          helperFunctions._openValueHelpDialog(this, 'VehicleMasterDialog', 'com.ingenx.qms.fangeneration.fragments.CreateVehicleMaster');
          setTimeout(() => {
  
            this.getView().byId("vehicleNoMaster_id").setValue(vehicleNumber).setEnabled(false);
            this.getView().byId("Type_id").setValue(TruckType).setEnabled(false);
            this.getView().byId("TUnumber_id").setValue(vehicleNumber);
          }, 500);
        },
  
  
        onCustomerCode: function () {
          console.log("called");
  
          helperFunctions._openValueHelpDialog(this, 'CustomerCodeDialog', 'com.ingenx.qms.fangeneration.fragments.CustomerCode');
  
        },
  
        onCustomerClose: function (oEvent) {
          const oSelectedItem = oEvent.getParameter("selectedItem");
          oEvent.getSource().getBinding("items").filter([]);
          if (!oSelectedItem) {
            return;
          }
          this.byId("customer_id").setValue(oSelectedItem.getTitle());
          CustCode = this.getView().byId("customer_id").getValue();
          ShipToName = oSelectedItem.getDescription();
          Destination = oSelectedItem.getInfo();
  
        },
        onCustomerSearch: function (oEvent) {
          helperFunctions._valueHelpLiveSearch(oEvent, 'Kunnr');
  
        },
  
        // from Assign Customer fragment
  
        onSubmitCustomer: function () {
  
          const oModel3 = this.getOwnerComponent().getModel();
          const oBindList3 = oModel3.bindList("/Park_headerSet2");
          const aFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, ParkingNoValidation);
          let that = this;
          oBindList3.filter(aFilter).requestContexts().then(async function (aContexts) {
            if (aContexts.length > 0) {
              aContexts[0].setProperty("Soldtoparty", CustCode);
              aContexts[0].setProperty("Description", ShipToName);
              aContexts[0].setProperty("Destination", Destination);
              ParkingNoValidation = [];
  
              // Submit changes to backend
              oModel3.submitBatch("groupCustomer").then(async function () {
                sap.m.MessageToast.show("Updating  Customer...");
  
                setTimeout(function () { that.onObjectMatched() }, 2500);
  
              }).catch(function (oError) {
                console.error("Update Failed", oError);
              });
              // refreshing Table
            } else {
              sap.m.MessageToast.show("No matching record found!");
            }
          })
          this.getView().byId("customer_id").setValue("")
          const oTable = this.byId("_IDGenTable2");
          oTable.clearSelection();
          this.assignCustomerDialog.close();
        },
  
        onAssignCustClose: function () {
  
          this.getView().byId("customer_id").setValue("")
          this.assignCustomerDialog.close();
          this.byId('_IDGenTable2').clearSelection();
        },
  
        onBackVehicleMaster: function () {
          this.VehicleMasterDialog.close();
          this.byId('_IDGenTable2').clearSelection();
        },
  
        OnUpdateLicenseClose: function () {
          this.updateLicenseDialog.close();
          this.byId('_IDGenTable2').clearSelection();
  
        },
        // update license fragment  'Add' btn press
        onPressAddLicence: function () {
  
          let oTable = this.getView().byId("updateLicenseTable");
  
          let oModel = oTable.getModel("dataModels");
  
          let aData = oModel.getProperty("/data");
  
  
          aData.push({
            Type: "",
            LicenceNumber: "",
            ValidFrom: "",
            ValidTo: ""
          });
  
          oModel.setProperty("/data", aData);
  
          oTable.getModel().refresh();
        },
  
        onParkingNumber: function () {
          helperFunctions._openValueHelpDialog(this, 'parkingNoDialog', 'com.ingenx.qms.fangeneration.fragments.ParkingNo');
  
        },
  
        // formatId: function (sId) {
        //   // Remove commas from the Id
        //   return sId.replace(/,/g, '');
        // },
  
        onParkingNoSearch: function (oEvent) {
          helperFunctions._valueHelpLiveSearch(oEvent, 'ParkingNo');
  
        },
  
        onParkingNoClose: function (oEvent) {
          const oSelectedItem = oEvent.getParameter("selectedItem");
          oEvent.getSource().getBinding("items").filter([]);
          if (!oSelectedItem) {
            return;
          }
          this.byId("parkingNo_ID").setValue(oSelectedItem.getTitle());
          var parkingNo = this.getView().byId("parkingNo_ID").getValue();
  
          const oTable = this.getView().byId("_IDGenTable2");
  
          const oBinding = oTable.getBinding("rows");
  
          // Apply filter to the binding
          oBinding.filter(new sap.ui.model.Filter({
            filters: [
              new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, parkingNo)
            ],
            and: true
          }));
  
          const filter = mergedData.filter(function (data) {
            return data.ParkingNo == parkingNo;
          });
  
          console.log("filter", filter)
  
          const VehicleNo = filter[0].VehicleNumber
          const product = filter[0].Product
          const Status = filter[0].Status;
  
          this.getView().byId("vehicleNo_Id").setValue(VehicleNo).setEnabled(false)
          this.getView().byId("FANMaterialProductSelect").setValue(product);
          this.getView().byId("status_Id").setValue(Status);
  
        },
  
        onVehicleNumber: function () {
          helperFunctions._openValueHelpDialog(this, 'VehicleNoDialog', 'com.ingenx.qms.fangeneration.fragments.VehicleNo');
  
  
        },
  
        onVehicleNoSearch: function (oEvent) {
          helperFunctions._valueHelpLiveSearch(oEvent, 'VehicleNumber');
  
        },
  
        onVehicleNoClose: function (oEvent) {
          const oSelectedItem = oEvent.getParameter("selectedItem");
          oEvent.getSource().getBinding("items").filter([]);
          if (!oSelectedItem) {
            return;
          }
          this.byId("vehicleNo_Id").setValue(oSelectedItem.getTitle());
  
          const vehicleNo = this.getView().byId("vehicleNo_Id").mProperties.value
          const oTable = this.getView().byId("_IDGenTable2");
  
          const oBinding = oTable.getBinding("rows");
  
  
          // Apply filter to the binding
          oBinding.filter(new sap.ui.model.Filter({
            filters: [
              new sap.ui.model.Filter("VehicleNumber", sap.ui.model.FilterOperator.EQ, vehicleNo)
            ],
            and: true
          }));
  
          const filter = mergedData.filter(function (data) {
            return data.VehicleNumber == vehicleNo;
          });
  
          const parkingNo = filter[0].ParkingNo
          const product = filter[0].Product
          const Status = filter[0].Status
          console.log("Status", Status)
  
          this.getView().byId("parkingNo_ID").setValue(parkingNo).setEnabled(false)
          this.getView().byId("FANMaterialProductSelect").setValue(product)
          this.getView().byId("status_Id").setValue(Status)
        },
  
        onStatusChange: function (oEvent) {
          // Get the selected key/text from the status Select control
          const sSelectedStatus = oEvent.getParameter("selectedItem").getText();
  
          // Get the table binding
          const oTable = this.getView().byId("_IDGenTable2");
          const oBinding = oTable.getBinding("rows");
  
          // Create a filter for the selected status
          const oFilter = new sap.ui.model.Filter('Status', sap.ui.model.FilterOperator.EQ, sSelectedStatus);
  
          // Apply the filter to the table binding
          oBinding.filter([oFilter]);
        },
  
  
        onProductChange: function (oEvent) {
  
          // Get the selected value from the Select control
          let oSelectedItem = oEvent.getParameter('selectedItem').getText();;
          console.log("selectedStatus", oSelectedItem);
          // return
          this.pressGoBtn();
  
        },
        onInputChange: function () {
            // Get references to the input fields
            const oComp1Input = this.byId("comp1Input").getValue();
            const oComp2Input = this.byId("comp2Input").getValue();
            const oComp3Input = this.byId("comp3Input").getValue();
            const oComp4Input = this.byId("comp4Input").getValue();
            const oComp5Input = this.byId("comp5Input").getValue();
            const oComp6Input = this.byId("comp6Input").getValue();
    
            // Convert input values to numbers
            const comp1 = parseFloat(oComp1Input) || 0;
            const comp2 = parseFloat(oComp2Input) || 0;
            const comp3 = parseFloat(oComp3Input) || 0;
            const comp4 = parseFloat(oComp4Input) || 0;
            const comp5 = parseFloat(oComp5Input) || 0;
            const comp6 = parseFloat(oComp6Input) || 0;
    
            // Calculate the total
            const total = comp1 + comp2 + comp3 + comp4 + comp5 + comp6;
    
            const avgtotal = total
    
            // Set the total value in the Maxwt_id input
            this.byId("Maxwt_id").setValue(avgtotal);
          },
    
          onInputChangeMin: function () {
            // Get references to the input fields
            const oComp1Input = this.byId("comp1InputMin").getValue();
            const oComp2Input = this.byId("comp2InputMin").getValue();
            const oComp3Input = this.byId("comp3InputMin").getValue();
            const oComp4Input = this.byId("comp4InputMin").getValue();
            const oComp5Input = this.byId("comp5InputMin").getValue();
            const oComp6Input = this.byId("comp6InputMin").getValue();
    
            // Convert input values to numbers
            const comp1 = parseFloat(oComp1Input) || 0;
            const comp2 = parseFloat(oComp2Input) || 0;
            const comp3 = parseFloat(oComp3Input) || 0;
            const comp4 = parseFloat(oComp4Input) || 0;
            const comp5 = parseFloat(oComp5Input) || 0;
            const comp6 = parseFloat(oComp6Input) || 0;
    
            // Calculate the total
            const total = comp1 + comp2 + comp3 + comp4 + comp5 + comp6;
    
            // Set the total value in the Maxwt_id input
            this.byId("Minwt_id").setValue(total);
          },
    
          SubmitTuVehicleMaster: function () {
            // const validStatuses = ["Security Cleared, Vehicle Master Missing"];
    
            // if (!validStatuses.includes(statusValidation)) {
            //   sap.m.MessageBox.error("Vehicle Master already created");
            //   return true;
            // }
            if (statusValidation && !statusValidation.includes('Vehicle Master Missing')) {
              console.log("Vehicle Master Already Maintained.");
    
              return
            }
            let vehicleNumber = this.getView().byId("vehicleNoMaster_id").getValue();
            let maxVol = parseFloat(this.getView().byId("Maxwt_id").getValue());
            let vehType = this.getView().byId("Type_id").getValue()
            var self = this;
    
            let compInputs = [
              this.getView().byId("comp1Input").getValue(),
              this.getView().byId("comp2Input").getValue(),
              this.getView().byId("comp3Input").getValue(),
              this.getView().byId("comp4Input").getValue(),
              this.getView().byId("comp5Input").getValue(),
              this.getView().byId("comp6Input").getValue()
            ];
    
            let header_toOigcc = [];
            for (let i = 0; i < compInputs.length; i++) {
              if (compInputs[i]) {  // Only if the input field has data
                header_toOigcc.push({
                  "TuNumber": vehicleNumber,
                  "ComNumber": i + 1,
                  "SeqNmbr": "00" + (i + 1),
                  "CmpMaxvol": parseFloat(compInputs[i]),  // Assuming the input is a numeric value
                  "ComIdtext": "C" + (i + 1)
                });
              }
            }
    
            let payloadTu = {
              "TuNumber": vehicleNumber,
              "TuType": "RD01",
              "WgtUom": "TO",
              "TuId": vehicleNumber,
              "TuNrcomps": header_toOigcc.length,
              "TuMaxwgt": maxVol,
              "TuMaxvol": maxVol,
              "VolUom": "KL",
              "transhead_gct": {
                "TuNumber": vehicleNumber,
                "TuText": vehicleNumber
              },
              "header_toOigcc": header_toOigcc
            };
            console.log("payloadTu", payloadTu)
    
            let oModel2 = this.getOwnerComponent().getModel();
            let oBindList4 = oModel2.bindList("/trans_headerSet");
            oBindList4.create(payloadTu, true);
            oBindList4.attachCreateCompleted((oEvent) => {
              let params = oEvent.getParameters();
    
              if (params.success) {
                let response = params.context.getObject();
    
                console.log("response", response)
    
              }
    
            });
    
            let payloadVehicleMaster =
            {
              "Vehicle": vehicleNumber,
              "VehType": vehType,
              "VehId": vehicleNumber,
              "VehNrtus": "01",
              "VolUom": "KL",
              "WgtUom": "TO",
              "VehMaxwgt": maxVol,
              "VehMaxvol": maxVol,
              "head_toheadItem":
              {
                "Vehicle": vehicleNumber,
                "VehText": vehicleNumber
              },
              "head_toItems": [
                {
                  "Vehicle": vehicleNumber,
                  "TuNumber": vehicleNumber,
                  "SeqNmbr": "001",
                  "TuText": vehicleNumber,
                  "TuNrcomps": header_toOigcc.length,
                  "TuMaxwgt": maxVol,
                  "TuMaxvol": maxVol
                }
              ]
            }
    
            let oModel3 = this.getOwnerComponent().getModel();
            let oBindList = oModel3.bindList("/header_vehSet");
            oBindList.create(payloadVehicleMaster, true);
    
            oBindList.attachCreateCompleted((oEvent) => {
              let params = oEvent.getParameters();
    
              if (params.success) {
                let response = params.context.getObject();
    
                console.log("response", response);
                // setTimeout(function () { this.onObjectMatched() }, 3000);
    
              }
            })
            let that = this;
            sap.m.MessageBox.success("Transport Unit and Vehicle Master Created", {
              onClose: function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {
                  let oModel = self.getOwnerComponent().getModel();
                  let oBindList = oModel.bindList("/Park_headerSet2");
    
                  let aFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, ParkingNoValidation);
                  console.log("aFiltervansh", aFilter)
    
                  oBindList.filter(aFilter).requestContexts().then(function (aContexts) {
                    if( that.SalesOrder){

                      aContexts[0].setProperty("Status", "SO / STO Created");
                    }else {
                      aContexts[0].setProperty("Status", "Security Cleared");

                    }
                  });
                  setTimeout(function () { that.onObjectMatched() }, 3000);
    
                }
              }
            });
    
            this.VehicleMasterDialog.close();
    
            console.log("payloadVehicleMaster", payloadVehicleMaster)
          },
  
        pressBtnRefresh: function () {
          const oTable = this.byId("_IDGenTable2");
          const oBinding = oTable.getBinding("rows");
  
          // Clear filters
          oBinding.filter([]);
  
          // Refresh the model
          const oModel = this.getView().getModel("mergedData");
          oModel.refresh();
  
          oView.byId("status_Id").setValue(null)
          oView.byId("FANMaterialProductSelect").setValue(null)
          oView.byId("parkingNo_ID").setValue(null).setEnabled(true)
          oView.byId("vehicleNo_Id").setValue(null).setEnabled(true)
        },
      });
    });