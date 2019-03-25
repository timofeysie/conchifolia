const express = require('express')
const bodyParser = require("body-parser");
const path = require('path')
const PORT = process.env.PORT || 5000
const curator = require('art-curator');
const https = require('https');
const details = require('./endpoints/details');
const dataRedirect = require('./endpoints/data-redirect');
const detailsSimpleRedirect = require('./endpoints/details-simple-redirect');
const cognitive_bias = require('./routes/cognitive_bias.route');
require('dotenv').config();

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

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};

// Set up mongoose connection
const mongoose = require('mongoose');
let mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .use(allowCrossDomain)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use('/cognitive_bias', cognitive_bias)
  .get('/api/list/:lang', function(req, res) {
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
  .get('/api/wiki-list/:id/:lang', function(req, res) {
    if (req.method === 'OPTIONS') {
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      //headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = true;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end();
    } else {
      const wikiMediaUrl = curator.createWikiMediaUrl(req.params.id, req.params.lang);
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
  .get('/api/data/query/:label/:lang', function(req, res) {
    if (req.method === 'OPTIONS') {
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      //headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = true;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end();
    } else {
      let label = req.params.label.replace('%20',' ');
      console.log('req.params.label',label);
      console.log('req.params.lang',req.params.lang);
      const wikiDataUrl = curator.createWikiDataItemUrl(label, req.params.lang);
      console.log('wikiDataUrl',wikiDataUrl);
      https.get(wikiDataUrl, (wikiRes) => {
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
  .get('/api/data/:id/:lang', function(req, res) {
    const wikiDataUrl = req.params.id.split('*').join('/');
    const newUrl = wikiDataUrl.replace('http','https');
    console.log('wikiDataUrl',newUrl);
    https.get(newUrl, (wikiRes) => {
      const statusCode = wikiRes.statusCode;
      let error;
      if (statusCode !== 200 && statusCode !== 303) {
          error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
;      }
      if (error) {
          console.error('error-0.5:',error.message);
          wikiRes.resume();
          return;
      }
      let rawData = '';
      wikiRes.on('data', (chunk) => { rawData += chunk; });
      wikiRes.on('end', () => {
        // find redirect uri
        const marker = rawData.indexOf('<a href="');
        const segment = rawData.substring(marker+'<a href="'.length,rawData.length);
        const marker2 = segment.indexOf('"');
        let redirectUri = segment.substring(0,marker2);
        console.log('data redirectUri',redirectUri);
        dataRedirect.redirect(redirectUri).then((result) => {
          console.log('data result',result);
        }).catch((error) => {
          console.log('error-1:',error);
        });
        res.status(200).send(rawData);
      });
    }).on('error', (e) => {
        console.error(`error-2: ${e.message}`);
        if (typeof e.status !== 'undefined') {
          res.status(e.status).send(e.message);
        }
    });
  })
  .get('/api/detail/:id/:lang/:leaveCaseAlone', function(req, res) {
    const lang = req.params.lang;
    const id = req.params.id;
    let leaveCaseAloneParam = req.params.leaveCaseAlone.toString();
    const leaveCaseAlone = (leaveCaseAloneParam == 'true');
    let singlePageUrl = encodeURI(curator.createSingleWikiMediaPageUrl(id,lang,leaveCaseAlone));
    let newUrl = singlePageUrl.replace('http','https');
    console.log('singlePageUrl',singlePageUrl);
    https.get(newUrl, (wikiRes) => {
        let rawData = '';
        wikiRes.on('data', (chunk) => { rawData += chunk; });
        wikiRes.on('end', () => {
          try {
            //console.log('raw data',rawData);
            let result = JSON.parse(rawData)['parse']['text']['*'];
            let preamblesRemoved = curator.removeWikiDataPreambles(result);
            const desc = { description: preamblesRemoved }
            // check to see if this is a re-direct page
            if (preamblesRemoved.indexOf('<div class="redirectMsg">') !== -1) {
                const anchorIndex = preamblesRemoved.indexOf('<a href="');
                if (anchorIndex !== -1) {
                const anchorToEnd = preamblesRemoved.substring(anchorIndex+'<a href="/wiki/'.length, preamblesRemoved.length);
                const anchor = anchorToEnd.substring(0, anchorToEnd.indexOf('"'));
                console.log('singlePageUrl redirect anchor',anchor);
                details.redirect(anchor, lang, leaveCaseAlone).then((rug) => {
                  res.status(200).json(rug);
                }).catch((errors) => {
                  console.log('errors-3:',errors);
                  res.status(500).send('Error code:'+errors);
                })
              } else {
                  console.log('4. redirect without href?');
                  res.status(500).json('4. redirect without href');
              }
            } else {
              // this happens for automation_bias & the
              // page=observer-expectancy_effect WikiData item value re-direct
              console.log('5. WikiData item value re-direct?');
              res.status(200).json(desc);
            }
          } catch (err) {
            detailsSimpleRedirect.redirect(id, lang).then((secondResult) => {
              res.status(200).json(secondResult);
            }).catch((error) => {
              if (error === 'user-data-uri') {
                res.status(300).send('Redirect to data uri value');
              } else {
                console.log('6. No data in response ============',error);
                console.log('wikiRes.headers',wikiRes.headers);
                console.log('Url:',newUrl);
                res.status(500).send('No data in response:'+wikiRes);
              }
            });
          }
      });
    }).on('error', (e) => {
        console.error(`error-7: ${e.message}`);
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
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({'error-8:': message});
}

var getKeys = function(obj){
  var keys = [];
  for(var key in obj){
     keys.push(key);
  }
  return keys;
}
