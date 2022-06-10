// CU 24
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const express = require('express');
const router = express.Router();

const confirmarController = require('../controller/confirmar');

router.get('/get/:id_process', confirmarController.getConfirmarController);
router.get('/incident/get', confirmarController.getConfirmarIncidenteController);
router.get('/incident/:id_register/get', confirmarController.getConfirmarIncidenteProductController);
router.get('/getOne/:id_register', confirmarController.getOneConfirmarController);
router.post('/post', confirmarController.postConfirmarController);


module.exports = router;