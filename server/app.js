const express = require('express')
const ParseServer = require('parse-server').ParseServer
const app = express();
const roles = require('./routes/role');

// /*********************************************/
// /******************CONFIG*********************/
// /*********************************************/
// var databaseUri = process.env.DATABASE_URI
// if (!databaseUri) {
//     console.log('DATABASE_URI not specified, falling back to localhost.')
// }

/*********************************************/
/*********************************************/
/*******************PARSE*********************/

var api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/mydb',
    appId: 'myAppId',
    masterKey: '36346xv',
    serverURL: 'http://localhost:8888/parse',
    appName: 'appName',
})

app.use('/parse', api)
const parseDashboard = require('./parse/dashboard');
app.use(parseDashboard.url, parseDashboard.dashboard);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Cross-Origin-Resource-Policy', 'same-site');
  res.header("Access-Control-Allow-Credentials", "true ");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  res.header('Cross-Origin-Embedder-Policy', 'credentialless');
  //res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline' *");
  res.header("Content-Security-Policy", "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;");

  next();
});

app.use('/role', roles);

app.use('/',(request, response,next) => {   
  response.status(404).redirect('/role');
});

app.listen(8888);
