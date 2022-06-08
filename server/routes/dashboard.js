// CU 21 22 23
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const express = require('express');
const router = express.Router();

const dashboardController = require('../controller/dashboard');

router.get('/ordenes/get', dashboardController.getAllOrdersController);
router.get('/ordenes/getOne/:id', dashboardController.getOrderController);
router.post('/orden/post', dashboardController.postOrderController);
router.post('/orden/modify', dashboardController.modifyOrderController);
router.post('/orden/delete', dashboardController.deleteOrderController);

module.exports = router;