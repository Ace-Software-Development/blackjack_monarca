Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllBuyers } = require('../db_abs/buyer');

/**
   * getAllBuyersController
   * @description Get all buyers in database
   */
exports.getAllBuyersController = async function (request, response){
    const buyers = await getAllBuyers();
    response.status(200).send({status:"success", data:buyers});
}