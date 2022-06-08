//CU 9
//MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true
authMiddleware.requireLogin = function (req, res, next) {
    // debug(req.session);

    debug('AUTH: ' + req.method + ' ' + req.url);

    var redirectUrl = qs.escape(req.originalUrl);

    // debug(req.session);
    if (req.session.token == undefined) {
        debug('No session token');
        return res.redirect('/account/pub/login?redirect=' + redirectUrl);
    } else {
        debug('Query for session token' + req.session.token);
        Parse.Cloud.useMasterKey();

        var sq = new Parse.Query('_Session')
            .equalTo('sessionToken', req.session.token)
            .include('user');

        sq.first().then(function (sessionResult) {
            if (sessionResult == undefined) {
                debug("No matching session");
                res.redirect('/account/pub/login');
            } else {
                debug("Got matching session");
                req.user = sessionResult.get('user');
                res.locals.session = req.session;
                res.locals.user = req.user;

                next();
            }
        }, function (err) {
            debug("Error or no matching session: " + err);
            res.redirect('/account/pub/login');
        });
    }
};