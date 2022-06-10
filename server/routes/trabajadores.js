// CU 4
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

express = require('express');
const router = express.Router();

const trabajadoresController = require('../controller/trabajadores');

router.get('/get', trabajadoresController.getAllTrabajadores);

module.exports = router;