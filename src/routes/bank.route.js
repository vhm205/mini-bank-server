const express = require('express');
const router = express.Router();
const { bankController } = require('../controllers');

router.post('/create', bankController.create);
router.post('/create-card', bankController.createCard);
router.post('/transfer', bankController.transfer);

module.exports = router;
