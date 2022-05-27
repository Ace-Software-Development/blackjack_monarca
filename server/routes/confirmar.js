const express = require('express');
const router = express.Router();

const confirmarController = require('../controller/confirmar');

router.get('/get/:id_process', confirmarController.getConfirmarController);
router.get('/incident/get', confirmarController.getConfirmarIncidenteController);
router.get('/getOne/:id_register', confirmarController.getOneConfirmarController);
router.post('/post', confirmarController.postConfirmarController);


module.exports = router;