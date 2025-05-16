/* checksum : 7f0fd1a2716e8b2f1e1e773a7bc061b8 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.supported.formats : 'atom json xlsx'
service IRMSCREATE_DELIVERY_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IRMSCREATE_DELIVERY_SRV.delivery_createSet {
  @sap.unicode : 'false'
  @sap.label : 'Delivery'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key DelivNumb : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Num Delivery'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key NumDelivery : String(4) not null;
  del_nav_items : Association to many IRMSCREATE_DELIVERY_SRV.Sales_orderItemsSet {  };
  del_nav_return : Association to many IRMSCREATE_DELIVERY_SRV.delivery_returnSet {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IRMSCREATE_DELIVERY_SRV.Sales_orderItemsSet {
  @sap.unicode : 'false'
  @sap.label : 'Reference doc.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key RefDoc : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Reference item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  RefItem : String(6) not null;
  @sap.unicode : 'false'
  @sap.unit : 'SalesUnit'
  @sap.label : 'Delivery Qty'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DlvQty : Decimal(13, 3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Sales unit'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'unit-of-measure'
  SalesUnit : String(3) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IRMSCREATE_DELIVERY_SRV.delivery_returnSet {
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
  key Id : String(20) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Number : String(3) not null;
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
  @sap.unicode : 'false'
  @sap.label : 'Message Variable'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  MessageV1 : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message Variable'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  MessageV2 : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message Variable'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  MessageV3 : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message Variable'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  MessageV4 : String(50) not null;
  @sap.unicode : 'false'
  @sap.label : 'Parameter Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Parameter : String(32) not null;
  @sap.unicode : 'false'
  @sap.label : 'Parameter line'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Row : Integer not null;
  @sap.unicode : 'false'
  @sap.label : 'Field name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Field : String(30) not null;
  @sap.unicode : 'false'
  @sap.label : 'Logical system'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  System : String(10) not null;
};

