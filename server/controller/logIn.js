const { getRole } = require('../db_abs/role');

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
            const admin = user.attributes.is_admin
            const json = { sessionToken: sessionToken, is_admin: admin };
            if (sessionToken) {

                response.status(200).send(json);
            }
        }).catch(function (error) {
            response.status(403).send();
        });



}





