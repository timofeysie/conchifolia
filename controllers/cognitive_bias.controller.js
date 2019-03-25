const CognitiveBias = require('../models/cognitive_bias.model');

exports.test = function (req, res) {
    res.send('Acknowledge the test controller');
};

exports.bias_create = function (data) {
    let bias = new CognitiveBias(
        {
          cognitive_bias: data.cognitive_bias,
          cognitive_biasLabel: data.cognitive_biasLabel,
          lang: data.lang
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        return('Product Created successfully')
    })
};
