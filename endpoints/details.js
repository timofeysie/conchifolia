const https = require('https');
const curator = require('art-curator');
exports.redirect = (id, lang, leaveCaseAlone) => {
    return new Promise((resolve, reject) => { 
        let singlePageUrl = encodeURI(curator.createSingleWikiMediaPageUrl(id, lang, leaveCaseAlone));
        console.log('redirect Url',singlePageUrl);
        let newUrl = singlePageUrl.replace('http','https');
        https.get(newUrl, (wikiRes) => {
            let rawData = '';
            wikiRes.on('data', (chunk) => { rawData += chunk; });
            wikiRes.on('end', () => {
                let result = JSON.parse(rawData)['parse']['text']['*'];
                let preamblesRemoved = curator.removeWikiDataPreambles(result);
                const desc = { description: preamblesRemoved }
                resolve(desc);
            });
        });
    });
};