const https = require('https');
const curator = require('art-curator');
exports.redirect = (id, lang) => {
    return new Promise((resolve, reject) => { 
        let singlePageUrl = 'https://'+lang+'.wikipedia.org/wiki/'+encodeURI(id);
        console.log('details simple redirect Url',singlePageUrl);
        https.get(singlePageUrl, (wikiRes) => {
            let rawData = '';
            wikiRes.on('data', (chunk) => { rawData += chunk; });
            wikiRes.on('end', () => {
                try {
                    if (typeof JSON.parse(rawData)['error'] !== 'undefined') {
                        reject(JSON.parse(rawData)['error']['code'])
                    } else {
                        let result = JSON.parse(rawData)['parse']['text']['*'];
                        let preamblesRemoved = curator.removeWikiDataPreambles(result);
                        const desc = { description: preamblesRemoved }
                        resolve(desc);
                    }
                } catch (errors) {
                    // in this case 
                    reject('user-data-uri');
                }
            });
        });
    });
};