const express = require('express');
const router = express.Router();

const discoController = require('../controller/disco');

router.post('/post', discoController.postDiskController);
router.post('/modify', discoController.modifyDiskController);
router.post('/delete', discoController.deleteDiskController);


module.exports = router;