const express = require('express');
const router = express.Router();

const cognitive_bias_controller = require('../controllers/cognitive_bias.controller');

router.get('/test', cognitive_bias_controller.test);
router.get('/get_wikidata', cognitive_bias_controller.get_wikidata);

module.exports = router;
