Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerProductOrder, getProductOrderById } = require('../db_abs/productOrder');
const { confirmOrder } = require('../db_abs/orders');
const { modifyProductInventory } = require('../db_abs/product');

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
        const productsOrder = request.body;
        const id = productsOrder[0].orderId.objectId;
        const name = productsOrder[0].orderId.name;
        const id_buyer = productsOrder[0].orderId.id_buyer.objectId;
        const is_Delivered = productsOrder[0].orderId.is_Delivered;
        const order = await confirmOrder(id, name, id_buyer, true);
        await order.save().then(() => {
            let product;
            for (let i = 0; i < productsOrder.length; i++) {
                product = modifyProductInventory(productsOrder[i].id_product.with_lid - productsOrder[i].number,
                    productsOrder[i].id_product.withOut_lid, productsOrder[i].id_product.objectId)
                product.save(), (error) => {
                    console.log(error.message);
                    return(response.status(500).send({status:"can't save"}));
                };
            }
        }, (error) => {
            console.log(error.message);
            return(response.status(500).send({status:"can't save"}));
        });
    } catch(error){
        console.error(error.message);
        return(response.status(500).send({status:"can't save"}));
    }
    response.status(200).send({status:"success"});
}

