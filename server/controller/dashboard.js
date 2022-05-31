Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllOrders } = require('../db_abs/orders');

/**
   * getAllOrdersController
   * @description Get all orders in database
   */
 exports.getAllOrdersController = async function (request, response){
    const orders = await getAllOrders();
    response.status(200).send({status:"success", data:orders});
}