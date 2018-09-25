const https = require('https');
const curator = require('art-curator');
exports.redirect = (uri, lang) => {
    return new Promise((resolve, reject) => { 
        console.log('data uri',uri);
        https.get(uri, (wikiRes) => {
            let rawData = '';
            wikiRes.on('data', (chunk) => { rawData += chunk; });
            wikiRes.on('end', () => {
                console.log('wikiRes',wikiRes);
                try {
                    resolve(rawData);
                } catch (errors) {
                    // in this case 
                    reject('user-data-uri');
                }
            });
        });
    });
};