const express = require('express');
const router = express.Router();

const trabajadoresController = require('../controller/trabajadores');

router.get('/get', trabajadoresController.getAllTrabajadores);

module.exports = router;