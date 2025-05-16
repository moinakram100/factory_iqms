/* checksum : b388bcf69adf5d3be8d4c41ef80eb95f */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service IQMSBILLING_DOCUMENT_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity IQMSBILLING_DOCUMENT_SRV.deliverybillingdataSet {
  @sap.unicode : 'false'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Delivery : LargeString not null;
  @sap.unicode : 'false'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Parking : LargeString not null;
  @sap.unicode : 'false'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Vehicleno : LargeString not null;
  @sap.unicode : 'false'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  VehType : LargeString not null;
  @sap.unicode : 'false'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Status : LargeString not null;
  @sap.unicode : 'false'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Shipmentno : LargeString not null;
  @sap.unicode : 'false'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  GoodIssue : LargeString not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSBILLING_DOCUMENT_SRV.Invoice_headerSet {
  @sap.unicode : 'false'
  @sap.label : 'Billing Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Fkart : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Billing Doc.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Vbeln : String(10) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Billing Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Fkdat : Timestamp;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSBILLING_DOCUMENT_SRV.Invoice_itemSet {
  @sap.unicode : 'false'
  @sap.label : 'Sales document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Posnr : String(6) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSBILLING_DOCUMENT_SRV.Invoice_createSet {
  @sap.unicode : 'false'
  @sap.label : 'Sales document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Posnr : String(6) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message ID'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Msgid : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Msgty : String(1) not null;
  Main_Invoice : Association to IQMSBILLING_DOCUMENT_SRV.Invoice_headerSet {  };
  to_items : Association to many IQMSBILLING_DOCUMENT_SRV.Invoice_itemSet {  };
  invoice_numSet : Association to many IQMSBILLING_DOCUMENT_SRV.invoice_numSet {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IQMSBILLING_DOCUMENT_SRV.invoice_numSet {
  @sap.unicode : 'false'
  @sap.label : 'Sales document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'QMS billing fetch'
entity IQMSBILLING_DOCUMENT_SRV.xIQMSxBilling_fetch {
  @sap.display.format : 'UpperCase'
  @sap.label : 'ParkingNo'
  @sap.quickinfo : 'ParkingNumber'
  key ParkingNo : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle'
  key VehicleNumber : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales and Distribution Document Number'
  SalesOrder : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Deliveryno'
  @sap.quickinfo : 'Delivery Number'
  DeliveryNo : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Shipment Number'
  ShipmentNo : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Shipment Status'
  @sap.quickinfo : 'TD Shipment Status (Functional)'
  status : String(1);
  @sap.label : 'Qty in unit of entry'
  @sap.quickinfo : 'Quantity in unit of entry'
  quantity : Decimal(13, 3);
  @sap.label : 'Unit'
  @sap.semantics : 'unit-of-measure'
  unit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle type'
  @sap.quickinfo : 'TD vehicle type'
  vehicleType : String(4);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Billing fetch'
entity IQMSBILLING_DOCUMENT_SRV.xIRMSxbilling_fetch {
  @sap.display.format : 'NonNegative'
  @sap.label : 'Parking No.'
  key ParkingNo : String(7) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle No'
  @sap.quickinfo : 'Vehicle Number'
  key VehicleNumber : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Document'
  @sap.quickinfo : 'Number of Material Document'
  key mblnr : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales and Distribution Document Number'
  SalesOrder : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery No'
  DeliveryNo : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Shipment Number'
  ShipmentNo : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Shipment Status'
  @sap.quickinfo : 'TD Shipment Status (Functional)'
  status : String(1);
  @sap.label : 'Unit of Entry'
  @sap.quickinfo : 'Unit of entry'
  @sap.semantics : 'unit-of-measure'
  unit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vehicle type'
  @sap.quickinfo : 'TD vehicle type'
  vehicleType : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Material Doc. Year'
  @sap.quickinfo : 'Material Document Year'
  mjahr : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Material Doc.Item'
  @sap.quickinfo : 'Item in Material Document'
  zeile : String(4);
  quantity : Decimal(13, 3);
  @sap.label : 'Internal UoM'
  @sap.quickinfo : 'Unit of Measurement'
  @sap.semantics : 'unit-of-measure'
  msehi : String(3);
};

