
sap.ui.define([
	"sap/ui/core/library",
	"sap/ui/core/Fragment",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/json/JSONModel",
	"sap/ui/unified/library",
	"sap/m/library",
	"sap/m/MessageToast",
	"sap/ui/core/date/UI5Date",
	"sap/ui/core/Core",
	"sap/m/MessageBox",
	"com/ingenx/qms/scheduling/utils/helperFunctions"

],
	function (coreLibrary, Fragment, Controller, DateFormat, JSONModel, unifiedLibrary, mobileLibrary, MessageToast, UI5Date, Core, MessageBox, helperFunctions) {
		"use strict";

		let CalendarDayType = unifiedLibrary.CalendarDayType;
		let ValueState = coreLibrary.ValueState;
		let StickyMode = mobileLibrary.PlanningCalendarStickyMode;
		let appointments;
		let flag = false;
		let sFormattedEndDate
		let sFormattedStartDate
		let SO_STO_Model = []
		let getCalendarData = []
		let oModelsales

		return Controller.extend("com.ingenx.qms.scheduling.controller.Home", {

			// onInit: async function () {

			// 	let modifyModel = new sap.ui.model.json.JSONModel();
			// 	let modifyData = {
			// 		salesOrder: "",
			// 		cust: "",
			// 		Mat: "",
			// 		Quantity: "",
			// 		startDate: "",
			// 		endDate: "",
			// 		Uom: ""
			// 	}
			// 	modifyModel.setData(modifyData);
			// 	this.getView().setModel(modifyModel, "modifyModel");


			// 	oModelsales = new sap.ui.model.json.JSONModel();
			// 	this.getView().setModel(oModelsales, "SO_STO_Model");

			// 	let supportedAppointmentItems = [
			// 		{
			// 			text: "Bay 1",
			// 			type: CalendarDayType.Type01
			// 		},
			// 		{
			// 			text: "Bay 2",
			// 			type: CalendarDayType.Type05
			// 		},
			// 		{
			// 			text: "Bay 3",
			// 			type: CalendarDayType.Type08
			// 		},
			// 		{
			// 			text: "Bay 4",
			// 			type: CalendarDayType.Type09
			// 		},
			// 		{
			// 			text: "Bay 5",
			// 			type: CalendarDayType.Type03
			// 		}
			// 	]
			// 	let calendarModel = new JSONModel({
			// 		startDate: UI5Date.getInstance(),
			// 		appointments: [],
			// 		supportedAppointmentItems

			// 	});
			// 	console.log("my model data", calendarModel.getData());



			// 	console.log("initial data", calendarModel.getData());

			// 	let oModel1 = this.getOwnerComponent().getModel();
			// 	let oBindList = oModel1.bindList("/SchedulingSet");


			// 	await oBindList.requestContexts(0, Infinity).then(function (aContexts) {
			// 		let appointments = [];
			// 		let supportedAppointmentItems = calendarModel.getProperty("/supportedAppointmentItems");

			// 		aContexts.forEach(function (oContext) {
			// 			let appointment = oContext.getObject();
			// 			let startDateObj, endDateObj;

			// 			// Combine Startdate and Starttime
			// 			if (appointment.Startdate && appointment.Starttime) {
			// 				startDateObj = new Date(appointment.Startdate.split("T")[0] + "T" + appointment.Starttime);
			// 				startDateObj.setHours(startDateObj.getHours() );  // Subtract 5 hours if necessary
			// 				startDateObj.setMinutes(startDateObj.getMinutes() );  // Subtract 30 minutes
			// 				appointment.startDate = startDateObj; // Store as new startDate
			// 			}

			// 			// Combine Enddate and Endtime
			// 			if (appointment.Enddate && appointment.Endtime) {
			// 				endDateObj = new Date(appointment.Enddate.split("T")[0] + "T" + appointment.Endtime);
			// 				endDateObj.setHours(endDateObj.getHours());  // Subtract 5 hours
			// 				endDateObj.setMinutes(endDateObj.getMinutes() );  // Subtract 30 minutes if necessary
			// 				appointment.endDate = endDateObj; // Store as new endDate
			// 			}

			// 			// Set type dynamically based on Bay No
			// 			let bayMapping = supportedAppointmentItems.find(item => item.text === appointment.Bayno);
			// 			appointment.Calendertype = bayMapping ? bayMapping.type : CalendarDayType.None;

			// 			appointments.push(appointment);
			// 		});

			// 		calendarModel.setProperty("/appointments", appointments);
			// 		console.log("Updated data:", calendarModel.getData());
			// 	});



			// 	this.getView().setModel(calendarModel, "calanderdata");
			// 	console.log("updated data 2", calendarModel.getData());
			//     // 
			// 	calendarModel = new JSONModel();
			// 	calendarModel.setData({ allDay: false });
			// 	this.getView().setModel(calendarModel, "allDay");

			// 	let calendarSettingModel = new JSONModel();
			// 	calendarSettingModel.setData({ stickyMode: StickyMode.All, enableAppointmentsDragAndDrop: true, enableAppointmentsResize: true, enableAppointmentsCreate: true });
			// 	this.getView().setModel(calendarSettingModel, "settings");

			// 	let oView = this.getView();
			// 	let oCalendar = oView.byId("SPC1");

			// 	oCalendar.addEventDelegate({
			// 		onAfterRendering: this._attachDragEvents.bind(this)
			// 	});


			// },
			onInit: async function () {
				this._initializeModels();
				await this._fetchSchedulingData();
			},

			_initializeModels: function () {
				let modifyModel = new sap.ui.model.json.JSONModel({
					salesOrder: "",
					cust: "",
					Mat: "",
					Quantity: "",
					startDate: new Date(),
					endDate: new Date(),
					Uom: "",
					Stockorder:"",
					DocType: "SO", // default
					DocNum : ""
				});
				this.getView().setModel(modifyModel, "modifyModel");
				// setting sales model for salesOrder/ STO data

				oModelsales = new sap.ui.model.json.JSONModel();
				this.getView().setModel(oModelsales, "SO_STO_Model");

				let supportedAppointmentItems = [
					{ text: "Bay 1", type: CalendarDayType.Type01 },
					{ text: "Bay 2", type: CalendarDayType.Type05 },
					{ text: "Bay 3", type: CalendarDayType.Type08 },
					{ text: "Bay 4", type: CalendarDayType.Type09 },
					{ text: "Bay 5", type: CalendarDayType.Type03 }
				];

				let calendarModel = new JSONModel({
					startDate: UI5Date.getInstance(),
					appointments: [],
					supportedAppointmentItems
				});

				this.getView().setModel(calendarModel, "calanderdata");

				let settingsModel = new JSONModel({
					stickyMode: StickyMode.All,
					enableAppointmentsDragAndDrop: true,
					enableAppointmentsResize: true,
					enableAppointmentsCreate: true
				});
				this.getView().setModel(settingsModel, "settings");

				let oCalendar = this.getView().byId("SPC1");
				oCalendar.addEventDelegate({ onAfterRendering: this._attachDragEvents.bind(this) });
			},
			_fetchSchedulingData: async function () {
				const oModel = this.getOwnerComponent().getModel(); // Main OData model
				const calendarModel = this.getView().getModel("calanderdata"); // View model for calendar data
				const supportedAppointmentItems = calendarModel.getProperty("/supportedAppointmentItems") || [];
			
				try {
					// Bind the function import that returns scheduling data
					const oBinding = oModel.bindList("/fetchSchedulingData()"); // <- Ensure this matches metadata
					const aContexts = await oBinding.requestContexts(0, Infinity);
			
					const appointments = aContexts.map(oContext => {
						const appointment = oContext.getObject();
			
						// Combine Startdate + Starttime
						if (appointment.Startdate && appointment.Starttime) {
							appointment.startDate = new Date(appointment.Startdate.split("T")[0] + "T" + appointment.Starttime);
						}
			
						// Combine Enddate + Endtime
						if (appointment.Enddate && appointment.Endtime) {
							appointment.endDate = new Date(appointment.Enddate.split("T")[0] + "T" + appointment.Endtime);
						}
			
						// Add calendar type for UI grouping
						appointment.Calendertype = this._getCalendarType(appointment.Bayno, supportedAppointmentItems);
			
						return appointment;
					});
			
					calendarModel.setProperty("/appointments", appointments);
					console.log("Appointments fetched via function:", appointments);
			
				} catch (error) {
					console.error("Error in _fetchSchedulingData:", error);
				}
			}
,			

			_fetchSchedulingData1: async function () {
				let oModel = this.getOwnerComponent().getModel();
				let oBindList = oModel.bindList("/xIQMSxschfac_fetch");

				try {
					let aContexts = await oBindList.requestContexts(0, Infinity);
					let calendarModel = this.getView().getModel("calanderdata");
					let supportedAppointmentItems = calendarModel.getProperty("/supportedAppointmentItems");

					let appointments = aContexts.map(oContext => {
						let appointment = oContext.getObject();

						// Directly combining Startdate and Starttime
						if (appointment.Startdate && appointment.Starttime) {
							let startDateObj = new Date(appointment.Startdate.split("T")[0] + "T" + appointment.Starttime);
							appointment.startDate = startDateObj;
						}

						// Directly combining Enddate and Endtime
						if (appointment.Enddate && appointment.Endtime) {
							let endDateObj = new Date(appointment.Enddate.split("T")[0] + "T" + appointment.Endtime);
							appointment.endDate = endDateObj;
						}
                        // calender data modified to show on UI 
						appointment.Calendertype = this._getCalendarType(appointment.Bayno, supportedAppointmentItems);
						
						const isSO = appointment.SalesOrder && appointment.SalesOrder !== "X";

						appointment.DocType = isSO ? "SO" : "STO";
						appointment.DocNum  = isSO ? appointment.SalesOrder : appointment.Stockorder;

						return appointment;
					});

					calendarModel.setProperty("/appointments", appointments);
					console.log("appointments", appointments);
					
					console.log(this.getView().getModel("calanderdata").getProperty("/appointments"));

				} catch (error) {
					console.error("Error fetching SchedulingSet data:", error);
				}
			},

			_getCalendarType: function (bayNo, supportedAppointmentItems) {
				let bayMapping = supportedAppointmentItems.find(item => item.text === bayNo);
				return bayMapping ? bayMapping.type : CalendarDayType.None;
			}
			,

			onDocumentChange: async function (oEvent) {
				let sValue = oEvent.getSource().getSelectedItem().getProperty('text');
				console.log(sValue);
				if( sValue === 'Sales Order'){
					this.byId('plantFilterInput').setVisible( false);
					this.byId('customerFilterInput').setVisible( true);

				}else if(sValue === 'Stock Transfer'){
					this.byId('plantFilterInput').setVisible( true);
					this.byId('customerFilterInput').setVisible(false);

				}else {
				// logic to show Stock order requisition filter input avalue help
				}
				let oModel = this.getOwnerComponent().getModel();
				let sPath = `/fetchSO_STO_PR_Data(docType='${encodeURIComponent(sValue)}')`;
				let bindList = oModel.bindList(sPath);
				let oContexts = await bindList.requestContexts(0, Infinity);
				let oData = oContexts.map( context => context.getObject());
				console.log('mydata', oData);;
				oModelsales.setData(oData);
				this._aOriginalSalesData = [...oData];
				
			},
			onPlantCode: function () {
				helperFunctions._openValueHelpDialog(this, 'PlantCodeDialog', 'com.ingenx.qms.scheduling.fragments.PlantCode');
                
			},
			onPlantSearch: function( oEvent){
				helperFunctions._valueHelpLiveSearchMutipleFilters( oEvent, ['Plant','Plant_text'], false);
			},
			onPlantConfirm: function (oEvent) {
				let oSelectedItem = oEvent.getParameter("selectedItem");

				oEvent.getSource().getBinding("items").filter([]);

				if (!oSelectedItem) {
					return;
				}
				let sSelectedCustomer = oSelectedItem.getTitle();

				const oModel = this.getView().getModel("SO_STO_Model");
				const aData = oModel.getData();

				// Check if sales order/stock data is available
				if (!Array.isArray(this._aOriginalSalesData) || this._aOriginalSalesData.length === 0) {
					sap.m.MessageToast.show("Please select a Sales Order or Stock Order first.");
					return;
				}
				this.byId("plantFilterInput").setValue(sSelectedCustomer);

				// Store original unfiltered data only once
				if (!this._aOriginalSalesData) {
					this._aOriginalSalesData = [...aData]; // clone the array to preserve original
				}

				// If no customer selected (like 'All'), reset the model
				if (!sSelectedCustomer) {
					oModel.setData(this._aOriginalSalesData);
					return;
				}

				// Filter the original array
				const aFilteredData = this._aOriginalSalesData.filter(item => item.OidShip === sSelectedCustomer);

				oModel.setData(aFilteredData);

			},
			// customer based filter :
			// onCustomerSelect: function (oEvent) {
			// 	const sSelectedCustomer = oEvent.getSource().getSelectedItem()?.getKey();

			// }

			onCustomerCode: function () {
				helperFunctions._openValueHelpDialog(this, 'CustomerCodeDialog', 'com.ingenx.qms.scheduling.fragments.CustomerCode');

			},
			onCustomerConfirm: function (oEvent) {
				let oSelectedItem = oEvent.getParameter("selectedItem");

				oEvent.getSource().getBinding("items").filter([]);

				if (!oSelectedItem) {
					return;
				}
				let sSelectedCustomer = oSelectedItem.getTitle();

				const oModel = this.getView().getModel("SO_STO_Model");
				const aData = oModel.getData();

				// Check if sales order/stock data is available
				if (!Array.isArray(this._aOriginalSalesData) || this._aOriginalSalesData.length === 0) {
					sap.m.MessageToast.show("Please select a Sales Order or Stock Order first.");
					return;
				}
				this.byId("customerFilterInput").setValue(sSelectedCustomer);

				// Store original unfiltered data only once
				if (!this._aOriginalSalesData) {
					this._aOriginalSalesData = [...aData]; // clone the array to preserve original
				}

				// If no customer selected (like 'All'), reset the model
				if (!sSelectedCustomer) {
					oModel.setData(this._aOriginalSalesData);
					return;
				}

				// Filter the original array
				const aFilteredData = this._aOriginalSalesData.filter(item => item.OidShip === sSelectedCustomer);

				oModel.setData(aFilteredData);

			},

			onCustomerSearch: function (oEvent) {

				// helperFunctions._valueHelpLiveSearch(oEvent, 'Kunnr');
				helperFunctions._valueHelpLiveSearchMutipleFilters(oEvent, ['Kunnr', 'Name1'], false);
			},


			// fetchSO_STO_Data: async function (oModelsales, sValue) {
			// 	sap.ui.core.BusyIndicator.show(0);

			// 	try {
			// 		let oModel3 = this.getOwnerComponent().getModel();
			// 		let oBindList3;
			// 		if (sValue === "Sales Order") {

			// 			oBindList3 = oModel3.bindList("/xIQMSxfetch_so");
			// 		} else {
			// 			oBindList3 = oModel3.bindList('/fetchSTO');
			// 		}

			// 		let aContexts = await oBindList3.requestContexts(0, Infinity);
			// 		let filteredData = aContexts
			// 			.map(oContext => oContext.getObject())
			// 			.filter(item => item.Matnr && item.uom); // Filter out null or undefined Matnr & Uom

			// 		// ading filed:
			// 		filteredData = filteredData.map(item => {
			// 			if (sValue === "Sales Order") {
			// 				return {
			// 					...item,
			// 					DocType: "SO",
			// 					DocNum: item.Vbeln
			// 				};
			// 			} else {
			// 				return {
			// 					...item,
			// 					DocType: "STO",
			// 					DocNum: item.STO
			// 				};
			// 			}
			// 		});
				

			// 		filteredData.sort((a, b) => {
			// 			if (sValue === "Sales Order") {
			// 				return parseInt(b.Vbeln || "0", 10) - parseInt(a.Vbeln || "0", 10);
			// 			} else {
			// 				return parseInt(b.STO || "0", 10) - parseInt(a.STO || "0", 10);
			// 			}
			// 		});
			// 		// 🟢 Store fresh unfiltered copy
			// 		this._aOriginalSalesData = [...filteredData];


			// 		oModelsales.setData(filteredData);

			// 		// Log the sorted and filtered data
			// 		console.log(`Filtered & Sorted ${sValue} data:`, filteredData);
			// 	} catch (error) {
			// 		console.error(`Error fetching ${sValue} data:`, error);
			// 	} finally {
			// 		sap.ui.core.BusyIndicator.hide();
			// 	}
			// },


			_attachDragEvents: function () {
				let oCalendar = this.getView().byId("SPC1");

				oCalendar.$().find(".sapMSinglePCRow").on("dragenter", this._onDragEnter.bind(this));
			},

			_onDragEnter: function (oEvent) {

				let oCalendar = this.getView().byId("SPC1");
				let $calendar = oCalendar.$();
				let $slots = $calendar.find(".sapMSinglePCRow");

				if ($slots.length === 0) {
					console.error("No time slots found.");
					return;
				}

				let iOffsetY = oEvent.originalEvent.pageY - $calendar.offset().top;
				let iSlotHeight = $slots.first().outerHeight();
				let iSlotIndex = Math.floor(iOffsetY / iSlotHeight) - 2;
				let $currentSlot = $slots.eq(iSlotIndex);

				if ($currentSlot.length === 0) {
					console.error("Slot not found for index: " + iSlotIndex);
					return;
				}

				let slotContent = $currentSlot.html();
				console.log("Current Slot HTML: ", slotContent);

				if (slotContent.includes("Start Time") && slotContent.includes("End Time")) {
					try {
						// Extract raw strings
						let startIndex = slotContent.indexOf("Start Time:") + "Start Time:".length;
						let endIndex = slotContent.indexOf("End Time:");
						let sStartDateString = slotContent.substring(startIndex, endIndex).trim();
						let sEndDateString = slotContent.substring(endIndex + "End Time:".length).trim();

						// Remove any trailing HTML tags or unexpected characters
						sStartDateString = sStartDateString.replace(/<\/?[^>]+(>|$)/g, "").replace(/;\s*$/, "");
						sEndDateString = sEndDateString.replace(/<\/?[^>]+(>|$)/g, "").replace(/;\s*$/, "");

						console.log("Cleaned Start Date: ", sStartDateString);
						console.log("Cleaned End Date: ", sEndDateString);

						// Convert strings to date format compatible with JavaScript
						let startDate = new Date(sStartDateString.replace(/ at /, " "));
						let endDate = new Date(sEndDateString.replace(/ at /, " "));

						if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
							console.error("Invalid date strings. Unable to parse.");
							console.error("Start Date String: ", sStartDateString);
							console.error("End Date String: ", sEndDateString);
							return;
						}

						// Format dates
						let options = {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
							second: '2-digit',
							hour12: true
						};

						sFormattedStartDate = new Intl.DateTimeFormat('en-US', options).format(startDate);
						sFormattedEndDate = new Intl.DateTimeFormat('en-US', options).format(endDate);

						console.log("Formatted Start Date: ", sFormattedStartDate);
						console.log("Formatted End Date: ", sFormattedEndDate);

					} catch (error) {
						console.error("Error processing slotContent: ", error);
					}
				} else {
					console.error("Expected time data not found in slotContent.");
				}
			},

			onAfterRendering: function () {
				let oCalendar = this.getView().byId("SPC1");

				if (!oCalendar) {
					console.error("Calendar SPC1 not found.");
					return;
				}

				let $calendar = oCalendar.$();
				let $slots = $calendar.find(".sapMSinglePCRow");

				if ($slots.length === 0) {
					console.warn("No .sapMSinglePCRow elements found.");
					return;
				}

				// Attach dragEnter manually
				$calendar.on("dragenter", ".sapMSinglePCRow", this._onDragEnter.bind(this));

				console.log("Drag events attached.");


				// Add data attributes to each time slot
				$slots.each(function (index, element) {
					let $element = $(element);
					let oStartDate = new Date(oCalendar.getStartDate());
					let iSlotDurationMinutes = 30; // Adjust if needed

					// Calculate the start and end times
					let oSlotStartDate = new Date(oStartDate);
					oSlotStartDate.setMinutes(oStartDate.getMinutes() + index * iSlotDurationMinutes);

					let oSlotEndDate = new Date(oSlotStartDate);
					oSlotEndDate.setMinutes(oSlotEndDate.getMinutes() + iSlotDurationMinutes);

					// Set data attributes for start and end times
					$element.attr('data-start', oSlotStartDate.toISOString());
					$element.attr('data-end', oSlotEndDate.toISOString());

					// Debugging: Log the attributes set
					// console.log("Slot index: " + index);
					// console.log("Start Date: " + oSlotStartDate.toISOString());
					// console.log("End Date: " + oSlotEndDate.toISOString());
				});
			},




			// formatTitle: function (salesOrder, shipperName) {
			// 	if (salesOrder && shipperName) {
			// 		const spaces = Array(20).join('\u00A0'); // 20 non-breaking spaces
			// 		return "SO: " + salesOrder + spaces + "Material: " + shipperName;
			// 	}
			// 	return "";
			// },

			formatTitle: function (vbeln, po, matnr) {
				const docNumber = vbeln || po;
				const material = matnr;

				if (docNumber && material) {
					const label = vbeln ? "SO" : "STO";
					let spaces;
					if(label === "SO"){

						spaces = Array(26).join('\u00A0');
					}else {
						spaces = Array(10).join('\u00A0');
						
					}
					return label + ": " + docNumber + spaces + "Material: " + material;
				}
				return "";
			},


			formatInfo: function (uom, quantity) {

				if (uom && quantity) {
					return `Qty(${uom}): ${parseFloat(quantity).toFixed(1)}`;
					// return `Qty(KL) : ${parseFloat(quantity).toFixed(1)}`;  // temporty as uom have 'L'
				}
				return "";
			},
			formatDescription : function (oidShip, docType){
				if (docType === "SO") {
					return "Customer: " + (oidShip || "-");
				} else if (docType === "STO") {
					return "Plant: " + (oidShip || "-");
				}

			},


			_arrangeDialogFragment: function () {
				let oView = this.getView();
				let modifyModel = this.getView().getModel("modifyModel");

				if (!this._pNewAppointmentDialog) {
					this._pNewAppointmentDialog = Fragment.load({
						id: oView.getId(),
						name: "com.ingenx.qms.scheduling.fragments.Modify",
						controller: this
					}).then(function (oNewAppointmentDialog) {
						oView.addDependent(oNewAppointmentDialog);
						return oNewAppointmentDialog;
					});
				}

				this._pNewAppointmentDialog.then(function (oNewAppointmentDialog) {
					oNewAppointmentDialog.setModel(modifyModel, "modifyModel");
					oNewAppointmentDialog.open();
				}.bind(this));
			},


			////IMP
			onListPlanningCalendardragStart: function (oEvent) {
				let oDragSession = oEvent.getParameter("dragSession");
				let oDraggedRow = oEvent.getParameter("target");
				// let oContextBinding = oDraggedRow.getBindingContext("SO_STO_Model").getObject();
				oDragSession.setComplexData("onListDragContext", oDraggedRow);
			},

			onListPlanningCalendarDrop: function (oEvent) {
				let oDragSession = oEvent.getParameter("dragSession");
				let oDraggedRow = oDragSession.getComplexData("onListDragContext");
				let oContextBinding = oDraggedRow.getBindingContext("SO_STO_Model").getObject();
				console.log("oContextBinding", oContextBinding);

				// Check if oContextBinding has any value
				if (oContextBinding) {
					flag = true;
					this.handleAppointmentCreate(oContextBinding);
				}
			},
			// formater to return Bay as oer calanderDay Type
			_typeFormatter: function (sType) {
				let sTypeText = "",
					aTypes = this.getView().getModel('calanderdata').getData().supportedAppointmentItems;

				console.log("aTypes", aTypes);

				for (let i = 0; i < aTypes.length; i++) {
					if (aTypes[i].type === sType) {
						sTypeText = aTypes[i].text;
					}
				}

				if (sTypeText !== "") {
					return sTypeText;
				} else {
					return sType;
				}
			},

			// within calender
			handleAppointmentDrop: function (oEvent) {
				let oAppointment = oEvent.getParameter("appointment"),
					oTitle = oAppointment.getTitle(),
					extractedTitle = oTitle.split(": ")[0],
					extractedDocNo = oTitle.split(": ")[1],
					oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate"),
					bCopy = oEvent.getParameter("copy"),
					sAppointmentTitle = oAppointment.getTitle(),
					oModel = this.getView().getModel(),
					oNewAppointment;

				if (bCopy) {
					oNewAppointment = {
						SalesOrder: sAppointmentTitle,
						icon: oAppointment.getIcon(),
						Soldtoparty: oAppointment.getText(),
						Calendertype: oAppointment.getType(),
						startDate: oStartDate,
						endDate: oEndDate
					};
					oModel.getData().appointments.push(oNewAppointment);
					oModel.updateBindings();
				} else {
					let oResModel = this.getOwnerComponent().getModel();
					// let oBindList = oResModel.bindList("/SchedulingSet");
					let oBindList = oResModel.bindList("/ScheduleFacSet");
					let Filter;
					// 🧠 Dynamically define filter key and model property key
					let sKey = extractedTitle === "SO" ? "SalesOrder" : "Stockorder";
					// if (extractedTitle === "SO") {

					// 	Filter = new sap.ui.model.Filter('SalesOrder', sap.ui.model.FilterOperator.EQ, extractedDocNo);
					// } else {
					// 	// for STO
					// 	Filter = new sap.ui.model.Filter('Stockorder', sap.ui.model.FilterOperator.EQ, extractedDocNo);


					// }

					let that = this;
					oBindList.requestContexts(0, Infinity).then(function (aContexts) {

						let localTimeFrom = that.formatDateToLocalISO(oStartDate);
						let localTimeTo = that.formatDateToLocalISO(oEndDate);
						if (aContexts.length) {
							let contextArr = aContexts.filter(context => {return context.getObject()[sKey] === extractedDocNo });
							if (contextArr.length) {

								contextArr[0].setProperty("Starttime", localTimeFrom.split('T')[1]);
								contextArr[0].setProperty("Endtime", localTimeTo.split('T')[1]);
								// contextArr[0].setProperty("Enddate", localTimeTo.split('T')[0]);
								// contextArr[0].setProperty("Startdate", localTimeFrom.split('T')[0]);
							}
							setTimeout(() => {
								// MessageToast.show("Rescheduled Sucessfully.")

								that._fetchSchedulingData();
							}, 2500)

						}
					})
					oAppointment.setStartDate(oStartDate);
					oAppointment.setEndDate(oEndDate);
					MessageToast.show("Rescheduled Sucessfully.")

				}

			},

			handleAppointmentResize: function (oEvent) {
				let oAppointment = oEvent.getParameter("appointment"),
					oTitle = oAppointment.getTitle(),
					extractedTitle = oTitle.split(": ")[0],
					extractedDocNo = oTitle.split(": ")[1],

					oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate");

				let oResModel = this.getOwnerComponent().getModel();
				let oBindList = oResModel.bindList("/SchedulingSet")
				let Filter = new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.EQ, extractedTitle);
				oBindList.filter(Filter).requestContexts(0, Infinity).then(function (aContexts) {
					aContexts.forEach(function (context) {
						context.setProperty("startDate", oStartDate.toISOString());
						context.setProperty("endDate", oEndDate.toISOString());
					});
				})

				oAppointment.setStartDate(oStartDate);
				oAppointment.setEndDate(oEndDate);

			},

			handleAppointmentCreateDnD: function (oEvent) {
				let oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate"),
					sAppointmentTitle = "New Appointment",
					oModel = this.getView().getModel(),
					oNewAppointment = {
						SalesOrder: sAppointmentTitle,
						startDate: oStartDate,
						endDate: oEndDate
					};

				oModel.getData().appointments.push(oNewAppointment);
				oModel.updateBindings();

			
			},

			handleViewChange: function () {
				//MessageToast.show("'viewChange' event fired.");
			},

			handleAppointmentSelect: function (oEvent) {
				let oAppointment = oEvent.getParameter("appointment"),
					oStartDate,
					oEndDate,
					bAllDate,
					oModel,
					oView = this.getView();

				if (oAppointment === undefined) {
					return;
				}
				console.log("oAppointment", oAppointment);

				oStartDate = oAppointment.getStartDate();
				console.log("oStartDate", oStartDate)
				oEndDate = oAppointment.getEndDate();
				console.log("oEndDate", oEndDate)

				bAllDate = false;
				oModel = this.getView().getModel("allDay");

				if (!oAppointment.getSelected() && this._pDetailsPopover) {
					this._pDetailsPopover.then(function (oResponsivePopover) {
						oResponsivePopover.close();
					});
					return;
				}

				if (!this._pDetailsPopover) {
					this._pDetailsPopover = Fragment.load({
						id: oView.getId(),
						name: "com.ingenx.qms.scheduling.fragments.Details",
						controller: this
					}).then(function (oResponsivePopover) {
						oView.addDependent(oResponsivePopover);
						return oResponsivePopover;
					});
				}
				this._pDetailsPopover.then(function (oResponsivePopover) {
					oResponsivePopover.setBindingContext(oAppointment.getBindingContext("calanderdata"), "calanderdata");
					oResponsivePopover.openBy(oAppointment);
				});
			},

			handleMoreLinkPress: function (oEvent) {
				let oDate = oEvent.getParameter("date"),
					oSinglePlanningCalendar = this.getView().byId("SPC1");

				oSinglePlanningCalendar.setSelectedView(oSinglePlanningCalendar.getViews()[2]); // DayView

				this.getView().getModel().setData({ startDate: oDate }, true);
			},

			handleEditButton: function () {
				// The sap.m.Popover has to be closed before the sap.m.Dialog gets opened
				let oDetailsPopover = this.byId("detailsPopover");
				oDetailsPopover.close();
				this.sPath = oDetailsPopover.getBindingContext("calanderdata").getPath();
				this._arrangeDialogFragment("Edit Details");
			},

			handlePopoverDeleteButton: function () {
				let oModel = this.getView().getModel("calanderdata"),
					oAppointments = oModel.getData().appointments,
					oDetailsPopover = this.byId("detailsPopover"),
					oAppointment = oDetailsPopover._getBindingContext("calanderdata").getObject();
				console.log("oAppointment", oAppointment);
				oDetailsPopover.close();

				let oDelModel = this.getOwnerComponent().getModel();
				let oBindList = oDelModel.bindList("/SchedulingSet")
				let Filter = new sap.ui.model.Filter('SalesOrder', sap.ui.model.FilterOperator.EQ, oAppointment.SalesOrder);
				oBindList.filter(Filter).requestContexts(0, Infinity).then(function (aContexts) {
					if (aContexts.length) {
						let contextFiltered = aContexts.filter(context => context.getObject().SalesOrder === oAppointment.SalesOrder);
						if (contextFiltered.length) {
							contextFiltered[0].delete();
						}
					}
					// aContexts.forEach(function (context) {
					// 	context.delete();
					// });
				})
				oAppointments.splice(oAppointments.indexOf(oAppointment), 1);
				oModel.updateBindings();
			},



			_arrangeDialog: function (sTitle, oNewAppointmentDialog) {
				this._setValuesToDialogContent1(oNewAppointmentDialog);

				this._setValuesToDialogContent2(oNewAppointmentDialog);
				oNewAppointmentDialog.setTitle(sTitle);
				oNewAppointmentDialog.open();
			},

			_setValuesToDialogContent1: function (oNewAppointmentDialog) {
				let oAllDayAppointment = this.byId("allDay"),
					// sStartDatePickerID = oAllDayAppointment.getSelected() ? "DPStartDate" : "DTPStartDate",
					// sEndDatePickerID = oAllDayAppointment.getSelected() ? "DPEndDate" : "DTPEndDate",
					sStartDatePickerID = "DTPStartDate",
					sEndDatePickerID = "DTPEndDate",
					oTitleControl = this.byId("appTitle"),
					oTextControl = this.byId("moreInfo"),
					oTypeControl = this.byId("appType"),
					oStartDateControl = this.byId(sStartDatePickerID),
					oEndDateControl = this.byId(sEndDatePickerID),
					oEmptyError = { errorState: false, errorMessage: "" },
					oContext,
					oContextObject,
					oSPCStartDate,
					sTitle,
					sText,
					oStartDate,
					oEndDate,
					sType;


				if (this.sPath) {
					oContext = this.byId("detailsPopover").getBindingContext("calanderdata");
					oContextObject = oContext.getObject();
					sTitle = oContextObject.title;
					sText = oContextObject.text;
					oStartDate = oContextObject.startDate;
					console.log("oStartDate", oStartDate);
					oEndDate = oContextObject.endDate;
					sType = oContextObject.type;
				} else {
					sTitle = "";
					sText = "";
					if (this._oChosenDayData) {
						oStartDate = this._oChosenDayData.start;
						oEndDate = this._oChosenDayData.end;

						delete this._oChosenDayData;
					} else {
						oSPCStartDate = this.getView().byId("SPC1").getStartDate();
						oStartDate = UI5Date.getInstance(oSPCStartDate);
						oStartDate.setHours(this._getDefaultAppointmentStartHour());
						oEndDate = UI5Date.getInstance(oSPCStartDate);
						oEndDate.setHours(this._getDefaultAppointmentEndHour());
					}
					//oAllDayAppointment.setSelected(false);
					sType = "Type01";
				}

				oTitleControl.setValue(sTitle);
				oTextControl.setValue(sText);
				oStartDateControl.setDateValue(oStartDate);
				oEndDateControl.setDateValue(oEndDate);
				oTypeControl.setSelectedKey(sType);
				this._setDateValueState(oStartDateControl, oEmptyError);
				this._setDateValueState(oEndDateControl, oEmptyError);
				this.updateButtonEnabledState(oStartDateControl, oEndDateControl, oNewAppointmentDialog.getBeginButton());
			},

			_setValuesToDialogContent2: function (oNewAppointmentDialog) {
				let oAllDayAppointment = this.byId("allDay"),
					// sStartDatePickerID = oAllDayAppointment.getSelected() ? "DPStartDate" : "DTPStartDate",
					// sEndDatePickerID = oAllDayAppointment.getSelected() ? "DPEndDate" : "DTPEndDate",
					sStartDatePickerID = "_IDGenDateTimePicker1",
					sEndDatePickerID = "_IDGenDateTimePicker2",
					oTitleControl = this.byId("_IDGenInput1"),
					oTextControl = this.byId("_IDGenInput2"),
					oTypeControl = this.byId("_IDGenSelect1"),
					oStartDateControl = this.byId(sStartDatePickerID),
					oEndDateControl = this.byId(sEndDatePickerID),
					oEmptyError = { errorState: false, errorMessage: "" },
					oContext,
					oContextObject,
					oSPCStartDate,
					sTitle,
					sText,
					oStartDate,
					oEndDate,
					sType;


				if (this.sPath) {
					oContext = this.byId("detailsPopover").getBindingContext("calanderdata");
					oContextObject = oContext.getObject();
					sTitle = oContextObject.title;
					sText = oContextObject.text;
					oStartDate = oContextObject.startDate;
					console.log("oStartDate", oStartDate);
					oEndDate = oContextObject.endDate;
					sType = oContextObject.type;
				} else {
					sTitle = "";
					sText = "";
					if (this._oChosenDayData) {
						oStartDate = this._oChosenDayData.start;
						oEndDate = this._oChosenDayData.end;

						delete this._oChosenDayData;
					} else {
						oSPCStartDate = this.getView().byId("SPC1").getStartDate();
						oStartDate = UI5Date.getInstance(oSPCStartDate);
						oStartDate.setHours(this._getDefaultAppointmentStartHour());
						oEndDate = UI5Date.getInstance(oSPCStartDate);
						oEndDate.setHours(this._getDefaultAppointmentEndHour());
					}
					//oAllDayAppointment.setSelected(false);
					sType = "Type01";
				}

				oTitleControl.setValue(sTitle);
				oTextControl.setValue(sText);
				oStartDateControl.setDateValue(oStartDate);
				oEndDateControl.setDateValue(oEndDate);
				oTypeControl.setSelectedKey(sType);
				this._setDateValueState(oStartDateControl, oEmptyError);
				this._setDateValueState(oEndDateControl, oEmptyError);
				this.updateButtonEnabledState(oStartDateControl, oEndDateControl, oNewAppointmentDialog.getBeginButton());
			},


			handleDialogOkButton: function (oEvent) {
				let oIconTabBar = this.byId("idIconTabBar");
				let sSelectedKey = oIconTabBar.getSelectedKey();

				if (sSelectedKey === "Customer") {
					this._saveCustomerData();
				} else if (sSelectedKey === "Transporter") {
					this._saveTransporterData();
				}

				// Close the dialog
				this.byId("modifyDialog").close();
			},

			update: function () {
				let oModelcal = new sap.ui.model.json.JSONModel();
				this.getView().setModel(oModelcal, "dataModel");
				let oModel3 = this.getOwnerComponent().getModel();
				let oBindList3 = oModel3.bindList("/Calender");
				oBindList3.requestContexts(0, Infinity).then(function (aContexts) {
					aContexts.forEach(function (oContext) {
						getCalendarData.push(oContext.getObject());
					});
					oModelcal.setData(getCalendarData);
				}.bind(this))
				console.log("getCalendarData", getCalendarData)
			},

			formatDateToLocalISO: function (date) {
				let tzOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
				// let localISOTime = new Date(date - tzOffset).toISOString().slice(0, 19) + ".000Z";
				let localISOTime = new Date(date - tzOffset).toISOString().slice(0, 19);
				return localISOTime;
			},


			_saveCustomerData: function () {
				// let myModel = this.getOwnerComponent().getModel();
				// let oBindlist = myModel.bindList("/SchedulingSet");
				// let oBindlistMessage = myModel.bindList("/CustomerTransporterEMail");
				// let sStartDate = "DTPStartDate";
				// let sEndDate = "DTPEndDate";

				// //  local data is stored in modifyModel also
				// let sLocalData = this.getView().getModel('modifyModel').getData();

				// let Material = sLocalData.Mat;
				// let Quantity = sLocalData.Quantity;
				// let sCustomer = sLocalData.cust;
				// let sSalesOrderNumber = sLocalData.salesOrder;

				// let sFrom = this.byId("DTPStartDate").getDateValue();
				// let sTo = this.byId("DTPEndDate").getDateValue();

				// let sBays = this.byId("appType").getSelectedItem().getText();

				// let localTimeFrom = this.formatDateToLocalISO(sFrom);
				// let localTimeTo = this.formatDateToLocalISO(sTo);


				// let sAppointmentPath;

				// if (!sSalesOrderNumber || !sCustomer) {
				// 	MessageToast.show("Sales Order Number and Customer are mandatory to Fill.");
				// 	return;
				// }
				// // Extract date and time separately
				// let [startDate, startTime] = localTimeFrom.split("T");
				// let [endDate, endTime] = localTimeTo.split("T");

				// let oEntryData = {
				// 	"Bayno": sBays,
				// 	"SalesOrder": sSalesOrderNumber,
				// 	"Stockorder": "",
				// 	"Startdate": startDate, // Extracted date
				// 	"Enddate": endDate, // Extracted date
				// 	"Starttime": startTime, // Extracted time
				// 	"Endtime": endTime, // Extracted time
				// 	"Material": Material,
				// 	"Quantity": Quantity,
				// 	"Uom": "KG",
				// 	"Soldtoparty": sCustomer,
				// 	"Shiptoparty": "",
				// 	"Vehicleno": "",
				// 	"Driver": "",
				// 	"Cleaner": ""
				// };
				let myModel = this.getOwnerComponent().getModel();
				let oBindlist = myModel.bindList("/ScheduleFacSet");
				let oBindlistMessage = myModel.bindList("/CustomerTransporterEMail");
			
				let sStartDateId = "DTPStartDate";
				let sEndDateId = "DTPEndDate";
			
				// Get local modifyModel data
				let oModifyModel = this.getView().getModel('modifyModel');
				let sLocalData = oModifyModel.getData();
			
				let sMaterial = sLocalData.Mat;
				let sQuantity = sLocalData.Quantity;
				let sCustomer = sLocalData.cust;
				let sDocType = sLocalData.DocType;  // "SO" or "STO"
				let sDocNum = sLocalData.DocNum;    // actual SalesOrder or STO number
				let sUom = sLocalData.Uom
			
				let sFromDate = this.byId(sStartDateId).getDateValue();
				let sToDate = this.byId(sEndDateId).getDateValue();
				let sBays = this.byId("appType").getSelectedItem().getText();
			
				let sLocalTimeFrom = this.formatDateToLocalISO(sFromDate);
				let sLocalTimeTo = this.formatDateToLocalISO(sToDate);
			    let sAppointmentPath;
				if (!sDocNum || !sCustomer) {
					MessageToast.show("Order Number and Customer are mandatory to Fill.");
					return;
				}
				// Extract date and time separately
				let [startDate, startTime] = sLocalTimeFrom.split("T");
				let [endDate, endTime] = sLocalTimeTo.split("T");
			
				// 📌 Build the entry based on DocType
				let oEntryData = {
					"Bayno": sBays,
					"SalesOrder": sDocType === "SO" ? sDocNum : "",
					"Stockorder": sDocType === "STO" ? sDocNum : "",
					"Startdate": startDate,
					"Enddate": endDate,
					"Starttime": startTime,
					"Endtime": endTime,
					"Vehicleno": "",
					"Driver": "",
					"Cleaner": ""
				};
				console.log("scheduling data",oEntryData)
		
				let oMessageData = {
					salesOrder: sDocType === 'SO' ? sDocNum :'',
					Stockorder : sDocType === 'STO' ? sDocNum : '',
					custORTrans: sCustomer,
					bays: sBays,
					fromDateTime: sLocalTimeFrom,
					toDateTime: sLocalTimeTo,
					email: "deepanshu.goyal@ingenxtec.com",
					message: "CUSTOMER",
					Quantity: sQuantity,
					unit : sUom,
					material: sMaterial
				}
				// let Filter = new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.EQ, profile);
				let oModel = this.getView().getModel("calanderdata");

				if (this.byId(sStartDateId).getValueState() !== ValueState.Error && this.byId(sEndDateId).getValueState() !== ValueState.Error) {

					if (this.sPath) {
						sAppointmentPath = this.sPath;
						console.log("sAppointmentPath", sAppointmentPath);
						oBindlist.requestContexts(0, Infinity).then(function (aContexts) {
							aContexts.forEach(function (oContext) {
								oContext.setProperty("title", sSalesOrderNumber);
								oContext.setProperty("text", sCustomer);
								oContext.setProperty("Calendertype", sBays);
								oContext.setProperty("startDate", sFrom.toISOString());
								oContext.setProperty("endDate", sTo.toISOString())
							});
						});
						oModel.setProperty(sAppointmentPath + "/title", sSalesOrderNumber);
						oModel.setProperty(sAppointmentPath + "/text", sCustomer);
						oModel.setProperty(sAppointmentPath + "/type", sBays);
						oModel.setProperty(sAppointmentPath + "/startDate", sFrom);
						oModel.setProperty(sAppointmentPath + "/endDate", sTo);
					} else {
						oBindlistMessage.create(oMessageData, true);

						oBindlist.create(oEntryData, true);

						console.log("Mail payload", oMessageData);
						sap.m.MessageToast.show("Scheduling Order ...");

						let that = this;
						oBindlist.attachCreateCompleted(async (oEvent) => {
							try {
								let params = oEvent.getParameters();
								if (params.success) {
									let response = params.context.getObject();
									console.log("response", response);


									sap.m.MessageToast.show(`${sDocType} Scheduled Successfully`);


									setTimeout(() => {
										sap.m.MessageToast.show("Refreshing Calendar Data ...", {
											duration: 700 // Show for 0.7 second
										  });
										// sap.m.MessageToast.show("Updating data ...");
										that._fetchSchedulingData();

									}, 2500);
								} else {
									reject(new Error(params.context.oModel.mMessages[""][0].message));
								}
							} catch (error) {
								console.error("Error in scheduling:", error.message);
								sap.m.MessageBox.error(`An error occurred while processing the ${sDocType}`);
							}
						});


						// return

						// oModel.getData().appointments.push({
						// 	title: sSalesOrderNumber,
						// 	text: sCustomer,
						// 	Calendertype: sBays,
						// 	startDate: sFrom,
						// 	endDate: sTo
						// });

					}

					// sap.m.MessageBox.show("Sales Order scheduled successfully", {
					// 	title: "Success",
					// 	icon: sap.m.MessageBox.Icon.SUCCESS,
					// })

					// oModel.updateBindings();

					this.byId("modifyDialog").close();
				}

			},


			_saveTransporterData: function () {
				let myModel = this.getOwnerComponent().getModel();
				let oBindlist = myModel.bindList("/SchedulingSet");
				let oBindlistMessage = myModel.bindList("/CustomerTransporterEMail");

				let sStartDateId = "_IDGenDateTimePicker1";
				let sEndDateId = "_IDGenDateTimePicker2";

				let sLocalData = this.getView().getModel('modifyModel').getData();

				let sMaterial = sLocalData.Mat;
				let sQuantity = sLocalData.Quantity;
				let sTransporter = sLocalData.cust;
				let sDocType = sLocalData.DocType;  // "SO" or "STO"
				let sDocNum = sLocalData.DocNum;    // actual SalesOrder or STO number
				let sUom = sLocalData.Uom
			
				let sFromDate = this.byId(sStartDateId).getDateValue();
				let sToDate = this.byId(sEndDateId).getDateValue();
				let sBays = this.byId("appType").getSelectedItem().getText();
			
				let sLocalTimeFrom = this.formatDateToLocalISO(sFromDate);
				let sLocalTimeTo = this.formatDateToLocalISO(sToDate);
			    let sAppointmentPath;
				if (!sDocNum || !sTransporter) {
					MessageToast.show("Order Number and Transporter are mandatory to Fill.");
					return;
				}
				// Extract date and time separately
				let [startDate, startTime] = sLocalTimeFrom.split("T");
				let [endDate, endTime] = sLocalTimeTo.split("T");

				let oEntryData = {
					"Bayno": sBays,
					"SalesOrder": sDocType === "SO" ? sDocNum : "",
					"Stockorder": sDocType === "STO" ? sDocNum : "",
					"Startdate": startDate,
					"Enddate": endDate,
					"Starttime": startTime,
					"Endtime": endTime,
					"Material": sMaterial,
					"Quantity": sQuantity,
					"Uom": sUom,
					"Soldtoparty": sDocType === "SO" ? sTransporter : "",
					"Plant": sDocType === "STO" ? sTransporter : "",
					"Shiptoparty": "",
					"Vehicleno": "",
					"Driver": "",
					"Cleaner": "",
					"PlantText": ""
				};

				// let oMessageData = {
				// 	salesOrder: sDocNum,
				// 	custORTrans: sTransporter,
				// 	bays: sBays,
				// 	fromDateTime: sLocalTimeFrom,
				// 	toDateTime: sLocalTimeTo,
				// 	email: "deepanshu.goyal@ingenxtec.com",
				// 	message: "TRANSPORTER",
				// 	Quantity: sQuantity
				// }
				let oMessageData = {
					salesOrder: sDocType === 'SO' ? sDocNum :'',
					Stockorder : sDocType === 'STO' ? sDocNum : '',
					custORTrans: sTransporter,
					bays: sBays,
					fromDateTime: sLocalTimeFrom,
					toDateTime: sLocalTimeTo,
					email: "deepanshu.goyal@ingenxtec.com",
					message: "TRANSPORTER",
					Quantity: sQuantity,
					unit : sUom,
					material: sMaterial
				}
				if (this.byId(sStartDateId).getValueState() !== ValueState.Error && this.byId(sEndDateId).getValueState() !== ValueState.Error) {

					if (this.sPath) {
						sAppointmentPath = this.sPath;
						oModel.setProperty(sAppointmentPath + "/SalesOrder", sSalesOrderNumber);
						oModel.setProperty(sAppointmentPath + "/Soldtoparty", sTransporter);
						oModel.setProperty(sAppointmentPath + "/Calendertype", sBays);
						oModel.setProperty(sAppointmentPath + "/startDate", localTimeFrom);
						oModel.setProperty(sAppointmentPath + "/endDate", localTimeTo);
					} else {
						oBindlist.create(oEntryData, true);
						sap.m.MessageToast.show("Scheduling Order ...");
						console.log("Mail payload", oMessageData);


						oBindlistMessage.create(oMessageData);

						let that = this;
						oBindlist.attachCreateCompleted(async (oEvent) => {
							try {
								let params = oEvent.getParameters();
								if (params.success) {
									let response = params.context.getObject();
									console.log("response", response);

									sap.m.MessageToast.show("SO / STO scheduled successfully");


									setTimeout(() => {
										// sap.m.MessageToast.show("Refreshing Calender Data ...")
										that._fetchSchedulingData();

									}, 2500);
								} else {
									reject(new Error(params.context.oModel.mMessages[""][0].message));
								}
							} catch (error) {
								console.error("Error in scheduling:", error.message);
								sap.m.MessageBox.error("An error occurred while processing the Sales Order.");
							}
						});

						// return
						// oModel.getData().appointments.push({
						// 	title: sSalesOrderNumber,
						// 	text: sTransporter,
						// 	Calendertype: sBays,
						// 	startDate: sFrom,
						// 	endDate: sTo
						// });
					}

					// oModel.updateBindings();

					this.byId("modifyDialog").close();
				}

			},

			formatDate: function (oDate) {
				// console.log("oDate",oDate);
				if (oDate) {
					let iHours = oDate.getHours(),
						iMinutes = oDate.getMinutes(),
						iSeconds = oDate.getSeconds();

					if (iHours !== 0 || iMinutes !== 0 || iSeconds !== 0) {
						return DateFormat.getDateTimeInstance({ style: "medium" }).format(oDate);
					} else {
						return DateFormat.getDateInstance({ style: "medium" }).format(oDate);
					}
				}
			},

			handleDialogCancelButton: function () {
				this.sPath = null;
				this.byId("modifyDialog").close();
			},

			handleCheckBoxSelect: function (oEvent) {
				let bSelected = oEvent.getSource().getSelected(),
					sStartDatePickerID = bSelected ? "DTPStartDate" : "DPStartDate",
					sEndDatePickerID = bSelected ? "DTPEndDate" : "DPEndDate",
					oOldStartDate = this.byId(sStartDatePickerID).getDateValue(),
					oNewStartDate = UI5Date.getInstance(oOldStartDate),
					oOldEndDate = this.byId(sEndDatePickerID).getDateValue(),
					oNewEndDate = UI5Date.getInstance(oOldEndDate);

				if (!bSelected) {
					oNewStartDate.setHours(this._getDefaultAppointmentStartHour());
					oNewEndDate.setHours(this._getDefaultAppointmentEndHour());
				} else {
					this._setHoursToZero(oNewStartDate);
					this._setHoursToZero(oNewEndDate);
				}

				sStartDatePickerID = !bSelected ? "DTPStartDate" : "DPStartDate";
				sEndDatePickerID = !bSelected ? "DTPEndDate" : "DPEndDate";
				this.byId(sStartDatePickerID).setDateValue(oNewStartDate);
				this.byId(sEndDatePickerID).setDateValue(oNewEndDate);
			},

			_getDefaultAppointmentStartHour: function () {
				return 9;
			},

			_getDefaultAppointmentEndHour: function () {
				return 10;
			},

			_setHoursToZero: function (oDate) {
				oDate.setHours(0, 0, 0, 0);
			},

			handleAppointmentCreate: function (oContext) {
				let modifyModel = this.getView().getModel("modifyModel");

				if (!flag) {
					modifyModel.setData({});

					this._createInitialDialogValues(this.getView().byId("SPC1").getStartDate());

				} else {

					let oValue = {
						salesOrder: oContext.Vbeln || "",
						cust: oContext.OidShip,
						Mat: oContext.Matnr,
						Quantity: oContext.quantity,
						Uom: oContext.uom,
						Stockorder: oContext.STO || "",
						DocType: oContext.DocType,
						DocNum : oContext.DocNum

					};

					console.log("dialog data", oValue);

					modifyModel.setData(oValue);
					// Update the model with start and end date values
					modifyModel.setProperty("/startDate", sFormattedStartDate);
					modifyModel.setProperty("/endDate", sFormattedEndDate);

					let modelData = modifyModel.getData();
					// console.log("dsa", modelData)

					this._createInitialDialogValues(this.getView().byId("SPC1").getStartDate());
					flag = false

				}
			},

			handleHeaderDateSelect: function (oEvent) {
				this._createInitialDialogValues(oEvent.getParameter("date"));
			},

			_createInitialDialogValues: function (oDate) {
				let oStartDate = UI5Date.getInstance(oDate),
					oEndDate = UI5Date.getInstance(oStartDate);

				oStartDate.setHours(this._getDefaultAppointmentStartHour());
				oEndDate.setHours(this._getDefaultAppointmentEndHour());
				this._oChosenDayData = { start: oStartDate, end: oEndDate };
				this.sPath = null;

				this._arrangeDialogFragment("Create Schedule");
			},

			handleStartDateChange: function (oEvent) {
				let oStartDate = oEvent.getParameter("date");
				//MessageToast.show("'startDateChange' event fired.\n\nNew start date is "  + oStartDate.toString());
			},

			updateButtonEnabledState: function (oDateTimePickerStart, oDateTimePickerEnd, oButton) {
				let bEnabled = oDateTimePickerStart.getValueState() !== ValueState.Error
					&& oDateTimePickerStart.getValue() !== ""
					&& oDateTimePickerEnd.getValue() !== ""
					&& oDateTimePickerEnd.getValueState() !== ValueState.Error;

				oButton.setEnabled(bEnabled);
			},

			handleDateTimePickerChange: function (oEvent) {
				let oDateTimePickerStart = this.byId("DTPStartDate"),
					oDateTimePickerEnd = this.byId("DTPEndDate"),
					oStartDate = oDateTimePickerStart.getDateValue(),
					oEndDate = oDateTimePickerEnd.getDateValue(),
					oErrorState = { errorState: false, errorMessage: "" };

				if (!oStartDate) {
					oErrorState.errorState = true;
					oErrorState.errorMessage = "Please pick a date";
					this._setDateValueState(oDateTimePickerStart, oErrorState);
				} else if (!oEndDate) {
					oErrorState.errorState = true;
					oErrorState.errorMessage = "Please pick a date";
					this._setDateValueState(oDateTimePickerEnd, oErrorState);
				} else if (!oEvent.getParameter("valid")) {
					oErrorState.errorState = true;
					oErrorState.errorMessage = "Invalid date";
					if (oEvent.getSource() === oDateTimePickerStart) {
						this._setDateValueState(oDateTimePickerStart, oErrorState);
					} else {
						this._setDateValueState(oDateTimePickerEnd, oErrorState);
					}
				} else if (oStartDate && oEndDate && (oEndDate.getTime() <= oStartDate.getTime())) {
					oErrorState.errorState = true;
					oErrorState.errorMessage = "Start date should be before End date";
					this._setDateValueState(oDateTimePickerStart, oErrorState);
					this._setDateValueState(oDateTimePickerEnd, oErrorState);
				} else {
					this._setDateValueState(oDateTimePickerStart, oErrorState);
					this._setDateValueState(oDateTimePickerEnd, oErrorState);
				}

				this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, this.byId("modifyDialog").getBeginButton());
			},

			handleDatePickerChange: function () {
				let oDatePickerStart = this.byId("DPStartDate"),
					oDatePickerEnd = this.byId("DPEndDate"),
					oStartDate = oDatePickerStart.getDateValue(),
					oEndDate = oDatePickerEnd.getDateValue(),
					bEndDateBiggerThanStartDate = oEndDate.getTime() < oStartDate.getTime(),
					oErrorState = { errorState: false, errorMessage: "" };

				if (oStartDate && oEndDate && bEndDateBiggerThanStartDate) {
					oErrorState.errorState = true;
					oErrorState.errorMessage = "Start date should be before End date";
				}
				this._setDateValueState(oDatePickerStart, oErrorState);
				this._setDateValueState(oDatePickerEnd, oErrorState);
				this.updateButtonEnabledState(oDatePickerStart, oDatePickerEnd, this.byId("modifyDialog").getBeginButton());
			},

			_setDateValueState: function (oPicker, oErrorState) {
				if (oErrorState.errorState) {
					oPicker.setValueState(ValueState.Error);
					oPicker.setValueStateText(oErrorState.errorMessage);
				} else {
					oPicker.setValueState(ValueState.None);
				}
			},
			formatText: function (text, type) {
				let sTypeText = "",
					aTypes = this.getView().getModel("calanderdata").getData().supportedAppointmentItems;

				for (let i = 0; i < aTypes.length; i++) {
					if (aTypes[i].type === type) {
						sTypeText = aTypes[i].text;
						console.log("sTypeText", sTypeText);
					}
				}

				if (sTypeText !== "") {
					return text + "\n" + sTypeText;
				} else {
					return text + "\n" + type;
				}
			},

		});
	});