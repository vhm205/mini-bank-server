const express = require('express');
const router = express.Router();
const { customerController } = require('../controllers');

router.post('/create', customerController.create);
router.get('/info', customerController.getInfo);

module.exports = router;
