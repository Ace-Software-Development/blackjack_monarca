// CU 29 30 31 33
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const express = require('express');
const router = express.Router();

const trabajadorController = require('../controller/trabajador');

router.post('/post', trabajadorController.postWorkerController);
router.get('/get', trabajadorController.getAllWorkersWOPController);
router.post('/modify', trabajadorController.modifyWorkerController);
router.post('/delete', trabajadorController.deleteWorkerController);


module.exports = router;