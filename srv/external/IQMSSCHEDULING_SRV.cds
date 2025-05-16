/* checksum : 536d0d7460c2de418903afdf8c9747e2 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service IQMSSCHEDULING_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSSCHEDULING_SRV.SchedulingSet {
  @sap.unicode : 'false'
  @sap.label : 'Sales document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key SalesOrder : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'STOCKTRAN'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Stockorder : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Deliveryno'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DeliveryNo : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'ParkingNo'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Parkingno : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Plant'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Plant : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Planttxt'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  PlantText : String(30) not null;
  @sap.unicode : 'false'
  @sap.label : 'Shipment Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ShipmentNo : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Billing Doc.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  BillingNo : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Soldtoparty : String(10);
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Startdate'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Startdate : Timestamp;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'ENDDATE'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Enddate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'startTime'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Starttime : Time;
  @sap.unicode : 'false'
  @sap.label : 'ENDTIME'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Endtime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Material : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Quantity'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Quantity : Decimal(15, 3);
  @sap.unicode : 'false'
  @sap.label : 'Unit'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'unit-of-measure'
  Uom : String(3);
  @sap.unicode : 'false'
  @sap.label : 'BAYNO'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Bayno : String(20);
  @sap.unicode : 'false'
  @sap.label : 'ShipToPart'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Shiptoparty : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Vehicle'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Vehicleno : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Driver'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Driver : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Cleaner'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Cleaner : String(30);
  @sap.unicode : 'false'
  @sap.label : 'CREABY'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Createdby : String(30);
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'CREATEDT'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Createddate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'CREATIME'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Createdtime : Time;
  @sap.unicode : 'false'
  @sap.label : 'CHANGEBY'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changedby : String(30);
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'CHANGEDT'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changeddate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'CHANGED TIME'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changedtime : Time;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSSCHEDULING_SRV.ScheduleFacSet {
  @sap.unicode : 'false'
  @sap.label : 'BAYNO'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Bayno : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Sales document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key SalesOrder : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'STOCKTRAN'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Stockorder : String(10) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Startdate'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Startdate : Timestamp not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'ENDDATE'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Enddate : Timestamp not null;
  @sap.unicode : 'false'
  @sap.label : 'startTime'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Starttime : Time not null;
  @sap.unicode : 'false'
  @sap.label : 'ENDTIME'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Endtime : Time not null;
  @sap.unicode : 'false'
  @sap.label : 'Vehicle'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Vehicleno : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Driver'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Driver : String(30) not null;
  @sap.unicode : 'false'
  @sap.label : 'Cleaner'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Cleaner : String(30) not null;
  @sap.unicode : 'false'
  @sap.label : 'CREABY'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Createdby : String(30) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'CREATEDT'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Createddate : Timestamp not null;
  @sap.unicode : 'false'
  @sap.label : 'CREATIME'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Createdtime : Time not null;
  @sap.unicode : 'false'
  @sap.label : 'CHANGEBY'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changedby : String(30) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'CHANGEDT'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changeddate : Timestamp not null;
  @sap.unicode : 'false'
  @sap.label : 'ChangedTime'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changedtime : Time not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'scheduling cds'
entity IQMSSCHEDULING_SRV.xIQMSxscheduling_cds {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales and Distribution Document Number'
  key SalesOrder : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'STOCKTRAN'
  @sap.quickinfo : 'StockOrder'
  key Stockorder : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'ParkingNo'
  @sap.quickinfo : 'ParkingNumber'
  Parkingno : String(10);
  @sap.display.format : 'Date'
  @sap.label : 'Startdate'
  @sap.quickinfo : 'StartDate'
  Startdate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'ENDDATE'
  @sap.quickinfo : 'EndDate'
  Enddate : Date;
  @sap.label : 'startTime'
  @sap.quickinfo : 'Start time'
  Starttime : Time;
  @sap.label : 'ENDTIME'
  @sap.quickinfo : 'EndTime'
  Endtime : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.label : 'Quantity'
  Quantity : Decimal(15, 3);
  @sap.label : 'Unit'
  @sap.semantics : 'unit-of-measure'
  Uom : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'BAYNO'
  @sap.quickinfo : 'BayNo'
  Bayno : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Plant'
  @sap.quickinfo : 'Plants'
  Plant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Planttxt'
  @sap.quickinfo : 'Plant in qms'
  PlantText : String(30);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Customer Number'
  Soldtoparty : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ShipToPart'
  @sap.quickinfo : 'shipToParty'
  Shiptoparty : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle'
  Vehicleno : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Driver'
  Driver : String(30);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Cleaner'
  Cleaner : String(30);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Deliveryno'
  @sap.quickinfo : 'Delivery Number'
  DeliveryNo : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Shipment Number'
  ShipmentNo : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Billing Document'
  BillingNo : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'CREABY'
  @sap.quickinfo : 'CreatedBy'
  Createdby : String(30);
  @sap.display.format : 'Date'
  @sap.label : 'CREATEDT'
  @sap.quickinfo : 'CreatedDate'
  Createddate : Date;
  @sap.label : 'CREATIME'
  @sap.quickinfo : 'CreatedTime'
  Createdtime : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'CHANGEBY'
  @sap.quickinfo : 'ChangedBy'
  Changedby : String(30);
  @sap.display.format : 'Date'
  @sap.label : 'CHANGEDT'
  @sap.quickinfo : 'ChangedDate'
  Changeddate : Date;
  @sap.label : ''
  @sap.quickinfo : 'ChangedTime'
  Changedtime : Time;
};

