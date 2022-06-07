const express = require('express');
const router = express.Router();

const trabajadorController = require('../controller/trabajador');

router.post('/post', trabajadorController.postWorkerController);
router.get('/get', trabajadorController.getAllWorkersWOPController);
router.post('/modify', trabajadorController.modifyWorkerController);
router.post('/delete', trabajadorController.deleteWorkerController);


module.exports = router;