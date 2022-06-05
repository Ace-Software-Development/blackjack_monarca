Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerProductOrder, getProductOrderById  } = require('../db_abs/productOrder');
const { confirmOrder } = require('../db_abs/orders');

/**
   * postproductOrderController
   * @description Post new incoming product of an Order registered
   * @param request: values registered by user
   * @param response: status of the post
   */
exports.postProductOrderController = async function (request, response){
    try{
        const productOrder = registerProductOrder(request.body.catName, request.body.modName, request.body.number);
        await productOrder.save();
    } catch(error){
        console.error(error.message);
        return(response.status(500).send({status:"can't save"}));
    }
    response.status(200).send({status:"success"});
}

/**
   * getProductOrderController
   * @description Get all products from an order in database
   */
 exports.getProductOrderController = async function (request, response){
    const id = request.params.id;
    const products = await getProductOrderById(id);
    response.status(200).send({status:"success", data:products});
}

/**
   * confirmProductOrderController
   * @description Change the status of an order
   */
 exports.confirmProductOrderController = async function (request, response){
    try{
        const id = request.body.order;
        const name = request.body.name;
        const id_buyer = request.body.id_buyer;
        const is_Delivered = request.body.is_Delivered;
        const order = await confirmOrder(id, name, id_buyer, Boolean(is_Delivered));
        await order.save();
    } catch(error){
        console.error(error.message);
        return(response.status(500).send({status:"can't save"}));
    }
    response.status(200).send({status:"success"});
}

