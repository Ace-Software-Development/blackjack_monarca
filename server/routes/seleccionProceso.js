const express = require('express');
const router = express.Router();
const path = require('path');

const seleccionController = require('../controller/seleccionProceso');

router.get('/inicio',seleccionController.goProcess());

module.exports = router;