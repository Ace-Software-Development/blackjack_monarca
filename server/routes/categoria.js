// CU 38 40 41
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const express = require('express');
const router = express.Router();

const categoriaController = require('../controller/categoria');

router.post('/post', categoriaController.postCategoryController);
router.post('/modify', categoriaController.modifyCategoryController);
router.post('/delete', categoriaController.deleteCategoryController);


module.exports = router;