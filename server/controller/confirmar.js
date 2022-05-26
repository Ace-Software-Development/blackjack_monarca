Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerIncomingDisk, getAllDisks, modifyIncomingDisk } = require('../db_abs/partInventory');

/**
   * getAllDisksController
   * @description Get all existing disks from table "Disks"
   * @param response: status of the get and values of the query
   */
 exports.getConfirmarController = async function (request, response){
    const registers = await getAllRegisters();
    response.status(200).send({status:"success", data:registers});
}