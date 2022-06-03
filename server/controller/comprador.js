Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerBuyer, getAllBuyer, modifyBuyer, deleteBuyer } = require('../db_abs/buyer');

/**
   * postBuyerController
   * @description Post new buyer  registered
   * @param request: values registered by user
   * @param response: status of the post
   */
exports.postBuyerController = async function (request, response) {
    try {
        console.log(request);
        const worker = registerBuyer(request.body.name, request.body.mail, request.body.city, request.body.phone);
        await worker.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}

/**
   * getAllBuyerController
   * @description Get all existing buyers from table "buyers"
   * @param response: status of the get and values of the query
   */
exports.getAllBuyerController = async function (request, response) {
    const workers = await getAllBuyer();
    response.status(200).send({ status: "success", data: workers });
}

/**
   * modifyWorkerController
   * @description Modify incoming worker registered
   * @param request: values modified by user
   * @param response: status of the post
   */
exports.modifyBuyerController = async function (request, response) {
    try {
        const worker = modifyBuyer(request.body.name, request.body.mail, request.body.city, request.body.phone, request.body.objectId);
        await worker.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}

/**
   * deleteBuyerController
   * @description Delete buyer registered
   * @param request: values selected by user
   * @param response: status of the post
   */
exports.deleteBuyerController = async function (request, response) {
    try {
        const buyer = deleteBuyer(request.body.objectId);
        await buyer.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}




