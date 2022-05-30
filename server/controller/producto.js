Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerProductInventory, getAllProducts, modifyProductInventory } = require('../db_abs/product');

/**
   * postIncomingDiskController
   * @description Post new incoming disk registered
   * @param request: values registered by user
   * @param response: status of the post
   */
exports.postProductInventoryController = async function (request, response) {
    try {
        console.log(request);
        const worker = registerProductInventory(request.body.name, request.body.nick_name, request.body.id_process);
        await worker.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
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

/**
   * modifyIncomingDiskController
   * @description Modify incoming disk registered
   * @param request: values modified by user
   * @param response: status of the post
   */
exports.modifyProductInventoryController = async function (request, response) {
    try {
        const worker = modifyProductInventory(request.body.name, request.body.nick_name, request.body.id_process, request.body.objectId);
        await worker.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}


