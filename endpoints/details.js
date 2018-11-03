const https = require('https');
const curator = require('art-curator');
const detailsSimpleRedirect = require('./details-simple-redirect');
exports.redirect = (label, lang, leaveCaseAlone) => {
    console.log('problem lang',lang)
    return new Promise((resolve, reject) => { 
        let singlePageUrl = curator.createSingleWikiMediaPageUrl(label, lang, leaveCaseAlone);
        let newUrl = singlePageUrl.replace('http','https');
        console.log('singlePageUrl newUrl',newUrl);
        https.get(newUrl, (wikiRes) => {
            let rawData = '';
            wikiRes.on('data', (chunk) => { rawData += chunk; });
            wikiRes.on('end', () => {
                if (typeof JSON.parse(rawData)['error'] !== 'undefined') {
                    const errData = JSON.parse(rawData)['error']['code'];
                    console.log('2.errData, trying detailsSimpleRedirect',errData);
                    // try a simple redirect
                    detailsSimpleRedirect.redirect(label, lang).then((secondResult) => {
                        resolve(secondResult);
                    });
                    reject(errData);
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