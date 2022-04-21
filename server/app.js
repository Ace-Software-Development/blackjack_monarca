
const express = require('express')
const app = express();

const roles = require('./routes/role');
app.use('/role', roles);

app.use('/',(request, response,next) => {   
  response.status(404).redirect('/role');
});

app.listen(8888);
