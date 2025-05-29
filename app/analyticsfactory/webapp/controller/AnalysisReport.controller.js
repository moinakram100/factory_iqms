sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
  ], function (Controller, JSONModel, MessageToast, Fragment) {
    "use strict";
  
    return Controller.extend("com.ingenx.qms.analyticsfactory.controller.AnalysisReport", {
  
      onInit: function () {
        this._avgTimeDialog = null;
        this._isDurationView = false;
  
        const oData = {
          records: [
            {
              vehicleNo: "MH12AB1234",
              parkingNo: "0000000056",
              created: "10:00",
              securityClearance: "10:15",
              vehicleMaster: "10:15",
              salesOrder: "10:30",
              deliveryNo: "10:45",
              shipmentNo: "11:00",
              billing: "11:15",
              exit: "11:30",
              plant: "AJPL Factory",
              material: "2000000149",
              bay: "B1"
            },
            {
              vehicleNo: "DL01CD1111",
              parkingNo: "0000000057",
              created: "09:30",
              securityClearance: "09:45",
              vehicleMaster: "09:50",
              salesOrder: "10:00",
              deliveryNo: "10:15",
              shipmentNo: "10:30",
              billing: "10:45",
              exit: "11:00",
              plant: "AJP1 Warehouse",
              material: "200000001",
              bay: "B2"
            },
            {
              vehicleNo: "RJ14EF9012",
              parkingNo: "0000000058",
              created: "08:40",
              securityClearance: "08:55",
              vehicleMaster: "09:05",
              salesOrder: "09:25",
              deliveryNo: "09:40",
              shipmentNo: "10:00",
              billing: "10:20",
              exit: "10:35",
              plant: "AJPL Factory",
              material: "200000006",
              bay: "B3"
            },
            {
              vehicleNo: "UP32GH7890",
              parkingNo: "0000000059",
              created: "07:15",
              securityClearance: "07:25",
              vehicleMaster: "07:35",
              salesOrder: "07:50",
              deliveryNo: "08:10",
              shipmentNo: "08:25",
              billing: "08:45",
              exit: "09:00",
              plant: "AJPL Factory",
              material: "2000000149",
              bay: "B2"
            },
            {
              vehicleNo: "KA05MN4567",
              parkingNo: "0000000060",
              created: "11:10",
              securityClearance: "11:20",
              vehicleMaster: "11:35",
              salesOrder: "11:50",
              deliveryNo: "12:05",
              shipmentNo: "12:20",
              billing: "12:40",
              exit: "13:00",
              plant: "AJP1 Warehouse",
              material: "200000001",
              bay: "B1"
            },
            {
              vehicleNo: "TN09XY3333",
              parkingNo: "0000000061",
              created: "06:50",
              securityClearance: "07:00",
              vehicleMaster: "07:15",
              salesOrder: "07:30",
              deliveryNo: "07:45",
              shipmentNo: "08:00",
              billing: "08:20",
              exit: "08:40",
              plant: "AJPL Factory",
              material: "200000002",
              bay: "B3"
            },
            {
              vehicleNo: "GJ18KL2222",
              parkingNo: "0000000062",
              created: "12:20",
              securityClearance: "12:30",
              vehicleMaster: "12:45",
              salesOrder: "13:00",
              deliveryNo: "13:15",
              shipmentNo: "13:30",
              billing: "13:50",
              exit: "14:05",
              plant: "AJP1 Warehouse",
              material: "200000006",
              bay: "B1"
            },
            {
              vehicleNo: "PB10TR7777",
              parkingNo: "0000000063",
              created: "13:15",
              securityClearance: "13:25",
              vehicleMaster: "13:40",
              salesOrder: "13:55",
              deliveryNo: "14:10",
              shipmentNo: "14:25",
              billing: "14:45",
              exit: "15:00",
              plant: "AJPL Factory",
              material: "2000000149",
              bay: "B2"
            },
            {
              vehicleNo: "WB24OP8888",
              parkingNo: "0000000064",
              created: "05:45",
              securityClearance: "05:55",
              vehicleMaster: "06:10",
              salesOrder: "06:30",
              deliveryNo: "06:45",
              shipmentNo: "07:00",
              billing: "07:20",
              exit: "07:35",
              plant: "AJP1 Warehouse",
              material: "200000001",
              bay: "B3"
            },
            {
              vehicleNo: "HR26QQ9999",
              parkingNo: "0000000065",
              created: "15:00",
              securityClearance: "15:10",
              vehicleMaster: "15:25",
              salesOrder: "15:40",
              deliveryNo: "15:55",
              shipmentNo: "16:10",
              billing: "16:30",
              exit: "16:45",
              plant: "AJPL Factory",
              material: "200000002",
              bay: "B1"
            }
          ]
        };
  
        const oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "vehicleModel");
        this._originalVehicleData = JSON.parse(JSON.stringify(oData.records));
        this._currentFilteredData = JSON.parse(JSON.stringify(oData.records)); 
  
      },
  
      onFilterSelectionChange: function () {
        const oSource = this.byId("filterSelect");
        const aItems = oSource.getSelectedItems();
        const oFilterBox = this.byId("filterInputs");
        oFilterBox.removeAllItems();
  
        aItems.forEach(item => {
          const key = item.getKey();
          const label = key.charAt(0).toUpperCase() + key.slice(1) + ":";
          const inputId = this.createId(key + "Input");
  
          const oLabel = new sap.m.Label({
            text: label,
            labelFor: inputId
          }).addStyleClass("sapUiTinyMarginEnd");
  
          const oInput = new sap.m.Input({
            id: inputId,
            placeholder: "Enter " + key,
            width: "12rem"
          });
  
          const oHBox = new sap.m.HBox({
            alignItems: "Center",
            items: [oLabel, oInput]
          }).addStyleClass("sapUiTinyMarginEnd sapUiTinyMarginBottom");
  
          oFilterBox.addItem(oHBox);
        });
      },
  
      onSearchWithFilters: function () {
        const oModel = this.getView().getModel("vehicleModel");
        const aOriginal = this._originalVehicleData;
        const oFilterBox = this.byId("filterInputs");
        const aItems = oFilterBox.getItems();
      
        let aFiltered = aOriginal;
      
        aItems.forEach(oHBox => {
          const aChildren = oHBox.getItems();
          if (aChildren.length === 2) {
            const oInput = aChildren[1];
            const sKey = oInput.getId().split("--").pop().replace("Input", "");
            const sValue = oInput.getValue().trim().toLowerCase();
      
            if (sValue) {
              aFiltered = aFiltered.filter(oItem => {
                const fieldVal = oItem[sKey];
                return fieldVal && fieldVal.toLowerCase().includes(sValue);
              });
            }
          }
        });
      
        this._currentFilteredData = JSON.parse(JSON.stringify(aFiltered)); // ✅ Deep copy
        oModel.setData({ records: aFiltered });
      },
      
  
      onToggleView: function () {
        const oModel = this.getView().getModel("vehicleModel");
      
        const avgSteps = this._getAvgStepTimesAcrossAllTrucks();
        const avgMap = {};
        avgSteps.forEach(step => {
          avgMap[step.step] = step.avgTime;
        });
      
        const aCurrent = oModel.getProperty("/records");
      
        if (!this._isDurationView) {
          // Convert to duration view
          const aProcessed = aCurrent.map(rec => {
            const newRec = { ...rec };
            const steps = [
              "created", "securityClearance", "vehicleMaster",
              "salesOrder", "deliveryNo", "shipmentNo", "billing", "exit"
            ];
      
            for (let i = 1; i < steps.length; i++) {
              const prev = steps[i - 1];
              const curr = steps[i];
              const t1 = this._parseTime(rec[prev]);
              const t2 = this._parseTime(rec[curr]);
              if (t1 && t2) {
                const diff = Math.round((t2 - t1) / 60000);
                const avg = avgMap[this._getStepLabel(curr)] || 0;
                const status = diff > avg + 5 ? "Late" : diff < avg - 5 ? "Early" : "OnTime";
                newRec[curr] = {
                  value: diff + " min",
                  status: status
                };
              }
            }
      
            return newRec;
          });
      
          oModel.setData({ records: aProcessed });
          MessageToast.show("Switched to Duration View");
        } else {
          // Restore the original timestamp data
          const restoredData = JSON.parse(JSON.stringify(this._currentFilteredData || this._originalVehicleData));
          oModel.setData({ records: restoredData });
          MessageToast.show("Switched to Timestamp View");
        }
      
        this._isDurationView = !this._isDurationView;
      }
      
      
      ,
      _getStepLabel: function (key) {
        const labelMap = {
          securityClearance: "Security Clearance",
          vehicleMaster: "Vehicle Master",
          salesOrder: "Sales Order",
          deliveryNo: "Delivery No",
          shipmentNo: "Shipment No",
          billing: "Billing",
          exit: "Exit"
        };
        return labelMap[key] || key;
      },
      
      
      
  
      _calculateDurationData: function () {
        const aFiltered = this._currentFilteredData || this._originalVehicleData;
      
        return aFiltered.map(rec => {
          const newRec = { ...rec };
          const steps = [
            "created",
            "securityClearance",
            "vehicleMaster",
            "salesOrder",
            "deliveryNo",
            "shipmentNo",
            "billing",
            "exit"
          ];
      
          for (let i = 1; i < steps.length; i++) {
            const t1 = this._parseTime(rec[steps[i - 1]]);
            const t2 = this._parseTime(rec[steps[i]]);
            if (t1 && t2) {
              const diffMins = Math.round((t2 - t1) / 60000);
              newRec[steps[i]] = diffMins + " min";
            }
          }
      
          return newRec;
        });
      },
      
      
  
      onCalcAvgTime: function () {
        const oTable = this.byId("vehicleTable");
        const aSelectedIndices = oTable.getSelectedIndices();
  
        if (aSelectedIndices.length !== 1) {
          MessageToast.show("Please select exactly one truck to view its timeline.");
          return;
        }
  
        const rec = oTable.getContextByIndex(aSelectedIndices[0]).getObject();
  
        const steps = [
          { key: "created", label: "Created" },
          { key: "securityClearance", label: "Security Clearance" },
          { key: "vehicleMaster", label: "Vehicle Master" },
          { key: "salesOrder", label: "Sales Order" },
          { key: "deliveryNo", label: "Delivery No" },
          { key: "shipmentNo", label: "Shipment No" },
          { key: "billing", label: "Billing" },
          { key: "exit", label: "Exit" }
        ];
  
        const chartData = [];
  
        for (let i = 1; i < steps.length; i++) {
          const t1 = this._parseTime(rec[steps[i - 1].key]);
          const t2 = this._parseTime(rec[steps[i].key]);
  
          if (t1 && t2) {
            const diff = (t2 - t1) / 60000;
            chartData.push({
              step: steps[i].label,
              truckTime: diff,
              avgTime: 0
            });
          }
        }
  
        const allAvgData = this._getAvgStepTimesAcrossAllTrucks();
        chartData.forEach(d => {
          const match = allAvgData.find(a => a.step === d.step);
          d.avgTime = match ? match.avgTime : 0;
        });
  
        const oModel = new JSONModel({
          title: "Time per Step for: " + rec.vehicleNo,
          data: chartData
        });
  
        this.getView().setModel(oModel, "avgTimeModel");
  
        if (!this._avgTimeDialog) {
          Fragment.load({
            name: "com.ingenx.qms.analyticsfactory.fragments.analytics",
            controller: this
          }).then(function (oDialog) {
            this._avgTimeDialog = oDialog;
            this.getView().addDependent(oDialog);
            this._avgTimeDialog.open();
          }.bind(this));
        } else {
          this._avgTimeDialog.open();
        }
      },
  
      _getAvgStepTimesAcrossAllTrucks: function () {
        const aRecords = this.getView().getModel("vehicleModel").getProperty("/records");
  
        const steps = [
          { current: "securityClearance", previous: "created", label: "Security Clearance" },
          { current: "vehicleMaster", previous: "securityClearance", label: "Vehicle Master" },
          { current: "salesOrder", previous: "vehicleMaster", label: "Sales Order" },
          { current: "deliveryNo", previous: "salesOrder", label: "Delivery No" },
          { current: "shipmentNo", previous: "deliveryNo", label: "Shipment No" },
          { current: "billing", previous: "shipmentNo", label: "Billing" },
          { current: "exit", previous: "billing", label: "Exit" }
        ];
  
        const totals = {}, counts = {};
  
        aRecords.forEach(rec => {
          steps.forEach(step => {
            const t1 = this._parseTime(rec[step.previous]);
            const t2 = this._parseTime(rec[step.current]);
  
            if (t1 && t2) {
              const diff = (t2 - t1) / 60000;
              totals[step.label] = (totals[step.label] || 0) + diff;
              counts[step.label] = (counts[step.label] || 0) + 1;
            }
          });
        });
  
        return steps.map(step => ({
          step: step.label,
          avgTime: counts[step.label] ? Math.round(totals[step.label] / counts[step.label]) : 0
        }));
      },
  
      onCloseDialog: function () {
        if (this._avgTimeDialog) {
          this._avgTimeDialog.close();
        }
      },
      _parseTime: function (str) {
        if (!str) return null;
      
        // If it's an object like { value: "15 min", status: "Late" }, get the raw string
        if (typeof str === "object" && str.value) {
          str = str.value.split(" ")[0]; // just in case it's "15 min"
        }
      
        if (typeof str !== "string" || !str.includes(":")) return null;
      
        const parts = str.split(":");
        const date = new Date();
        date.setHours(parseInt(parts[0], 10));
        date.setMinutes(parseInt(parts[1], 10));
        date.setSeconds(0);
        return date;
      }
      
  
    });
  });
  