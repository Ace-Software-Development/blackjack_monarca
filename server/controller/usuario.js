// CU 26 27 28
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerUser, getAllUsers, modifyUser, deleteUser } = require('../db_abs/user');

/**
   * postUserController
   * @description Post new user
   * @param request: values registered by user
   * @param response: status of the post
   */
exports.postUserController = async function (request, response) {
    try {
        const user = registerUser(request.body.username, request.body.email, request.body.password, request.body.is_admin);
        await user.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}

/**
   * getAllUsersController
   * @description Get all existing users from table "Users"
   * @param response: status of the get and values of the query
   */
exports.getAllUsersController = async function (request, response) {
    const users = await getAllUsers();
    response.status(200).send({ status: "success", data: users });
}

/**
   * modifyUserController
   * @description Modify user registered
   * @param request: values modified by user
   * @param response: status of the post
   */
exports.modifyUserController = async function (request, response) {
    try {
        const user = modifyUser(request.body.username, request.body.is_admin, request.body.objectId);
        await user.save(null, { useMasterKey: true });
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}

/**
   * deleteUserController
   * @description Delete user registered
   * @param request: values modified by user
   * @param response: status of the post
   */
exports.deleteUserController = async function (request, response) {
    try {
        const user = deleteUser(request.body.objectId);
        await user.save(null, { useMasterKey: true });
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}
