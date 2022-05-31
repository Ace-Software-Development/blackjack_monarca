const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();
const bodyParser = require('body-parser');
const roles = require('./routes/role');
const entrega = require('./routes/entrega');
const discos = require('./routes/entradaDiscos');
const entradaDiscos = require('./routes/visualizarEntradaDiscos');
const iniciarSesion = require('./routes/iniciarSesion');

const confirmar = require('./routes/confirmar');
const producto = require('./routes/producto');

app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))
var cors = require('cors');
app.use(cors());

// /*********************************************/
// /******************CONFIG*********************/
// /*********************************************/
var databaseUri = process.env.DATABASE_URI
if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.')
}

/*********************************************/
/*********************************************/
/*******************PARSE*********************/

var api = new ParseServer({
  databaseURI: process.env.DATABASE_URI,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL,
  appName: process.env.APP_NAME,
})

app.use('/parse', api)
const parseDashboard = require('./parse/dashboard');
app.use(parseDashboard.url, parseDashboard.dashboard);

app.use(function (req, res, next) {
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
app.use('/entrega', entrega);
app.use('/discos', discos);
app.use('/entradaDiscos', entradaDiscos);
app.use('/login', iniciarSesion);
app.use('/confirmar', confirmar);
app.use('/producto', producto);

app.listen(8888);
