// CU 14 21 22 23 24 25
//MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllOrders, getOrderById, registerOrder, modifyOrder, deleteOrder } = require('../db_abs/orders');

/**
   * getAllOrdersController
   * @description Get all orders in database
   */
exports.getAllOrdersController = async function (request, response) {
   const orders = await getAllOrders();
   response.status(200).send({ status: "success", data: orders });
}

/**
   * getOrderController
   * @description Get order in database with objectId
   */
exports.getOrderController = async function (request, response) {
   const objectId = request.params.id;
   const orders = await getOrderById(objectId);
   response.status(200).send({ status: "success", data: orders });
}

/**
   * postOrderController
   * @description Post order in database
   */
exports.postOrderController = async function (request, response) {
   try {
      const order = registerOrder(request.body.name, request.body.id_buyer, request.body.possible_day);
      await order.save();
   } catch (error) {
      console.log(error.message);
      return (response.status(500).send({ status: "can't save" }));
   }
   response.status(200).send({ status: "success" });
}

/**
   * modifyWorkerController
   * @description Modify incoming worker registered
   * @param request: values modified by user
   * @param response: status of the post
   */
exports.modifyOrderController = async function (request, response) {
   try {
      const order = modifyOrder(request.body.name, request.body.id_buyer, request.body.possible_day, request.body.objectId);
      await order.save();
   } catch (error) {
      console.error(error.message);
      return (response.status(500).send({ status: "can't save" }));
   }
   response.status(200).send({ status: "success" });
}

exports.deleteOrderController = async function (request, response) {
   try {
      const order = deleteOrder(request.body.objectId);
      await order.save();
   } catch (error) {
      console.error(error.message);
      return (response.status(500).send({ status: "can't save" }));
   }
   response.status(200).send({ status: "success" });
}