Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllParts } = require('../db_abs/part');
const { getAllWorkers } = require('../db_abs/worker');

/**
   * getAllPartsController
   * @description Get all parts in database
   */
exports.getAllPartsController = async function (request, response){
    const parts = await getAllParts();
    response.status(200).send({status:"success", data:parts});
}

/**
   * getAllPWorkersController
   * @description Get all workers in database
   */
 exports.getAllWorkersController = async function (request, response){
    const workers = await getAllWorkers();
    response.status(200).send({status:"success", data:workers});
}