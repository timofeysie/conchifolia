const CognitiveBias = require('../models/cognitive_bias.model');

exports.bias_create = function (item) {
    let bias = new CognitiveBias({
          cognitive_bias: item.cognitive_bias,
          cognitive_biasLabel: item.cognitive_biasLabel,
          cognitive_biasDescription: item.cognitive_biasDescription,
          lang: item.lang
    });
    bias.save(function (err) {
        if (err) {
            return next(err);
        }
        return('Bias Created successfully')
    });
};

exports.find_bias = function (item) {
    CognitiveBias.find({cognitive_bias: item.cognitive_bias}, function (err, found) {
        if (err) {
          console.log('error',err.message);
          //return next(err);
          return null;
        } else {
          console.log('found',item.cognitive_biasLabel);
          return 'found'+item.cognitive_biasLabel;
        }
    })
};
