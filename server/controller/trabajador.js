Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerWorker, getAllWorkersWOP, modifyWorker, deleteWorker } = require('../db_abs/worker');

/**
   * postWorkerController
   * @description Post new worker registered
   * @param request: values registered by user
   * @param response: status of the post
   */
exports.postWorkerController = async function (request, response) {
    try {
        console.log(request);
        const worker = registerWorker(request.body.name, request.body.nick_name, request.body.id_process);
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
exports.getAllWorkersWOPController = async function (request, response) {
    const workers = await getAllWorkersWOP();
    response.status(200).send({ status: "success", data: workers });
}

/**
   * modifyWorkerController
   * @description Modify incoming worker registered
   * @param request: values modified by user
   * @param response: status of the post
   */
exports.modifyWorkerController = async function (request, response) {
    try {
        const worker = modifyWorker(request.body.name, request.body.nick_name, request.body.id_process, request.body.objectId);
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
exports.deleteWorkerController = async function (request, response) {
    try {
        const worker = deleteWorker(request.body.objectId);
        await worker.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}




