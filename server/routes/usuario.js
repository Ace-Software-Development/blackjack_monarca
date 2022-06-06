const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuario');

router.post('/post', usuarioController.postUserController);
router.get('/get', usuarioController.getAllUsersController);
router.post('/modify', usuarioController.modifyUserController);
router.post('/delete', usuarioController.deleteUserController);


module.exports = router;