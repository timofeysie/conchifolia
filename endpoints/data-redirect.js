const https = require('https');
const curator = require('art-curator');
exports.redirect = (uri) => {
    return new Promise((resolve, reject) => { 
        console.log('data uri',uri);
        https.get(uri, (wikiRes) => {
            let rawData = '';
            wikiRes.on('data', (chunk) => { rawData += chunk; });
            wikiRes.on('end', () => {
                //console.log('wikiRes',wikiRes);
                try {
                    console.log('message-10: resolve raw data');
                    resolve(rawData);
                } catch (error) {
                    // in this case 
                    console.log('error-10:',error);
                    reject('user-data-uri');
                }
            });
        });
    });
};