const express = require('express');
const router = express.Router();
const { predictCarbon } = require('../controllers/predictionController');

router.post('/carbon', predictCarbon);

module.exports = router;
