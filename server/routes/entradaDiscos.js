// CU 42 6 2
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const express = require('express');
const router = express.Router();
const path = require('path');

const discosController = require('../controller/entradaDiscos');
const cors = require('cors');

router.post('/post', discosController.postIncomingDiskController);
router.get('/get', discosController.getAllDisksController);
router.post('/modificar', discosController.modifyIncomingDiskController);

module.exports = router;