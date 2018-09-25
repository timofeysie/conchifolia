const https = require('https');
const curator = require('art-curator');
exports.redirect = (id, lang) => {
    console.log('id',id);
    console.log('2nd lang',lang);
    return new Promise((resolve, reject) => { 
        let singlePageUrl = 'https://'+lang+'.wikipedia.org/wiki/'+id;
        console.log('redirect Url',singlePageUrl);
        https.get(singlePageUrl, (wikiRes) => {
            let rawData = '';
            wikiRes.on('data', (chunk) => { rawData += chunk; });
            wikiRes.on('end', () => {
                console.log('raw',rawData);
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
                    resolve(rawData);
                }
            });
        });
    });
};