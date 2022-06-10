// CU 26 27 28
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuario');

router.post('/post', usuarioController.postUserController);
router.get('/get', usuarioController.getAllUsersController);
router.post('/modify', usuarioController.modifyUserController);
router.post('/delete', usuarioController.deleteUserController);


module.exports = router;