/* checksum : f2cd7f869cc3740d4821497aadaa7f61 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service IQMSPARKING_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSPARKING_SRV.Park_headerSet {
  @sap.unicode : 'false'
  @sap.label : 'ParkingNo'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ParkingNo : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'ShipToPart'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Shiptoparty : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Driver'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Driver : String(30) not null;
  @sap.unicode : 'false'
  @sap.label : 'Planttxt'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  PlantText : String(30) not null;
  @sap.unicode : 'false'
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Description : String(30) not null;
  @sap.unicode : 'false'
  @sap.label : 'Cleaner'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Cleaner : String(30) not null;
  @sap.unicode : 'false'
  @sap.label : 'Plant'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Plant : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'ParkGate'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ParkingGate : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Soldtoparty : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Parking Area'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ParkingArea : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Vehicle'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  VehicleNumber : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Purpose'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Purpose : String(7) not null;
  @sap.unicode : 'false'
  @sap.label : 'Destination'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Destination : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Vendor'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  TransportCode : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Status'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Status : String(100) not null;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Product : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Truck Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  TruckType : String(5) not null;
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
  @sap.label : 'ChangedTime'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changedtime : Time;
  park_assocations : Association to many IQMSPARKING_SRV.park_itemSet {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSPARKING_SRV.park_itemSet {
  @sap.unicode : 'false'
  @sap.label : 'ParkingNo'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ParkingNo : String(10) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'STODATE'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Stodate : Timestamp;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Entry Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  EntryDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'STOTimes'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Stotime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Entry Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  EntryTime : Time;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Exit Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ExitDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Exit Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ExitTime : Time;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Security Cleared Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SecClearDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Security Cleared Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SecClearTime : Time;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Security Failed Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SecFailedDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Security Failed Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SecFailedTime : Time;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'LAN Gen Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LanDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'LAN Gen Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LanTime : Time;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Loading Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LoadingDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Loading Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LoadingTime : Time;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Billed Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  BilledDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Billed Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  BilledTime : Time;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Sales Order Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Salesorderdate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Sales Order Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Salesordertime : Time;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Delivery Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Deliverydate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Delivery Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Deliverytime : Time;
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
  @sap.label : 'ChangedTime'
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
@sap.content.version : '1'
@sap.label : 'parking cds'
entity IQMSPARKING_SRV.xIQMSxparking_cds {
  @sap.display.format : 'UpperCase'
  @sap.label : 'ParkingNo'
  @sap.quickinfo : 'ParkingNumber'
  key ParkingNo : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'ParkGate'
  ParkingGate : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parking Area'
  ParkingArea : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle'
  VehicleNumber : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purpose'
  Purpose : String(7);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Destination'
  Destination : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ShipToPart'
  @sap.quickinfo : 'shipToParty'
  Shiptoparty : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Description'
  Description : String(30);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Customer Number'
  Soldtoparty : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vendor'
  @sap.quickinfo : 'Account Number of Vendor or Creditor'
  TransportCode : String(10);
  @sap.label : 'Status'
  Status : String(100);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Product : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Truck Type'
  TruckType : String(5);
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

