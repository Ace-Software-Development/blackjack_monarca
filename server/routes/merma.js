// CU 20
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const express = require('express');
const router = express.Router();

const mermaController = require('../controller/merma');

router.get('/:process/get', mermaController.getAllMerma);
router.get('/:startDay/:endDay/get', mermaController.getAllMermaDate);

module.exports = router;