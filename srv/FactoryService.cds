using {db as my} from '../db/Schema';
using IRMSQUEQE_MANAGEMENT_SRV from './external/IRMSQUEQE_MANAGEMENT_SRV';
using IRMSPARKING_NO_SRV from './external/IRMSPARKING_NO_SRV';
using IRMSZAPI_SALES_ORDER_SRV from './external/IRMSZAPI_SALES_ORDER_SRV';
using IQMSFACTORY_SRV from './external/IQMSFACTORY_SRV.cds';



// using IRMSCREATE_SO_SRV from './external/IRMSCREATE_SO_SRV';
// using IRMSCREATE_DELIVERY_SRV from './external/IRMSCREATE_DELIVERY_SRV';
// using IRMSSHIPMENT_CREATE_SRV from './external/IRMSSHIPMENT_CREATE_SRV';

using IRMSTRANSPORT_CREATE_SRV from './external/IRMSTRANSPORT_CREATE_SRV';

using IRMSVEHICLE_CREATE_SRV from './external/IRMSVEHICLE_CREATE_SRV';
// using IRMSBILLING_DOCUMENT_SRV from './external/IRMSBILLING_DOCUMENT_SRV';
using IQMSSCHEDULING_SRV from './external/IQMSSCHEDULING_SRV.cds';
using IQMSPARKING_SRV from './external/IQMSPARKING_SRV.cds';
using IQMSCREATE_SO_SRV from './external/IQMSCREATE_SO_SRV.cds';
using IQMSCREATE_DELIVERY_SRV from './external/IQMSCREATE_DELIVERY_SRV.cds';
using IQMSQUEUEMANAGE_VALUEHELP_SRV from './external/IQMSQUEUEMANAGE_VALUEHELP_SRV.cds';
using IQMSSHIPMENT_CREATE_SRV from './external/IQMSSHIPMENT_CREATE_SRV.cds';
using IQMSBILLING_DOCUMENT_SRV from './external/IQMSBILLING_DOCUMENT_SRV.cds';
using IQMSVEHICLE_CREATE_SRV from './external/IQMSVEHICLE_CREATE_SRV.cds';
using IQMSSTOCK_ORDER_SRV from './external/IQMSSTOCK_ORDER_SRV.cds';
// using API_PURCHASEORDER_PROCESS_SRV  from './external/API_PURCHASEORDER_PROCESS_SRV';
using ZAPI_PURCHASEORDER_PROCESS_SRV from './external/ZAPI_PURCHASEORDER_PROCESS_SRV.cds';
using IQMSSTO_DELIVERY_SRV from './external/IQMSSTO_DELIVERY_SRV.cds';


service factoryService {

    entity AddParkingGate                 as projection on my.AddParkingGate;
    entity AddParkingArea                 as projection on my.AddParkingArea;
    entity VehicleTypeDefinition          as projection on my.VehicleTypeDefinition;
    entity ChecklistCreation              as projection on my.ChecklistCreation;
    entity ChecklistVerification          as projection on my.ChecklistVerification;
    entity SecurityStatus                 as projection on my.SecurityStatus;
    entity MaterialTypeDefinition         as projection on my.MaterialTypeDefinition;
    // entity xIRMSxcustomer                 as projection on IRMSQUEQE_MANAGEMENT_SRV.xIRMSxcustomer;
    // entity xIRMSxmaterial                 as projection on IRMSQUEQE_MANAGEMENT_SRV.xIRMSxmaterial;
    // entity xIRMSxTransport                as projection on IRMSQUEQE_MANAGEMENT_SRV.xIRMSxTransport;

  entity ScheduleFacSet as projection on IQMSFACTORY_SRV.ScheduleFacSet
    {        Bayno, key SalesOrder, key Stockorder, Startdate, Enddate, Starttime, Endtime, Vehicleno, Driver, Cleaner, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     }  

    // stodelivery
    entity CreatedItemsSet                as
        projection on IQMSSTO_DELIVERY_SRV.CreatedItemsSet {
            key RefDoc,
                RefItem,
                DelivNumb,
                DelivItem,
                Material,
                DlvQty,
                SalesUnit,
                SalesUnitIso,
                MaterialExternal,
                MaterialGuid,
                MaterialVersion,
                MaterialLong
        };

    entity DeliveriesSet                  as
        projection on IQMSSTO_DELIVERY_SRV.DeliveriesSet {
            key DelivNumb
        };


          entity xIQMSxschfac_fetch as projection on IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxschfac_fetch
    {        key SalesOrder, key Stockorder, Bayno, Startdate, Enddate, Starttime, Endtime, Vehicleno, Driver, Cleaner, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     } 

    entity ReturnSet                      as
        projection on IQMSSTO_DELIVERY_SRV.ReturnSet {
            key Type,
                Id,
                Number,
                Message,
                LogNo,
                LogMsgNo,
                MessageV1,
                MessageV2,
                MessageV3,
                MessageV4,
                Parameter,
                Row,
                Field,
                System
        };

    entity stodeliverySet                 as
        projection on IQMSSTO_DELIVERY_SRV.stodeliverySet {
                DebugFlg,
                DueDate,
                NoDequeue,
                ShipPoint,
            key Delivery,
                NumDeliveries,
                sto_headitem,
                sto_toreturn
        };

    entity StockTransItemsSet             as
        projection on IQMSSTO_DELIVERY_SRV.StockTransItemsSet {
            key RefDoc,
                RefItem,
                DlvQty,
                SalesUnit,
                SalesUnitIso,
                DelivNumb
        };

    // entity A_PurchaseOrder as projection on API_PURCHASEORDER_PROCESS_SRV.A_PurchaseOrder;

    entity A_PurOrdAccountAssignment      as
        projection on ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurOrdAccountAssignment {
            key PurchaseOrder,
            key PurchaseOrderItem,
            key AccountAssignmentNumber,
                IsDeleted,
                PurchaseOrderQuantityUnit,
                Quantity,
                MultipleAcctAssgmtDistrPercent,
                PurgDocNetAmount,
                GLAccount,
                BusinessArea,
                CostCenter,
                SalesOrder,
                SalesOrderItem,
                SalesOrderScheduleLine,
                MasterFixedAsset,
                FixedAsset,
                GoodsRecipientName,
                UnloadingPointName,
                ControllingArea,
                CostObject,
                OrderID,
                ProfitCenter,
                WBSElementInternalID,
                WBSElement,
                ProjectNetwork,
                RealEstateObject,
                PartnerAccountNumber,
                CommitmentItem,
                JointVentureRecoveryCode,
                FundsCenter,
                Fund,
                FunctionalArea,
                SettlementReferenceDate,
                TaxCode,
                TaxJurisdiction,
                CostCtrActivityType,
                BusinessProcess,
                EarmarkedFundsDocument,
                GrantID,
                BudgetPeriod
        };

    entity A_PurOrdPricingElement         as
        projection on ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurOrdPricingElement {
            key PurchaseOrder,
            key PurchaseOrderItem,
            key PricingDocument,
            key PricingDocumentItem,
            key PricingProcedureStep,
            key PricingProcedureCounter,
                ConditionType,
                ConditionRateValue,
                ConditionCurrency,
                PriceDetnExchangeRate,
                ConditionAmount,
                ConditionQuantityUnit,
                ConditionQuantity,
                ConditionApplication,
                PricingDateTime,
                ConditionCalculationType,
                ConditionBaseValue,
                ConditionToBaseQtyNmrtr,
                ConditionToBaseQtyDnmntr,
                ConditionCategory,
                ConditionIsForStatistics,
                PricingScaleType,
                IsRelevantForAccrual,
                CndnIsRelevantForInvoiceList,
                ConditionOrigin,
                IsGroupCondition,
                CndnIsRelevantForLimitValue,
                ConditionSequentialNumber,
                ConditionControl,
                ConditionInactiveReason,
                ConditionClass,
                FactorForConditionBasisValue,
                PricingScaleBasis,
                ConditionScaleBasisValue,
                ConditionScaleBasisCurrency,
                ConditionScaleBasisUnit,
                CndnIsRelevantForIntcoBilling,
                ConditionIsForConfiguration,
                ConditionIsManuallyChanged,
                ConditionRecord,
                AccessNumberOfAccessSequence
        };

    entity A_PurchaseOrder                as
        projection on ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurchaseOrder {
            key PurchaseOrder,
                CompanyCode,
                PurchaseOrderType,
                PurchasingDocumentDeletionCode,
                PurchasingProcessingStatus,
                CreatedByUser,
                CreationDate,
                LastChangeDateTime,
                Supplier,
                PurchaseOrderSubtype,
                Language,
                PaymentTerms,
                CashDiscount1Days,
                CashDiscount2Days,
                NetPaymentDays,
                CashDiscount1Percent,
                CashDiscount2Percent,
                PurchasingOrganization,
                PurchasingDocumentOrigin,
                PurchasingGroup,
                PurchaseOrderDate,
                DocumentCurrency,
                ExchangeRate,
                ExchangeRateIsFixed,
                ValidityStartDate,
                ValidityEndDate,
                SupplierQuotationExternalID,
                SupplierRespSalesPersonName,
                SupplierPhoneNumber,
                SupplyingSupplier,
                SupplyingPlant,
                IncotermsClassification,
                CorrespncExternalReference,
                CorrespncInternalReference,
                InvoicingParty,
                ReleaseIsNotCompleted,
                PurchasingCompletenessStatus,
                IncotermsVersion,
                IncotermsLocation1,
                IncotermsLocation2,
                ManualSupplierAddressID,
                IsEndOfPurposeBlocked,
                AddressCityName,
                AddressFaxNumber,
                AddressHouseNumber,
                AddressName,
                AddressPostalCode,
                AddressStreetName,
                AddressPhoneNumber,
                AddressRegion,
                AddressCountry,
                AddressCorrespondenceLanguage,
                to_PurchaseOrderItem
        };

    entity A_PurchaseOrderItem            as
        projection on ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurchaseOrderItem {
            key PurchaseOrder,
            key PurchaseOrderItem,
                PurchasingDocumentDeletionCode,
                PurchaseOrderItemText,
                Plant,
                StorageLocation,
                MaterialGroup,
                PurchasingInfoRecord,
                SupplierMaterialNumber,
                OrderQuantity,
                PurchaseOrderQuantityUnit,
                OrderPriceUnit,
                OrderPriceUnitToOrderUnitNmrtr,
                OrdPriceUnitToOrderUnitDnmntr,
                DocumentCurrency,
                NetPriceAmount,
                NetPriceQuantity,
                TaxCode,
                PriceIsToBePrinted,
                OverdelivTolrtdLmtRatioInPct,
                UnlimitedOverdeliveryIsAllowed,
                UnderdelivTolrtdLmtRatioInPct,
                ValuationType,
                IsCompletelyDelivered,
                IsFinallyInvoiced,
                PurchaseOrderItemCategory,
                AccountAssignmentCategory,
                MultipleAcctAssgmtDistribution,
                PartialInvoiceDistribution,
                GoodsReceiptIsExpected,
                GoodsReceiptIsNonValuated,
                InvoiceIsExpected,
                InvoiceIsGoodsReceiptBased,
                PurchaseContract,
                PurchaseContractItem,
                Customer,
                ItemNetWeight,
                ItemWeightUnit,
                TaxJurisdiction,
                PricingDateControl,
                ItemVolume,
                ItemVolumeUnit,
                SupplierConfirmationControlKey,
                IncotermsClassification,
                IncotermsTransferLocation,
                EvaldRcptSettlmtIsAllowed,
                PurchaseRequisition,
                PurchaseRequisitionItem,
                IsReturnsItem,
                RequisitionerName,
                ServicePackage,
                EarmarkedFunds,
                EarmarkedFundsDocument,
                EarmarkedFundsItem,
                EarmarkedFundsDocumentItem,
                IncotermsLocation1,
                IncotermsLocation2,
                Material,
                InternationalArticleNumber,
                ManufacturerMaterial,
                ServicePerformer,
                ProductType,
                ExpectedOverallLimitAmount,
                OverallLimitAmount,
                DeliveryAddressID,
                DeliveryAddressName,
                DeliveryAddressStreetName,
                DeliveryAddressHouseNumber,
                DeliveryAddressCityName,
                DeliveryAddressPostalCode,
                DeliveryAddressRegion,
                DeliveryAddressCountry,
                DownPaymentType,
                DownPaymentPercentageOfTotAmt,
                DownPaymentAmount,
                DownPaymentDueDate,
                BR_MaterialUsage,
                BR_MaterialOrigin,
                BR_CFOPCategory,
                BR_IsProducedInHouse,
                ConsumptionTaxCtrlCode,
                StockSegment,
                RequirementSegment
        };

    entity A_PurchaseOrderScheduleLine    as
        projection on ZAPI_PURCHASEORDER_PROCESS_SRV.A_PurchaseOrderScheduleLine {
            key PurchasingDocument,
            key PurchasingDocumentItem,
            key ScheduleLine,
                DelivDateCategory,
                ScheduleLineDeliveryDate,
                PurchaseOrderQuantityUnit,
                ScheduleLineOrderQuantity,
                ScheduleLineDeliveryTime,
                SchedLineStscDeliveryDate,
                PurchaseRequisition,
                PurchaseRequisitionItem,
                ScheduleLineCommittedQuantity,
                PerformancePeriodStartDate,
                PerformancePeriodEndDate
        };

    // stock transfer
    entity stocreateSet                   as
        projection on IQMSSTOCK_ORDER_SRV.stocreateSet {
            key po_create,
                create_tohead,
                to_item
        };

    entity stoheaderSet                   as
        projection on IQMSSTOCK_ORDER_SRV.stoheaderSet {
            key PoNumber,
                CompCode,
                DocType,
                DeleteInd,
                Status,
                CreatDate,
                CreatedBy,
                PurchOrg,
                PurGroup,
                DocDate,
                VperStart,
                VperEnd,
                SupplPlnt
        };

    entity PoitemSet                      as
        projection on IQMSSTOCK_ORDER_SRV.PoitemSet {
            key PoItem,
                DeleteInd,
                ShortText,
                Material,
                MaterialExternal,
                MaterialGuid,
                MaterialVersion,
                Ematerial,
                EmaterialExternal,
                EmaterialGuid,
                EmaterialVersion,
                Plant,
                StgeLoc,
                Trackingno,
                MatlGroup,
                InfoRec,
                VendMat,
                Quantity,
                PoUnit,
                PoUnitIso,
                OrderprUn,
                OrderprUnIso,
                ConvNum1,
                ConvDen1,
                NetPrice,
                PriceUnit,
                GrPrTime,
                TaxCode,
                BonGrp1,
                QualInsp,
                InfoUpd,
                PrntPrice,
                EstPrice,
                Reminder1,
                Reminder2,
                Reminder3,
                OverDlvTol,
                UnlimitedDlv,
                UnderDlvTol,
                ValType,
                NoMoreGr,
                FinalInv,
                ItemCat,
                Acctasscat,
                Distrib,
                PartInv,
                GrInd,
                GrNonVal,
                IrInd,
                FreeItem,
                GrBasediv,
                AcknReqd,
                AcknowlNo,
                Agreement,
                AgmtItem,
                Shipping,
                Customer,
                CondGroup,
                NoDisct,
                PlanDel,
                NetWeight,
                Weightunit,
                WeightunitIso,
                Taxjurcode,
                CtrlKey,
                ConfCtrl,
                RevLev,
                Fund,
                FundsCtr,
                CmmtItem,
                GrossWt,
                Volume,
                Volumeunit,
                VolumeunitIso,
                Incoterms1,
                Incoterms2,
                PreVendor,
                VendPart,
                HlItem,
                GrToDate,
                SuppVendor,
                ScVendor,
                KanbanInd,
                Ers,
                RPromo,
                Points,
                PointUnit,
                PointUnitIso,
                Season,
                SeasonYr,
                BonGrp2,
                BonGrp3,
                SettItem,
                Minremlife,
                RfqNo,
                RfqItem,
                PreqNo,
                PreqItem,
                RefDoc,
                RefItem,
                SiCat,
                RetItem,
                AtRelev,
                OrderReason,
                BrasNbm,
                MatlUsage,
                MatOrigin,
                InHouse,
                Indus3,
                InfIndex,
                DelivCompl,
                PartDeliv,
                ShipBlocked,
                PreqName,
                PeriodIndExpirationDate,
                IntObjNo,
                PckgNo,
                Batch,
                Vendrbatch,
                Calctype,
                GrantNbr,
                CmmtItemLong,
                FuncAreaLong,
                NoRounding,
                PoPrice,
                SupplStloc,
                SrvBasedIv,
                FundsRes,
                ResItem,
                OrigAccept,
                AllocTbl,
                AllocTblItem,
                SrcStockType,
                ReasonRej,
                CrmSalesOrderNo,
                CrmSalesOrderItemNo,
                CrmRefSalesOrderNo,
                CrmRefSoItemNo,
                PrioUrgency,
                PrioRequirement,
                ReasonCode,
                FundLong,
                LongItemNumber,
                ExternalSortNumber,
                ExternalHierarchyType,
                RetentionPercentage,
                DownpayType,
                DownpayAmount,
                DownpayPercent,
                ExtRfxNumber,
                ExtRfxItem,
                ExtRfxSystem,
                SrmContractId,
                SrmContractItm,
                BudgetPeriod,
                BlockReasonId,
                BlockReasonText,
                SpeCrmFkrel,
                DateQtyFixed,
                GiBasedGr,
                Shiptype,
                Handoverloc,
                TcAutDet,
                ManualTcReason,
                FiscalIncentive,
                FiscalIncentiveId,
                TaxSubjectSt,
                ReqSegment,
                StkSegment,
                SfTxjcd,
                Incoterms2l,
                Incoterms3l,
                MaterialLong,
                EmaterialLong,
                Serviceperformer,
                Producttype,
                Startdate,
                Enddate,
                ReqSegLong,
                StkSegLong,
                ExpectedValue,
                LimitAmount,
                ExtRef,
                GlAccount,
                Costcenter,
                WbsElement,
                CommodityCode,
                IntrastatServiceCode
        };

    entity PoitemxSet                     as
        projection on IQMSSTOCK_ORDER_SRV.PoitemxSet {
            key PoItem,
                PoItemx,
                DeleteInd,
                ShortText,
                Material,
                MaterialExternal,
                MaterialGuid,
                MaterialVersion,
                Ematerial,
                EmaterialExternal,
                EmaterialGuid,
                EmaterialVersion,
                Plant,
                StgeLoc,
                Trackingno,
                MatlGroup,
                InfoRec,
                VendMat,
                Quantity,
                PoUnit,
                PoUnitIso,
                OrderprUn,
                OrderprUnIso,
                ConvNum1,
                ConvDen1,
                NetPrice,
                PriceUnit,
                GrPrTime,
                TaxCode,
                BonGrp1,
                QualInsp,
                InfoUpd,
                PrntPrice,
                EstPrice,
                Reminder1,
                Reminder2,
                Reminder3,
                OverDlvTol,
                UnlimitedDlv,
                UnderDlvTol,
                ValType,
                NoMoreGr,
                FinalInv,
                ItemCat,
                Acctasscat,
                Distrib,
                PartInv,
                GrInd,
                GrNonVal,
                IrInd,
                FreeItem,
                GrBasediv,
                AcknReqd,
                AcknowlNo,
                Agreement,
                AgmtItem,
                Shipping,
                Customer,
                CondGroup,
                NoDisct,
                PlanDel,
                NetWeight,
                Weightunit,
                WeightunitIso,
                Taxjurcode,
                CtrlKey,
                ConfCtrl,
                RevLev,
                Fund,
                FundsCtr,
                CmmtItem,
                Pricedate,

                GrossWt,
                Volume,
                Volumeunit,
                VolumeunitIso,
                Incoterms1,
                Incoterms2,
                PreVendor,
                VendPart,
                HlItem,
                GrToDate,
                SuppVendor,
                ScVendor,
                KanbanInd,
                Ers,
                RPromo,
                Points,
                PointUnit,
                PointUnitIso,
                Season,
                SeasonYr,
                BonGrp2,
                BonGrp3,
                SettItem,
                Minremlife,
                RfqNo,
                RfqItem,
                PreqNo,
                PreqItem,
                RefDoc,
                RefItem,
                SiCat,
                RetItem,
                AtRelev,
                OrderReason,
                BrasNbm,
                MatlUsage,
                MatOrigin,
                InHouse,
                Indus3,
                InfIndex,
                UntilDate,
                DelivCompl,
                PartDeliv,
                ShipBlocked,
                PreqName,
                PeriodIndExpirationDate,
                IntObjNo,
                PckgNo,
                Batch,
                Vendrbatch,
                Calctype,
                NoRounding,
                PoPrice,
                SupplStloc,
                SrvBasedIv,
                FundsRes,
                ResItem,
                GrantNbr,
                FuncAreaLong,
                OrigAccept,
                AllocTbl,
                AllocTblItem,
                SrcStockType,
                ReasonRej,
                CrmSalesOrderNo,
                CrmSalesOrderItemNo,
                CrmRefSalesOrderNo,
                CrmRefSoItemNo,
                PrioUrgency,
                PrioRequirement,
                ReasonCode,
                LongItemNumber,
                ExternalSortNumber,
                ExternalHierarchyType,
                RetentionPercentage,
                DownpayType,
                DownpayAmount,
                DownpayPercent,
                DownpayDuedate,
                ExtRfxNumber,
                ExtRfxItem,
                ExtRfxSystem,
                SrmContractId,
                SrmContractItm,
                BudgetPeriod,
                BlockReasonId,
                BlockReasonText,
                SpeCrmFkrel,
                DateQtyFixed,
                GiBasedGr,
                Shiptype,
                Handoverloc,
                TcAutDet,
                ManualTcReason,
                FiscalIncentive,
                FiscalIncentiveId,
                TaxSubjectSt,
                ReqSegment,
                StkSegment,
                SfTxjcd,
                Incoterms2l,
                Incoterms3l,
                MaterialLong,
                EmaterialLong,
                Serviceperformer,
                Producttype,
                Startdate,
                Enddate,
                ReqSegLong,
                StkSegLong,
                ExpectedValue,
                LimitAmount,
                ExtRef,
                GlAccount,
                Costcenter,
                WbsElement,
                CommodityCode,
                IntrastatServiceCode
        };

    entity PoschedulexSet                 as
        projection on IQMSSTOCK_ORDER_SRV.PoschedulexSet {
            key PoItem,
                SchedLine,
                PoItemx,
                SchedLinex,
                DelDatcatExt,
                DeliveryDate,
                Quantity,
                DelivTime,
                StatDate,
                PreqNo,
                PreqItem,
                PoDate,
                Routesched,
                MsDate,
                MsTime,
                LoadDate,
                LoadTime,
                TpDate,
                TpTime,
                GiDate,
                GiTime,
                DeleteInd,
                ReqClosed,
                GrEndDate,
                GrEndTime,
                ComQty,
                ComDate,
                GeoRoute,
                Handoverdate,
                Handovertime
        };

    entity ReturnSetStoDel                as
        projection on IQMSSTOCK_ORDER_SRV.ReturnSet {
            key Type,
                Id,
                Number,
                Message,
                LogNo,
                LogMsgNo,
                MessageV1,
                MessageV2,
                MessageV3,
                MessageV4,
                Parameter,
                Row,
                Field,
                System
        };

    // new vehicle master

    // entity header_vehSet                  as
    //     projection on IQMSVEHICLE_CREATE_SRV.header_vehSet {
    //         key Vehicle,
    //             VehType,
    //             VehId,
    //             VehNrtus,
    //             VolUom,
    //             WgtUom,
    //             DimUom,
    //             VehMaxwgt,
    //             VehMaxvol,
    //             CreDate,
    //             CreName,
    //             ChaDate,
    //             ChaName,
    //              head_toheadItem,
    //             head_toItems,
    //     };

    // entity Items_vehSet                   as
    //     projection on IQMSVEHICLE_CREATE_SRV.Items_vehSet {
    //         key Vehicle,
    //             TuNumber,
    //             SeqNmbr,
    //             CreDate,
    //             CreName,
    //             ChaDate,
    //             ChaName,
    //             TuText,
    //             TuNrcomps,
    //             TuMaxwgt,
    //             TuMaxvol,
    //             Updateflag
    //     };

    // entity headItemSet                    as
    //     projection on IQMSVEHICLE_CREATE_SRV.headItemSet {
    //             Language,
    //         key Vehicle,
    //             VehText
    //     };

    // new Billing Srv

    entity Invoice_createSet              as
        projection on IQMSBILLING_DOCUMENT_SRV.Invoice_createSet {
            key Vbeln,
                Posnr,
                Msgid,
                Msgty,
                Main_Invoice,
                to_items,
                invoice_numSet
        };

    entity Invoice_headerSet              as
        projection on IQMSBILLING_DOCUMENT_SRV.Invoice_headerSet {
                Vbeln,
            key Fkart,
                Fkdat
        };

    entity Invoice_itemSet                as
        projection on IQMSBILLING_DOCUMENT_SRV.Invoice_itemSet {
            key Vbeln,
                Posnr
        };

    entity deliverybillingdataSet         as
        projection on IQMSBILLING_DOCUMENT_SRV.deliverybillingdataSet {
            key Delivery,
                Parking,
                Vehicleno,
                VehType,
                Status,
                Shipmentno,
                GoodIssue
        };

    entity invoice_numSet                 as
        projection on IQMSBILLING_DOCUMENT_SRV.invoice_numSet {
            key Vbeln
        };

    entity xIQMSxBilling_fetch            as
        projection on IQMSBILLING_DOCUMENT_SRV.xIQMSxBilling_fetch {
            key ParkingNo,
            key VehicleNumber,
                SalesOrder,
                DeliveryNo,
                ShipmentNo,
                status,
                quantity,
                unit,
                vehicleType
        };

    // new shipment service with iQMS namespace
    entity PO_SHNUMBERSet                 as
        projection on IQMSSHIPMENT_CREATE_SRV.PO_SHNUMBERSet {
            key Shnumber,
                to_header,
                to_oigisi,
                to_oigisvd,
                to_return,
                to_oigisiq,
                to_oigisv,
                to_oigisvmq
        };

    entity PiOigisvSet                    as
        projection on IQMSSHIPMENT_CREATE_SRV.PiOigisvSet {
            key Vehicle,
                Lddate,
                Trip,
                VehScrel,
                Updateflag
        };

    entity PiOigisvdSet                   as
        projection on IQMSSHIPMENT_CREATE_SRV.PiOigisvdSet {
            key Vehicle,
                Drivercode,
                Updateflag
        };

    entity PiOigisvmqSet                  as
        projection on IQMSSHIPMENT_CREATE_SRV.PiOigisvmqSet {
            key Item,
                DocTyp,
            key DocNumber,
                Posnr,
                Vehicle,
                TuNumber,
                SeqNmbr,
                Trqty,
                Truom,
                TdAction,
                Matnr,
                Updateflag
        };

    entity pioigisSet                     as
        projection on IQMSSHIPMENT_CREATE_SRV.pioigisSet {
            key DocTyp,
                DocNumber,
                LoadIndi,
                DischIndi,
                Updateflag
        };

    // entity returnSet                      as
    //     projection on IQMSSHIPMENT_CREATE_SRV.returnSet {
    //         key Type,
    //             Id,
    //             Number,
    //             Message,
    //             LogNo,
    //             LogMsgNo
    //     };

    entity shipTasSet                     as
        projection on IQMSSHIPMENT_CREATE_SRV.shipTasSet {
            key Shipment,
                Material,
                Truckno,
                Tochkey,
                Rfid,
                Bayno,
                Newdate,
                Newtime,
                Errorcode,
                Errordefin,
                Createdby,
                Createddate,
                Createdtime,
                Changedby,
                Changeddate,
                Changedtime
        };

    entity ship_headerSet                 as
        projection on IQMSSHIPMENT_CREATE_SRV.ship_headerSet {
                Shnumber,
            key Shtype,
            key Tplst,
                Cfbll,
                Xblnr,
                SchedStdt,
                LoadStdt,
                Updateflag
        };

    entity xIQMSxshipTypeFetch            as
        projection on IQMSSHIPMENT_CREATE_SRV.xIQMSxshipTypeFetch {
            key delivery,
                ParkingNo,
                material,
                incoterm,
                division,
                VehicleNumber,
                SalesOrder,
                DeliveryNo,
                shipment_type
        };


    // new ValueHelp service

    entity xIQMSxTransport_n              as
        projection on IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxTransport_n {
            key Lifnr,
                Land1,
                Name1,
                Name2,
                Name3,
                Name4,
                Ort01
        };

    entity xIQMSxMaterial_n               as
        projection on IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxMaterial_n {
            key matnr,
                spart,
                vkorg,
                matkl,
                mtart,
                maktx,
                vtweg
        };

    entity xIQMSxcustomer_n               as
        projection on IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxcustomer_n {
            key Kunnr,
                Land1,
                Name1,
                Name2,
                Ort01
        };

    entity xIQMSxfetch_so                 as
        projection on IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxfetch_so {
            key Vbeln,
            key Posnr,
                Matnr,
                uom,
                Lfsta,
                CmtdDelivDate,
                CmtdDelivCreadate,
                OidShip,
                quantity
        };

    entity xIQMSxvehiclemaster            as
        projection on IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxvehiclemaster {
            key Vehicle,
                TuNumber,
                SeqNmbr,
                trquant,
                VehType,
                VehId,
                Carrier,
                VehNrtus,
                VolUom,
                WgtUom,
                DimUom,
                VehMaxwgt,
                VehUnlwgt,
                VehMaxvol,
                EquipNr,
                VehHeight,
                VehWidth,
                VehLength,
                Route,
                Tzone,
                RegOwner,
                GrpId,
                OwnFlag,
                Ballcap,
                FlBnkCapa,
                DslBnkCapa,
                CapUom,
                WtUom,
                AverageSpeed,
                AvrSpeedUom,
                DeckCapacity,
                DeckCapUom,
                ArrivalBuffer,
                DepartureBuffer,
                VehMail,
                VehPhone,
                Tppoint,
                VehStatus
        };

    entity xIQMSxPlants                   as
        projection on IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxPlants {
            key Plant,
                Plant_text
        };

    entity xIQMSxshipTas_valuehelp        as
        projection on IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxshipTas_valuehelp {
            key Shipment,
                Material,
                Truckno,
                Tochkey,
                Rfid,
                Bayno,
                Newdate,
                Newtime,
                Errorcode,
                Errordefin,
                Createdby,
                Createddate,
                Createdtime,
                Changedby,
                Changeddate,
                Changedtime
        };

    entity xIQMSxstodeliv                 as
        projection on IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxstodeliv {
            key sto,
            key Ebelp,
                Zekkn,
                Vgabe,
                Gjahr,
                Delivery
        }
     entity xIQMSxfetch_sto as projection on IQMSQUEUEMANAGE_VALUEHELP_SRV.xIQMSxfetch_sto
    {        key Sto, delivery,  Material, Plant, Quantity, Unit     }    

    // new Deleivery API

    entity Sales_orderItemsSet            as
        projection on IQMSCREATE_DELIVERY_SRV.Sales_orderItemsSet {
            key RefDoc,
                RefItem,
                DlvQty,
                SalesUnit
        };

    entity delivery_createSet             as
        projection on IQMSCREATE_DELIVERY_SRV.delivery_createSet {
            key DelivNumb,
            key NumDelivery,
                del_nav_items,
                del_nav_return
        };

    entity delivery_returnSet             as
        projection on IQMSCREATE_DELIVERY_SRV.delivery_returnSet {
            key Type,
            key Id,
            key Number,
                Message,
                LogNo,
                LogMsgNo,
                MessageV1,
                MessageV2,
                MessageV3,
                MessageV4,
                Parameter,
                Row,
                Field,
                System
        };
    // new Scheduling new API :

    entity So_order_partnerSet            as
        projection on IQMSCREATE_SO_SRV.So_order_partnerSet {
            key PartnRole,
            key PartnNumb
        };

    entity so_createSet                   as
        projection on IQMSCREATE_SO_SRV.so_createSet {
            key Vbeln,
                VehicleNumber,
                so_nav_head,
                so_nav_item,
                so_nav_schedule,
                so_nav_partner,
                so_nav_return
        };

    entity so_headerSet                   as
        projection on IQMSCREATE_SO_SRV.so_headerSet {
            key DocType,
            key SalesOrg,
            key DistrChan,
            key Division,
                PurchNoC,
                DocDate
        };

    entity so_orderitemSet                as
        projection on IQMSCREATE_SO_SRV.so_orderitemSet {
            key ItmNumber,
                Material,
                Plant,
                StoreLoc
        };

    entity so_returnSet                   as
        projection on IQMSCREATE_SO_SRV.so_returnSet {
            key Type,
            key Id,
                Number,
                Message,
                LogNo,
                LogMsgNo,
                MessageV1,
                MessageV2,
                MessageV3,
                MessageV4,
                Parameter,
                Row,
                Field,
                System
        };

    entity so_schedulesINSet              as
        projection on IQMSCREATE_SO_SRV.so_schedulesINSet {
            key ItmNumber,
                ReqQty
        }

    // new iQMS Parking HeaderSet

    entity Park_headerSet2                as
        projection on IQMSPARKING_SRV.Park_headerSet {
                PlantText,
                Shiptoparty,
                Driver,
            key ParkingNo,
                Plant,
                Description,
                Cleaner,
                ParkingGate,
                Soldtoparty,
                ParkingArea,
                VehicleNumber,
                Purpose,
                Destination,
                TransportCode,
                Status,
                Product,
                TruckType,
                Createdby,
                Createddate,
                Createdtime,
                Changedby,
                Changeddate,
                Changedtime,
                park_assocations
        };

    entity park_itemSet2                  as
        projection on IQMSPARKING_SRV.park_itemSet {
            key ParkingNo,
                Stodate,
                EntryDate,
                Stotime,
                EntryTime,
                ExitDate,
                ExitTime,
                SecClearDate,
                SecClearTime,
                SecFailedDate,
                SecFailedTime,
                LanDate,
                LanTime,
                LoadingDate,
                LoadingTime,
                BilledDate,
                BilledTime,
                Salesorderdate,
                Salesordertime,
                Deliverydate,
                Deliverytime,
                Createdby,
                Createddate,
                Createdtime,
                Changedby,
                Changeddate,
                Changedtime
        };

    entity xIQMSxparking_cds              as
        projection on IQMSPARKING_SRV.xIQMSxparking_cds {
            key ParkingNo,
                ParkingGate,
                ParkingArea,
                VehicleNumber,
                Purpose,
                Destination,
                Shiptoparty,
                Description,
                Soldtoparty,
                TransportCode,
                Status,
                Product,
                TruckType,
                Createdby,
                Createddate,
                Createdtime,
                Changedby,
                Changeddate,
                Changedtime
        };
    // new scheduling

    entity SchedulingSet                  as
        projection on IQMSSCHEDULING_SRV.SchedulingSet {
                Parkingno,
                DeliveryNo,
                Plant,
                ShipmentNo,
                PlantText,
            key SalesOrder,
                Soldtoparty,
                BillingNo,
            key Stockorder,
                Startdate,
                Enddate,
                Starttime,
                Endtime,
                Material,
                Quantity,
                Uom,
                Bayno,
                Shiptoparty,
                Vehicleno,
                Driver,
                Cleaner,
                Createdby,
                Createddate,
                Createdtime,
                Changedby,
                Changeddate,
                Changedtime
        };

    entity xIQMSxscheduling_cds           as
        projection on IQMSSCHEDULING_SRV.xIQMSxscheduling_cds {
            key SalesOrder,
            key Stockorder,
                Parkingno,
                Startdate,
                Enddate,
                Starttime,
                Endtime,
                Material,
                Quantity,
                Uom,
                Bayno,
                Plant,
                PlantText,
                Soldtoparty,
                Shiptoparty,
                Vehicleno,
                Driver,
                Cleaner,
                DeliveryNo,
                ShipmentNo,
                BillingNo,
                Createdby,
                Createddate,
                Createdtime,
                Changedby,
                Changeddate,
                Changedtime
        }


    entity Items_vehSet                   as
        projection on IRMSVEHICLE_CREATE_SRV.Items_vehSet {
            key Vehicle,
                TuNumber,
                SeqNmbr,
                CreDate,
                CreName,
                ChaDate,
                ChaName,
                TuText,
                TuNrcomps,
                TuMaxwgt,
                TuMaxvol,
                Updateflag
        };

    entity headItemSet                    as
        projection on IRMSVEHICLE_CREATE_SRV.headItemSet {
                Language,
            key Vehicle,
                VehText
        };

    entity header_vehSet                  as
        projection on IRMSVEHICLE_CREATE_SRV.header_vehSet {
            key Vehicle,
                head_toheadItem,
                head_toItems,
                VehType,
                VehId,
                VehNrtus,
                VolUom,
                WgtUom,
                DimUom,
                VehMaxwgt,
                VehMaxvol,
                CreDate,
                CreName,
                ChaDate,
                ChaName
        }

    entity fetchVehType                   as select from xIQMSxvehiclemaster;
    // entity fetchVehType                   as select from xIRMSxvehiclemaster;

    // entity xIRMSxvehiclemaster            as
    //     projection on IRMSQUEQE_MANAGEMENT_SRV.xIRMSxvehiclemaster {
    //         key Vehicle,
    //             TuNumber,
    //             SeqNmbr,
    //             trquant,
    //             VehType,
    //             VehId,
    //             Carrier,
    //             VehNrtus,
    //             VolUom,
    //             WgtUom,
    //             DimUom,
    //             VehMaxwgt,
    //             VehUnlwgt,
    //             VehMaxvol,
    //             EquipNr,
    //             VehHeight,
    //             VehWidth,
    //             VehLength,
    //             Route,
    //             Tzone,
    //             RegOwner,
    //             GrpId,
    //             OwnFlag,
    //             Ballcap,
    //             FlBnkCapa,
    //             DslBnkCapa,
    //             CapUom,
    //             WtUom,
    //             AverageSpeed,
    //             AvrSpeedUom,
    //             DeckCapacity,
    //             DeckCapUom,
    //             ArrivalBuffer,
    //             DepartureBuffer,
    //             VehMail,
    //             VehPhone,
    //             Tppoint,
    //             VehStatus
    //     };

    // entity xIRMSxfetchso                  as
    //     projection on IRMSQUEQE_MANAGEMENT_SRV.xIRMSxfetchso {
    //         key Vbeln,
    //         key Posnr,
    //             Matnr,
    //             uom,
    //             Lfsta,
    //             CmtdDelivDate,
    //             CmtdDelivCreadate,
    //             OidShip,
    //             quantity
    //     }

    entity xIRMSxvehicle_defination       as projection on IRMSQUEQE_MANAGEMENT_SRV.xIRMSxvehicle_defination;

    entity headerSet                      as
        projection on IRMSQUEQE_MANAGEMENT_SRV.headerSet {
            key Drivercode,
                head_toitemdriver,
                Perscode,
                FirstName,
                LastName,
                Carrier,
                Drvstatus,
                CreDate,
                CreName,
                ChaDate,
                ChaName,
                DrvXblck,
                StatusTxt,
                LChaDate,
                LChaName,
                Updateflag
        };


    entity item_DriverSet                 as
        projection on IRMSQUEQE_MANAGEMENT_SRV.item_DriverSet {
            key Drivercode,
                Licensetyp,
                Licenseno,
                ValidFrom,
                ValidTo,
                CreDate,
                CreName,
                ChaDate,
                ChaName,
                Licensetxt,
                Checkbox,
                Updateflag
        };


    entity xIRMSxDriverLicence            as
        projection on IRMSQUEQE_MANAGEMENT_SRV.xIRMSxDriverLicence {
            key Drivercode,
            key Licensetyp,
            key Licenseno,
                Perscode,
                FirstName,
                LastName,
                Carrier,
                Drvstatus,
                CreDate,
                CreName,
                ChaDate,
                ChaName,
                DrvXblck,
                ValidFrom,
                ValidTo,
                liCreDate,
                liCreName,
                liChaDate,
                liChaName
        }

    entity oigcc_tabSet                   as
        projection on IRMSTRANSPORT_CREATE_SRV.oigcc_tabSet {
            key TuNumber,
                ComNumber,
                SeqNmbr,
                CmpMaxvol,
                ComIdtext,
                CreName,
                CreDate,
                ChaName,
                ChaDate
        };

    entity oigctSet                       as
        projection on IRMSTRANSPORT_CREATE_SRV.oigctSet {
            key Language,
                TuNumber,
                TuText
        };

    entity trans_headerSet                as
        projection on IRMSTRANSPORT_CREATE_SRV.trans_headerSet {
            key TuNumber,
                TuType,
                header_toOigcc,
                transhead_gct,
                WgtUom,
                TuId,
                TuNrcomps,
                TuMaxwgt,
                TuMaxvol,
                VolUom,
                CreName,
                CreDate,
                ChaDate
        }



    entity A_SalesOrder                   as
        projection on IRMSZAPI_SALES_ORDER_SRV.A_SalesOrder {
            key SalesOrder,
                SalesOrderType,
                SalesOrganization,
                DistributionChannel,
                OrganizationDivision,
                SalesGroup,
                SalesOffice,
                SalesDistrict,
                SoldToParty,
                CreationDate,
                CreatedByUser,
                LastChangeDate,
                LastChangeDateTime,
                PurchaseOrderByCustomer,
                CustomerPurchaseOrderType,
                CustomerPurchaseOrderDate,
                SalesOrderDate,
                TotalNetAmount,
                TransactionCurrency,
                SDDocumentReason,
                PricingDate,
                RequestedDeliveryDate,
                ShippingCondition,
                CompleteDeliveryIsDefined,
                ShippingType,
                HeaderBillingBlockReason,
                DeliveryBlockReason,
                IncotermsClassification,
                IncotermsTransferLocation,
                IncotermsLocation1,
                IncotermsLocation2,
                IncotermsVersion,
                CustomerPaymentTerms,
                PaymentMethod,
                AssignmentReference,
                ReferenceSDDocument,
                ReferenceSDDocumentCategory,
                CustomerTaxClassification1,
                TaxDepartureCountry,
                VATRegistrationCountry,
                SalesOrderApprovalReason,
                SalesDocApprovalStatus,
                OverallSDProcessStatus,
                TotalCreditCheckStatus,
                OverallTotalDeliveryStatus,
                OverallSDDocumentRejectionSts,
                to_Item
        }

    entity A_SalesOrderHeaderPartner      as projection on IRMSZAPI_SALES_ORDER_SRV.A_SalesOrderHeaderPartner;
    entity A_SalesOrderHeaderPrElement    as projection on IRMSZAPI_SALES_ORDER_SRV.A_SalesOrderHeaderPrElement;

    entity A_SalesOrderItem               as
        projection on IRMSZAPI_SALES_ORDER_SRV.A_SalesOrderItem {
            key SalesOrder,
            key SalesOrderItem,
                HigherLevelItem,
                SalesOrderItemCategory,
                SalesOrderItemText,
                PurchaseOrderByCustomer,
                Material,
                MaterialByCustomer,
                PricingDate,
                RequestedQuantity,
                RequestedQuantityUnit,
                ItemGrossWeight,
                ItemNetWeight,
                ItemWeightUnit,
                ItemVolume,
                ItemVolumeUnit,
                TransactionCurrency,
                NetAmount,
                MaterialGroup,
                MaterialPricingGroup,
                Batch,
                ProductionPlant,
                StorageLocation,
                DeliveryGroup,
                ShippingPoint,
                ShippingType,
                DeliveryPriority,
                IncotermsClassification,
                IncotermsTransferLocation,
                IncotermsLocation1,
                IncotermsLocation2,
                CustomerPaymentTerms,
                SalesDocumentRjcnReason,
                ItemBillingBlockReason,
                WBSElement,
                ProfitCenter,
                ReferenceSDDocument,
                ReferenceSDDocumentItem,
                SDProcessStatus,
                DeliveryStatus,
                OrderRelatedBillingStatus,
                RequirementSegment
        }

    entity A_SalesOrderItemPartner        as projection on IRMSZAPI_SALES_ORDER_SRV.A_SalesOrderItemPartner;
    entity A_SalesOrderItemPrElement      as projection on IRMSZAPI_SALES_ORDER_SRV.A_SalesOrderItemPrElement;
    entity A_SalesOrderItemText           as projection on IRMSZAPI_SALES_ORDER_SRV.A_SalesOrderItemText;
    entity A_SalesOrderScheduleLineFoo    as projection on IRMSZAPI_SALES_ORDER_SRV.A_SalesOrderScheduleLine;
    entity A_SalesOrderText               as projection on IRMSZAPI_SALES_ORDER_SRV.A_SalesOrderText;
    entity A_SlsOrdPaymentPlanItemDetails as projection on IRMSZAPI_SALES_ORDER_SRV.A_SlsOrdPaymentPlanItemDetails;

    entity Park_headerSet                 as
        projection on IRMSPARKING_NO_SRV.Park_headerSet {
            key ParkingNo,
                Shiptoparty,
                Destination,
                ParkingGate,
                ParkingArea,
                VehicleNumber,
                ParkingDate,
                DriverName,
                CleanerName,
                Purpose,
                TransportCode,
                CustomerCode,
                Product,
                TruckType,
                park_navigation
        };

    entity fetchParkingData               as select from Park_headerSet;


    entity park_itemSet                   as
        projection on IRMSPARKING_NO_SRV.park_itemSet {
                EntryDate,
                Salesorderdate,
            key ParkingNo,
                Salesordertime,
                Status,
                Deliverydate,
                EntryTime,
                Deliverytime,
                ExitDate,
                ExitTime,
                SecClearDate,
                SecClearTime,
                SecFailedDate,
                SecFailedTime,
                LanDate,
                LoadingTime,
                BilledTime,
                LanTime,
                LoadingDate,
                BilledDate
        }


    // entity Sales_orderItemsSet            as
    //     projection on IRMSCREATE_DELIVERY_SRV.Sales_orderItemsSet {
    //         key RefDoc,
    //             RefItem,
    //             DlvQty,
    //             SalesUnit
    //     };

    // entity delivery_createSet             as
    //     projection on IRMSCREATE_DELIVERY_SRV.delivery_createSet {
    //         key DelivNumb,
    //         key NumDelivery,
    //             del_nav_items,
    //             del_nav_return
    //     };

    // entity delivery_returnSet             as
    //     projection on IRMSCREATE_DELIVERY_SRV.delivery_returnSet {
    //         key Type,
    //         key Id,
    //         key Number,
    //             Message,
    //             LogNo,
    //             LogMsgNo,
    //             MessageV1,
    //             MessageV2,
    //             MessageV3,
    //             MessageV4,
    //             Parameter,
    //             Row,
    //             Field,
    //             System
    //     };


    // entity PO_SHNUMBERSet                 as
    //     projection on IRMSSHIPMENT_CREATE_SRV.PO_SHNUMBERSet {
    //         key Shnumber,
    //             to_header,
    //             to_oigisi,
    //             to_oigisvd,
    //             to_return,
    //             to_oigisiq,
    //             to_oigisv,
    //             to_oigisvmq
    //     };

    // entity shipTasSet                     as
    //     projection on IRMSSHIPMENT_CREATE_SRV.shipTasSet {
    //         key Shipment,
    //             Material,
    //             Truckno,
    //             Tochkey,
    //             Rfid,
    //             Bayno,
    //             Newdate,
    //             Newtime,
    //             Errorcode,
    //             Errordefin
    //     }

    // entity PiOigisiqSet                   as
    //     projection on IRMSSHIPMENT_CREATE_SRV.PiOigisiqSet {
    //             DocTyp,
    //         key DocNumber,
    //             Posnr,
    //             Trqty,
    //             Oifinal,
    //             Updateflag,
    //             DocTypLong
    //     };

    // entity PiOigisvSet                    as
    //     projection on IRMSSHIPMENT_CREATE_SRV.PiOigisvSet {
    //         key Vehicle,
    //             Lddate,
    //             Trip,
    //             VehScrel,
    //             Updateflag
    //     };

    // entity PiOigisvdSet                   as
    //     projection on IRMSSHIPMENT_CREATE_SRV.PiOigisvdSet {
    //         key Vehicle,
    //             Drivercode,
    //             Updateflag
    //     };

    // entity PiOigisvmqSet                  as
    //     projection on IRMSSHIPMENT_CREATE_SRV.PiOigisvmqSet {
    //         key Item,
    //             DocTyp,
    //         key DocNumber,
    //             Posnr,
    //             Vehicle,
    //             TuNumber,
    //             SeqNmbr,
    //             Trqty,
    //             Truom,
    //             TdAction,
    //             Matnr,
    //             Updateflag
    //     };

    // entity pioigisSet                     as
    //     projection on IRMSSHIPMENT_CREATE_SRV.pioigisSet {
    //         key DocTyp,
    //             DocNumber,
    //             LoadIndi,
    //             DischIndi,
    //             Updateflag
    //     };

    // entity returnSet                      as
    //     projection on IRMSSHIPMENT_CREATE_SRV.returnSet {
    //         key Type,
    //             Id,
    //             Number,
    //             Message,
    //             LogNo,
    //             LogMsgNo
    //     };

    // entity ship_headerSet                 as
    //     projection on IRMSSHIPMENT_CREATE_SRV.ship_headerSet {
    //             Shnumber,
    //         key Shtype,
    //         key Tplst,
    //             Cfbll,
    //             Xblnr,
    //             SchedStdt,
    //             LoadStdt,
    //             Updateflag
    //     }


    function ExitScreen()                                                                                                                                                                                                                                   returns array of {
        ParkingNo : String;
        VehicleNumber : String;
        vehicleType : String;
        VehicleDefination : String;
        Status : String;
        DeliveryNo : String;
        ShipmentNo : String;
        quantity : Decimal(10, 2);

    };
    // ****************  functions for CreateParking screen   START ********

    function getVehMaxvol(Vehicle : String)                                                                                                                                                                                                                 returns array of {
        VehMaxvol : String;
    };

    function getVehicle(Vehicle : String)                                                                                                                                                                                                                   returns array of {
        Vehicle : String;
    };

    function getMaxParkingNo()                                                                                                                                                                                                                              returns array of {
        maxParkingNo : String;
    };

    function checkVehicleBeforeSubmitParking(Vehicle : String, VehicleDef : String)                                                                                                                                                                         returns array of {
        VehicleType : String;
        isVehicleMatched : Boolean;
        isVehicleInRefinary : Boolean;
    };

    function fetchCustomerData(Kunnr : String)                                                                                                                                                                                                              returns array of {
        ShipToName : String; //  for Name1 field

        Destination : String // for Ort01 field

    };

    // ***************    createParking screen fn's END ******************

    // **************  Parking List ( security clearance )  fn's start******************

    function getCustomizedParkingData(ParkingNo : String)                                                                                                                                                                                                   returns array of {

        ParkingNo : String;
        VehicleNumber : String;
        TruckType : String;
        Product : String;
        Status : String;
        VehicleDefination : String
    };

    // **************  Parking List ( security clearance )  fn's   END ******************

    //  Security clearance - Home Screen     Handlers START ***************************
    function getParkingNoData(ParkingNo : String)                                                                                                                                                                                                           returns array of {

        ParkingNo : String;
        VehicleNo : String;
        VehicleType : String;
        Product : String;
        VehicleStaus : String;
        ParkingGate : String;
        ParkingArea : String;
    };

    // **************  Security Check List  fn's                  START   ******************
    function getCheckListData(ParkingNo : String, VehicleNumber : String, TruckTypeDef : String, TruckType : String)                                                                                                                                        returns array of {
        Id : String;
        Remarks : String;
        pass : String;
        fail : String;
    };

    // **************  Security Check List  fn's                  END******************


    function getfromMaterial(matnr : String)                                                                                                                                                                                                                returns array of {
        matnr : String;
        spart : String;
        vkorg : String;
        vtweg : String
    };

    function fetchSo(Matnr : String, OidShip : String)                                                                                                                                                                                                      returns array of {
        Vbeln : String;
        Matnr : String;
        OidShip : String;
    };


    function LiquidScreen()                                                                                                                                                                                                                                 returns array of {
        ParkingNo : String;
        Shiptoparty : String;
        Destination : String;
        ParkingGate : String;
        ParkingArea : String;
        VehicleNumber : String;
        ParkingDate : String;
        DriverName : String;
        CleanerName : String;
        Purpose : String;
        TransportCode : String;
        CustomerCode : String;
        Product : String;
        TruckType : String;
        Status : String;
        VehicleDefination : String;
        ShipmentNo : String;
        DeliveryNo : String;
        SalesOrder : String
    };

    function SolidScreen()                                                                                                                                                                                                                                  returns array of {
        ParkingNo : String;
        Shiptoparty : String;
        Destination : String;
        ParkingGate : String;
        ParkingArea : String;
        VehicleNumber : String;
        ParkingDate : String;
        DriverName : String;
        CleanerName : String;
        Purpose : String;
        TransportCode : String;
        CustomerCode : String;
        Product : String;
        TruckType : String;
        Status : String;
        VehicleDefination : String;
        ShipmentNo : String;
        DeliveryNo : String;
        SalesOrder : String
    };

    function GasScreen()                                                                                                                                                                                                                                    returns array of {
        ParkingNo : String;
        Shiptoparty : String;
        Destination : String;
        ParkingGate : String;
        ParkingArea : String;
        VehicleNumber : String;
        ParkingDate : String;
        DriverName : String;
        CleanerName : String;
        Purpose : String;
        TransportCode : String;
        CustomerCode : String;
        Product : String;
        TruckType : String;
        Status : String;
        VehicleDefination : String;
        ShipmentNo : String;
        DeliveryNo : String;
        SalesOrder : String
    };

    function MaterialScreen()                                                                                                                                                                                                                               returns array of {
        ParkingNo : String;
        Shiptoparty : String;
        Destination : String;
        ParkingGate : String;
        ParkingArea : String;
        VehicleNumber : String;
        ParkingDate : String;
        DriverName : String;
        CleanerName : String;
        Purpose : String;
        TransportCode : String;
        CustomerCode : String;
        Product : String;
        TruckType : String;
        Status : String;
        VehicleDefination : String;
        ShipmentNo : String;
        DeliveryNo : String;
        SalesOrder : String
    };


    function BillingInvoice()                                                                                                                                                                                                                               returns array of {
        ParkingNo : String;
        VehicleNumber : String;
        vehicleType : String;
        VehicleDefinition : String;
        Status : String;
        DeliveryNo : String;
        ShipmentNo : String;
        quantity : Decimal;
    };

    // fetch sto details
    function fetchSTO()                                                                                                                                                                                                                                     returns array of {
        PurchaseOrder : String;
        CompanyCode : String;
        OrderQuantity : String;
        PurchaseOrderQuantityUnit : String;
        Material : String
    };


    // entity Invoice_createSet              as
    //     projection on IRMSBILLING_DOCUMENT_SRV.Invoice_createSet {
    //         key Vbeln,
    //             Posnr,
    //             Msgid,
    //             Msgty,
    //             Main_Invoice,
    //             to_items,
    //             invoice_numSet
    //     };

    // entity Invoice_headerSet              as
    //     projection on IRMSBILLING_DOCUMENT_SRV.Invoice_headerSet {
    //             Vbeln,
    //         key Fkart,
    //             Fkdat
    //     };

    // entity Invoice_itemSet                as
    //     projection on IRMSBILLING_DOCUMENT_SRV.Invoice_itemSet {
    //         key Vbeln,
    //             Posnr
    //     };

    // entity deliverybillingdataSet         as
    //     projection on IRMSBILLING_DOCUMENT_SRV.deliverybillingdataSet {
    //         key Delivery,
    //             Parking,
    //             Vehicleno,
    //             VehType,
    //             Status,
    //             Shipmentno,
    //             GoodIssue
    //     };

    // entity invoice_numSet                 as
    //     projection on IRMSBILLING_DOCUMENT_SRV.invoice_numSet {
    //         key Vbeln
    //     };

    // entity xIRMSxbilling_fetch            as
    //     projection on IRMSBILLING_DOCUMENT_SRV.xIRMSxbilling_fetch {
    //         key ParkingNo,
    //         key VehicleNumber,
    //         key mblnr,
    //             SalesOrder,
    //             DeliveryNo,
    //             ShipmentNo,
    //             status,
    //             unit,
    //             vehicleType,
    //             mjahr,
    //             zeile,
    //             quantity,
    //             msehi
    //     }


    entity BayAllocation                  as projection on my.BayAllocation;
    entity Calender                       as projection on my.Calender;
    entity Bay                            as projection on my.Bay;
    action   CustomerTransporterEMail(salesOrder : String, Stockorder : String, custORTrans : String, bays : String, fromDateTime : DateTime, toDateTime : DateTime, email : String, message : String, Quantity : String, unit : String, material : String) returns String;


}
