/* checksum : 97aaafb4b4c4e32096adef9318bbcda3 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZAPI_PURCHASEORDER_PROCESS_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.label : 'CDS view for API exposure'
entity ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurchaseOrder {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchase Order'
  @sap.quickinfo : 'Purchase Order Number'
  key PurchaseOrder : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Company Code'
  CompanyCode : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Doc. Type'
  @sap.quickinfo : 'Purchasing Document Type'
  PurchaseOrderType : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Deletion indicator'
  @sap.quickinfo : 'Deletion indicator in purchasing document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PurchasingDocumentDeletionCode : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Proc. state'
  @sap.quickinfo : 'Purchasing document processing state'
  PurchasingProcessingStatus : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Created by'
  @sap.quickinfo : 'Name of Person who Created the Object'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreatedByUser : String(12);
  @sap.display.format : 'Date'
  @sap.label : 'Created on'
  @sap.quickinfo : 'Date on which the record was created'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreationDate : Date;
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.label : 'Last Changed'
  @sap.quickinfo : 'Change Time Stamp'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangeDateTime : Timestamp;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Supplier'
  Supplier : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Control indicator'
  @sap.quickinfo : 'Control indicator for purchasing document type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PurchaseOrderSubtype : String(1);
  @sap.label : 'Language Key'
  Language : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Payment Terms'
  @sap.quickinfo : 'Terms of Payment Key'
  PaymentTerms : String(4);
  @sap.label : 'Days 1'
  @sap.quickinfo : 'Cash discount days 1'
  CashDiscount1Days : Decimal(3, 0);
  @sap.label : 'Days 2'
  @sap.quickinfo : 'Cash discount days 2'
  CashDiscount2Days : Decimal(3, 0);
  @sap.label : 'Days Net'
  @sap.quickinfo : 'Net Payment Terms Period'
  NetPaymentDays : Decimal(3, 0);
  @sap.label : 'Disc.percent 1'
  @sap.quickinfo : 'Cash discount percentage 1'
  CashDiscount1Percent : Decimal(5, 3);
  @sap.label : 'Disc.percent 2'
  @sap.quickinfo : 'Cash Discount Percentage 2'
  CashDiscount2Percent : Decimal(5, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purch. organization'
  @sap.quickinfo : 'Purchasing organization'
  PurchasingOrganization : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Status'
  @sap.quickinfo : 'Status of Purchasing Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PurchasingDocumentOrigin : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Group'
  PurchasingGroup : String(3);
  @sap.display.format : 'Date'
  @sap.label : 'Purchase Order Date'
  PurchaseOrderDate : Date;
  @sap.label : 'Currency'
  @sap.quickinfo : 'Currency Key'
  @sap.semantics : 'currency-code'
  DocumentCurrency : String(5);
  ExchangeRate : String(12);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Fixed Exchange Rate'
  @sap.quickinfo : 'Indicator for Fixed Exchange Rate'
  ExchangeRateIsFixed : Boolean;
  @sap.display.format : 'Date'
  @sap.label : 'Validity Per. Start'
  @sap.quickinfo : 'Start of Validity Period'
  ValidityStartDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Validity Period End'
  @sap.quickinfo : 'End of Validity Period'
  ValidityEndDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Quotation'
  @sap.quickinfo : 'Quotation Number'
  SupplierQuotationExternalID : String(10);
  @sap.label : 'Salesperson'
  @sap.quickinfo : 'Responsible Salesperson at Supplier''s Office'
  SupplierRespSalesPersonName : String(30);
  @sap.label : 'Telephone'
  @sap.quickinfo : 'Supplier''s Telephone Number'
  SupplierPhoneNumber : String(16);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Goods Supplier'
  SupplyingSupplier : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Supplying Plant'
  @sap.quickinfo : 'Supplying (issuing) plant in case of stock transport order'
  SupplyingPlant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Incoterms'
  @sap.quickinfo : 'Incoterms (Part 1)'
  IncotermsClassification : String(3);
  @sap.label : 'Your Reference'
  CorrespncExternalReference : String(12);
  @sap.label : 'Our Reference'
  CorrespncInternalReference : String(12);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Invoicing Party'
  @sap.quickinfo : 'Different Invoicing Party'
  InvoicingParty : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Subject to release'
  @sap.quickinfo : 'Release Not Yet Completely Effected'
  ReleaseIsNotCompleted : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Incomplete'
  @sap.quickinfo : 'Purchase order not yet complete'
  PurchasingCompletenessStatus : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Incoterms Version'
  IncotermsVersion : String(4);
  @sap.label : 'Incoterms Location 1'
  IncotermsLocation1 : String(70);
  @sap.label : 'Incoterms Location 2'
  IncotermsLocation2 : String(70);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Address Number'
  ManualSupplierAddressID : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Business Purp Compl'
  @sap.quickinfo : 'Business Purpose Completed'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IsEndOfPurposeBlocked : String(1);
  @sap.label : 'City'
  AddressCityName : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Fax'
  @sap.quickinfo : 'First fax no.: dialling code+number'
  AddressFaxNumber : String(30);
  @sap.label : 'House Number'
  AddressHouseNumber : String(10);
  @sap.label : 'Name'
  @sap.quickinfo : 'Name 1'
  AddressName : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Postal Code'
  @sap.quickinfo : 'City postal code'
  AddressPostalCode : String(10);
  @sap.label : 'Street'
  AddressStreetName : String(60);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Telephone'
  @sap.quickinfo : 'First telephone no.: dialling code+number'
  AddressPhoneNumber : String(30);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Region'
  @sap.quickinfo : 'Region (State, Province, County)'
  AddressRegion : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Country Key'
  AddressCountry : String(3);
  @sap.label : 'Language Key'
  AddressCorrespondenceLanguage : String(2);
  to_PurchaseOrderItem : Composition of many ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurchaseOrderItem {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.label : 'CDS for API exposure at Item level'
entity ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurchaseOrderItem {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Document'
  @sap.quickinfo : 'Purchasing Document Number'
  key PurchaseOrder : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'PO Item'
  @sap.quickinfo : 'Item Number of Purchase Order'
  key PurchaseOrderItem : String(5) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Deletion indicator'
  @sap.quickinfo : 'Deletion indicator in purchasing document'
  PurchasingDocumentDeletionCode : String(1);
  @sap.label : 'Short Text'
  PurchaseOrderItemText : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Plant'
  Plant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Storage Location'
  StorageLocation : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Group'
  MaterialGroup : String(9);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing info rec.'
  @sap.quickinfo : 'Number of purchasing info record'
  PurchasingInfoRecord : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Supplier Mat. No.'
  @sap.quickinfo : 'Material Number Used by Supplier'
  SupplierMaterialNumber : String(35);
  @sap.unit : 'PurchaseOrderQuantityUnit'
  @sap.label : 'Order Quantity'
  @sap.quickinfo : 'Purchase Order Quantity'
  OrderQuantity : Decimal(13, 3);
  @sap.label : 'Order Unit'
  @sap.quickinfo : 'Purchase Order Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  PurchaseOrderQuantityUnit : String(3);
  @sap.label : 'Order Price Unit'
  @sap.quickinfo : 'Order Price Unit (Purchasing)'
  @sap.semantics : 'unit-of-measure'
  OrderPriceUnit : String(3);
  @sap.label : 'Quantity Conversion'
  @sap.quickinfo : 'Numerator for Conversion of Order Price Unit into Order Unit'
  OrderPriceUnitToOrderUnitNmrtr : Decimal(5, 0);
  @sap.label : 'Quantity Conversion'
  @sap.quickinfo : 'Denominator for Conv. of Order Price Unit into Order Unit'
  OrdPriceUnitToOrderUnitDnmntr : Decimal(5, 0);
  @sap.label : 'Currency'
  @sap.quickinfo : 'Currency Key'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.semantics : 'currency-code'
  DocumentCurrency : String(5);
  @sap.unit : 'DocumentCurrency'
  @sap.label : 'Net Order Price'
  @sap.quickinfo : 'Net Price in Purchasing Document (in Document Currency)'
  NetPriceAmount : Decimal(12, 3);
  @sap.unit : 'OrderPriceUnit'
  @sap.label : 'Price Unit'
  NetPriceQuantity : Decimal(5, 0);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Code'
  @sap.quickinfo : 'Tax on sales/purchases code'
  TaxCode : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Print Price'
  @sap.quickinfo : 'Price Printout'
  PriceIsToBePrinted : Boolean;
  @sap.label : 'Overdeliv. Tolerance'
  @sap.quickinfo : 'Overdelivery Tolerance'
  OverdelivTolrtdLmtRatioInPct : Decimal(3, 1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Unltd Overdelivery'
  @sap.quickinfo : 'Indicator: Unlimited Overdelivery Allowed'
  UnlimitedOverdeliveryIsAllowed : Boolean;
  @sap.label : 'Underdel. Tolerance'
  @sap.quickinfo : 'Underdelivery Tolerance'
  UnderdelivTolrtdLmtRatioInPct : Decimal(3, 1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Valuation Type'
  ValuationType : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Completed'
  @sap.quickinfo : '&quot;Delivery Completed&quot; Indicator'
  IsCompletelyDelivered : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Final Invoice'
  @sap.quickinfo : 'Final Invoice Indicator'
  IsFinallyInvoiced : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Item category'
  @sap.quickinfo : 'Item category in purchasing document'
  PurchaseOrderItemCategory : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Acct Assignment Cat.'
  @sap.quickinfo : 'Account Assignment Category'
  AccountAssignmentCategory : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Distrib. Indicator'
  @sap.quickinfo : 'Distribution Indicator for Multiple Account Assignment'
  MultipleAcctAssgmtDistribution : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Partial invoice'
  @sap.quickinfo : 'Partial invoice indicator'
  PartialInvoiceDistribution : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Goods receipt'
  @sap.quickinfo : 'Goods Receipt Indicator'
  GoodsReceiptIsExpected : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'GR non-valuated'
  @sap.quickinfo : 'Goods Receipt, Non-Valuated'
  GoodsReceiptIsNonValuated : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Invoice receipt'
  @sap.quickinfo : 'Invoice receipt indicator'
  InvoiceIsExpected : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'GR-Based Inv. Verif.'
  @sap.quickinfo : 'Indicator: GR-Based Invoice Verification'
  InvoiceIsGoodsReceiptBased : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Outline agreement'
  @sap.quickinfo : 'Number of principal purchase agreement'
  PurchaseContract : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Princ.agreement item'
  @sap.quickinfo : 'Item number of principal purchase agreement'
  PurchaseContractItem : String(5);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer'
  Customer : String(10);
  @sap.unit : 'ItemWeightUnit'
  @sap.label : 'Net Weight'
  ItemNetWeight : Decimal(13, 3);
  @sap.label : 'Unit of Weight'
  @sap.semantics : 'unit-of-measure'
  ItemWeightUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Jurisdiction'
  TaxJurisdiction : String(15);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Pricing Date Control'
  @sap.quickinfo : 'Price Determination (Pricing) Date Control'
  PricingDateControl : String(1);
  @sap.unit : 'ItemVolumeUnit'
  @sap.label : 'Volume'
  ItemVolume : Decimal(13, 3);
  @sap.label : 'Volume unit'
  @sap.semantics : 'unit-of-measure'
  ItemVolumeUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Confirmation Control'
  @sap.quickinfo : 'Confirmation Control Key'
  SupplierConfirmationControlKey : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Incoterms'
  @sap.quickinfo : 'Incoterms (Part 1)'
  IncotermsClassification : String(3);
  @sap.label : 'Incoterms (Part 2)'
  IncotermsTransferLocation : String(28);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Eval. receipt sett.'
  @sap.quickinfo : 'Evaluated Receipt Settlement (ERS)'
  EvaldRcptSettlmtIsAllowed : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchase Requisition'
  @sap.quickinfo : 'Purchase Requisition Number'
  PurchaseRequisition : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item of requisition'
  @sap.quickinfo : 'Item number of purchase requisition'
  PurchaseRequisitionItem : String(5);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Returns Item'
  IsReturnsItem : Boolean;
  @sap.label : 'Requisitioner'
  @sap.quickinfo : 'Name of requisitioner/requester'
  RequisitionerName : String(12);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Package number'
  ServicePackage : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Earmarked Funds'
  @sap.quickinfo : 'Document Number for Earmarked Funds'
  EarmarkedFunds : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Earmarked Funds'
  @sap.quickinfo : 'Document Number for Earmarked Funds'
  EarmarkedFundsDocument : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Document item'
  @sap.quickinfo : 'Earmarked Funds: Document Item'
  EarmarkedFundsItem : String(3);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Document item'
  @sap.quickinfo : 'Earmarked Funds: Document Item'
  EarmarkedFundsDocumentItem : String(3);
  @sap.label : 'Incoterms Location 1'
  IncotermsLocation1 : String(70);
  @sap.label : 'Incoterms Location 2'
  IncotermsLocation2 : String(70);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'EAN/UPC'
  @sap.quickinfo : 'International Article Number (EAN/UPC)'
  InternationalArticleNumber : String(18);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material number'
  ManufacturerMaterial : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Performer'
  ServicePerformer : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Product Type Group'
  ProductType : String(2);
  @sap.unit : 'DocumentCurrency'
  @sap.label : 'Expected Value'
  @sap.quickinfo : 'Expected Value of Overall Limit'
  ExpectedOverallLimitAmount : Decimal(14, 3);
  @sap.unit : 'DocumentCurrency'
  @sap.label : 'Overall Limit'
  OverallLimitAmount : Decimal(14, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Address'
  @sap.quickinfo : 'Manual address number in purchasing document item'
  DeliveryAddressID : String(10);
  @sap.label : 'Name'
  @sap.quickinfo : 'Name 1'
  DeliveryAddressName : String(40);
  @sap.label : 'Street'
  DeliveryAddressStreetName : String(60);
  @sap.label : 'House Number'
  DeliveryAddressHouseNumber : String(10);
  @sap.label : 'City'
  DeliveryAddressCityName : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Postal Code'
  @sap.quickinfo : 'City postal code'
  DeliveryAddressPostalCode : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Region'
  @sap.quickinfo : 'Region (State, Province, County)'
  DeliveryAddressRegion : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Country Key'
  DeliveryAddressCountry : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Down Payment'
  @sap.quickinfo : 'Down Payment Indicator'
  DownPaymentType : String(4);
  @sap.label : 'Down Payment %'
  @sap.quickinfo : 'Down Payment Percentage'
  DownPaymentPercentageOfTotAmt : Decimal(5, 2);
  @sap.unit : 'DocumentCurrency'
  @sap.label : 'Down Payment Amount'
  @sap.quickinfo : 'Down Payment Amount in Document Currency'
  DownPaymentAmount : Decimal(12, 3);
  @sap.display.format : 'Date'
  @sap.label : 'Due Date for DP'
  @sap.quickinfo : 'Due Date for Down Payment'
  DownPaymentDueDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Usage'
  @sap.quickinfo : 'Usage of the material'
  BR_MaterialUsage : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material origin'
  @sap.quickinfo : 'Origin of the material'
  BR_MaterialOrigin : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Mat. CFOP category'
  @sap.quickinfo : 'Material CFOP category'
  BR_CFOPCategory : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Produced in-house'
  BR_IsProducedInHouse : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'NCM Code'
  @sap.quickinfo : 'Brazilian NCM Code'
  ConsumptionTaxCtrlCode : String(16);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Stock Segment'
  StockSegment : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Requirement Segment'
  RequirementSegment : String(40);
  to_AccountAssignment : Association to many ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurOrdAccountAssignment {  };
  to_PurchaseOrderPricingElement : Composition of many ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurOrdPricingElement {  };
  to_ScheduleLine : Association to many ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurchaseOrderScheduleLine {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.label : 'PO Schedule lines for API'
entity ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurchaseOrderScheduleLine {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Document'
  @sap.quickinfo : 'Purchasing Document Number'
  key PurchasingDocument : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item'
  @sap.quickinfo : 'Item Number of Purchasing Document'
  key PurchasingDocumentItem : String(5) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Schedule Line'
  @sap.quickinfo : 'Delivery Schedule Line Counter'
  key ScheduleLine : String(4) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Deliv. date category'
  @sap.quickinfo : 'Category of delivery date'
  DelivDateCategory : String(1);
  @sap.display.format : 'Date'
  @sap.label : 'Delivery date'
  @sap.quickinfo : 'Item delivery date'
  ScheduleLineDeliveryDate : Date;
  @sap.label : 'Order Unit'
  @sap.quickinfo : 'Purchase Order Unit of Measure'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.semantics : 'unit-of-measure'
  PurchaseOrderQuantityUnit : String(3);
  @sap.unit : 'PurchaseOrderQuantityUnit'
  @sap.label : 'Scheduled Quantity'
  ScheduleLineOrderQuantity : Decimal(13, 3);
  @sap.label : 'Time'
  @sap.quickinfo : 'Delivery Date Time-Spot'
  ScheduleLineDeliveryTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Stat.-Rel. Del. Date'
  @sap.quickinfo : 'Statistics-Relevant Delivery Date'
  SchedLineStscDeliveryDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchase Requisition'
  @sap.quickinfo : 'Purchase Requisition Number'
  PurchaseRequisition : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item of requisition'
  @sap.quickinfo : 'Item number of purchase requisition'
  PurchaseRequisitionItem : String(5);
  @sap.unit : 'PurchaseOrderQuantityUnit'
  @sap.label : 'Committed Quantity'
  ScheduleLineCommittedQuantity : Decimal(13, 3);
  @sap.display.format : 'Date'
  @sap.label : 'Start Date'
  @sap.quickinfo : 'Start Date for Period of Performance'
  PerformancePeriodStartDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'End Date'
  @sap.quickinfo : 'End Date for Period of Performance'
  PerformancePeriodEndDate : Date;
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.label : 'PO Account Assignment for API'
entity ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurOrdAccountAssignment {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Document'
  @sap.quickinfo : 'Purchasing Document Number'
  key PurchaseOrder : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item'
  @sap.quickinfo : 'Item Number of Purchasing Document'
  key PurchaseOrderItem : String(5) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Account Assgmt No.'
  @sap.quickinfo : 'Sequential Number of Account Assignment'
  key AccountAssignmentNumber : String(2) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Deletion Indicator'
  @sap.quickinfo : 'Deletion Indicator: Purchasing Document Account Assignment'
  IsDeleted : Boolean;
  @sap.label : 'Order Unit'
  @sap.quickinfo : 'Purchase Order Unit of Measure'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.semantics : 'unit-of-measure'
  PurchaseOrderQuantityUnit : String(3);
  @sap.unit : 'PurchaseOrderQuantityUnit'
  @sap.label : 'Quantity'
  Quantity : Decimal(13, 3);
  @sap.label : 'Distribution (%)'
  @sap.quickinfo : 'Distribution percentage in the case of multiple acct assgt'
  MultipleAcctAssgmtDistrPercent : Decimal(3, 1);
  @sap.unit : 'DocumentCurrency'
  @sap.label : 'Net Order Value'
  @sap.quickinfo : 'Net Order Value in PO Currency'
  PurgDocNetAmount : Decimal(14, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'G/L Account'
  @sap.quickinfo : 'G/L Account Number'
  GLAccount : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Business Area'
  BusinessArea : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Cost Center'
  CostCenter : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'SD Document'
  @sap.quickinfo : 'Sales and Distribution Document Number'
  SalesOrder : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item'
  @sap.quickinfo : 'Sales Document Item'
  SalesOrderItem : String(6);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Schedule line number'
  @sap.quickinfo : 'Schedule Line Number'
  SalesOrderScheduleLine : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Asset'
  @sap.quickinfo : 'Main Asset Number'
  MasterFixedAsset : String(12);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sub-number'
  @sap.quickinfo : 'Asset Subnumber'
  FixedAsset : String(4);
  @sap.label : 'Goods recipient'
  GoodsRecipientName : String(12);
  @sap.label : 'Unloading Point'
  UnloadingPointName : String(25);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Controlling Area'
  ControllingArea : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Cost Object'
  CostObject : String(12);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order'
  @sap.quickinfo : 'Order Number'
  OrderID : String(12);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Profit Center'
  ProfitCenter : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'WBS Element'
  @sap.quickinfo : 'Work Breakdown Structure Element (WBS Element)'
  WBSElementInternalID : String(24);
  @sap.display.format : 'UpperCase'
  @sap.label : 'WBS element'
  @sap.quickinfo : 'Work Breakdown Structure Element (WBS Element)'
  WBSElement : String(24);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Network'
  @sap.quickinfo : 'Network Number for Account Assignment'
  ProjectNetwork : String(12);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Real Estate Key'
  @sap.quickinfo : 'Internal Key for Real Estate Object'
  RealEstateObject : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Partner'
  @sap.quickinfo : 'Partner account number'
  PartnerAccountNumber : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Commitment item'
  @sap.quickinfo : 'Commitment Item'
  CommitmentItem : String(24);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Recovery Indicator'
  JointVentureRecoveryCode : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Funds center'
  @sap.quickinfo : 'Funds Center'
  FundsCenter : String(16);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Fund'
  Fund : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Functional Area'
  FunctionalArea : String(16);
  @sap.display.format : 'Date'
  @sap.label : 'Reference date'
  @sap.quickinfo : 'Reference date for settlement'
  SettlementReferenceDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Code'
  @sap.quickinfo : 'Tax on sales/purchases code'
  TaxCode : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Jurisdiction'
  TaxJurisdiction : String(15);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Activity Type'
  CostCtrActivityType : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Business Process'
  BusinessProcess : String(12);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Earmarked Funds'
  @sap.quickinfo : 'Document Number for Earmarked Funds'
  EarmarkedFundsDocument : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Grant'
  GrantID : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Budget Period'
  BudgetPeriod : String(10);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'PO Pricing Element for API'
entity ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurOrdPricingElement {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Document'
  @sap.quickinfo : 'Purchasing Document Number'
  key PurchaseOrder : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item'
  @sap.quickinfo : 'Item Number of Purchasing Document'
  key PurchaseOrderItem : String(5) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Doc. Condition No.'
  @sap.quickinfo : 'Number of the Document Condition'
  key PricingDocument : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item'
  @sap.quickinfo : 'Condition item number'
  key PricingDocumentItem : String(6) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Step Number'
  key PricingProcedureStep : String(3) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Counter'
  @sap.quickinfo : 'Condition Counter'
  key PricingProcedureCounter : String(3) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition type'
  ConditionType : String(4);
  @sap.label : 'Amount'
  @sap.quickinfo : 'Rate (Amount or Percentage)'
  ConditionRateValue : Decimal(24, 9);
  @sap.label : 'Currency'
  @sap.quickinfo : 'Currency Key'
  @sap.semantics : 'currency-code'
  ConditionCurrency : String(5);
  PriceDetnExchangeRate : String(12);
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Value'
  @sap.quickinfo : 'Condition Value'
  ConditionAmount : Decimal(16, 3);
  @sap.label : 'Condition Unit'
  @sap.quickinfo : 'Condition Unit in the Document'
  @sap.semantics : 'unit-of-measure'
  ConditionQuantityUnit : String(3);
  @sap.unit : 'ConditionQuantityUnit'
  @sap.label : 'Pricing Unit'
  @sap.quickinfo : 'Condition Pricing Unit'
  ConditionQuantity : Decimal(5, 0);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Application'
  ConditionApplication : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Valid From'
  @sap.quickinfo : 'Timestamp for Pricing'
  PricingDateTime : String(14);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Calculation Type'
  @sap.quickinfo : 'Calculation Type for Condition'
  ConditionCalculationType : String(3);
  @sap.label : 'Basis Value'
  @sap.quickinfo : 'Condition Basis Value'
  ConditionBaseValue : Decimal(24, 9);
  @sap.label : 'Numerator'
  @sap.quickinfo : 'Numerator for Converting to Base UoM'
  ConditionToBaseQtyNmrtr : Decimal(10, 0);
  @sap.label : 'Denominator'
  @sap.quickinfo : 'Denominator for Converting to Base UoM'
  ConditionToBaseQtyDnmntr : Decimal(10, 0);
  @sap.label : 'Condition Category'
  @sap.quickinfo : 'Condition Category (Examples: Tax, Freight, Price, Cost)'
  ConditionCategory : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Statistical'
  @sap.quickinfo : 'Condition is used for statistics'
  ConditionIsForStatistics : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Scale Type'
  PricingScaleType : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Accruals'
  @sap.quickinfo : 'Condition is Relevant for Accrual (e.g. Freight)'
  IsRelevantForAccrual : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Invoice List Cond.'
  @sap.quickinfo : 'Condition for Invoice List'
  CndnIsRelevantForInvoiceList : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Origin'
  @sap.quickinfo : 'Origin of the Condition'
  ConditionOrigin : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Group Condition'
  IsGroupCondition : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Update'
  CndnIsRelevantForLimitValue : Boolean;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sequent.No. of Cond.'
  @sap.quickinfo : 'Sequential Number of the Condition'
  ConditionSequentialNumber : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Control'
  ConditionControl : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Inactive Condition'
  @sap.quickinfo : 'Condition is Inactive'
  ConditionInactiveReason : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Class'
  ConditionClass : String(1);
  @sap.label : 'Condition Factor'
  @sap.quickinfo : 'Factor for Condition Base Value'
  FactorForConditionBasisValue : Double;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Scale Basis'
  @sap.quickinfo : 'Scale Basis Indicator'
  PricingScaleBasis : String(3);
  @sap.label : 'Scale Basis Value'
  ConditionScaleBasisValue : Decimal(24, 9);
  @sap.label : 'Scale Currency'
  @sap.semantics : 'currency-code'
  ConditionScaleBasisCurrency : String(5);
  @sap.label : 'Scale Unit of Meas.'
  @sap.quickinfo : 'Condition Scale Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  ConditionScaleBasisUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Intercomp.Billing'
  @sap.quickinfo : 'Condition for Intercompany Billing'
  CndnIsRelevantForIntcoBilling : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'UsedforVariantConfig'
  @sap.quickinfo : 'Condition Used for Variant Configuration'
  ConditionIsForConfiguration : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Changed Manually'
  @sap.quickinfo : 'Condition Changed Manually'
  ConditionIsManuallyChanged : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Condition Record No.'
  @sap.quickinfo : 'Number of the Condition Record'
  ConditionRecord : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Access'
  @sap.quickinfo : 'Access sequence - Access number'
  AccessNumberOfAccessSequence : String(3);
};

