const express = require('express');
const router = express.Router();

const mermaController = require('../controller/merma');

router.get('/:process/get', mermaController.getAllMerma);

module.exports = router;