// CU 14 Consultar pedido

Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllOrders, getOrderById, registerOrder } = require('../db_abs/orders');

/**
   * getAllOrdersController
   * @description Get all orders in database
   */
 exports.getAllOrdersController = async function (request, response){
    const orders = await getAllOrders();
    response.status(200).send({status:"success", data:orders});
}

/**
   * getOrderController
   * @description Get order in database with objectId
   */
 exports.getOrderController = async function (request, response){
   const objectId = request.params.id;
   const orders = await getOrderById(objectId);
   response.status(200).send({status:"success", data:orders});
}

/**
   * postOrderController
   * @description Post order in database
   */
  exports.postOrderController = async function (request, response){   
   try{
      const order = registerOrder(request.body.name, request.body.id_buyer);
      await order.save();
  } catch(error){
      console.log(error.message);
      return(response.status(500).send({status:"can't save"}));
  }
  response.status(200).send({status:"success"});
}