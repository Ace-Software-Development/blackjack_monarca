Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerUser, getAllUsers, modifyUser } = require('../db_abs/user');

/**
   * postIncomingDiskController
   * @description Post new incoming disk registered
   * @param request: values registered by user
   * @param response: status of the post
   */
exports.postUserController = async function (request, response) {
    try {
        console.log(request);
        const user = registerUser(request.body.username, request.body.email, request.body.password, request.body.is_admin);
        await user.save();
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
exports.getAllUsersController = async function (request, response) {
    const users = await getAllUsers();
    response.status(200).send({ status: "success", data: users });
}

/**
   * modifyIncomingDiskController
   * @description Modify incoming disk registered
   * @param request: values modified by user
   * @param response: status of the post
   */
exports.modifyUserController = async function (request, response) {
    try {
        const user = modifyUser(request.body.username, request.body.is_admin, request.body.objectId);
        await user.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}



