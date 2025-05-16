


sap.ui.define([
    "sap/ui/core/Element",
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/vk/threejs/MaterialType",
    "com/ingenx/qms/parking/utils/helperFunctions",
    "sap/m/MessageToast"
  ],
    function (Element,
      Controller,
      MessageBox,
      Filter,
      FilterOperator,
      MaterialType,
      helperFunctions, MessageToast
    ) {
      "use strict";
  
      let MatCode
      let ShipToName
      let Destination
      let oView;
  
      return Controller.extend("com.ingenx.qms.parking.controller.CreateParking", {
        onInit: function () {
          oView = this.getView(); // Defining oView for all places in controller to be used
  
  
        },
  
        onSelectChange: function (oEvent) {
          const oSelect = oEvent.getSource();
          oSelect.setEnabled(false); // Disables the select box after selection
        },
        // reusable getVehicle function
        fetchVehicleMasterData: async function (Vehicle) {
  
          let oModel = this.getOwnerComponent().getModel();
          let sPath = `/getVehicle(Vehicle='${Vehicle}')`;
  
          try {
            // Binding context for the OData service call
            const oBindinggetCust = oModel.bindContext(sPath, null, {});
  
            // Requesting data from the bound context
            const oData = await oBindinggetCust.requestObject();
  
            // Check if data exists and handle accordingly
            if (oData && oData.value && oData.value.length > 0) {
  
              return oData.value; // returning array
            } else {
              // Return null values if no data is found
              return [];
            }
          } catch (oError) {
            console.error("Error fetching data:", oError);
            throw new Error("Failed to fetch vehicle master data. Please try again later.");
          }
        },
        // function get fired on Vehicle No Submit or  focus change
        onVehicleSubmit: async function (oEvent) {
  
          // initially empty the field for  vehicle description
          oView.byId("vehicleDescription_id").setValue("");
          let sValue = oEvent.getParameter("value").trim();
  
          if (!sValue) {
            oView.byId("vehicleDescription_id").setValue("Please enter a Vehicle number");
            return;
          }
  
          // Fetch vehicle master data from api
          let resultArr = await this.fetchVehicleMasterData(sValue);
  
          let result = resultArr.length ? resultArr[0] : [];
  
          if (result.Vehicle) {
            // Enable input fields and clear their values
            oView.byId("_IDGenInut5").setEditable(true).setValue(""); // Driver Name
            oView.byId("_IDGeInput6").setEditable(true).setValue(""); // Cleaner Name
  
            let VehType = result.VehType;
  
            // if vehicle not available then making radio button enable and setting Vehicle description "Security Pending , Vehicle Master Missing"
            if (!VehType) {
              // If VehType is not available
              this._setRadioButtonsEditable(true);
  
              this._updateVehicleDescription(sValue, result.Vehicle, true);
              return; // Exit since VehType is not defined
            }
  
            // if Vehicle  matched alog with VehicleDef also
  
            // Handle radio button selection based on VehicleDefinition
            this._selectRadioButton(result.VehicleDefinition);
  
            // Make radio buttons uneditable after selection
            this._setRadioButtonsEditable(false);
  
            this._updateVehicleDescription(sValue, result.Vehicle, false);
          } else {
            // No match found in filters
            oView.byId("vehicleDescription_id").setValue("Security Pending, Vehicle Master Missing");
            this._setRadioButtonsEditable(true);
  
            // Enable input fields and clear their values
            oView.byId("_IDGenInut5").setEditable(true).setValue("");
            oView.byId("_IDGeInput6").setEditable(true).setValue("");
          }
        },
  
        _setRadioButtonsEditable: function (editable) {
          let oRadioButtonGroup = oView.byId("_IDGenRadioButtonGroup1");
          let aButtons = oRadioButtonGroup.getButtons();
          aButtons.forEach(button => button.setEditable(editable));
        },
  
        _updateVehicleDescription: function (sValue, availableNo, isVehTypeMissing) {
          if (isVehTypeMissing || sValue !== availableNo) {
            oView.byId("vehicleDescription_id").setValue("Security Pending, Vehicle Master Missing");
          } else {
            oView.byId("vehicleDescription_id").setValue("Security Pending");
          }
        },
  
  
        _selectRadioButton: function (VehicleDefinition) {
          let oRadioButtonGroup = oView.byId("_IDGenRadioButtonGroup1");
          let aButtons = oRadioButtonGroup.getButtons();
  
          let selectedButton = aButtons.find(button => button.getText() === VehicleDefinition);
          console.log(selectedButton);
  
          if (selectedButton) {
            oRadioButtonGroup.setSelectedButton(selectedButton);
          }
        },
  
        onTransportCode: function () {
          helperFunctions._openValueHelpDialog(this, 'transporterDialog', 'com.ingenx.qms.parking.fragments.TransportCode');
  
        },
        //       onBeforeRendering: function () {
        //         this._BusyDialog = new sap.m.BusyDialog({
        //             title: "Loading..."
        //         });
        //         this._BusyDialog.open();
  
        //         this._BusyTimeout = setTimeout(() => {
        //             if (this._BusyDialog) {
        //                 this._BusyDialog.setText("This is taking forever, please wait...");
        //             }
        //         }, 1000);
        //     },
  
        //     onAfterRendering: function () {
        //         setTimeout(() => {
        //             if (this._BusyDialog) {
        //                 this._BusyDialog.close();
        //             }
        //             clearTimeout(this._BusyTimeout);
        //         }, 100);
        //     }
        // ,    
  
        onTransportConfirm: function (oEvent) {
          let oSelectedItem = oEvent.getParameter("selectedItem");
  
          oEvent.getSource().getBinding("items").filter([]);
  
          if (!oSelectedItem) {
            return;
          }
  
          this.byId("TransporterInput").setValue(oSelectedItem.getTitle());
  
        },
  
        onPlantConfirm: function (oEvent) {
          let oSelectedItem = oEvent.getParameter("selectedItem");
  
          oEvent.getSource().getBinding("items").filter([]);
  
          if (!oSelectedItem) {
            return;
          }
          // Destination = oSelectedItem.getProperty('title'); // location == Destination Ort01
          // ShipToName = oSelectedItem.getProperty('description');   // shiptoParty - Name1
  
          this.byId("plantInput").setValue(oSelectedItem.getTitle());
  
          // this.byId("CustomerInput").setValue(oSelectedItem.getTitle());
          
          this.PlantText = oSelectedItem.getProperty('description');   
          console.log("plant text", this.PlantText);
  
        },
  
        onTransportSearch: function (oEvent) {
          helperFunctions._valueHelpLiveSearch(oEvent, 'Lifnr');
  
        },
        onPlantSearch: function (oEvent) {
          helperFunctions._valueHelpLiveSearch(oEvent, 'Plant');
  
        },
  
        onCustomerCode: function () {
          let transactionType = this.byId('transactionType').getSelectedItem().getText();
          console.log(transactionType);
  
          if (transactionType === "Sales Order") {
            helperFunctions._openValueHelpDialog(this, 'CustomerCodeDialog', 'com.ingenx.qms.parking.fragments.CustomerCode');
          } else {
            helperFunctions._openValueHelpDialog(this, 'PlantCodeDialog', 'com.ingenx.qms.parking.fragments.PlantCode');
  
          }
  
        },
  
        onCustomerConfirm: function (oEvent) {
          let oSelectedItem = oEvent.getParameter("selectedItem");
  
          oEvent.getSource().getBinding("items").filter([]);
  
          if (!oSelectedItem) {
            return;
          }
  
          this.byId("CustomerInput").setValue(oSelectedItem.getTitle());
  
          Destination = oSelectedItem.getProperty('info'); // location == Destination Ort01
          ShipToName = oSelectedItem.getProperty('description');   // shiptoParty - Name1
          console.log("shipname and Destination", ShipToName, Destination);
  
        },
  
        onCustomerSearch: function (oEvent) {
  
          helperFunctions._valueHelpLiveSearch(oEvent, 'Kunnr');
        },
        onRadioBtnChange: function (oEvent) {
          return
          const selectedKey = oEvent.getSource().getSelectedIndex(); // Get selected radio button index
  
          const oCustomerCodeLabel = this.getView().byId("_IDLabelCustomer");
          const oCustomerCodeInput = this.getView().byId("CustomerInput");
          const oPlantCodeLabel = this.getView().byId("_IDLabelPlant");
          const oPlantCodeInput = this.getView().byId("plantInput");
  
          if (selectedKey === 0) { // "Loading" selected
            oCustomerCodeLabel.setVisible(true);
            oCustomerCodeInput.setVisible(true);
            oPlantCodeLabel.setVisible(false);
            oPlantCodeInput.setVisible(false);
            this.radioSelectedText = "Unloading";
  
          } else if (selectedKey === 1) { // "Unloading" selected
            oCustomerCodeLabel.setVisible(false);
            oCustomerCodeInput.setVisible(false);
            oPlantCodeLabel.setVisible(true);
            oPlantCodeInput.setVisible(true);
            this.radioSelectedText = "Unloading";
          } else {
            oCustomerCodeLabel.setVisible(false);
            oCustomerCodeInput.setVisible(false);
            oPlantCodeLabel.setVisible(false);
            oPlantCodeInput.setVisible(false);
  
  
          }
        }
        ,
        onDocumentChange: function (oEvent) {
  
          let sKey = oEvent.getSource().getSelectedKey();
          let oCustomerInput = this.byId("CustomerInput");
          let oPlantInput = this.byId("plantInput");
  
          if (sKey === "SO") {
            oCustomerInput.setVisible(true).setValue("");
            oPlantInput.setVisible(false).setValue("");
            this.PlantText = "";
          } else if (sKey === "STO") {
            oCustomerInput.setVisible(false).setValue("");
            oPlantInput.setVisible(true).setValue("");
          } else {
            oCustomerInput.setVisible(false).setValue("");
            oPlantInput.setVisible(false).setValue("");
          }
  
  
        },
  
        onPlantCodeValueHelp: function () {
          helperFunctions._openValueHelpDialog(this, 'PlantCodeDialog', 'com.ingenx.qms.parking.fragments.PlantCode');
  
  
        },
        onSubmit: async function () {
          try {
  
            this.radioSelectedText = "Loading" // default
            let currentDate = new Date().toISOString().split('T')[0];
            let createdDate = currentDate + "T00:00:00Z";
            let parkingGate = oView.byId("_IDGenSelect2").getSelectedKey();
            let parkingArea = oView.byId("_IDGenSelect3").getSelectedKey();
            let vehicleNumber = oView.byId("vehicle_id").getValue();
            let driverName = oView.byId("_IDGenInut5").getValue();
            let cleanerName = oView.byId("_IDGeInput6").getValue();
            let oRadioButtonGroup = oView.byId("GroupA");
            let sSelectedText = oRadioButtonGroup.getSelectedButton().getText();
            let TransportCode = oView.byId("TransporterInput").getValue();
            let customerCode = '';
            let vendorCode = ''
            let plant = oView.byId('plantInput').getValue();
            let plantText = this.PlantText ?? "";
            if (this.radioSelectedText || this.radioSelectedText === "Loading") {
  
  
              customerCode = oView.byId("CustomerInput").getValue();
            } else if (this.radioSelectedText && this.radioSelectedText === "Unloading") {
  
              vendorCode = oView.byId("plantInput").getValue();
            }
            let product = oView.byId("ID_MaterialSelect").getSelectedItem() ? oView.byId("ID_MaterialSelect").getSelectedItem().getText() : ""
  
            let selectedVehicleType = oView.byId("_IDGenRadioButtonGroup1").getSelectedButton().getText();
            let parkStatus = oView.byId("vehicleDescription_id").getValue();
  
            // Validation check for required fields
            if (!vehicleNumber || !driverName || !cleanerName || !parkingGate || !parkingArea) {
  
              sap.m.MessageBox.error("Please fill all required fields");
              return;
            }
  
            let VehicleType;
  
            let oModel = this.getOwnerComponent().getModel();
            let sPath = `/checkVehicleBeforeSubmitParking(Vehicle='${encodeURIComponent(vehicleNumber)}',VehicleDef='${encodeURIComponent(selectedVehicleType)}')`;
  
            // Binding context for the OData service call
            const oBindingContext = oModel.bindContext(sPath, null, {});
  
            // Requesting data from the bound context
            const oData = await oBindingContext.requestObject();
  
            // Check if data exists and handle accordingly
            if (oData && oData.value && oData.value.length > 0) {
  
              let response = oData.value[0];
              VehicleType = response.VehicleType;
              console.log("my custom response", response);
  
              if (response.isVehicleMatched && response.isVehicleInRefinary) {
  
                // If the status is not "Exit", show an error message
                sap.m.MessageBox.error(" Vehicle is already present in Refinery.");
  
              }
              //  Note : Passing  MaterialCode instead of Product ( material) description
              else {
  
                this.createParkingFn(parkingGate, parkingArea, createdDate, vehicleNumber, driverName, cleanerName, sSelectedText, TransportCode, customerCode, MatCode, VehicleType, parkStatus, plant, plantText);
              }
  
            }
          } catch (oError) {
            console.log("Error fetching data:", oError);
            sap.m.MessageBox.error("Failed to fetch Vehicle data. Please try again later.");
            // sap.m.MessageBox.error(oError.message);
          }
  
        },
  
        createParkingFn: async function (parkingGate, parkingArea, createdDate, vehicleNumber, driverName, cleanerName, sSelectedText, TransportCode, customerCode, product, VehicleType, parkStatus, plant, plantText) {
          
          try {
            // Get the current time in HH:MM:SS format
            let now = new Date();
            let hours = String(now.getHours()).padStart(2, '0');
            let minutes = String(now.getMinutes()).padStart(2, '0');
            let seconds = String(now.getSeconds()).padStart(2, '0');
  
            let time = `${hours}:${minutes}:${seconds}`; // Format as "HH:MM:SS"
            // console.log("Current time:", time);
  
            // Prepare the payload for creating the parking entry
            let oPayload = {
              ParkingGate: parkingGate,
              ParkingArea: parkingArea,
              VehicleNumber: vehicleNumber,
              Purpose: sSelectedText,
              TransportCode: TransportCode,
              Soldtoparty: customerCode ?? "",
              Description: ShipToName ?? "",
              Destination: Destination ?? "",
              Product: product,
              TruckType: VehicleType,
              Shiptoparty: "",
              Status: parkStatus,
              Driver: driverName,
              Cleaner: cleanerName,
              Plant: plant,
              PlantText: plantText,
              park_assocations: [
                {
                  ParkingNo: ""
                }
              ]
            };
  
            console.log("Payload for parking", oPayload);
  
            // Get the model for OData binding
            let oModel = this.getOwnerComponent().getModel();
  
            console.log("New Payload ", oPayload);
  
            // Bind to the Park_headerSet entity and create a new entry
            let oBindListSPM = oModel.bindList("/Park_headerSet2");
  
            // Begin the creation process and handle completion in the callback
            
            let that = this;
            
            let sKey = that.salesOrderNo ?  "SalesOrder" : "Stockorder"
            let DocNum = that.salesOrderNo ? that.salesOrderNo : that.Stockorder;
            sap.m.MessageToast.show("Creating Parking No...");
  
            oBindListSPM.create(oPayload, true);
            
            sap.ui.core.BusyIndicator.show(0);
  
            oBindListSPM.attachCreateCompleted(async (p) => {
              try {
                let params = p.getParameters();
                console.log("Create parameters:", params);
  
                if (params.success) {
  
                  let obj = params.context.getObject();
                  console.log("Created object:", obj);
                  let oParkingNo = obj.ParkingNo;
                  that.byId('parking_id').setValue(oParkingNo);
  
                  // updating  entry in Schedulingset if parking created using scanned data sales order
               
                  if (oParkingNo) {
                    if (that.salesOrderNo || that.Stockorder) {
  
                      let oBindList = oModel.bindList("/SchedulingSet");
  
                      await oBindList.requestContexts().then(function (aContexts) {
                        if (aContexts.length > 0) {
                          let contextArr = aContexts.filter((context) => context.getObject()[sKey] === DocNum);
                          if (contextArr.length) {
  
                            contextArr[0].setProperty("Parkingno", oParkingNo);
  
                          }
                        } else {
                          sap.m.MessageBox.warning(`No matching entry found for the ${sKey}.`);
                        }
                      });
  
  
                    }
  
                  }
                  // Display success message to the user
                  sap.m.MessageBox.success(`Parking No ${oParkingNo} Created.`, {
                    title: "Success",
                    onClose: function (oAction) {
                      if (oAction === sap.m.MessageBox.Action.OK) {
                        // Reset fields upon confirmation of the success message
                        that.resetFields();
                      }
                    }
                  });
                } else {
                  // If the creation failed, show the error message
                  let errorMsg = params.context.oModel.mMessages[""] ? params.context.oModel.mMessages[""][0].message : "An unknown error occurred.";
                  sap.m.MessageBox.error(`Error while creating parking entry: ${errorMsg}`);
                }
              } catch (err) {
                // Catch any errors during the callback after the creation
                console.error("Error during createCompleted callback:", err);
                sap.m.MessageBox.error("An unexpected error occurred during parking creation.");
              }
            });
  
          } catch (error) {
            // Catch any errors during the overall creation process
            console.log("Error during parking creation:", error.message);
            sap.m.MessageBox.error("Error in creating the parking entry. Please try again.");
            // sap.m.MessageBox.error(error.message);
          } finally {
            sap.ui.core.BusyIndicator.hide();
          }
        },
  
        getMaxParkingNoFn: async function (oModel) {
          try {
            let sPath1 = '/getMaxParkingNo()';
            // Binding context for the OData service call
            let oBinding1 = oModel.bindContext(sPath1, null, {});
  
            // Requesting data from the bound context
            const oData = await oBinding1.requestObject();
  
            // Check if data exists and handle accordingly
            if (oData && oData.value && oData.value.length > 0) {
  
              let lastParkingNo = oData.value[0].maxParkingNo;
              console.log("last Parking No.", lastParkingNo);
  
              // Increment the parking number
              const newParkNo = (parseInt(lastParkingNo, 10) + 1).toString();
              console.log("Incremented Parking No:", newParkNo);
  
              return newParkNo;
  
            } else {
              console.log("Parking No. not found");
  
            }
          } catch (oError) {
            console.error("Error fetching max Parking No.", oError);
            // throw new Error("Failed to fetch Latest Parking No. Please try again later.");
          }
        },
  
        onScanSuccess: async function (oEvent) {
          // debugger
          if (oEvent.getParameter("cancelled")) {
            sap.m.MessageToast.show("Scan cancelled", { duration: 1000 });
          }
          else {
            let scanResult = oEvent.getParameter("text");
            let scannedData;
            if (scanResult) {
  
              // Parse the scanned QR code data
            
              scannedData = JSON.parse(scanResult);
  
              // Set the driverName and cleanerName to the input fields
              console.log("scan data ", scannedData);
  
              let oDriverInput = oView.byId("_IDGenInut5");
              let oCleanerInput = oView.byId("_IDGeInput6");
              let oVehicleData = oView.byId("vehicle_id");
              let sCustomerInput = oView.byId("CustomerInput");
              let plantInput = oView.byId("plantInput");
  
              if (scannedData.salesOrderNo) {
                this.salesOrderNo = scannedData.salesOrderNo
                plantInput.setVisible(false);
                sCustomerInput.setVisible(true);
  
              }
              if( scannedData.Stockorder){
                this.Stockorder = scannedData.Stockorder
                plantInput.setVisible(true);
                sCustomerInput.setVisible(false);
              }
              if (scannedData.material) {
                MatCode = String(scannedData.material);
                this.byId('ID_MaterialSelect').setSelectedKey(MatCode);
              }
  
              // Fetch vehicle master data
              let resultVM = await this.fetchVehicleMasterData(scannedData.assignTruckNo);
  
              console.log("result scan vehicle master", resultVM);
  
              let oVehicleStatusField = oView.byId("vehicleDescription_id");
  
              oVehicleStatusField.setValue(resultVM.length ? "Security Pending" : "Security Pending, Vehicle Master Missing");
  
              if (resultVM.length) {
                this._selectRadioButton(resultVM[0].VehicleDefinition);
                this._setRadioButtonsEditable(false);
              } else {
                // resetting buttons
                let radioBtnGrp = oView.byId("_IDGenRadioButtonGroup1");
                this._setRadioButtonsEditable(true); //  Making button editable first 
                radioBtnGrp.setSelectedIndex(0);
  
              }
  
              oDriverInput.setValue(scannedData.driverName || "");
              oCleanerInput.setValue(scannedData.cleanerName || "");
              oVehicleData.setValue(scannedData.assignTruckNo || "");
              sCustomerInput.setValue(scannedData.soldToParty || "");
              plantInput.setValue(scannedData.Plant || "");
              // Material.setValue(finalMaterial || "")
            } else {
              sap.m.MessageToast.show("No data found in scan", { duration: 1000 });
            }
  
            let customerNo = oView.byId("CustomerInput").getValue();
            console.log("customerNo", customerNo);
            // if (customerNo == "" ) {
            //   return
            // }
  
            let oModel = this.getOwnerComponent().getModel();
            let oTransactionSelect = oView.byId("transactionType");
              
              try {
                if (this.salesOrderNo) {
                  oTransactionSelect.setSelectedKey("SO");
                  // Sales order path (expect array response)
                  let sPathCustomer = `/fetchCustomerData(Kunnr='${customerNo}')`;
                  let oBinding = oModel.bindContext(sPathCustomer, null, {});
                  let oData = await oBinding.requestObject();
                  
                  if (oData && oData.value && oData.value.length > 0) {
                    let filtered = oData.value[0];
                    ShipToName = filtered.Name1;
                    Destination = filtered.Ort01;
                    console.log("Sales order response", filtered);
                  }
                } else if (this.Stockorder) {
                oTransactionSelect.setSelectedKey("STO");
                  // Stock order path (expect object response)
                  let sPathPlant = `/xIQMSxPlants(Plant='${scannedData.Plant}')`;
                  let oBinding = oModel.bindContext(sPathPlant, null, {});
                  let oData = await oBinding.requestObject();
      
                  if (oData && oData.Plant) {
                      ShipToName = oData.Plant_text;
                      this.Plant_text = oData.Plant_text
                      // Destination = oData.Ort01;
                      console.log("Stock order response", oData);
                  }
              }
          } catch (oError) {
              console.error("Failed to fetch customer or plant data", oError);
              sap.m.MessageToast.show("Failed to fetch customer/plant data.", { duration: 2000 });
          }
  
          }
        },
  
        onScanError: function (oEvent) {
          sap.m.MessageToast.show("Scan failed: " + oEvent, { duration: 1000 });
        },
  
        resetFields: function () {
          oView.byId("vehicle_id").setValue(null);
          oView.byId("_IDGenInut5").setValue(null);
          oView.byId("_IDGeInput6").setValue(null);
          oView.byId("TransporterInput").setValue(null);
          oView.byId("CustomerInput").setValue(null);
          oView.byId("vehicleDescription_id").setValue(null);
          oView.byId("parking_id").setValue(null);
          oView.byId("ID_MaterialSelect").setSelectedItem(null);
          let radioBtnGrp = oView.byId("_IDGenRadioButtonGroup1");
          this._setRadioButtonsEditable(true); //  Making button editable first 
          radioBtnGrp.setSelectedIndex(0);
          oView.byId("plantInput").setValue(null);
  
          ShipToName = "";
          Destination = "";
          this.salesOrderNo = "";  // reset the value if scanned  sales order dat present
        },
  
        onSelectChangeMaterial: function (oEvent) {
          // Get the selected item
          let oSelectedItem = oEvent.getParameter("selectedItem");
  
          if (oSelectedItem) {
            let sText = oSelectedItem.getText();
  
            MatCode = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Material;
            console.log("Selected Text:materialCode", sText, MatCode);
  
          }
        },
  
  
      });
    });