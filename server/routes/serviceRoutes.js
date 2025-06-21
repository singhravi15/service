const serviceController = require('../controllers/serviceControllers.js');
const express = require('express');
const router = express.Router();
router.post('/services', serviceController.createService);
router.get('/services', serviceController.getAllServices);

module.exports = router;