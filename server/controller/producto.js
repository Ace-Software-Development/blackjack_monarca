// CU 34 35 36 37 13 17 18
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllProducts, modifyProductInventory, getProductById, modifyProduct, postProduct, deleteProduct } = require('../db_abs/product');

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
   try {
      const products = modifyProductInventory(request.body.with_lid, request.body.withOut_lid, request.body.objectId);
      await products.save();
      response.status(200).send({ status: "success", data: products });
   } catch (error) {
      console.error(error.message);
      return (response.status(500).send({ status: "can't save" }));
   }
}
/**
   * postProductController
   * @description Creatre new product
   * @param response: status of the get and values of the query
   */
exports.postProductController = async function (request, response) {
   try {
      const product = postProduct(request.body.category, request.body.model, request.body.aluminium, request.body.keyP);
      await product.save();
   } catch (error) {
      console.error(error.message);
      return (response.status(500).send({ status: "can't save" }));
   }
   response.status(200).send({ status: "success" });
}

/**
   * modifyProductController
   * @description Modify quantity packaged products from table "Products"
   * @param response: status of the get and values of the query
   */
exports.modifyProductController = async function (request, response) {
   try {
      const products = modifyProduct(request.body.objectId, request.body.category, request.body.model, request.body.aluminium, request.body.keyP);
      await products.save();
      response.status(200).send({ status: "success", data: products });
   } catch (error) {
      console.error(error.message);
      return (response.status(500).send({ status: "can't save" }));
   }
}

/**
   * deleteProductController
   * @description Delete product
   * @param response: status of the get and values of the query
   */
exports.deleteProductController = async function (request, response) {
   try {
      const products = deleteProduct(request.body.objectId);
      await products.save();
      response.status(200).send({ status: "success", data: products });
   } catch (error) {
      console.error(error.message);
      return (response.status(500).send({ status: "can't save" }));
   }
}

/**
   * getProductByIdController
   * @description Gets the product by the id
   * @param response: status of the get and values of the query
   */
exports.getProductByIdController = async function (request, response) {
   const id = request.params.id;
   const products = await getProductById(id);
   response.status(200).send({ status: "success", data: products });
}
