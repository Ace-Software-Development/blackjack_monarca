Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerWorker, getAllWorkersWOP, modifyWorker, deleteWorker } = require('../db_abs/worker');

/**
   * postIncomingDiskController
   * @description Post new incoming disk registered
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
   * getAllDisksController
   * @description Get all existing disks from table "Disks"
   * @param response: status of the get and values of the query
   */
exports.getAllWorkersWOPController = async function (request, response) {
    const workers = await getAllWorkersWOP();
    response.status(200).send({ status: "success", data: workers });
}

/**
   * modifyIncomingDiskController
   * @description Modify incoming disk registered
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




