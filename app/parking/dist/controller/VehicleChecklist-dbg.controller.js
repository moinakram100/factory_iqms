sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/Filter",
      "sap/ui/model/FilterType",
      "sap/ui/model/FilterOperator",
      "sap/m/MessageBox"
    ],
    function (BaseController, Filter, FilterType, FilterOperator, MessageBox) {
      "use strict";
      let getModelData = []
      let getdata = []
      let CheckVerificationData = []
      let TruckType
      let aResults = [];
      let filterData
      let vehicleTypeDefination = []
      let filterTruckType
      let oJsonModel;
  
      return BaseController.extend("com.ingenx.qms.parking.controller.VehicleChecklist", {
        onInit() {
          oJsonModel = new sap.ui.model.json.JSONModel()
          oJsonModel.setData([]);
          // const oTable = this.getView().byId("_checkListTable");
          this.getView().setModel(oJsonModel, 'finalModel');
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("VehicleChecklist").attachPatternMatched(this.onObjectMatched, this);
        },
  
        async onObjectMatched() {
          let ParkingNo, VehicleNumber, TruckType, TruckTypeDef;
          let parkObj = this.getOwnerComponent().getModel("data").getProperty("/parkObj"); // temp from ParkList screen
          if (!parkObj) {
            ParkingNo = this.getOwnerComponent().getModel("data").getProperty("/parkingNumber");
  
          } else {
            ParkingNo = parkObj.ParkingNo;
            VehicleNumber = parkObj.VehicleNumber;
            TruckTypeDef = parkObj.VehicleDefinition;       // e.g Tank Truck 
            TruckType = parkObj.TruckType                   //e.g "ZTT1"
          }
          this.getView().byId("truck_id").setValue(VehicleNumber);
          this.getView().byId("VehicleType_id").setValue(TruckTypeDef);
  
          console.log("parkObj from parkList", parkObj);
          // ParkingNo = this.getOwnerComponent().getModel("data").getProperty("/parkingNumber");
  
          console.log("ParkingNo", ParkingNo)
          this.getView().byId("parking_id").setValue(ParkingNo);
  
          let sPath = `/getCheckListData(ParkingNo='${ParkingNo}',VehicleNumber='${VehicleNumber}',TruckTypeDef='${encodeURIComponent(TruckTypeDef)}',TruckType='${TruckType}')`;
  
          // let sPath = `/getCheckListData(ParkingNo='1000027',VehicleNumber='UP37AH0000',TruckType='${encodeURIComponent('Open Truck')}')`
  
          let oModel = this.getOwnerComponent().getModel();
          try {
            // Binding context for the OData service call
            const oBinding = oModel.bindContext(sPath, null, {});
  
            // Requesting data from the bound context
            const oData = await oBinding.requestObject();
  
            // Check if data exists and handle accordingly
            if (oData && oData.value && oData.value.length > 0) {
              console.log("result", oData.value);
  
              // Updating....    finalModel data
  
              oJsonModel.setData(oData.value[0]);
            } else {
  
              // Return null values 
            }
            oJsonModel.refresh();
          } catch (oError) {
            console.log("Error fetching Parking data:", oError.message);
            MessageBox.error(oError.message);
          }
  
        },
        onSubmit: function () {
          let currentDate = new Date().toISOString().split('T')[0];
          let createdDate = currentDate + "T00:00:00Z";
          let now = new Date();
          let time = now.toTimeString().split(' ')[0]; // format: HH:MM:SS
          let ParkingNo = this.byId("parking_id").getValue();
        
          let oTable = this.byId("_checkListTable");
          let tableContexts = oTable.getBinding("rows").getContexts();
        
          let aResults = []; // store user inputs
          let selectedResultsMap = {}; // for easy lookup
        
          tableContexts.forEach(function (oContext) {
            let oData = oContext.getObject();
            let key = `${ParkingNo}_${oData.Remarks}`;
        
            selectedResultsMap[key] = {
              Remarks: oData.Remarks,
              pass: oData.pass,
              fail: oData.fail
            };
        
            aResults.push({
              ParkingNo: ParkingNo,
              Remarks: oData.Remarks,
              pass: oData.pass,
              fail: oData.fail
            });
          });
        
          let allPass = Object.values(selectedResultsMap).every(item => item.pass === true);
          let anyFail = Object.values(selectedResultsMap).some(item => item.fail === true);
          let anyEmpty = Object.values(selectedResultsMap).some(item => item.pass === null && item.fail == null);
        
          if (anyEmpty) {
            MessageBox.warning("Please fill all the fields.");
            return;
          }
        
          let that = this;
          let oModel = this.getOwnerComponent().getModel();
          let finalModelData = this.getView().getModel("finalModel").getData();
        
          if (finalModelData.isCheckListDataPresent) {
            // UPDATE existing records
            let oBindList = oModel.bindList("/ChecklistVerification");
            oBindList.filter(new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, ParkingNo))
              .requestContexts().then(function (aContexts) {
                aContexts.forEach(context => {
                  let contextData = context.getObject();
                  let matched = selectedResultsMap[`${contextData.ParkingNo}_${contextData.Remarks}`];
                  if (matched) {
                    context.setProperty("Remarks", matched.Remarks);
                    context.setProperty("pass", matched.pass);
                    context.setProperty("fail", matched.fail);
                  }
                });
        
                if (allPass) {
                  that._updateHeaderAndItemStatus(oModel, ParkingNo, "Security Cleared", createdDate, time);
                } else if (anyFail) {
                  that._updateHeaderAndItemStatus(oModel, ParkingNo, "Security Failed", createdDate, time);
                }
              }).catch(error => {
                console.error("Checklist fetch error:", error);
              });
          } else {
            // CREATE new records
            let oBindList = oModel.bindList("/ChecklistVerification");
            aResults.forEach(oRecord => oBindList.create(oRecord, true));
        
            if (allPass) {
              that._updateHeaderAndItemStatus(oModel, ParkingNo, "Security Cleared", createdDate, time);
            } else if (anyFail) {
              that._updateHeaderAndItemStatus(oModel, ParkingNo, "Security Failed", createdDate, time);
            }
          }
        },
        
        _updateHeaderAndItemStatus: function (oModel, ParkingNo, status, createdDate, time) {
          let oHeaderList = oModel.bindList("/Park_headerSet2");
          let oItemList = oModel.bindList("/park_itemSet2");
  
          let aFilter = new sap.ui.model.Filter("ParkingNo", sap.ui.model.FilterOperator.EQ, ParkingNo);
  
          // Update Header Status
          oHeaderList.filter(aFilter).requestContexts().then(aContexts => {
            if (aContexts.length > 0) {
              let context = aContexts[0];
              let currentStatus = context.getProperty("Status");
  
              if (status === "Security Cleared") {
                if (["Security Pending", "Security Failed"].includes(currentStatus)) {
                  context.setProperty("Status", "Security Cleared");
                } else if (currentStatus.includes("Vehicle Master Missing")) {
                  context.setProperty("Status", "Security Cleared, Vehicle Master Missing");
                }
              } else if (status === "Security Failed") {
                if (["Security Pending", "Security Cleared"].includes(currentStatus)) {
                  context.setProperty("Status", "Security Failed");
                } else if (currentStatus.includes("Vehicle Master Missing")) {
                  context.setProperty("Status", "Security Failed, Vehicle Master Missing");
                }
              }
            }
          });
  
          // Update Item Timestamps
          oItemList.filter(aFilter).requestContexts().then(aContexts => {
            if (aContexts.length > 0) {
              let itemContext = aContexts[0];
              if (status.includes("Cleared")) {
                itemContext.setProperty("SecClearDate", createdDate);
                itemContext.setProperty("SecClearTime", time);
              } else if (status.includes("Failed")) {
                itemContext.setProperty("SecFailedDate", createdDate);
                itemContext.setProperty("SecFailedTime", time);
              }
            }
  
            // MessageBox
            let that = this;
            sap.m.MessageBox.show(status, {
              title: "Security Status",
              icon: status.includes("Cleared") ? sap.m.MessageBox.Icon.SUCCESS : sap.m.MessageBox.Icon.ERROR,
              actions: [sap.m.MessageBox.Action.OK],
              onClose: () => {
                sap.ui.core.UIComponent.getRouterFor(this).navTo("RouteSecuriyChecklist", {}, true);
                that.getOwnerComponent().getModel("data").getProperty("/parkingNumber");
              }
            });
  
          }).catch(error => {
            console.error("Error updating park_itemSet2 timestamps:", error);
          });
        }
        ,
  
      });
    }
  );
  