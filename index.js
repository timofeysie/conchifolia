const express = require('express')
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
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
      res.sendFile(path.resolve(`views/my-dream-app/${req.url}`));
    } else {
      res.sendFile(path.resolve('views/my-dream-app/index.html'));
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
