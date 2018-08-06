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
                    cognitive_biasLabel: result[i]['cognitive_biasLabel']['value'],
                    cognitive_biasDescription: desc,
                    lang: result[i]['cognitive_biasLabel']['xml:lang'],
                  }
                  resultArray.push(item);
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
  })
  .get("/api/wiki-list/:id", function(req, res) {
    if (req.method === 'OPTIONS') {
      console.log('!OPTIONS');
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end();
    } else {
      const wikiMediaUrl = curator.createWikiMediaUrl(req.params.id);
      console.log('wikiMediaUrl',wikiMediaUrl);
      let newUrl = wikiMediaUrl.replace('http','https');
      https.get(newUrl, (wikiRes) => {
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
          res.status(200).send(rawData);
        });
      }).on('error', (e) => {
          console.error(`Got error: ${e.message}`);
          if (typeof e.status !== 'undefined') {
            res.status(e.status).send(e.message);
          }
      });
    }
  })
  .get("/api/detail/:id", function(req, res) {
    console.log('id',req.params.id);
    let singlePageUrl = curator.createSingleWikiMediaPageUrl(req.params.id);
        let newUrl = singlePageUrl.replace('http','https');
        https.get(newUrl, (wikiRes) => {
            let rawData = '';
            wikiRes.on('data', (chunk) => { rawData += chunk; });
            wikiRes.on('end', () => {
              try {
                let result = JSON.parse(rawData)['parse']['text']['*'];
                let preamblesRemoved = curator.removeWikiDataPreambles(result);
                const desc = { description: preamblesRemoved }
                res.status(200).json(desc);
              } catch (err) {
                console.log('wikiRes.headers',wikiRes.headers);
                console.log('Url:',newUrl);
                res.status(500).send('No data in response:'+wikiRes);
              }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
            res.status(e.status).send('server error',e.message);
        });
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

var getKeys = function(obj){
  var keys = [];
  for(var key in obj){
     keys.push(key);
  }
  return keys;
}
