// CU 9
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const { getPermission } = require('../db_abs/role');

Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;

/**-
   * validateLogin
   * @description Receives the login info as a post 
   * @param request: credentials for authentication
   * @param response: status of the post
   */
 exports.validateLogin = async function (request, response) {
    var user = Parse.User
        .logIn(request.body.username, request.body.password).then(function (user) {
            const sessionToken = user.getSessionToken();
            const admin = user.attributes.is_admin;
            const json = { sessionToken: sessionToken, is_admin: admin };
            if (sessionToken) {

                response.status(200).send(json);
            }
            else {
                response.status(403).send();
            }
        }).catch(function (error) {
            response.status(403).send();
        });
}

/**
   * getPermissionController
   * @description Receives the session token of current user as a get 
   * @param request: Session token
   * @param response: True if the token is valid and false if invalid
   */
exports.getPermissionController = async function (request, response) {
    const sessionToken = request.params.session;
    try {
        const result = await getPermission(sessionToken);

        if (result === undefined) {
            response.status(200).send({ status: "success", data: false });
        }
        response.status(200).send({ status: "success", data: true });
    } catch (error) {
        response.status(403).send(error);
    }
}





