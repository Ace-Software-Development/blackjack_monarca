const express = require('express');
const router = express.Router();
const path = require('path');

const loginController = require('../controller/logIn');

router.post('/post', loginController.validateLogin);


module.exports = router;