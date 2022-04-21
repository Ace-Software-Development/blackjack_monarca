const express = require('express');
const router = express.Router();
const path = require('path');

const roleController = require('../controller/role');

router.get('/', roleController.getRole);

module.exports = router;