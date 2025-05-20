const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const IQMSFACTORY_SRV = await cds.connect.to("IQMSFACTORY_SRV"); 
      srv.on('READ', 'PARKST_FACSet', req => IQMSFACTORY_SRV.run(req.query)); 
      srv.on('READ', 'Park_facSet', req => IQMSFACTORY_SRV.run(req.query)); 
      srv.on('READ', 'ScheduleFacSet', req => IQMSFACTORY_SRV.run(req.query)); 
}