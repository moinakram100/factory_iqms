/* checksum : 25b06cd8ee7f5dd3d5b21b93a26b722c */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service IQMSQUEUEMANAGE_VALUEHELP_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'customer qms'
entity IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxcustomer_n {
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
@sap.label : 'Fetch SalesOrder'
entity IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxfetch_so {
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
@sap.label : 'fetch open sto'
entity IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxfetch_sto {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Document'
  @sap.quickinfo : 'Purchasing Document Number'
  key Sto : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Document'
  @sap.quickinfo : 'Number of Material Document'
  delivery : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Plant'
  Plant : String(4);
  @sap.unit : 'Unit'
  @sap.label : 'Order Quantity'
  @sap.quickinfo : 'Purchase Order Quantity'
  Quantity : Decimal(13, 3);
  @sap.label : 'Order Unit'
  @sap.quickinfo : 'Purchase Order Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  Unit : String(3);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'qms Material'
entity IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxMaterial_n {
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
@sap.label : 'Plant for QMS'
entity IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxPlants {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Plant'
  key Plant : String(4) not null;
  @sap.label : 'Name 1'
  @sap.quickinfo : 'Name'
  Plant_text : String(30);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'scheduling cds for factory'
entity IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxschfac_fetch {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales and Distribution Document Number'
  key SalesOrder : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'STOCKTRAN'
  @sap.quickinfo : 'StockOrder'
  key Stockorder : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'BAYNO'
  @sap.quickinfo : 'BayNo'
  Bayno : String(20);
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
  @sap.label : 'Vehicle'
  Vehicleno : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Driver'
  Driver : String(30);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Cleaner'
  Cleaner : String(30);
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

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'ship tas'
entity IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxshipTas_valuehelp {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Shipment Number'
  key Shipment : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle'
  Truckno : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : ''
  @sap.quickinfo : 'Touch Key'
  Tochkey : String(20);
  @sap.label : ''
  @sap.quickinfo : 'RFID'
  Rfid : Integer;
  @sap.display.format : 'UpperCase'
  @sap.label : 'BAYNO'
  @sap.quickinfo : 'BayNo'
  Bayno : String(20);
  @sap.display.format : 'Date'
  @sap.label : 'Startdate'
  @sap.quickinfo : 'StartDate'
  Newdate : Date;
  @sap.label : 'startTime'
  @sap.quickinfo : 'Start time'
  Newtime : Time;
  @sap.label : ''
  @sap.quickinfo : 'Error Code'
  Errorcode : Integer;
  @sap.display.format : 'UpperCase'
  @sap.label : ''
  @sap.quickinfo : 'Error description'
  Errordefin : String(50);
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

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'sto delivery'
entity IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxstodeliv {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Document'
  @sap.quickinfo : 'Purchasing Document Number'
  key sto : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item'
  @sap.quickinfo : 'Item Number of Purchasing Document'
  key Ebelp : String(5) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Account Assgmt No.'
  @sap.quickinfo : 'Sequential Number of Account Assignment'
  Zekkn : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Trans./event type'
  @sap.quickinfo : 'Transaction/event type, purchase order history'
  Vgabe : String(1);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Material Doc. Year'
  @sap.quickinfo : 'Material Document Year'
  Gjahr : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Document'
  @sap.quickinfo : 'Number of Material Document'
  Delivery : String(10);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Transport proj'
entity IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxTransport_n {
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
@sap.label : 'Vehicle master'
entity IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxvehiclemaster {
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

