const express = require('express')
const bodyParser = require("body-parser");
const path = require('path')
const PORT = process.env.PORT || 5000

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
    res.status(200).json({"list": [
      {
        "name": "string1",
        "description": "string1"
      }, {
        "name": "string2",
        "description": "string2"
      }
    ]});
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
