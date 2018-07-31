const express = require('express')
const bodyParser = require("body-parser");
const path = require('path')
const PORT = process.env.PORT || 5000
const curator = require('art-curator');
const https = require('https');

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get("/api/list", function(req, res) {
    const wikiUrl = curator.createWikiDataUrl();
        console.log('bias',wikiUrl);
        https.get(wikiUrl, (wikiRes) => {
            const statusCode = wikiRes.statusCode;
            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                                `Status Code: ${statusCode}`);
            }
            if (error) {
                console.error(error.message);
                // consume response data to free up memory
                wikiRes.resume();
                return;
            }
            let rawData = '';
            wikiRes.on('data', (chunk) => { rawData += chunk; });
            wikiRes.on('end', () => {
                //console.log('raw',rawData);
                let result = JSON.parse(rawData)['results']['bindings'];
                //console.log('wiki result',result);
                let resultArray = [];
                for (let i = 0; i < result.length; i++) {
                  let desc = result[i]['cognitive_biasDescription'];
                  if (typeof desc !== 'undefined') {
                    desc = result[i]['cognitive_biasDescription']['value'];
                  }
                  let item = {
                    cognitive_biasLabel: result[i]['cognitive_biasLabel']['value'],
                    cognitive_biasDescription: desc,
                    lang: result[i]['cognitive_biasLabel']['xml:lang'],
                  }
                  if (i===1) {
                    console.log('item',item);
                  }
                  resultArray.push(item);
                }
                let finalResult = {
                  list: resultArray
                }
                res.send(finalResult);
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
  })
  .get("/api/detail/:id", function(req, res) {
    console.log('id',req.params.id);
    res.status(200).json(
      {
        "name": "string1",
        "description": "string1"
      }
    );
  })
  .get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
      res.sendFile(path.resolve(`views/my-dream-app/${req.url}`));
    } else {
      res.sendFile(path.resolve('views/my-dream-app/index.html'));
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
