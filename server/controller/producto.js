Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllProducts, modifyProductInventory } = require('../db_abs/product');

/**
   * postProductInventoryController
   * @description Post number of packaged parts in database
   */
exports.postProductInventoryController = async function (request, response) {
   try {

      const model = new Parse.Query("Product");
      model.equalTo('objectId', request.body.model);

      let result = await model.first();

      result.set("with_lid", result.get("with_lid") + parseInt(request.body.numberWithLid));
      result.set("withOut_lid", result.get("withOut_lid") + parseInt(request.body.numberWithOutLid));

      await result.save();

      response.status(200).send({ status: "success", data: result });
   } catch {
      response.status(500).send({ status: "can't save" })
   }
}


/**
   * getAllProductsController
   * @description Get all existing products from table "Products"
   * @param response: status of the get and values of the query
   */
exports.getAllProductsController = async function (request, response) {
   const products = await getAllProducts();
   response.status(200).send({ status: "success", data: products });
}

/**
   * modifyProductInventoryController
   * @description Modify quantity packaged products from table "Products"
   * @param response: status of the get and values of the query
   */
exports.modifyProductInventoryController = async function (request, response) {
   const products = await modifyProductInventory();
   response.status(200).send({ status: "success", data: products });
}




