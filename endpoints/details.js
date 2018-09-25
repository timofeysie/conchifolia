const https = require('https');
const curator = require('art-curator');
const detailsSimpleRedirect = require('./details-simple-redirect');
exports.redirect = (id, lang, leaveCaseAlone) => {
    console.log('1st lang',req.params.id);
    return new Promise((resolve, reject) => { 
        let singlePageUrl = curator.createSingleWikiMediaPageUrl(req.params.id, req.params.lang, leaveCaseAlone);
        console.log('second redirect Url',singlePageUrl);
        let newUrl = singlePageUrl.replace('http','https');
        https.get(newUrl, (wikiRes) => {
            let rawData = '';
            wikiRes.on('data', (chunk) => { rawData += chunk; });
            wikiRes.on('end', () => {
                if (typeof JSON.parse(rawData)['error'] !== 'undefined') {
                    reject(JSON.parse(rawData)['error']['code'])
                    // try a simple redirect
                    detailsSimpleRedirect.redirect(id, lang).then((secondResult) => {
                        resolve(secondResult);
                    });
                } else {
                    let result = JSON.parse(rawData)['parse']['text']['*'];
                    let preamblesRemoved = curator.removeWikiDataPreambles(result);
                    const desc = { description: preamblesRemoved }
                    resolve(desc);
                }
            });
        });
    });
};