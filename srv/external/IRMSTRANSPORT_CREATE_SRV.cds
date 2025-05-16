/* checksum : ba1dcf0ead1cfd80db9245153f1f96e3 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.supported.formats : 'atom json xlsx'
service IRMSTRANSPORT_CREATE_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IRMSTRANSPORT_CREATE_SRV.trans_headerSet {
  @sap.unicode : 'false'
  @sap.label : 'Transport unit'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key TuNumber : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'TU type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  TuType : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Weight UoM'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'unit-of-measure'
  WgtUom : String(3) not null;
  @sap.unicode : 'false'
  @sap.label : 'TU identifier'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  TuId : String(18) not null;
  @odata.Type : 'Edm.Byte'
  @sap.unicode : 'false'
  @sap.label : 'Nr.compartments'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  TuNrcomps : Integer not null;
  @sap.unicode : 'false'
  @sap.label : 'Maximum weight'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  TuMaxwgt : Double;
  @sap.unicode : 'false'
  @sap.label : 'Maximum volume'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  TuMaxvol : Double;
  @sap.unicode : 'false'
  @sap.label : 'Vol.UoM'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'unit-of-measure'
  VolUom : String(3) not null;
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
  @sap.label : 'Created On'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CreDate : Timestamp;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Last Change'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ChaDate : Timestamp;
  header_toOigcc : Association to many IRMSTRANSPORT_CREATE_SRV.oigcc_tabSet {  };
  transhead_gct : Association to IRMSTRANSPORT_CREATE_SRV.oigctSet {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IRMSTRANSPORT_CREATE_SRV.oigctSet {
  @sap.unicode : 'false'
  @sap.label : 'Language'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Language : String(2) not null;
  @sap.unicode : 'false'
  @sap.label : 'Transport unit'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  TuNumber : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Tr. unit text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  TuText : String(40) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity IRMSTRANSPORT_CREATE_SRV.oigcc_tabSet {
  @sap.unicode : 'false'
  @sap.label : 'Transport unit'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key TuNumber : String(10) not null;
  @odata.Type : 'Edm.Byte'
  @sap.unicode : 'false'
  @sap.label : 'Compartment no.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ComNumber : Integer;
  @sap.unicode : 'false'
  @sap.label : 'Seq.no.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SeqNmbr : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Maximum volume'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CmpMaxvol : Double;
  @sap.unicode : 'false'
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ComIdtext : String(40) not null;
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
  @sap.label : 'Created On'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CreDate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Changed by'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ChaName : String(12) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Last Change'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ChaDate : Timestamp;
};

