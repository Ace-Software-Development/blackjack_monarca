// CU 43 44 45
//MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerDisk, modifyDisk, deleteDisk } = require('../db_abs/disk');

/**
   * postDiskController
   * @description Post new disk
   * @param request: values registered by user
   * @param response: status of the post
   */
exports.postDiskController = async function (request, response) {
    try {
        const disk = registerDisk(request.body.name);
        await disk.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}

/**
   * modifyDiskController
   * @description Modify disk registered
   * @param request: values modified by user
   * @param response: status of the post
   */
exports.modifyDiskController = async function (request, response) {
    try {
        const disk = modifyDisk(request.body.name, request.body.objectId);
        await disk.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}

/**
   * deleteDiskController
   * @description Delte disk registered
   * @param request: values object id
   * @param response: status of the post
   */
exports.deleteDiskController = async function (request, response) {
    try {
        const disk = deleteDisk(request.body.objectId);
        await disk.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}




