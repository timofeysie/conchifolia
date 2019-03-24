const CognitiveBias = require('../models/cognitive_bias.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Acknowledge the test controller');
};
