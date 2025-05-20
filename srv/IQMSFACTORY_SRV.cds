using IQMSFACTORY_SRV from './external/IQMSFACTORY_SRV.cds';

service IQMSFACTORY_SRVSampleService {
    
    entity PARKST_FACSet as projection on IQMSFACTORY_SRV.PARKST_FACSet
    {        key Parkingno, Vehicleno, SalesOrder, Stockorder, Startdate, Starttime, Material, Quantity, Uom, Bayno, Plant, PlantText, Soldtoparty, DeliveryNo, DelivDate, DelivTime, ShipmentNo, ShipDate, ShipTime, BillingNo, BillDate, BillTime, Goodsissue, GiDate, GiTime, Goodsreceipt, GrDate, GrTime, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     }    
;
    
    entity Park_facSet as projection on IQMSFACTORY_SRV.Park_facSet
    {        key ParkDate, key ParkTime, key ParkingNo, ParkingGate, ParkingArea, VehicleNumber, Status, StatusDesc, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     }    
;
    
    entity ScheduleFacSet as projection on IQMSFACTORY_SRV.ScheduleFacSet
    {        Bayno, key SalesOrder, key Stockorder, Startdate, Enddate, Starttime, Endtime, Vehicleno, Driver, Cleaner, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     }    
;
}