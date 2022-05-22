Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;

/**
   * validateLogin
   * @description Receives the login info as a post 
   * @param request: credentials for authentication
   * @param response: status of the post
   */
exports.validateLogin = async function (request, response){
        var user = Parse.User
        .logIn(request.body.username, request.body.password).then(function(user) {
            const sessionToken = user.getSessionToken();
            response.send({sessionToken: sessionToken, user: user}).status(200).send();
    }).catch(function(error){
        response.status(403).send();
    });

   
   
}





