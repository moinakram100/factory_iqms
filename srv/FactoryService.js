const cds = require('@sap/cds');
// const { sendMail } = require("@sap-cloud-sdk/mail-client");
const { SELECT, where } = require('@sap/cds/lib/ql/cds-ql');
const { header } = require('express/lib/request');
const nodemailer = require('nodemailer');
// require('dotenv').config();

module.exports = async (srv) => {
    // Using CDS API  
    // stoDelivery
    const IQMSSTO_DELIVERY_SRV = await cds.connect.to("IQMSSTO_DELIVERY_SRV");
    srv.on('READ', 'CreatedItemsSet', req => IQMSSTO_DELIVERY_SRV.run(req.query));
    srv.on('READ', 'DeliveriesSet', req => IQMSSTO_DELIVERY_SRV.run(req.query));
    srv.on('READ', 'ReturnSetStoDel', req => IQMSSTO_DELIVERY_SRV.run(req.query));
    srv.on('READ', 'stodeliverySet', req => IQMSSTO_DELIVERY_SRV.run(req.query));
    srv.on('CREATE', 'stodeliverySet', req => IQMSSTO_DELIVERY_SRV.run(req.query));
    srv.on('READ', 'StockTransItemsSet', req => IQMSSTO_DELIVERY_SRV.run(req.query));

    const ZAPI_PURCHASEORDER_PROCESS_SRV = await cds.connect.to("ZAPI_PURCHASEORDER_PROCESS_SRV");
    srv.on('READ', 'A_PurOrdAccountAssignment', req => ZAPI_PURCHASEORDER_PROCESS_SRV.run(req.query));
    srv.on('READ', 'A_PurOrdPricingElement', req => ZAPI_PURCHASEORDER_PROCESS_SRV.run(req.query));
    srv.on('READ', 'A_PurchaseOrder', req => ZAPI_PURCHASEORDER_PROCESS_SRV.run(req.query));
    srv.on('READ', 'A_PurchaseOrderItem', req => ZAPI_PURCHASEORDER_PROCESS_SRV.run(req.query));
    srv.on('READ', 'A_PurchaseOrderScheduleLine', req => ZAPI_PURCHASEORDER_PROCESS_SRV.run(req.query));


    const IQMSSTOCK_ORDER_SRV = await cds.connect.to("IQMSSTOCK_ORDER_SRV");
    srv.on('READ', 'PoitemSet', req => IQMSSTOCK_ORDER_SRV.run(req.query));
    srv.on('READ', 'PoitemxSet', req => IQMSSTOCK_ORDER_SRV.run(req.query));
    srv.on('READ', 'PoschedulexSet', req => IQMSSTOCK_ORDER_SRV.run(req.query));
    srv.on('READ', 'ReturnSet', req => IQMSSTOCK_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'PoitemSet', req => IQMSSTOCK_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'PoitemxSet', req => IQMSSTOCK_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'PoschedulexSet', req => IQMSSTOCK_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'ReturnSet', req => IQMSSTOCK_ORDER_SRV.run(req.query));
    srv.on('READ', 'stocreateSet', req => IQMSSTOCK_ORDER_SRV.run(req.query));
    srv.on('READ', 'stoheaderSet', req => IQMSSTOCK_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'stocreateSet', req => IQMSSTOCK_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'stoheaderSet', req => IQMSSTOCK_ORDER_SRV.run(req.query));



    const IQMSBILLING_DOCUMENT_SRV = await cds.connect.to("IQMSBILLING_DOCUMENT_SRV");
    srv.on('READ', 'Invoice_createSet', req => IQMSBILLING_DOCUMENT_SRV.run(req.query));
    srv.on('CREATE', 'Invoice_createSet', req => IQMSBILLING_DOCUMENT_SRV.run(req.query));
    srv.on('READ', 'Invoice_headerSet', req => IQMSBILLING_DOCUMENT_SRV.run(req.query));
    srv.on('READ', 'Invoice_itemSet', req => IQMSBILLING_DOCUMENT_SRV.run(req.query));
    srv.on('READ', 'deliverybillingdataSet', req => IQMSBILLING_DOCUMENT_SRV.run(req.query));
    srv.on('READ', 'invoice_numSet', req => IQMSBILLING_DOCUMENT_SRV.run(req.query));
    srv.on('READ', 'xIQMSxBilling_fetch', req => IQMSBILLING_DOCUMENT_SRV.run(req.query));

    const IQMSSHIPMENT_CREATE_SRV = await cds.connect.to("IQMSSHIPMENT_CREATE_SRV");
    srv.on('READ', 'PO_SHNUMBERSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('READ', 'PiOigisiqSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('READ', 'PiOigisvSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('READ', 'PiOigisvdSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('READ', 'PiOigisvmqSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('READ', 'pioigisSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('READ', 'returnSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('READ', 'shipTasSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('READ', 'ship_headerSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'PO_SHNUMBERSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'PiOigisiqSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'PiOigisvSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'PiOigisvdSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'PiOigisvmqSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'pioigisSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'returnSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'shipTasSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'ship_headerSet', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));
    srv.on('READ', 'xIQMSxshipTypeFetch', req => IQMSSHIPMENT_CREATE_SRV.run(req.query));


    const IQMSQUEUEMANAGE_VALUEHELP_SRV = await cds.connect.to("IQMSQUEUEMANAGE_VALUEHELP_SRV");
    srv.on('READ', 'xIQMSxTransport_n', req => IQMSQUEUEMANAGE_VALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xIQMSxMaterial_n', req => IQMSQUEUEMANAGE_VALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xIQMSxcustomer_n', req => IQMSQUEUEMANAGE_VALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xIQMSxfetch_so', req => IQMSQUEUEMANAGE_VALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xIQMSxPlants', req => IQMSQUEUEMANAGE_VALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xIQMSxvehiclemaster', req => IQMSQUEUEMANAGE_VALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xIQMSxshipTas_valuehelp', req => IQMSQUEUEMANAGE_VALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xIQMSxstodeliv', req => IQMSQUEUEMANAGE_VALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xIQMSxfetch_sto', req => IQMSQUEUEMANAGE_VALUEHELP_SRV.run(req.query));
    srv.on('READ', 'xIQMSxschfac_fetch', req => IQMSQUEUEMANAGE_VALUEHELP_SRV.run(req.query));
    srv.on('READ', 'PARKST_FACSet', req => IQMSFACTORY_SRV.run(req.query)); 
    srv.on('READ', 'Park_facSet', req => IQMSFACTORY_SRV.run(req.query));
    srv.on('CREATE', 'Park_facSet', req => IQMSFACTORY_SRV.run(req.query));

    // new delivery api 


    const IQMSCREATE_DELIVERY_SRV = await cds.connect.to("IQMSCREATE_DELIVERY_SRV");
    srv.on('READ', 'Sales_orderItemsSet', req => IQMSCREATE_DELIVERY_SRV.run(req.query));
    srv.on('READ', 'delivery_createSet', req => IQMSCREATE_DELIVERY_SRV.run(req.query));
    srv.on('READ', 'delivery_returnSet', req => IQMSCREATE_DELIVERY_SRV.run(req.query));
    srv.on('CREATE', 'Sales_orderItemsSet', req => IQMSCREATE_DELIVERY_SRV.run(req.query));
    srv.on('CREATE', 'delivery_createSet', req => IQMSCREATE_DELIVERY_SRV.run(req.query));
    srv.on('CREATE', 'delivery_returnSet', req => IQMSCREATE_DELIVERY_SRV.run(req.query));

    // new sales Order
    const IQMSCREATE_SO_SRV = await cds.connect.to("IQMSCREATE_SO_SRV");
    srv.on('READ', 'So_order_partnerSet', req => IQMSCREATE_SO_SRV.run(req.query));
    srv.on('READ', 'so_createSet', req => IQMSCREATE_SO_SRV.run(req.query));
    srv.on('READ', 'so_headerSet', req => IQMSCREATE_SO_SRV.run(req.query));
    srv.on('READ', 'so_orderitemSet', req => IQMSCREATE_SO_SRV.run(req.query));
    srv.on('READ', 'so_returnSet', req => IQMSCREATE_SO_SRV.run(req.query));
    srv.on('READ', 'so_schedulesINSet', req => IQMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'So_order_partnerSet', req => IQMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'so_createSet', req => IQMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'so_headerSet', req => IQMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'so_orderitemSet', req => IQMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'so_returnSet', req => IQMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'so_schedulesINSet', req => IQMSCREATE_SO_SRV.run(req.query));

    // new parking Headet set and itemSet
    const IQMSPARKING_SRV = await cds.connect.to("IQMSPARKING_SRV");
    srv.on('READ', 'Park_headerSet2', req => IQMSPARKING_SRV.run(req.query));
    srv.on('CREATE', 'Park_headerSet2', req => IQMSPARKING_SRV.run(req.query));
    srv.on('UPDATE', 'Park_headerSet2', req => { IQMSPARKING_SRV.run(req.query) });
    srv.on('READ', 'park_itemSet2', req => IQMSPARKING_SRV.run(req.query));
    srv.on('CREATE', 'park_itemSet2', req => IQMSPARKING_SRV.run(req.query));
    srv.on('UPDATE', 'park_itemSet2', req => { IQMSPARKING_SRV.run(req.query) });

    srv.on('READ', 'xIQMSxparking_cds', req => IQMSPARKING_SRV.run(req.query));


    // New Scheduling API - by Deepanshu
    const IQMSSCHEDULING_SRV = await cds.connect.to("IQMSSCHEDULING_SRV");
    // srv.on('READ', 'SchedulingSet',  req =>  IQMSSCHEDULING_SRV.run(req.query)); 
    srv.on('READ', 'SchedulingSet', async (req) => {
        try {
            console.log("called");

            return await IQMSSCHEDULING_SRV.run(req.query);
        } catch (err) {
            console.error("READ error for SchedulingSet:", err.message || err);
            req.error(502, "Failed to fetch SchedulingSet data from S/4 system. Please check the configuration.");
        }
    });
    srv.on('CREATE', 'SchedulingSet', req => IQMSSCHEDULING_SRV.run(req.query));
    srv.on('UPDATE', 'SchedulingSet', req => { IQMSSCHEDULING_SRV.run(req.query) });
    srv.on('DELETE', 'SchedulingSet', req => { IQMSSCHEDULING_SRV.run(req.query) });
    // cds for Scheduling to ready only
    srv.on('READ', 'xIQMSxscheduling_cds', req => IQMSSCHEDULING_SRV.run(req.query));


    const IRMSQUEQE_MANAGEMENT_SRV = await cds.connect.to("IRMSQUEQE_MANAGEMENT_SRV");
    // srv.on('READ', 'xIRMSxmaterial', req => IRMSQUEQE_MANAGEMENT_SRV.run(req.query));

    srv.on('READ', 'headerSet', req => IRMSQUEQE_MANAGEMENT_SRV.run(req.query));
    srv.on('CREATE', 'headerSet', req => IRMSQUEQE_MANAGEMENT_SRV.run(req.query));
    srv.on('UPDATE', 'headerSet', req => IRMSQUEQE_MANAGEMENT_SRV.run(req.query));
    srv.on('READ', 'item_DriverSet', req => IRMSQUEQE_MANAGEMENT_SRV.run(req.query));
    srv.on('CREATE', 'item_DriverSet', req => IRMSQUEQE_MANAGEMENT_SRV.run(req.query));
    srv.on('UPDATE', 'item_DriverSet', req => IRMSQUEQE_MANAGEMENT_SRV.run(req.query));
    srv.on('READ', 'xIRMSxDriverLicence', req => IRMSQUEQE_MANAGEMENT_SRV.run(req.query));

    srv.on('READ', 'xIRMSxvehicle_defination', req => IRMSQUEQE_MANAGEMENT_SRV.run(req.query));
    const IQMSFACTORY_SRV = await cds.connect.to("IQMSFACTORY_SRV");

    srv.on('READ', 'ScheduleFacSet', req => IQMSFACTORY_SRV.run(req.query));
    srv.on('CREATE', 'ScheduleFacSet', req => IQMSFACTORY_SRV.run(req.query));
    srv.on('UPDATE', 'ScheduleFacSet', req =>{ IQMSFACTORY_SRV.run(req.query)});

    srv.on("READ", "fetchVehType", async (req) => {
        console.log("fetchVehType fn called");

        const transportData1 = await IQMSQUEUEMANAGE_VALUEHELP_SRV.run(req.query);
        if (!transportData1 || transportData1.length === 0) {
            console.log("No data retrieved from service.");
            return [];
        }

        const uniqueTransportSet = new Set();

        transportData1.forEach((item) => {
            const { VehType } = item;
            // Add only unique VehType to the set
            if (VehType) {
                uniqueTransportSet.add(VehType);
            }
        });

        // Convert the Set to an array of unique VehType objects
        const uniqueTransportData = Array.from(uniqueTransportSet).map((VehType) => ({ VehType }));

        console.log("uniqueTransportData", uniqueTransportData);
        return uniqueTransportData;
    });


    srv.on("BillingInvoice", async (req) => {
        try {
            console.log("billing invoice called");

            let x = await updateParkingStatus();
            // return x
            let query = req.query;
            console.log("query", query);

            const billingDataQuery = SELECT.from("xIQMSxBilling_fetch");
            console.log("Running billing data query...");
            const billingData = await IQMSBILLING_DOCUMENT_SRV.run(billingDataQuery);

            const vehicleTypeQuery = SELECT.from("VehicleTypeDefinition");
            console.log("Running vehicle type query...");
            const vehicleTypeData = await cds.run(vehicleTypeQuery);

            const parkItemQuery = SELECT.from("Park_headerSet");
            console.log("Running parking item query...");
            const parkItemData = await IQMSPARKING_SRV.run(parkItemQuery);

            const vehicleTypeMap = vehicleTypeData.reduce((map, item) => {
                map[item.VehicleType] = item.VehicleDefinition;
                return map;
            }, {});

            // return vehicleTypeMap
            const parkItemStatusMap = parkItemData.reduce((map, item) => {
                map[item.ParkingNo] = item.Status;
                return map;
            }, {});
            //  return billingData
            const enrichedBillingData = billingData.map((item) => {
                item.VehicleDefinition = vehicleTypeMap[item.vehicleType] || null;
                item.Status = parkItemStatusMap[item.ParkingNo] || null;
                return item;
            });

            const filteredBillingData = enrichedBillingData.filter((item) => item.Status === "Loaded");

            console.log("Filtered billing Data:", filteredBillingData);

            // Call updateParkingStatus function

            return filteredBillingData;

        } catch (error) {
            console.error("Error during service execution:", error);
            throw error;
        }
    });


    /**
     * Function to update Parking Status based on specific conditions
     */
    async function updateParkingStatus() {
        try {
            console.log("Fetching billing data...");
            const billingData = await IQMSBILLING_DOCUMENT_SRV.run(SELECT.from("xIQMSxBilling_fetch"));
            console.log("billing Data", billingData);

            // return billingData;


            const parkingNos = billingData.map(item => item.ParkingNo);
            if (!parkingNos.length) return;

            console.log("Fetching schedulingSet data...");
            const soDocumentData = await IQMSSCHEDULING_SRV.run(SELECT.from("xIQMSxscheduling_cds").where({ Parkingno: parkingNos }));
            // return soDocumentData
            const validParkingNos = soDocumentData
                .filter(item => item.BillingNo == null || item.BillingNo === "")
                .map(item => item.Parkingno);

            if (!validParkingNos.length) return;
            // return validParkingNos;

            // console.log("Fetching park_itemSet data...");
            const parkItemData = await IQMSPARKING_SRV.run(SELECT.from("Park_headerSet").where({ ParkingNo: validParkingNos }));
            // return validParkingNos;

            const parkingNosToUpdate = billingData
                .filter(item => validParkingNos.includes(item.ParkingNo) && (item.status === "4" || item.status === "6") &&
                    parkItemData.some(p => p.ParkingNo === item.ParkingNo && p.Status === "LAN Created"))
                .map(item => item.ParkingNo);

            if (!parkingNosToUpdate.length) return;

            console.log("Updating Parking Status...");
            // return parkingNosToUpdate
            await Promise.all(
                parkingNosToUpdate.map(async (parkingNo) => {
                    try {
                        await IQMSPARKING_SRV.run(
                            UPDATE("Park_headerSet")
                                .set({ Status: "Loaded" })
                                .where({ ParkingNo: parkingNo })
                        );
                        console.log(`Successfully updated ParkingNo: ${parkingNo}`);
                    } catch (error) {
                        console.error(`Error updating ParkingNo: ${parkingNo}`, error);
                    }
                })
            );

            console.log("All Parking Status updates completed!");

            console.log("Parking Status Updated Successfully!");

        } catch (error) {
            console.error("Error updating parking status:", error);
            throw error;
        }
    }


    srv.on("ExitScreen", async (req) => {
        try {
            const billingDataQuery = SELECT.from("xIQMSxBilling_fetch");
            console.log("Running billing data query...");
            const billingData = await IQMSBILLING_DOCUMENT_SRV.run(billingDataQuery);

            const vehicleTypeQuery = SELECT.from("VehicleTypeDefinition");
            console.log("Running vehicle type query...");
            const vehicleTypeData = await cds.run(vehicleTypeQuery);

            // const parkItemQuery = SELECT.from("park_itemSet");
            const parkItemQuery = SELECT.from("Park_headerSet");
            console.log("Running parking item query...");
            const parkItemData = await IQMSPARKING_SRV.run(parkItemQuery);

            const vehicleTypeMap = vehicleTypeData.reduce((map, item) => {
                map[item.VehicleType] = item.VehicleDefinition;
                return map;
            }, {});

            const parkItemStatusMap = parkItemData.reduce((map, item) => {
                map[item.ParkingNo] = item.Status;
                return map;
            }, {});

            const enrichedBillingData = billingData.map((item) => {
                item.VehicleDefinition = vehicleTypeMap[item.VehicleType] || null;
                item.Status = parkItemStatusMap[item.ParkingNo] || null;
                return item;
            });

            // Filter data to only include items with Status = 'loaded'
            const filteredBillingData = enrichedBillingData.filter((item) => item.Status === "Invoiced");

            console.log("Filtered billing Data:", filteredBillingData);

            return filteredBillingData;

        } catch (error) {
            console.error("Error during service execution:", error);
            throw error; // or return appropriate error response
        }
    });


    srv.on('getVehMaxvol', async (req) => {
        try {
            const { Vehicle } = req.data;

            if (!Vehicle) {
                return req.reject(400, "The parameter 'Vehicle' is required.");
            }
            const query = SELECT.from('xIRMSxvehiclemaster')
                .columns('VehMaxvol', 'trquant', 'TuNumber', 'VehType')
                .where({ Vehicle });

            const result = await IRMSQUEQE_MANAGEMENT_SRV.run(query);

            if (!result || result.length === 0) {
                return req.reject(404, `No data found for Vehicle: ${Vehicle}`);
            }

            return result;

        } catch (error) {
            console.error("Error in VehMax handler:", error);
            req.reject(500, "An error occurred while processing your request.");
        }
    });
    srv.on('fetchCustomerData', async req => {
        try {
            const { Kunnr } = req.data;

            if (!Kunnr) {
                return req.reject(400, "The parameter 'Kunnr' is required.");
            }

            // Fetch vehicle data based on Vehicle
            const query = SELECT.from('xIRMSxcustomer')
                .columns('Name1', 'Ort01')
                .where({ Kunnr })


            const result = await IRMSQUEQE_MANAGEMENT_SRV.run(query);
            console.log("Customer result:", result);

            // If no results, return empty array
            if (!result || result.length === 0) {
                return [];
            }
            console.log("customer result ", result);

            return result[0];

        } catch (error) {
            console.error("Error in fetchCustomerData handler:", error);
            req.reject(500, "An error occurred while processing your request.");
        }

    })

    //   ****************     createPaking screen   start   **********************

    //   Note : Sales order check also  to be added later
    srv.on('getVehicle', async (req) => {
        try {
            const { Vehicle } = req.data;

            if (!Vehicle) {
                return req.reject(400, "The parameter 'Vehicle' is required.");
            }

            // Fetch vehicle data based on Vehicle
            const query = SELECT.from('xIRMSxvehiclemaster')
                .columns('Vehicle', 'VehType')
                .where({ Vehicle })


            const result = await IRMSQUEQE_MANAGEMENT_SRV.run(query);
            console.log("vehicles result:", result);

            // If no results, return empty array
            if (!result || result.length === 0) {
                return [];
            }
            // Using a Set to track unique combinations of Vehicle and VehType
            const seen = new Set();
            const uniqueResult = result.filter(item => {
                const uniqueKey = `${item.Vehicle}-${item.VehType}`; // Creating a unique key based on Vehicle and VehType
                if (seen.has(uniqueKey)) {
                    return false; // If already seen, don't include it
                } else {
                    seen.add(uniqueKey);
                    return true; // If not seen, include it
                }
            });

            console.log("unique vehicles result:", uniqueResult);

            // Fetch VehicleTypeDefinition based on VehType from the result
            const VehType = uniqueResult[0].VehType;

            // query 2  for
            const typeDefQuery = SELECT.from('VehicleTypeDefinition')
                .columns('VehicleType', 'VehicleDefinition')
                .where({ VehicleType: VehType });

            const vehicleTypeDefResult = await cds.run(typeDefQuery);
            console.log("VehicleTypeDefinition result:", vehicleTypeDefResult);

            if (vehicleTypeDefResult && vehicleTypeDefResult.length > 0) {
                // If matched, set isVehicleDefMatched to true and add the VehicleType to the result
                uniqueResult[0].isVehicleDefMatched = true;
                uniqueResult[0].VehicleDefinition = vehicleTypeDefResult[0].VehicleDefinition;
            } else {
                // If no match found, set isVehicleDefMatched to false and assign null to VehicleDefinition
                uniqueResult[0].isVehicleDefMatched = false;
                uniqueResult[0].VehicleDefinition = null;
            }

            // Return the result with VehicleDefinition
            return uniqueResult;

        } catch (error) {
            console.error("Error in getVehicle handler:", error);
            req.reject(500, "An error occurred while processing your request.");
        }
    });

    srv.on('checkVehicleBeforeSubmitParking', async req => {

        const { Vehicle, VehicleDef } = req.data;
        console.log("req data params", req.data, Vehicle, VehicleDef);

        // Step 1: Check VehicleDef for VehicleType
        const vehicleTypeQuery = SELECT.from('VehicleTypeDefinition')
            .columns('VehicleType')
            .where({ VehicleDefinition: VehicleDef });

        const vehicleTypeResult = await cds.run(vehicleTypeQuery);

        // If no matching VehicleType found, return an error
        if (!vehicleTypeResult || vehicleTypeResult.length === 0) {
            return req.reject(400, `No VehicleDefinition found for VehicleDef: ${VehicleDef}`);
        }

        // Extract the VehicleType
        const vehicleType = vehicleTypeResult[0].VehicleType;
        // console.log("params", Vehicle, VehicleDef, vehicleType);


        // Initialize the final object to return
        const response = {
            VehicleType: vehicleType,
            isVehicleMatched: false, // Default to false
            isVehicleInRefinary: false // Default to false
        };

        // Step 2: If Vehicle is provided, check in Park_headerSet
        if (Vehicle) {
            // Query Park_headerSet to check for the VehicleNumber
            const query = SELECT.from('Park_headerSet')
                .columns('ParkingNo', 'VehicleNumber')
                .where({ VehicleNumber: Vehicle });

            const result = await IQMSPARKING_SRV.run(query);
            console.log("result vehicle ", result);



            // Step 3: If no matching Vehicle found in Park_headerSet, return the object with false values
            if (!result || result.length === 0) {
                return response; // Vehicle is not found, return the initial response
            }

            // Filter the results manually to find the matching VehicleNumber
            const filteredResults = result.filter(item => item.VehicleNumber === Vehicle);

            // If vehicle is found, update isVehicleMatched to true

            // Extract ParkingNo from filtered results (Assuming the first match is correct)
            console.log("filterresults", filteredResults);
            if (!filteredResults.length) {

                return response

            }
            const parkingNo = filteredResults[0].ParkingNo;
            response.isVehicleMatched = true;


            // Step 4: Query part_itemSet to check the status of the ParkingNo
            const partItemQuery = SELECT.from('xIQMSxparking_cds')
                .columns('Status')
                .where({ VehicleNumber: Vehicle });

            const partItemResult = await IQMSPARKING_SRV.run(partItemQuery);

            // return partItemResult
            // Step 5: Check if partItemResult is empty or doesn't contain valid status
            if (!partItemResult || partItemResult.length === 0) {
                return req.reject(400, `No status found for ParkingNo: ${parkingNo}`);
            }
            // Extract status (assuming the first entry in partItemResult is the relevant one)
            const status = partItemResult[0].Status;
            console.log("park item result :", partItemResult[0]);


            // Step 6: Check the status and determine if the vehicle is in the refinery
            if (status === "Exit" || status === "Park-Out" || status === "Empty Out") {
                response.isVehicleInRefinary = false; // Vehicle is not in refinery
            } else {
                response.isVehicleInRefinary = true; // Vehicle is in refinery
            }
        }

        // Return the final object with all details
        return response;

    });
    //  ***************     create parking Screeen   End   *********************


    //  ***************    Parking List  Handlers START  ********************
    // handler function for filtering the statuses related to security

    srv.on('getCustomizedParkingData', async (req) => {
        try {
            console.log("called getCustomizedParkingData");

            // Step 1: Fetch park header data with status directly
            const parkHeaderQuery = SELECT.from('Park_headerSet')
                .columns('ParkingNo', 'Product', 'TruckType', 'VehicleNumber', 'Status');

            let parkHeaderResult = await IQMSPARKING_SRV.run(parkHeaderQuery);


            if (!parkHeaderResult.length) {
                return req.reject(404, `No data found for Parking`);
            }

            // Step 3: Normalize Status values
            parkHeaderResult.forEach(item => {
                if (item.Status) {
                    item.Status = item.Status.replace(/\s*,\s*/g, ', ');
                }
            });

            // Step 4: Fetch valid security statuses
            const securityStatusQuery = SELECT.from('SecurityStatus')
                .columns('MsgNo', 'MessageText')
                .limit(9);

            const securityStatusResult = await cds.run(securityStatusQuery);

            if (!securityStatusResult.length) {
                return req.reject(500, `No Security Status data found`);
            }

            const validStatuses = securityStatusResult.map(status => status.MessageText.replace(/\s*,\s*/g, ', '));

            // Step 5: Filter headers based on valid statuses
            parkHeaderResult = parkHeaderResult.filter(header => validStatuses.includes(header.Status));

            // Step 6: Fetch vehicle definitions for TruckType
            const truckTypes = [...new Set(parkHeaderResult.map(item => item.TruckType))];
            const vehicleTypeQuery = SELECT.from('VehicleTypeDefinition')
                .columns('VehicleType', 'VehicleDefinition')
                .where({ VehicleType: { in: truckTypes } });

            const vehicleTypeResult = await cds.run(vehicleTypeQuery);

            // Map vehicle definitions
            parkHeaderResult.forEach(header => {
                const vehicleDef = vehicleTypeResult.find(def => def.VehicleType === header.TruckType);
                if (vehicleDef) {
                    header.VehicleDefinition = vehicleDef.VehicleDefinition;
                }
            });

            // Step 7: Fetch material definitions
            const materialTypeQuery = SELECT.from('MaterialTypeDefinition')
                .columns('Material', 'MaterialDefinition');

            const materialTypeResult = await cds.run(materialTypeQuery);

            if (!materialTypeResult.length) {
                return req.reject(500, `No MaterialDefinition data found`);
            }

            const materialDefinitionMap = materialTypeResult.reduce((map, item) => {
                map[item.Material] = item.MaterialDefinition;
                return map;
            }, {});

            // Map material descriptions
            parkHeaderResult.forEach(header => {
                header.MaterialDesc = materialDefinitionMap[header.Product] || null;
            });

            // Step 8: Filter out headers without valid MaterialDesc
            const mergedData = parkHeaderResult
                .filter(header => header.MaterialDesc)
                .map(header => ({
                    ParkingNo: header.ParkingNo,
                    VehicleNumber: header.VehicleNumber,
                    Product: header.Product,
                    TruckType: header.TruckType,
                    Status: header.Status,
                    VehicleDefinition: header.VehicleDefinition,
                    MaterialDesc: header.MaterialDesc
                }));

            // Step 9: Sort by ParkingNo
            mergedData.sort((a, b) => a.ParkingNo.localeCompare(b.ParkingNo));

            return mergedData;

        } catch (error) {
            return req.reject(500, `Error occurred while fetching customized parking data: ${error.message}`);
        }
    });

    // Security Clearance home screen Hnadler function
    srv.on('getParkingNoData', async (req) => {
        try {
            let { ParkingNo } = req.data;

            if (!ParkingNo) {
                return req.reject(400, "ParkingNo is required");
            }

            console.log("Fetching data for ParkingNo:", ParkingNo);

            // Step 1: Fetch all Park Header entries
            const ParkingData = await IQMSPARKING_SRV.run(
                SELECT.from('Park_headerSet')
                    .columns('ParkingNo', 'ParkingGate', 'ParkingArea', 'VehicleNumber', 'TruckType', 'Status')
                    .where({ ParkingNo }) // if filter applicable
            );
            // return ParkingData

            // Step 2: Apply filtering manually
            const matchedEntry = ParkingData.find(item => item.ParkingNo === ParkingNo);

            if (!matchedEntry) {
                return req.reject(404, "No Parking Data found for the given ParkingNo");
                // return [];
            }
            // console.log(matchedEntry);

            // Step 3: Optional - Check status includes 'Security'
            if (matchedEntry.Status && matchedEntry.Status == "") {
                // console.log("status empty");

                return req.reject(404, "No status found for the given ParkingNo");
            }
            if (!matchedEntry.Status || !matchedEntry.Status.includes("Security")) {
                return []
            }

            // Step 4: Fetch Vehicle Definition based on TruckType
            const vehicleDef = await cds.run(
                SELECT.one.from('VehicleTypeDefinition')
                    .columns('VehicleDefinition')
                    .where({ VehicleType: matchedEntry.TruckType })
            );

            if (vehicleDef) {
                matchedEntry.VehicleDefinition = vehicleDef.VehicleDefinition;
            }

            console.log("Final Result:", matchedEntry);
            return matchedEntry;

        } catch (error) {
            return req.reject(500, `${error.message}`);
        }
    });

    // ****************     Parking List Handlers END     ********************


    // ****************      Security Checklist           *******************

    srv.on('getCheckListData', async req => {
        let { ParkingNo, VehicleNumber, TruckTypeDef, TruckType } = req.data;
        console.log(ParkingNo, VehicleNumber, TruckTypeDef);
        // return []  

        // step -1 
        const checkListVerifQuery = SELECT.from('ChecklistVerification')
            .columns('ParkingNo', 'Remarks', 'pass', 'fail')
            .where({ ParkingNo: ParkingNo })
            .orderBy('Remarks');

        const checkListVerifResult = await cds.run(checkListVerifQuery);
        console.log(checkListVerifResult);


        // If no matching Chechlist data found, check for data in checklistcreation table
        if (!checkListVerifResult || checkListVerifResult.length === 0) {
            console.log(`No checklist verification data found for Id: ${ParkingNo}`);

            if (!TruckTypeDef) {

                console.log("TruckType Defination undefined or Missing", TruckTypeDef);

                VehDefResult = await cds.run(SELECT.from('VehicleTypeDefinition').where({ VehicleType: TruckType }));
                console.log("vehDefResult ", VehDefResult);


                TruckTypeDef = VehDefResult[0].VehicleDefinition;
            }
            const checkListCreationQry = SELECT.from('ChecklistCreation')
                .columns('Remarks', 'pass', 'fail')
                .where({ VehicleType: TruckTypeDef }) // e.g "Open Tank"
                .orderBy('Remarks');

            const checkListCreationresult = await cds.run(checkListCreationQry);
            console.log("chlist cretion data", checkListCreationresult);
            return { isCheckListDataPresent: false, result: checkListCreationresult }

        }
        // console.log(checkListVerifResult);
        return { result: checkListVerifResult, isCheckListDataPresent: true };

    })

    // updated fetchSo by Deepanshu
    srv.on('fetchSo', async (req) => {
        try {
            const { Matnr, OidShip } = req.data;

            console.log("req", req.data);

            //  400 - Bad Request (Missing Parameters)
            if (!OidShip) {
                throw { status: 400, message: "'Customer' parameter is required." };
            }

            let query = SELECT.from('xIQMSxfetch_so')

                .where({ OidShip });

            // Add Matnr condition only if it's not empty or undefined
            if (Matnr) {
                query.where({ Matnr });
            }

            const result = await IQMSQUEUEMANAGE_VALUEHELP_SRV.run(query);

            console.log("result1", result);

            //  404 - Not Found (No Data)
            if (!result || result.length === 0) {
                console.log("result zero reject");
                throw { status: 404, message: `No data found for Matnr: ${Matnr} and OidShip: ${OidShip}` };
            }

            // 200 - OK (Returning Data)
            return result;

        } catch (error) {
            console.error("Error in fetchSo handler:", error);

            // If the error has a known status, return it properly
            if (error.status) {
                return req.reject(error.status, error.message);
            }

            // 500 - Internal Server Error (Unexpected)
            return req.reject(500, `Internal Server Error: ${error.message}`);
        }
    });

    srv.on('fetchSchedulingData', async (req) => {
        try {
            const schedData = await IQMSQUEUEMANAGE_VALUEHELP_SRV.run(SELECT.from('xIQMSxschfac_fetch'));
    
            if (!schedData || schedData.length === 0) {
                return req.reject(404, "No scheduling data found.");
            }
    
            // Fetch SO and STO data once for lookup
            const soData = await IQMSQUEUEMANAGE_VALUEHELP_SRV.run(SELECT.from('xIQMSxfetch_so'));
            const stoData = await IQMSQUEUEMANAGE_VALUEHELP_SRV.run(SELECT.from('xIQMSxfetch_sto'));
    
            // Convert SO and STO data to maps for fast lookup
            const soMap = new Map(soData.map(item => [item.Vbeln, item]));
            const stoMap = new Map(stoData.map(item => [item.Sto, item]));
    
            const result = schedData.map(entry => {
                let startDateObj = null;
                let endDateObj = null;
    
                if (entry.Startdate && entry.Starttime) {
                    startDateObj = new Date(entry.Startdate.split("T")[0] + "T" + entry.Starttime);
                }
    
                if (entry.Enddate && entry.Endtime) {
                    endDateObj = new Date(entry.Enddate.split("T")[0] + "T" + entry.Endtime);
                }
    
                const isSO = entry.SalesOrder && entry.SalesOrder !== "X";
                const docNum = isSO ? entry.SalesOrder : entry.Stockorder;
                const docType = isSO ? "SO" : "STO";
                const lookupData = isSO ? soMap.get(entry.SalesOrder) : stoMap.get(entry.Stockorder);
    
                return {
                    Bayno: entry.Bayno,
                    Startdate: startDateObj,
                    Enddate: endDateObj,
                    Vehicleno: entry.Vehicleno,
                    Driver: entry.Driver,
                    Cleaner: entry.Cleaner,
                    Createdby: entry.Createdby,
                    Createddate: entry.Createddate,
                    Createdtime: entry.Createdtime,
                    Changedby: entry.Changedby,
                    Changeddate: entry.Changeddate,
                    Changedtime: entry.Changedtime,
                    DocType: docType,
                    DocNum: docNum,
                    Material: lookupData?.Material || lookupData?.Matnr || null,
                    quantity: lookupData?.Quantity || lookupData?.quantity || null,
                    uom: lookupData?.Unit || lookupData?.uom || null,
                    OidShip: lookupData?.Plant || lookupData?.OidShip || null,
                    Endtime: entry.Endtime,
                    Starttime : entry.Starttime
                };
            });
    
            return result;
    
        } catch (error) {
            console.error("Error in fetchSchedulingData handler:", error);
    
            if (error.status) {
                return req.reject(error.status, error.message);
            }
    
            return req.reject(500, `Internal Server Error: ${error.message}`);
        }
    });
    srv.on('fetchSO_STO_PR_Data', async (req) => {
        try {
            const docType = req.data.docType;

            if (!docType) {
                return req.reject(400, "Document type (docType) is required.");
            }

            let data = [];
            let result = [];

            // Fetch Sales Orders
            if (docType === "Sales Order") {
                data = await IQMSQUEUEMANAGE_VALUEHELP_SRV.run(SELECT.from('xIQMSxfetch_so'));

                if (!data || data.length === 0) {
                    return req.reject(404, "No Sales Order data found.");
                }

                result = data.map(entry => ({
                    Vbeln: entry.Vbeln || null,
                    quantity: entry.quantity || null,
                    uom: entry.uom || null,
                    Matnr: entry.Matnr || null,
                    OidShip: entry.OidShip || null,
                    Item: entry.Posnr || null,
                    DocType: "SO",
                    DocNum: entry.Vbeln || null
                }));
            }

            // Fetch STOs
            else if (docType === "Stock Transfer") {
                data = await IQMSQUEUEMANAGE_VALUEHELP_SRV.run(SELECT.from('xIQMSxfetch_sto'));

                if (!data || data.length === 0) {
                    return req.reject(404, "No STO data found.");
                }

                result = data.map(entry => ({
                    STO: entry.Sto || null,
                    quantity: entry.Quantity || null,
                    uom: entry.Unit || null,
                    Matnr: entry.Material || null,
                    OidShip: entry.Plant || null,
                    Item: entry.Item || null,
                    DocType: "STO",
                    DocNum: entry.Sto || null
                }));
            }

            else {
                return req.reject(400, `Unsupported docType: ${docType}`);
            }

            // Sorting the result based on docType
            result.sort((a, b) => {
                if (docType === "Sales Order") {
                    return parseInt(b.Vbeln || "0", 10) - parseInt(a.Vbeln || "0", 10);
                } else {
                    return parseInt(b.STO || "0", 10) - parseInt(a.STO || "0", 10);
                }
            });

            console.log(`Fetched and sorted ${docType} entries:`, result.length);
            return result;


        } catch (error) {
            console.error("Error in fetchSO_STO_PR_Data:", error);

            if (error.status) {
                return req.reject(error.status, error.message);
            }

            return req.reject(500, `Internal Server Error: ${error.message}`);
        }
    });


    // open STO  for Scheduling screen
    srv.on('fetchSTO', async (req) => {
        try {
            // Step 1: Fetch data using the CDS view/API from the correct service
            const stoData = await IQMSQUEUEMANAGE_VALUEHELP_SRV.run(SELECT.from('xIQMSxfetch_sto'));

            if (!stoData || stoData.length === 0) {
                console.log("No STO data found");
                throw { status: 404, message: `No STO data found` };
            }

            console.log("Fetched STO count:", stoData.length);

            // Step 2: Map and format the data to required response structure
            const result = stoData.map(entry => ({
                STO: entry.Sto,                       // Purchase Order
                quantity: entry.Quantity || null,     // Quantity
                uom: entry.Unit || null,              // Unit of measure
                Matnr: entry.Material || null,        // Material
                OidShip: entry.Plant || null,         // Supplying Plant
                Item: entry.Item || null              // PO Item
            }));

            console.log("Total entries prepared:", result.length);
            return result;

        } catch (error) {
            console.error("Error in fetchSTO handler:", error);

            if (error.status) {
                return req.reject(error.status, error.message);
            }

            return req.reject(500, `Internal Server Error: ${error.message}`);
        }
    });


    // srv.on('fetchSTO', async (req) => {
    //     try {
    //         // Step 1: Fetch PurchaseOrder and CompanyCode from A_PurchaseOrder
    //         const headerQuery = SELECT.from('A_PurchaseOrder').columns('PurchaseOrder', 'CompanyCode');
    //         const headers = await ZAPI_PURCHASEORDER_PROCESS_SRV.run(headerQuery);

    //         if (!headers || headers.length === 0) {

    //             console.log("No Purchase Order data found");
    //             throw { status: 404, message: `No Purchase Order data found` };
    //         }
    //         console.log("STO count", headers.length);

    //         // Get array of PurchaseOrder numbers
    //         const purchaseOrderNumbers = headers.map(po => po.PurchaseOrder);

    //         // Step 2: Fetch item data for those PurchaseOrder numbers (only one item per PO assumed)
    //         const itemQuery = SELECT.from('A_PurchaseOrderItem')
    //             .columns('PurchaseOrder', 'OrderQuantity', 'PurchaseOrderQuantityUnit', 'Material', 'Plant')
    //             .where({ PurchaseOrder: { in: purchaseOrderNumbers } });

    //         const items = await ZAPI_PURCHASEORDER_PROCESS_SRV.run(itemQuery);

    //         // Map items by PurchaseOrder for quick access
    //         const itemsMap = new Map();
    //         for (const item of items) {
    //             if (!itemsMap.has(item.PurchaseOrder)) {
    //                 itemsMap.set(item.PurchaseOrder, item); // Only one item per PO
    //             }
    //         }

    //         // Step 3: Combine header and one item per order
    //         const result = headers.map(header => {
    //             const item = itemsMap.get(header.PurchaseOrder) || {};

    //             return {
    //                 STO: header.PurchaseOrder,  // EBELN
    //                 quantity: item.OrderQuantity || null,
    //                 uom: item.PurchaseOrderQuantityUnit || null,
    //                 Matnr: item.Material || null,
    //                 OidShip: item.Plant || null
    //             };
    //         });
    //         console.log("total counts", result.length);

    //         return result;

    //     } catch (error) {
    //         console.error("Error in fetchSTO handler:", error);

    //         if (error.status) {
    //             return req.reject(error.status, error.message);
    //         }

    //         return req.reject(500, `Internal Server Error: ${error.message}`);
    //     }
    // });

    srv.on('getfromMaterial', async (req) => {
        try {
            const { matnr } = req.data;

            console.log("Request received with matnr:", matnr);

            // Validate the 'matnr' parameter
            if (!matnr) {
                return req.reject(400, "The parameter 'matnr' is required.");
            }

            // Construct the query to fetch data
            const query = SELECT.from('xIQMSxMaterial_n')
                .columns('matnr', 'spart', 'vkorg', 'vtweg') // Add 'vkorg', 'vtweg', and 'matnr' to the query
                .where({ matnr });

            console.log("Executing query:", query);

            // Execute the query
            const result = await IQMSQUEUEMANAGE_VALUEHELP_SRV.run(query);

            console.log("Query result:", result);

            // Check if data is returned
            if (!result || result.length === 0) {
                return req.reject(404, `No data found for matnr: ${matnr}`);
            }

            // Return the fetched data
            return result;

        } catch (error) {
            console.error(error.message);
            req.reject(error.code ? error.code : 500, error.message ? error.message : "An error occurred while processing your request.");
        }
    });
    async function fetchFANScreenParkingData(materialType) {
        try {
            console.log(`Fetching data for material type: ${materialType}`);

            // Fetch header data (Status is already present)
            const headerDataQuery = SELECT.from("Park_headerSet");

            // new API in iQMS namespace
            const headerData = await IQMSPARKING_SRV.run(headerDataQuery);

            // Fetch vehicle type definitions
            const vehicleTypeQuery = SELECT.from("VehicleTypeDefinition");
            const vehicleTypeData = await cds.run(vehicleTypeQuery);

            // Create a map for VehicleType to VehicleDefinition
            const vehicleTypeMap = vehicleTypeData.reduce((map, item) => {
                map[item.VehicleType] = item.VehicleDefinition;
                return map;
            }, {});

            // Fetch scheduling data from IQMSSCHEDULING_SRV
            const schedulingQuery = SELECT.from("SchedulingSet");
            const schedulingData = await IQMSSCHEDULING_SRV.run(schedulingQuery);

            // Create a map for ParkingNo to SalesOrder, DeliveryNo, and ShipmentNo
            const schedulingMap = schedulingData.reduce((map, item) => {
                map[item.Parkingno] = { // remember 'Parkingno' spelling
                    SalesOrder: item.SalesOrder,
                    DeliveryNo: item.DeliveryNo,
                    ShipmentNo: item.ShipmentNo,
                    Quantity: item.Quantity,
                    Stockorder: item.Stockorder,
                    Bayno: item.Bayno
                };
                return map;
            }, {});
            // return schedulingMap;

            // Fetch material type definitions
            const materialTypeQuery = SELECT.from("MaterialTypeDefinition");
            const materialTypeData = await cds.run(materialTypeQuery);

            // Filter material data based on the provided material type
            const filteredMaterials = materialTypeData.filter(item => {
                return materialType ? item.MaterialType === materialType : true;
            });
            // return filteredMaterials

            // Create a map for MaterialDefinition
            const materialDefinitionMap = filteredMaterials.reduce((map, item) => {
                map[item.MaterialDefinition] = true;
                return map;
            }, {});

            // Add Material Description to header data
            // return headerData
            // return materialDefinitionMap
            headerData.forEach(item => {
                const matchedMaterial = filteredMaterials.find(material => material.Material === item.Product);
                item.MaterialDesc = matchedMaterial ? matchedMaterial.MaterialDefinition : '';
            });

            // Enrich header data with VehicleDefinition and Scheduling data

            const enrichedHeaderData = headerData.map(item => {
                item.VehicleDefinition = vehicleTypeMap[item.TruckType] || null;
                const schedulingInfo = schedulingMap[item.ParkingNo] || {};
                item.SalesOrder = schedulingInfo.SalesOrder || "";
                item.DeliveryNo = schedulingInfo.DeliveryNo || "";
                item.ShipmentNo = schedulingInfo.ShipmentNo || "";
                item.Quantity = schedulingInfo.Quantity || "";
                item.Stockorder = schedulingInfo.Stockorder || "";
                item.Bayno = schedulingInfo.Bayno || ""
                return item;
            });

            console.log(`Enriched data length for ${materialType}:`, enrichedHeaderData.length);

            // Filter the data based on Status and MaterialDefinition
            const validStatuses = [
                "Security Cleared",
                "Security Cleared, Vehicle Master Missing",
                "SO / STO Created",
                "Delivery Created",
                "LAN Created"
            ];

            const filteredData = enrichedHeaderData.filter(item =>
                validStatuses.includes(item.Status) && materialDefinitionMap[item.MaterialDesc]
                // validStatuses.includes(item.Status) 
            );

            console.log(`Filtered data length for ${materialType}:`, filteredData.length);

            return filteredData;

        } catch (error) {
            console.error(`Error fetching data for material type ${materialType}:`, error);
            throw error;
        }
    }

    // Event Handlers
    srv.on('LiquidScreen', async (req) => fetchFANScreenParkingData("Liquid"));
    srv.on('SolidScreen', async (req) => fetchFANScreenParkingData("Solid"));
    srv.on('GasScreen', async (req) => fetchFANScreenParkingData("Gas"));
    srv.on('MaterialScreen', async (req) => fetchFANScreenParkingData(""));


    // Helper function to parse the $filter query for Liquid Screen in case of direct
    // function parseFilterQuery(filterQuery) {
    //     const conditions = [];

    //     // Split the filter query by 'and'
    //     const filterParts = filterQuery.split(/\s+and\s+/i);

    //     // Iterate through each part to extract key, operator, and value
    //     filterParts.forEach(part => {
    //         const match = part.match(/(\w+)\s+(eq|ne|gt|lt|ge|le)\s+'?([^']*)'?/i);

    //         if (match) {
    //             conditions.push({
    //                 key: match[1], // e.g., Product
    //                 operator: match[2], // e.g., eq
    //                 value: match[3], // e.g., Gasoline
    //             });
    //         }
    //     });

    //     return conditions;
    // }


    // Using CDS API      
    const IRMSCREATE_DELIVERY_SRV = await cds.connect.to("IRMSCREATE_DELIVERY_SRV");
    srv.on('READ', 'Sales_orderItemsSet', req => IRMSCREATE_DELIVERY_SRV.run(req.query));
    srv.on('CREATE', 'Sales_orderItemsSet', req => IRMSCREATE_DELIVERY_SRV.run(req.query));
    srv.on('READ', 'delivery_createSet', req => IRMSCREATE_DELIVERY_SRV.run(req.query));
    srv.on('CREATE', 'delivery_createSet', req => IRMSCREATE_DELIVERY_SRV.run(req.query));
    srv.on('READ', 'delivery_returnSet', req => IRMSCREATE_DELIVERY_SRV.run(req.query));
    srv.on('CREATE', 'delivery_returnSet', req => IRMSCREATE_DELIVERY_SRV.run(req.query));


    /////CreateSO

    const IRMSCREATE_SO_SRV = await cds.connect.to("IRMSCREATE_SO_SRV");
    srv.on('READ', 'So_order_partnerSet', req => IRMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'So_order_partnerSet', req => IRMSCREATE_SO_SRV.run(req.query));
    srv.on('READ', 'park_so_documentSet', async req => IRMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'park_so_documentSet', async req => await IRMSCREATE_SO_SRV.run(req.query));
    srv.on('UPDATE', 'park_so_documentSet', async req => {
        IRMSCREATE_SO_SRV.run(req.query);

    });

    srv.on('READ', 'so_createSet', req => IRMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'so_createSet', req => IRMSCREATE_SO_SRV.run(req.query));
    srv.on('READ', 'so_headerSet', req => IRMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'so_headerSet', req => IRMSCREATE_SO_SRV.run(req.query));
    srv.on('READ', 'so_orderitemSet', req => IRMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'so_orderitemSet', req => IRMSCREATE_SO_SRV.run(req.query));
    srv.on('READ', 'so_returnSet', req => IRMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'so_returnSet', req => IRMSCREATE_SO_SRV.run(req.query));
    srv.on('READ', 'so_schedulesINSet', req => IRMSCREATE_SO_SRV.run(req.query));
    srv.on('CREATE', 'so_schedulesINSet', req => IRMSCREATE_SO_SRV.run(req.query));

    ////Parking No
    const IRMSPARKING_NO_SRV = await cds.connect.to("IRMSPARKING_NO_SRV");
    srv.on('READ', 'park_itemSet', async req => IRMSPARKING_NO_SRV.run(req.query));
    srv.on('CREATE', 'park_itemSet', req => IRMSPARKING_NO_SRV.run(req.query));
    srv.on('UPDATE', 'park_itemSet', async req => {
        console.log("update called");

        IRMSPARKING_NO_SRV.run(req.query)

    }
    );
    srv.on('READ', 'Park_headerSet', async req => await IRMSPARKING_NO_SRV.run(req.query));
    srv.on('UPDATE', 'Park_headerSet', async req => {

        IRMSPARKING_NO_SRV.run(req.query)

    });
    srv.on('CREATE', 'Park_headerSet', async req => IRMSPARKING_NO_SRV.run(req.query));


    srv.on('getMaxParkingNo', async req => {
        try {

            // Fetch all records from the external service
            const result = await IRMSPARKING_NO_SRV.run(
                SELECT.from('Park_headerSet').columns('ParkingNo') // Fetch only ParkingNo column
            );

            if (!result || result.length === 0) {
                // If no records, return a default value
                return { maxParkingNo: 1000000 };
            }

            // Find the maximum ParkingNo locally
            const maxParkingNo = result.reduce((max, item) => {
                const parkingNo = parseInt(item.ParkingNo, 10); // Ensure ParkingNo is treated as a number
                return isNaN(parkingNo) ? max : Math.max(max, parkingNo);
            }, 1000000);

            // Return the maximum ParkingNo
            return { maxParkingNo: maxParkingNo.toString() };
        } catch (error) {
            // Handle errors
            console.error('Error fetching max ParkingNo:', error.message);

            // Send an error response
            req.error({
                code: 500,
                message: `An error occurred while fetching the max ParkingNo: ${error.message}`,
                target: 'getMaxParkingNo',
            });
        }
    });


    const IRMSTRANSPORT_CREATE_SRV = await cds.connect.to("IRMSTRANSPORT_CREATE_SRV");
    srv.on('READ', 'oigcc_tabSet', req => IRMSTRANSPORT_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'oigcc_tabSet', req => IRMSTRANSPORT_CREATE_SRV.run(req.query));
    srv.on('UPDATE', 'oigcc_tabSet', req => IRMSTRANSPORT_CREATE_SRV.run(req.query));
    srv.on('READ', 'oigctSet', req => IRMSTRANSPORT_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'oigctSet', req => IRMSTRANSPORT_CREATE_SRV.run(req.query));
    srv.on('UPDATE', 'oigctSet', req => IRMSTRANSPORT_CREATE_SRV.run(req.query));
    srv.on('READ', 'trans_headerSet', req => IRMSTRANSPORT_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'trans_headerSet', req => IRMSTRANSPORT_CREATE_SRV.run(req.query));
    srv.on('UPDATE', 'trans_headerSet', req => IRMSTRANSPORT_CREATE_SRV.run(req.query));

    ////Vehivle Master 
    const IRMSVEHICLE_CREATE_SRV = await cds.connect.to("IRMSVEHICLE_CREATE_SRV");
    // const IRMSVEHICLE_CREATE_SRV = await cds.connect.to("IQMSVEHICLE_CREATE_SRV");
    srv.on('READ', 'Items_vehSet', req => IRMSVEHICLE_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'Items_vehSet', req => IRMSVEHICLE_CREATE_SRV.run(req.query));
    srv.on('READ', 'headItemSet', req => IRMSVEHICLE_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'headItemSet', req => IRMSVEHICLE_CREATE_SRV.run(req.query));
    srv.on('READ', 'header_vehSet', req => IRMSVEHICLE_CREATE_SRV.run(req.query));
    srv.on('CREATE', 'header_vehSet', req => IRMSVEHICLE_CREATE_SRV.run(req.query));

    // Using CDS API      
    const IRMSZAPI_SALES_ORDER_SRV = await cds.connect.to("IRMSZAPI_SALES_ORDER_SRV");
    srv.on('READ', 'A_SalesOrderHeaderPartner', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'A_SalesOrderHeaderPartner', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('READ', 'A_SalesOrder', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'A_SalesOrder', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('READ', 'A_SalesOrderHeaderPrElement', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'A_SalesOrderHeaderPrElement', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('READ', 'A_SalesOrderItem', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'A_SalesOrderItem', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('READ', 'A_SalesOrderItemPartner', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'A_SalesOrderItemPartner', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('READ', 'A_SalesOrderItemPrElement', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'A_SalesOrderItemPrElement', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('READ', 'A_SalesOrderItemText', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'A_SalesOrderItemText', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('READ', 'A_SalesOrderScheduleLine', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'A_SalesOrderScheduleLine', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('READ', 'A_SalesOrderText', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'A_SalesOrderText', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('READ', 'A_SlsOrdPaymentPlanItemDetails', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));
    srv.on('CREATE', 'A_SlsOrdPaymentPlanItemDetails', req => IRMSZAPI_SALES_ORDER_SRV.run(req.query));


    srv.on("CustomerTransporterEMail", async (req) => {
        try {
            console.log("Triggered....", req.data);

            const {
                salesOrder,
                Stockorder,
                custORTrans,
                bays,
                fromDateTime,
                toDateTime,
                email,
                message,
                Quantity,
                unit,
                material
            } = req.data;

            // Helper function to format dates
            const formatDateToMail = (date) => {
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const day = date.getDate();
                const month = months[date.getMonth()];
                const year = date.getFullYear();

                let hours = date.getHours();
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const ampm = hours >= 12 ? 'PM' : 'AM';

                // Convert 24-hour time to 12-hour format
                hours = hours % 12;
                hours = hours ? hours : 12; // if hour is 0, set to 12

                // Format date as "3 Oct 2025 11:00 AM/PM"
                return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
            };

            // Convert fromDateTime and toDateTime using formatDateToMail
            const formattedFromDateTime = formatDateToMail(new Date(fromDateTime));
            const formattedToDateTime = formatDateToMail(new Date(toDateTime));
            console.log("formated  from and to date", formattedFromDateTime, formattedToDateTime);
            // return {"result":"Hello"}

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'deepanshugoyal2906',
                    pass: 'oczl lrgb avot vfpv'

                },
            });
            //   user: process.env.EMAIL_USER,
            //   pass: process.env.EMAIL_PASS,
            let mailConfig;
            let docType = salesOrder ? 'Sales Order' : 'Stock Transfer Order';
            let docNum = salesOrder ? salesOrder : Stockorder;

            if (message === "CUSTOMER") {
                mailConfig = {
                    from: "deepanshugoyal2906@gmail.com",
                    to: `${email}`,
                    subject: `Customer E-Mail for ${docType} ${docNum}`,
                    text: `
          Dear Customer,
    
          Your transport cargo for ${docType} ${docNum} is scheduled from ${formattedFromDateTime} to ${formattedToDateTime}.
    
          Bay(s) allocated: ${bays}
          Sold to Party: ${custORTrans}
          Ship to Party: ${custORTrans}
          Material: ${material}
          Quantity:  ${Quantity}
          Unit    : ${unit}
    
          Please report two hours prior to loading time.
    
          Best regards,
          Ingenx Technology Private Limited
        `
                };
            } else {
                mailConfig = {
                    from: "deepanshugoyal2906@gmail.com",
                    to: `${email}`,
                    subject: `Transporter E-Mail for ${docType} ${docNum}`,
                    text: `
          Dear Transporter,
    
          You are scheduled to transport cargo for ${docType} ${docNum} from ${formattedFromDateTime} to ${formattedToDateTime}.
    
          Bay(s) allocated: ${bays}
          Sold to Party: ${custORTrans}
          Ship to Party: ${custORTrans}
          Material: ${material}
          Quantity: ${Quantity}
          Unit : ${unit}
    
          Please ensure timely transportation of the cargo.
    
          Best regards,
          Ingenx Technology Private Limited
        `
                };
            }

            // let res = await sendMail({
            //     destinationName: "mailDestination"
            // }, mailConfig);

            // using nodemailer :
            const res = await transporter.sendMail(mailConfig);

            console.log(`Email sent to ${email} - Response:`, res);
            return {
                "message": `Email sent successfully to ${email}`,
                "status": 201
            };
        } catch (error) {
            console.log(error);
            return {
                "message": `Failed to send email : ${error}`,
                "status": 500
            };
        }
    });
}