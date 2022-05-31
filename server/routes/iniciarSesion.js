const express = require('express');
const router = express.Router();
const path = require('path');

const loginController = require('../controller/logIn');

router.post('/post', loginController.validateLogin);
router.get('/getPermission/:session', loginController.getPermissionController);


module.exports = router;