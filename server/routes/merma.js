const express = require('express');
const router = express.Router();

const mermaController = require('../controller/merma');

router.get('/:process/get', mermaController.getAllMerma);
router.get('/:startDay/:endDay/get', mermaController.getAllMermaDate);

module.exports = router;