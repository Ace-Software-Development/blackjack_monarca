Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerProductInventory, getAllProducts } = require('../db_abs/product');

/**
   * postPartController
   * @description Post a part in database
   */
 exports.postPartController = async function (request, response){
    const completed = registerProductInventory(request.body.model, request.body.numberWithLid, request.body.numberWithOutLid);
   
 }
/**
   * getAllDisksController
   * @description Get all existing disks from table "Disks"
   * @param response: status of the get and values of the query
   */
exports.getAllProductsController = async function (request, response) {
    const products = await getAllProducts();
    response.status(200).send({ status: "success", data: products });
}




