const express = require('express');
const router = express.Router();

const categoriaController = require('../controller/categoria');

router.post('/post', categoriaController.postCategoryController);
router.post('/modify', categoriaController.modifyCategoryController);
router.post('/delete', categoriaController.deleteCategoryController);


module.exports = router;