/* checksum : e8e51ee6ea5fe9a30c2aba20be9158b8 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service IQMSSHIPMENT_CREATE_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSSHIPMENT_CREATE_SRV.shipTasSet {
  @sap.unicode : 'false'
  @sap.label : 'Shipment Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Shipment : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Material : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Vehicle'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Truckno : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Touch Key'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Tochkey : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'RFID'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Rfid : Integer not null;
  @sap.unicode : 'false'
  @sap.label : 'BAYNO'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Bayno : String(20) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Startdate'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Newdate : Timestamp not null;
  @sap.unicode : 'false'
  @sap.label : 'startTime'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Newtime : Time not null;
  @sap.unicode : 'false'
  @sap.label : 'Error Code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Errorcode : Integer not null;
  @sap.unicode : 'false'
  @sap.label : 'Error description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Errordefin : String(50) not null;
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
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSSHIPMENT_CREATE_SRV.pioigisSet {
  @sap.unicode : 'false'
  @sap.label : 'Document cat.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key DocTyp : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Document number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DocNumber : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Load indicator'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LoadIndi : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Discharge ind.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DischIndi : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Transact. type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Updateflag : String(1) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSSHIPMENT_CREATE_SRV.PiOigisiqSet {
  @sap.unicode : 'false'
  @sap.label : 'Document number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key DocNumber : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Document cat.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DocTyp : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Item number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Posnr : String(6) not null;
  @sap.unicode : 'false'
  @sap.label : 'Transaction qty'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Trqty : Double;
  @sap.unicode : 'false'
  @sap.label : 'Final del. ind.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Oifinal : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Transact. type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Updateflag : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Document Cat.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DocTypLong : String(4) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSSHIPMENT_CREATE_SRV.PiOigisvSet {
  @sap.unicode : 'false'
  @sap.label : 'Vehicle Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vehicle : String(10) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Loading Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Lddate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Trip Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Trip : String(5) not null;
  @sap.unicode : 'false'
  @sap.label : 'SC rel. vehicle'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  VehScrel : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Transact. type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Updateflag : String(1) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSSHIPMENT_CREATE_SRV.PiOigisvdSet {
  @sap.unicode : 'false'
  @sap.label : 'Vehicle Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vehicle : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Driver no.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Drivercode : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Transact. type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Updateflag : String(1) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSSHIPMENT_CREATE_SRV.PiOigisvmqSet {
  @sap.unicode : 'false'
  @sap.label : 'Quantity item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Item : String(5) not null;
  @sap.unicode : 'false'
  @sap.label : 'Document number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key DocNumber : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Document cat.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DocTyp : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Item number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Posnr : String(6) not null;
  @sap.unicode : 'false'
  @sap.label : 'Vehicle Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Vehicle : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Transport unit'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  TuNumber : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Seq.no.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SeqNmbr : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Transaction qty'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Trqty : Double;
  @sap.unicode : 'false'
  @sap.label : 'Transaction UoM'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'unit-of-measure'
  Truom : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'TD action'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  TdAction : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Matnr : String(18) not null;
  @sap.unicode : 'false'
  @sap.label : 'Transact. type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Updateflag : String(1) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSSHIPMENT_CREATE_SRV.ship_headerSet {
  @sap.unicode : 'false'
  @sap.label : 'Bulk shipm.type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Shtype : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'TransportPlanPt'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Tplst : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Bulk shipment'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Shnumber : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Confirm bl.load'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Cfbll : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Reference'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Xblnr : String(16) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Plan shpm.start'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SchedStdt : Timestamp;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Plan.load start'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LoadStdt : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Transact. type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Updateflag : String(1) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity IQMSSHIPMENT_CREATE_SRV.returnSet {
  @sap.unicode : 'false'
  @sap.label : 'Message type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Type : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message Class'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Id : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Number : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Message : String(220) not null;
  @sap.unicode : 'false'
  @sap.label : 'Log number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LogNo : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message no.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LogMsgNo : String(6) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity IQMSSHIPMENT_CREATE_SRV.PO_SHNUMBERSet {
  @sap.unicode : 'false'
  @sap.label : 'Bulk shipment'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Shnumber : String(10) not null;
  to_header : Association to many IQMSSHIPMENT_CREATE_SRV.ship_headerSet {  };
  to_oigisiq : Association to many IQMSSHIPMENT_CREATE_SRV.PiOigisiqSet {  };
  to_oigisvmq : Association to many IQMSSHIPMENT_CREATE_SRV.PiOigisvmqSet {  };
  to_oigisvd : Association to many IQMSSHIPMENT_CREATE_SRV.PiOigisvdSet {  };
  to_oigisv : Association to many IQMSSHIPMENT_CREATE_SRV.PiOigisvSet {  };
  to_oigisi : Association to many IQMSSHIPMENT_CREATE_SRV.pioigisSet {  };
  to_return : Association to many IQMSSHIPMENT_CREATE_SRV.returnSet {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Ship type'
entity IQMSSHIPMENT_CREATE_SRV.xIQMSxshipTypeFetch {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery'
  key delivery : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'ParkingNo'
  @sap.quickinfo : 'ParkingNumber'
  ParkingNo : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Incoterms'
  @sap.quickinfo : 'Incoterms (Part 1)'
  incoterm : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Division'
  division : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle'
  VehicleNumber : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales and Distribution Document Number'
  SalesOrder : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Deliveryno'
  @sap.quickinfo : 'Delivery Number'
  DeliveryNo : String(10);
  shipment_type : String(4);
};

@cds.external : true
type IQMSSHIPMENT_CREATE_SRV.OigiCreateShipmentRfc {
  @sap.label : 'Bulk shipment'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  PoShnumber : String(10) not null;
};

@cds.external : true
type IQMSSHIPMENT_CREATE_SRV.PiOigis {
  @sap.label : 'Bulk shipment'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Shnumber : String(10) not null;
  @sap.label : 'Bulk shipm.type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Shtype : String(4) not null;
  @sap.label : 'TransportPlanPt'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Tplst : String(4) not null;
  @sap.label : 'Confirm bl.load'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Cfbll : String(1) not null;
  @sap.label : 'Reference'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Xblnr : String(16) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.label : 'Plan shpm.start'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SchedStdt : Timestamp not null;
  @sap.label : 'Sched. start'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SchedSttm : Time not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.label : 'Plan.load start'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LoadStdt : Timestamp not null;
  @sap.label : 'Loading start'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LoadSttm : Time not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.label : 'Plan.load end'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LoadEddt : Timestamp not null;
  @sap.label : 'Loading end'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LoadEdtm : Time not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.label : 'Del.start.date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DelStdt : Timestamp not null;
  @sap.label : 'Delivery start'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DelSttm : Time not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.label : 'Del.end date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DelEddt : Timestamp not null;
  @sap.label : 'Delivery end'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DelEdtm : Time not null;
  @sap.label : 'Transact. type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Updateflag : String(1) not null;
  @sap.label : 'TSW useage'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Tswuseind : String(1) not null;
  @sap.label : 'Change reason'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ChgReason : String(2) not null;
};

