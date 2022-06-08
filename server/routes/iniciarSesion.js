// CU 9
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const express = require('express');
const router = express.Router();
const path = require('path');

const loginController = require('../controller/logIn');

router.post('/post', loginController.validateLogin);
router.get('/getPermission/:session', loginController.getPermissionController);


module.exports = router;