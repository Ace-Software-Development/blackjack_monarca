Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerBuyer, getAllBuyer, modifyBuyer, deleteBuyer } = require('../db_abs/buyer');

/**
   * postWorkerController
   * @description Post new worker registered
   * @param request: values registered by user
   * @param response: status of the post
   */
exports.postBuyerController = async function (request, response) {
    try {
        console.log(request);
        const worker = registerBuyer(request.body.name, request.body.nick_name, request.body.id_process);
        await worker.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}

/**
   * getAllWorkersWOPController
   * @description Get all existing workers from table "Workers"
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
        const worker = modifyBuyer(request.body.name, request.body.nick_name, request.body.id_process, request.body.objectId);
        await worker.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}

/**
   * deleteWorkerController
   * @description Delete worker registered
   * @param request: values modified by user
   * @param response: status of the post
   */
exports.deleteBuyerrController = async function (request, response) {
    try {
        const worker = deleteBuyer(request.body.objectId);
        await worker.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}




