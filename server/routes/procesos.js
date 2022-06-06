const express = require('express');
const router = express.Router();

const procesosController = require('../controller/procesos');

router.get('/get', procesosController.getAllProcesos);

module.exports = router;