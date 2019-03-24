const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CognitiveBiasSchema = new Schema({
    cognitive_bias: {type: String, requred: true, max: 300},
    cognitive_biasLabel: {type: String, required: false, max: 300},
    lang: {type: String, required: false, max: 50}
});


// Export the model
module.exports = mongoose.model('CognitiveBias', CognitiveBiasSchema);
