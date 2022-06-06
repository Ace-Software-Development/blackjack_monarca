Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllWorkersQuery } = require('../db_abs/worker');

/**
   * getAllProductsController
   * @description Get all actives workers
   * @param response: status of the get and values of the query
   */
exports.getAllTrabajadores = async function (request, response) {
   const trabajadores = await getAllWorkersQuery();
   response.status(200).send({ status: "success", data: trabajadores });
}