const curator = require('art-curator');
const https = require('https');
const CognitiveBias = require('../models/cognitive_bias.model');
const mongoose_utils = require('../utilities/mongoose.utils');

exports.test = function (req, res) {
    res.send('Acknowledge the test controller');
};

exports.get_wikidata = exports.product_create = function (req, res) {
  const lang = req.params.lang;
  const wikiUrl = curator.createWikiDataUrl(lang);
    console.log('wikiUrl',wikiUrl);
    https.get(wikiUrl, (wikiRes) => {
        const statusCode = wikiRes.statusCode;
        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
        }
        if (error) {
            console.error(error.message);
            wikiRes.resume();
            return;
        }
        let rawData = '';
        wikiRes.on('data', (chunk) => { rawData += chunk; });
        wikiRes.on('end', () => {
            let result = JSON.parse(rawData)['results']['bindings'];
            let resultArray = [];
            for (let i = 0; i < result.length; i++) {
              let desc = result[i]['cognitive_biasDescription'];
              if (typeof desc !== 'undefined') { desc = result[i]['cognitive_biasDescription']['value']; }
              let item = {
                cognitive_bias: result[i]['cognitive_bias']['value'],
                cognitive_biasLabel: result[i]['cognitive_biasLabel']['value'],
                cognitive_biasDescription: desc,
                lang: result[i]['cognitive_biasLabel']['xml:lang'],
              }
              let report = mongoose_utils.find_bias(item);
              resultArray.push(report);
            }
            let finalResult = { list: resultArray }
            res.status(200).json(finalResult);
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
        if (typeof e.status !== 'undefined') {
          res.status(e.status).send(e.message);
        }
    });
}
