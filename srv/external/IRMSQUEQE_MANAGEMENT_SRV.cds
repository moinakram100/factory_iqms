/* checksum : c24e8dd7f6a57953ebca3a1fd9413b42 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service IRMSQUEQE_MANAGEMENT_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IRMSQUEQE_MANAGEMENT_SRV.headerSet {
  @sap.unicode : 'false'
  @sap.label : 'Driver no.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Drivercode : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Pers.no.(extrn)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Perscode : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'First name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  FirstName : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Last name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LastName : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Carrier'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Carrier : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Driver status'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Drvstatus : String(1) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Created On'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CreDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Created by'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CreName : String(12) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Last Change'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ChaDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Changed by'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ChaName : String(12) not null;
  @sap.unicode : 'false'
  @sap.label : 'PurposeComplete Flag'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DrvXblck : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Short Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  StatusTxt : String(60) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Last Change'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LChaDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Changed by'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LChaName : String(12) not null;
  @sap.unicode : 'false'
  @sap.label : 'Transact. type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Updateflag : String(1) not null;
  head_toitemdriver : Association to many IRMSQUEQE_MANAGEMENT_SRV.item_DriverSet {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IRMSQUEQE_MANAGEMENT_SRV.item_DriverSet {
  @sap.unicode : 'false'
  @sap.label : 'Driver no.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Drivercode : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'License type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Licensetyp : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'License number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Licenseno : String(18) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Lic.valid from'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ValidFrom : Timestamp;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Lic.valid to'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ValidTo : Timestamp;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Created On'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CreDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Created by'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CreName : String(12) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Last Change'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ChaDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Changed by'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ChaName : String(12) not null;
  @sap.unicode : 'false'
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Licensetxt : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'Checkbox'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Checkbox : String(1) not null;
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
@sap.content.version : '1'
@sap.label : 'customer for QMS'
entity IRMSQUEQE_MANAGEMENT_SRV.xIRMSxcustomer {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Customer Number'
  key Kunnr : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Country'
  @sap.quickinfo : 'Country Key'
  Land1 : String(3);
  @sap.label : 'Name'
  @sap.quickinfo : 'Name 1'
  Name1 : String(35);
  @sap.label : 'Name 2'
  Name2 : String(35);
  @sap.label : 'City'
  Ort01 : String(35);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Driver list in irms'
entity IRMSQUEQE_MANAGEMENT_SRV.xIRMSxDriverLicence {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Driver number'
  @sap.quickinfo : 'TD driver number'
  key Drivercode : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'License type'
  @sap.quickinfo : 'TD license type'
  key Licensetyp : String(4) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Driver''s license no.'
  @sap.quickinfo : 'TD driver''s license number'
  key Licenseno : String(18) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Ext. personnel no.'
  @sap.quickinfo : 'TD external personnel number'
  Perscode : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'First name'
  @sap.quickinfo : 'Driver''s first name'
  FirstName : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Last name'
  @sap.quickinfo : 'Driver''s last name'
  LastName : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Carrier'
  @sap.quickinfo : 'TD carrier (vendor account number)'
  Carrier : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Driver status'
  Drvstatus : String(1);
  @sap.display.format : 'Date'
  @sap.label : 'Created On'
  CreDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Created by'
  @sap.quickinfo : 'Name of Person who Created the Object'
  CreName : String(12);
  @sap.display.format : 'Date'
  @sap.label : 'Last Change'
  @sap.quickinfo : 'Date of Last Change'
  ChaDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Changed by'
  @sap.quickinfo : 'Name of person who changed object'
  ChaName : String(12);
  @sap.label : 'PurposeComplete Flag'
  @sap.quickinfo : 'Business Purpose Completed Indicator for Driver'
  DrvXblck : String(1);
  @sap.display.format : 'Date'
  @sap.label : 'DR license:valid frm'
  @sap.quickinfo : 'TD driver''s license: valid from data'
  ValidFrom : Date;
  @sap.display.format : 'Date'
  @sap.label : 'DRLicense valid to:'
  @sap.quickinfo : 'TD driver''s license: valid to date'
  ValidTo : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Created On'
  liCreDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Created by'
  @sap.quickinfo : 'Name of Person who Created the Object'
  liCreName : String(12);
  @sap.display.format : 'Date'
  @sap.label : 'Last Change'
  @sap.quickinfo : 'Date of Last Change'
  liChaDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Changed by'
  @sap.quickinfo : 'Name of person who changed object'
  liChaName : String(12);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'fetch so'
entity IRMSQUEQE_MANAGEMENT_SRV.xIRMSxfetchso {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key Posnr : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Matnr : String(40);
  @sap.label : 'Target Quantity UoM'
  @sap.semantics : 'unit-of-measure'
  uom : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Status'
  @sap.quickinfo : 'Delivery Status (Item)'
  Lfsta : String(1);
  @sap.display.format : 'Date'
  @sap.label : 'Committed Deliv.Date'
  @sap.quickinfo : 'Delivery Date that the Supplier Has Committed To'
  CmtdDelivDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Cmtd Deliv.Crtn Date'
  @sap.quickinfo : 'Deliv. Creation Date in Order to Meet Committed Deliv. Date'
  CmtdDelivCreadate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Ship-to party'
  OidShip : String(10);
  @sap.label : 'Order Quantity'
  @sap.quickinfo : 'Cumulative order quantity in sales units'
  quantity : Decimal(15, 3);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Material for iQMS'
entity IRMSQUEQE_MANAGEMENT_SRV.xIRMSxmaterial {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key matnr : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Division'
  spart : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Organization'
  vkorg : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Group'
  matkl : String(9);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material type'
  mtart : String(4);
  @sap.label : 'Material description'
  maktx : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Distribution Channel'
  vtweg : String(2);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Transport in QMS'
entity IRMSQUEQE_MANAGEMENT_SRV.xIRMSxTransport {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vendor'
  @sap.quickinfo : 'Account Number of Vendor or Creditor'
  key Lifnr : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Country'
  @sap.quickinfo : 'Country Key'
  Land1 : String(3);
  @sap.label : 'Name'
  @sap.quickinfo : 'Name 1'
  Name1 : String(35);
  @sap.label : 'Name 2'
  Name2 : String(35);
  @sap.label : 'Name 3'
  Name3 : String(35);
  @sap.label : 'Name 4'
  Name4 : String(35);
  @sap.label : 'City'
  Ort01 : String(35);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Vehicle Master in QMS'
entity IRMSQUEQE_MANAGEMENT_SRV.xIRMSxvehiclemaster {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle Number'
  @sap.quickinfo : 'TD Vehicle Number'
  key Vehicle : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Transport unit'
  @sap.quickinfo : 'TD transport unit number'
  TuNumber : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sequence number'
  @sap.quickinfo : 'TD master data sequence number'
  SeqNmbr : String(3);
  @sap.label : 'Compartment max.vol.'
  @sap.quickinfo : 'TD compartment maximum volume'
  trquant : Double;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle type'
  @sap.quickinfo : 'TD vehicle type'
  VehType : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'TD misc.vehicle ID'
  @sap.quickinfo : 'TD vehicle identifier'
  VehId : String(18);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Carrier'
  @sap.quickinfo : 'TD carrier (vendor account number)'
  Carrier : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Number of TUs'
  @sap.quickinfo : 'Number of transport units on vehicle (TD)'
  VehNrtus : String(2);
  @sap.label : 'Volume UoM'
  @sap.quickinfo : 'TD volume unit of measure'
  @sap.semantics : 'unit-of-measure'
  VolUom : String(3);
  @sap.label : 'Weight UoM'
  @sap.quickinfo : 'TD weight unit of measure'
  @sap.semantics : 'unit-of-measure'
  WgtUom : String(3);
  @sap.label : 'Dimension UoM'
  @sap.quickinfo : 'TD dimension unit of measure'
  @sap.semantics : 'unit-of-measure'
  DimUom : String(3);
  @sap.label : 'Vehicle max.weight'
  @sap.quickinfo : 'TD vehicle maximum weight'
  VehMaxwgt : Double;
  @sap.label : 'Vehicle unl.weight'
  @sap.quickinfo : 'TD vehicle unladen weight'
  VehUnlwgt : Double;
  @sap.label : 'Vehicle maximum vol.'
  @sap.quickinfo : 'TD vehicle maximum volume'
  VehMaxvol : Double;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Equipment'
  @sap.quickinfo : 'Equipment Number'
  EquipNr : String(18);
  @sap.unit : 'DimUom'
  @sap.label : 'Vehicle height'
  VehHeight : Decimal(13, 3);
  @sap.unit : 'DimUom'
  @sap.label : 'Vehicle width'
  @sap.quickinfo : 'TD width'
  VehWidth : Decimal(13, 3);
  @sap.unit : 'DimUom'
  @sap.label : 'Vehicle length'
  VehLength : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle route'
  @sap.quickinfo : 'TD-F vehicle route'
  Route : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Time Zone'
  Tzone : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Registered Owner'
  @sap.quickinfo : 'TD-Vehicle Registered Owner'
  RegOwner : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'BerthCmpGrp'
  @sap.quickinfo : 'TD-Vehicle Berth Compatibility Group ID'
  GrpId : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Own Vehicle'
  @sap.quickinfo : 'TD-Vehicle Own Flag'
  OwnFlag : String(1);
  @sap.unit : 'CapUom'
  @sap.label : 'BalCap'
  @sap.quickinfo : 'TD-Vehicle Ballast Capacity'
  Ballcap : Decimal(13, 3);
  @sap.unit : 'CapUom'
  @sap.label : 'FuelBnkCapacity'
  @sap.quickinfo : 'TD-Vehicle Fuel Bunker Capacity'
  FlBnkCapa : Decimal(13, 3);
  @sap.unit : 'CapUom'
  @sap.label : 'Diesel Bunker Cap'
  @sap.quickinfo : 'TD-Vehicle Diesel Bunker Capacity'
  DslBnkCapa : Decimal(13, 3);
  @sap.label : 'BnkCapacityUoM'
  @sap.quickinfo : 'UoM of TD-Vehicle Bunker Capacity'
  @sap.semantics : 'unit-of-measure'
  CapUom : String(3);
  @sap.label : 'Draft Wt. UoM'
  @sap.quickinfo : 'UoM of TD-Vehicle(For Draft)'
  @sap.semantics : 'unit-of-measure'
  WtUom : String(3);
  @sap.unit : 'AvrSpeedUom'
  @sap.label : 'Average Speed'
  AverageSpeed : Decimal(6, 2);
  @sap.label : 'Speed UoM'
  @sap.quickinfo : 'Average Speed UoM'
  @sap.semantics : 'unit-of-measure'
  AvrSpeedUom : String(3);
  @sap.unit : 'DeckCapUom'
  @sap.label : 'Deck Capacity'
  DeckCapacity : Decimal(6, 2);
  @sap.label : 'Deck Capacity UoM'
  @sap.semantics : 'unit-of-measure'
  DeckCapUom : String(3);
  @sap.label : 'Arrival Buffer'
  ArrivalBuffer : Decimal(11, 0);
  @sap.label : 'Departure Buffer'
  DepartureBuffer : Decimal(11, 0);
  @sap.label : 'E-Mail Address'
  VehMail : String(241);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Phone'
  @sap.quickinfo : 'Vehicle Phone'
  VehPhone : String(30);
  @sap.display.format : 'UpperCase'
  @sap.label : 'TransportPlanningPt'
  @sap.quickinfo : 'Transportation planning point'
  Tppoint : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle status'
  @sap.quickinfo : 'TD vehicle status'
  VehStatus : String(1);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Vehicle Defination'
entity IRMSQUEQE_MANAGEMENT_SRV.xIRMSxvehicle_defination {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle type'
  @sap.quickinfo : 'TD vehicle type'
  key veh_type : String(4) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle Number'
  @sap.quickinfo : 'TD Vehicle Number'
  vehicle : String(10);
  @sap.label : 'Vehicle type text'
  @sap.quickinfo : 'TD vehicle type text'
  veh_text : String(40);
};

