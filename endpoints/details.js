const https = require('https');
const curator = require('art-curator');
const detailsSimpleRedirect = require('./details-simple-redirect');
exports.redirect = (id, lang, leaveCaseAlone) => {
    return new Promise((resolve, reject) => { 
        const label = id.replace('%E2%80%93','-');
        let singlePageUrl = curator.createSingleWikiMediaPageUrl(label, lang, leaveCaseAlone);
        console.log('1.second detail redirect Url',singlePageUrl);
        let newUrl = singlePageUrl.replace('http','https');
        https.get(newUrl, (wikiRes) => {
            let rawData = '';
            wikiRes.on('data', (chunk) => { rawData += chunk; });
            wikiRes.on('end', () => {
                if (typeof JSON.parse(rawData)['error'] !== 'undefined') {
                    const errData = JSON.parse(rawData)['error']['code'];
                    console.log('2.errData, trying detailsSimpleRedirect',errData);
                    // try a simple redirect
                    detailsSimpleRedirect.redirect(label, lang).then((secondResult) => {
                        console.log('3.using secondResult');
                        resolve(secondResult);
                    });
                    reject(errData);
                } else {
                    let result = JSON.parse(rawData)['parse']['text']['*'];
                    let preamblesRemoved = curator.removeWikiDataPreambles(result);
                    const desc = { 
                        description: preamblesRemoved,
                        'redirectTitle': label 
                    }
                    console.log('4.resolved with redirectTitle label added',label);
                    resolve(desc);
                }
            });
        });
    });
};