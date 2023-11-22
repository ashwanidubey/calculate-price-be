const express = require('express');
const router = express.Router();
const price = require('../functions/price');

// calculate route
router.post('/calculate', price.calculate);

// config route
router.post('/config', price.config);


module.exports = router;