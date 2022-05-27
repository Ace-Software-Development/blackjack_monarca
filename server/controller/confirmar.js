Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllRegisters } = require('../db_abs/partInventory');

/**
   * getConfirmarController
   * @description Get all existing registers from table "PartInventory" while is not second
   * @param response: status of the get and values of the query
   */
 exports.getConfirmarController = async function (request, response){
    const id_process = request.params.id_process;
    const registers = await getAllRegisters(id_process, false, 'pending');
    response.status(200).send({status:"success", data:registers});
}