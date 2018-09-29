# Conchifolia


A NodeJS server app with a combined Angular client.

The app is available at [this location](https://radiant-springs-38893.herokuapp.com/).

This the pure Angular version of the WikiData parsing project that has an identical implementations in Ionic 4, React Native, and now Angular 6.  Next will be a pure React 16 version of the app.

[React Native version](https://github.com/timofeysie/teretifolia)


[Ionic 4 version](https://github.com/timofeysie/loranthifolia)


This is the Angular 6 version

All of these apps rely on the [Curator](https://github.com/timofeysie/curator), a [npm library](https://npms.io/search?q=art-curator) that provides shared tools for working with WikiData and WikiMedia content.




#

## Table of Contents

1. [Setup and Workflow](#setup-and-sorkflow)
1. [Planned features](#planned-features)
1. [Parsing WikiData subject pages](#parsing-WikiData-subject-pages)
1. [Re-factoring the NodeJS app](#re-factoring-the-nodeJS-app)
1. [Automatic detail re-directs](#Automatic-detail-re-directs)
1. [Fixing the unit tests](#fixing-the-unit-tests)
1. [Detail page errors](#detail-page-errors)
1. [Item State](#item-atate)
1. [Implementing a spinner](#implementing-a-spinner)
1. [Scroll position restoration](#Scroll-position-restoration)
1. [Handling CORS preflight options](#handling-cors-preflight-options)
1. [Local storage options](#local-storage-options)
1. [Adding WikiMedia Items to the list](#adding-wikimedia-items-to-the-list)
1. [Detail page issues](#detail-page-issues)
1. [Creating full links](#ceating-full-links)
1. [Implementing detail page routing](#implementing-detail-page-routing)
1. [Creating the Angular Service](#creating-the-angular-service)
1. [The Beginning](#the-beginning)
1. [Previous Floating Fjord](#previous-floating-fjord)
1. [Deploying to Heroku](#deploying-to-heroku)
1. [Documentation](#documentation)

#

## Setup and Workflow

Start the server with ```npm start```.  Build the Angular project served in the app directory using the ```ng build``` command.  To install this app, ```npm i``` must be run in each of these locations.


## Planned features

Planned features include:

1. settings page
1. done: language change option
1. bookmark the last viewed item
1. let the user build a short description
1. swipe right to see short description
1. swipe up/down on the short description to send the item to the top/bottom of the list
1. swipe right to remove it from the list
1. metrics for the list (number of removed items out of total items)
1. detail page metrics (number of preambles, expand/contract preambles, footnotes)
1. create a new category
1. component style library shared by all the app
1. capture link title and create an 'also known as' section from other sources.
1. done: allow user to clear the local storage
1. Track how many times item desc and details have been used.  
1. Export xAPI actions



## Parsing WikiData subject pages

Using the WikiData subject page to get language and potential backup links caused a bit of a problem while refactoring the NodeJS app.  At least two Korean items failed to find any valid re-direct despite having a potentially working link (that works in the browser).

We can however get available languages from the WikiData subject page's Wikipedia section.  So before solving the Korean re-directs for some items, this is what we are working on.

To accomplish this task we need for data page links.  Right now we only get those from the WikiData query results, not the WikiMedia section lists.  We should be able to get the Q-code from the sections also.  But actually, those Q-codes are not included on the list of cognitive biases Wikipedia page.  How about the Wikipedia detail page?

Looking at the detail page for first item on the list:
```
http://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=acquiescence_bias
```

We see this in the JSON:
```
"title":"Acquiescence bias",
"pageid":9092040,
```

Using 9092040 as a possible Q-code/idm we get this:
```
wikiDataUrl https://www.wikidata.org/entity/9092040 = bad request
data redirectUri https://www.wikidata.org/wiki/Special:EntityData/Q9092040
Urup (disambiguation)
Urup may refer to:
Urup, one of the Kuril Islands north of Japan
Urup, Afghanistan
Urup River, a river in North Caucasus, Russia
Urup (village), a former urban-type settlement in the Karachay–Cherkess Republic, Russia; since 1997—a village.
```

So, that's not what we're looking for.  Using the WikiData main page for a search shows the actual code for that item would be: Acquiescence bias (Q420693).

So it looks like we're going to have to create a SPARQL query to get these codes/ids.  What we need to do is find an item based on it's label.

Based on [this SO answer](https://stackoverflow.com/questions/38527828/how-to-query-wikidata-items-using-its-labels) it seems like this should work:
```
SELECT ?item ?itemLabel
WHERE { 
  ?item rdfs:label ?itemLabel. 
  FILTER(CONTAINS(LCASE(?itemLabel), "Acquiescence bias"@en)). 
} limit 10
```

But this query timesout:
```
java.util.concurrent.TimeoutException
	at java.util.concurrent.FutureTask.get(FutureTask.java:205)
```

Nice to see they are using Java though!

The working query is:
```
SELECT ?item ?itemLabel
WHERE {  
  ?item ?label "Acquiescence bias"@en.  
  ?article schema:about ?item .
  ?article schema:inLanguage "en" .
  ?article schema:isPartOf <https://en.wikipedia.org/>. 
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} 
```

This returns:
```
item wd:Q420693
itemLabel Acquiescence bias
```

So what we can do is make this query on the server when a detail page is requested and add the item id to the response.  Optionally we could make the call for the user, slowing down the whole response and adding the list of languages and their links.  Probably we should let the client do that.

Creating that query should be done in the curator lib.  After adding the createWikiDataItemUrl function with passing tests of course in the [art-curator]() lib, we need to start using version 2.2.0 by changing the version for the lib package.json and then running ```npm i```.

Next we need to add a new endpoint to run the query and think about what to do next.  Or we could think about it now.  No, it's not everyday we get to add a new endpoint!~

Welcome to the party, API endpoint /api/data/query/:label/:lang

Running locally we can run this:
```
http://localhost:5000/api/data/query/Acquiescence%20bias/en
```

Unfortunately, using acquiescence_bias or even acquiescence%20bias doesn't work.  So basically, there is no point in returning the label.  Just looks nicer incase someone besides the app is reading the response and doesn't see the url (long shot).

Now, we get to think about what comes next.  Next, of course we want to run the value rul and get a JSON response to parse for data.  The first data set we want is a list of available languages.  The second is we want to run the url from a requested langauge and get the description of the

For example, go through this workflow:
```
http://localhost:5000/api/data/query/Acquiescence%20bias/en
http://www.wikidata.org/entity/Q420693
http://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=acquiescence_bias
```

This would only be necessary if the method we have been using fails.  In the above example, we currently take the item title, lowercase it, replace the space with a underscore, and add it to the url ourselves.  

The problem is, sometimes that page is a redirect, and sometimes that page doesn't exists, but does if you can find the correct item/Q-code id.

This kind of exception came up while refactoring the NodeJS file to do those redirects without adding more code to the index file.  After all, best practice is to create functions that are one text editor page or less.

The Korean item 현상유지편향 is actually a title with underscores:
현상_유지_편향 (status quo bias for those interested).

This difference can only be found by using the urll on the entity page.  Or so we thought.  Acutally, none of these are returning anything (except an empty array):
```
http://localhost:5000/api/data/query/%ED%98%84%EC%83%81%EC%9C%A0%EC%A7%80%ED%8E%B8%ED%96%A5/en
http://localhost:5000/api/data/query/%ED%98%84%EC%83%81_%EC%9C%A0%EC%A7%80_%ED%8E%B8%ED%96%A5/en
http://localhost:5000/api/data/query/%ED%98%84%EC%83%81%EC%9C%A0%EC%A7%80%ED%8E%B8%ED%96%A5/kr
http://localhost:5000/api/data/query/%ED%98%84%EC%83%81_%EC%9C%A0%EC%A7%80_%ED%8E%B8%ED%96%A5/kr
```


## Re-factoring the NodeJS app

While trying to support the automatic re-direct feature, it became clear that just adding more code to the detail endpoint was not the way to go.  We have been relying on this simplistic old school single index.js file for too long.

We should have directory structure that will hold the node file, and a file for each endpoint.  That would be an improvement.

Why not also create an error handler middleware function like this:
```
app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Something broke!')
})
```

Apparently the error handler function should be the last function added with app.use.

But first, let's just get the redirect working in a separate file.  That's a step in the right direction at least.

If you export functions from one file, and use a traditional require to consume those funtions in another file (read index.js), then Bob is a close family relation.

If you need to load JavaScript that has already been written and isn't aware of node, the vm module is the way to go (and definitely preferable to eval).
```
var vm = require("vm");
var fs = require("fs");
module.exports = function(path, context) {
  var data = fs.readFileSync(path);
  vm.runInNewContext(data, context, path);
}
```

Also, modules loaded with require(…) don't have access to the global context, so we avoid the Angular 1.x problem of scope soup.

We will be using Node.js's standard module.export functionality.  So far we are just using an external function to reduce the loc (lines of code) in the details function.  But by putting each API endpoint function it their own file will allow index.js to be viable in one screen and get us closer to the 'easy to reason about' state.

Just when everything seemed to work, this showed up:
```
TypeError: Cannot read property 'text' of undefined
    at IncomingMessage.wikiRes.on (/Users/tim/repos/loranthifolia-teretifolia-curator/conchifolia/endpoints/details.js:12:58)
    at IncomingMessage.emit (events.js:185:15)
    at endReadableNT (_stream_readable.js:1106:12)
    at process._tickCallback (internal/process/next_tick.js:178:19)
```

The error from the Ionic app was:
```
scheduleTask @ zone.js:2969
push../node_modules/zone.js/dist/zone.js.ZoneDelegate.scheduleTask @ zone.js:407
...
Actor-observer%20bias:1 Failed to load https://radiant-springs-38893.herokuapp.com/api/detail/actor-observer_bias/en/false: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8100' is therefore not allowed access. The response had HTTP status code 503.
```

That is a CORS error.  But caused by the new detail redirect function.

actor-observer_bias should be Actor–observer_asymmetry

I'm thinking this redirect did work before this new redirect function, and that the backupTitle is what should be holding that re-direct value.  So what happened to it?

These
```
Courtesy bias -> Shy Tory Factor
Experimenter's -> Experimenter's bias
Form function attribution bias -> -1
Moral credential effect -> Moral credential
Zero-sum bias -> Zero-sum thinking
```

So, yeah, -1 is not on, and actor-observer bias is missing.  Testing Courtesy bias shows it still re-directs (on the client side) to the Shy Tory Factor.  Along with this list and the proper value for form function, these are the missing title from our old list when the feature was being developed:
```
Form function attribution bias -> Form function attribution bias (page does not exist)
Framing effect -> Framing effect (psychology)
Information bias -> Information bias (psychology)
Reactance -> Reactance (psychology)
Naïve realism -> Naïve realism (psychology)
```

Those are handled on the server now, right?  So the -1 and the actor-observer bias needs to be addressed.  

First things first:  Actor-observer_bias should be Actor–observer_asymmetry

```
<td><a href="/wiki/Actor-observer_bias" class="mw-redirect" title="Actor-observer bias">Actor-observer bias</a>
</td>
<td>The tendency for explanations of other individuals' behaviors to overemphasize the influence of their personality and underemphasize the influence of their situation (see also <a href="/wiki/Fundamental_attribution_error" title="Fundamental attribution error">Fundamental attribution error</a>), and for explanations of one's own behaviors to do the opposite (that is, to overemphasize the influence of our situation and underemphasize the influence of our own personality).
</td>
```

So there may be a way to fix these re-directs in the first list.  Notice the class name in the title cell tag.  But for, we are trying to handle this when the request for the detail is made:
```
http://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=actor-observer_asymmetry
```

Looks like a problem with the title, as the message returned says:
actor%25e2%2580%2593observer_asymmetry

What is 25e2%2580%2593?  It's the slash obviously.  Found [this SO answer](https://stackoverflow.com/questions/33137955/window-open-utf-8-issue) which said in part *Nested syntaxes needing escaping are very, very difficult to get right. And generally you should never use javascript: URLs: as well as being a nightmare of multiple-escaping, they're also pretty bad for usability and accessibility.*

Actually, it's not all that bad.  If we just remove the encodeURI function on the url, it leaves it alone and all is well with the re-direct.  How does this work with Korean?

The first one on the list works: id 호손_효과
The second one, not: 현상유지편향
redirect Url:
```
http://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=%ed%98%84%ec%83%81_%ec%9c%a0%ec%a7%80_%ed%8e%b8%ed%96%a5
```
errors missingtitle

But, even with the encodeURI function, that item still fails the redirect.  What should it be?
현상 유지 편향 (redirect from 현상유지편향)

That leads to:
```
https://ko.wikipedia.org/wiki/%ED%98%84%EC%83%81_%EC%9C%A0%EC%A7%80_%ED%8E%B8%ED%96%A5
```

So we actually have the name right:  %ED%98%84%EC%83%81_%EC%9C%A0%EC%A7%80_%ED%8E%B8%ED%96%A5
But for Korean, the redirect is a simpler URI.

현상유지편향 is giving us a problem actually.
This is what it should be:
```
https://ko.wikipedia.org/wiki/%ED%98%84%EC%83%81_%EC%9C%A0%EC%A7%80_%ED%8E%B8%ED%96%A5
```
That's actually the title with underscores:
현상_유지_편향 (status quo bias for those interested).

Here is the original JSON from the main list:
```
{
    "cognitive_bias" : {
        "type" : "uri",
        "value" : "http://www.wikidata.org/entity/Q29598"
    },
        "cognitive_biasLabel" : {
        "xml:lang" : "ko",
        "type" : "literal",
        "value" : "현상유지편향"
    }
}
```

The link there leads to the data page, which we may have to parse to solve this one, unless there is a way to get the data from these sections in a query.  We always intended to use these data pages to number one, get a list of available languages to support.

The Wikipedia section has the list of langauges that has the title which would give us the correct re-direct: ko	현상 유지 편향 (it's a link to the page, so we don't have to worry about adding the _ characters).

Since this is a WikiData page, we should be able to get the data in a query.  Time for some more research.  The curator lib will need to hold a new function to get the query, but after that, the server will need to make the calls and return the data.  Then the Angular/Ionic/React/React Native apps will have to use the results to a) provide redirects for this edge case, and b) provide a list of available languages for each page.

Actually, for part b, we really just want a list of available languages for the list.  There would be not much use for a list of languages from detail pages unless they were not already on the list.  Or maybe there is.  It would still be better to show a list of available languages for the list, and let the user choose the item from that list.

Alternatively, the user would use English, go to a detail page, then want to see a different languages version rather than try to go back and find the item in that language.  So we can further break up this task with another goal: c) provide a list of languages available on the WikiData list, and d) provide a list of languages available on the WikiMedia list.

Wikidata uses the [SPARQL query service](https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual).  Unlike SQL, items are not part of any tables. Instead, items are linked with each other like a graph.  This is pretty vast and the documentation for it is vast, as well as the examples of how to create a query to get what you want.  So it might be easier (at least except for React) to just get the list form the html returned from that page.

For c, we have this page:
```
https://www.wikidata.org/wiki/Q2607828
```

The Wikipedia section has 12 entries, none of which are Korean.  So what is our list of Korean items?  We use this query:
```
https://query.wikidata.org/sparql?format=json&query=%0A%20%20%20%20%20%20%20%20SELECT%20%3Fcognitive_bias%20%3Fcognitive_biasLabel%20%3Fcognitive_biasDescription%20WHERE%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cko%22.%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Fcognitive_bias%20wdt%3AP31%20wd%3AQ1127759.%0A%20%20%20%20%20%20%20%20%7D%0A%09%09LIMIT%201000
```

To create a query to get the list of languages for this subject could be tricky and time consuming.  Currently we determine items in the result list that have Korean pages by the absence of a Q-id as a value and a text string in Korean in it's place:
```
{
    "cognitive_bias" : {
        "type" : "uri",
        "value" : "http://www.wikidata.org/entity/Q182490"
    },
    "cognitive_biasLabel" : {
        "type" : "literal",
        "value" : "Q182490"
    }
}, {
    "cognitive_bias" : {
        "type" : "uri",
        "value" : "http://www.wikidata.org/entity/Q184812"
    },
    "cognitive_biasLabel" : {
        "xml:lang" : "ko",
        "type" : "literal",
        "value" : "미완성 효과"
    }
}
```

The first page has no Korean version (but 12 other languages) and the second one has (as well as 25 other languages).  It's a little annoying that 현상유지편향 which needs spaces as underscores for a correct redirect does not have that correctly in the the query result but does have it in the WikiData page Wikipedia section label.  Another inconsistency in the WikiData project.  But, it is a relatively young project and hopefully will continue to grow and improve and be used by more systems.  It's still better than no clear source of truth for public shared data.


First, we can add the cognitive_bias uri value to the list items so we get this:
```
cognitive_bias: "http://www.wikidata.org/entity/Q29598"
cognitive_biasLabel: "현상유지편향"
lang: "ko"
sortName: "현상유지편향"
```

Next, when the detail page re-direct returns a 잘못된 제목 (bad title), we can use the uri value.  This will give us a page that has the Wikipedia section, which we will then need to parse to get the list of languages which we can then use to get the correct URI for the detail page.

Since we pass the backup title as a route param, we have to replace the '/' slash characters with something to get past router errors which would read the uri as a separate path.  Then we convert them back to slashes when we get a 300 redirect error from the server to use that uri.

Then, we need a new API endpoint that will get the WikiData page and return some kind of result.  What that looks like we will find out now.

The next issue is that we are getting this back instead of the WikiData page:
```
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>303 See Other</title>
</head><body>
<h1>See Other</h1>
<p>The answer to your request is located <a href="https://www.wikidata.org/wiki/Special:EntityData/Q29598">here</a>.</p>
</body></html>
```

In the browser, ```https://www.wikidata.org/wiki/Special:EntityData/Q29598``` will re-direct to  ```https://www.wikidata.org/wiki/Q29598```

That's the same URL we requested first.  Anyhow, this is yet another http call.  Time to use a new endpoint module.

The next issue is that the result comes back with length.  In the response it shows ``` buffer: BufferList { head: null, tail: null, length: 0 },```

Actually, the error is this:
```
error: SyntaxError: Unexpected token < in JSON at position 0 at JSON.parse (<anonymous>) at XMLHttpRequest.onLoad (http://localhost:5000/vendor.js:7450:51) at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invokeTask (http://localhost:5000/polyfills.js:2743:31) at Object.onInvokeTask (http://localhost:5000/vendor.js:36899:33) at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invokeTask (http://localhost:5000/polyfills.js:2742:36) at Zone.push../node_modules/zone.js/dist/zone.js.Zone.runTask (http://localhost:5000/polyfills.js:2510:47) at ZoneTask.push../node_modules/zone.js/dist/zone.js.ZoneTask.invokeTask [as invoke] (http://localhost:5000/polyfills.js:2818:34) at invokeTask (http://localhost:5000/polyfills.js:3862:14) at XMLHttpRequest.globalZoneAwareCallback (http://localhost:5000/polyfills.js:3888:17
```

Another item that is failing the final re-direct is 확증편향.  But I'm not sure why there is no response to the second re-direct.  It seems like the second URI re-directs back to the first URI as shown above in the browser.  Looking at the complete result from the data/second redirect, it seems like this is what is happening:
```
    socket: [Circular],
    connection: [Circular],
    _header: 'GET /wiki/Special:EntityData/Q431498 HTTP/1.1\r\nHost: www.wikidata.org\r\nConnection: close\r\n\r\n',
    _onPendingData: [Function: noopPendingOutput],
    agent: [Agent],
    socketPath: undefined,
``` 

In the browser console we get this:
```
error: {error: SyntaxError: Unexpected token < in JSON at position 0 at JSON.parse (<anonymous>) at XMLHttp…, text: "<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">…EntityData/Q431498">here</a>.</p>↵</body></html>↵"}
headers: HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
message: "Http failure during parsing for http://localhost:5000/api/data/http:**www.wikidata.org*entity*Q431498/ko"
name: "HttpErrorResponse"
ok: false
status: 200
statusText: "OK"
url: "http://localhost:5000/api/data/http:**www.wikidata.org*entity*Q431498/ko"
__proto__: HttpResponseBase
```

The only thing happening in the service is this:
```
  getData(uri: string, lang: string) {
    return this.httpClient.get(this.backendDataUrl+'/'+uri+'/'+lang)
    .pipe(data => data);
  }
```

What are our options here?  It seems like we could just do this:
```
    .pipe((data) => {
      console.log(data);
    });
```

But TypeScript tells us this:
```
[ts]
Argument of type '(data: Observable<Object>) => void' is not assignable to parameter of type 'OperatorFunction<any, any>'.
  Type 'void' is not assignable to type 'Observable<any>'.
(parameter) data: Observable<Object>
```

If we add a ```return data;``` after the console log there, the error goes away.  What we return however is the Observable itself.  We can see this part of the message:
```
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">↵
    <html>
        <head>↵
            <title>303 See Other</title>↵
        </head>
        <body>↵
            <h1>See Other</h1>↵
            <p>The answer to your request is located 
                <a href="https://www.wikidata.org/wiki/Special:EntityData/Q431498">
                    here</a>.
            </p>↵
        </body>
    </html>↵"
```

We are already making that call.  For fun, here is our list of redirects:
```
singlePageUrl http://ko.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=%ED%99%95%EC%A6%9D%ED%8E%B8%ED%96%A5
details simple redirect Url https://ko.wikipedia.org/wiki/확증편향
wikiDataUrl https://www.wikidata.org/entity/Q431498
data redirectUri https://www.wikidata.org/wiki/Special:EntityData/Q431498
```

At this point, I'm not sure why we're not getting to where we want to.  Maybe it's time to try the data service on a page that is not failing the redirect, for example to get a list of available languages.

This section has been about re-factoring the JodeJS server app.  Now we have two separate files with functions used by their respective API endpoints.  So we haven't take it so far yet, and honestly, the app is still finding its way, so a good start is all we can expect without doing things that will eventually not be needed.

The more pressing problem is using the WikiData subject page to get language and potential backup links.


## Automatic detail re-directs

The *framing effect* returns content which is a re-direct to *Framing (social sciences)*.  The goal is to find re-directs like this and deliver the content instead of just a redirect link.

We actually have TWO listings for this item:
Framing & Framing effect
That's a different problem which we will deal with later.

To test the second one, we can use the local link:
```
localhost:5000/detail/framing_effect/en
```

We get this response:
```
desc { description: '
<div class="mw-parser-output">
    <div class="redirectMsg">
        <p>Redirect to:</p>
        <ul class="redirectText">
            <li><a href="/wiki/Framing_(social_sciences)" title="Framing (social sciences)">Framing (social sciences)</a></li></ul></div>\n<!-- \nNewPP limit report\nParsed by mw2207\nCached time: 20180914132220\nCache expiry: 1900800\nDynamic content: false\nCPU time usage: 0.000 seconds\nReal time usage: 0.001 seconds\nPreprocessor visited node count: 0/1000000\nPreprocessor generated node count: 0/1500000\nPost‐expand include size: 0/2097152 bytes\nTemplate argument size: 0/2097152 bytes\nHighest expansion depth: 0/40\nExpensive parser function count: 0/500\nUnstrip recursion depth: 0/20\nUnstrip post‐expand size: 0/5000000 bytes\nNumber of Wikibase entities loaded: 0/400\n-->\n<!--\nTransclusion expansion time report (%,ms,calls,template)\n100.00%    0.000      1 -total\n-->\n</div>' }
```

So if we search for this: ```<div class="redirectMsg"><p>Redirect to:</p>``` and find it, we can use the href value ```/wiki/Framing_(social_sciences)``` to create a new link and then return the content from that call.  

Question: should we do this on the client so that we can provide a message to the user when the re-direct is happening so they are more understanding of the long wait?  Not sure.  That would make the wait time actually longer, as the client would have to make another call and wait for another response instead of waiting for the first one to happen.  Going with changing the server for now.  We can always move that logic to the client later.


So the simplest thing is to follow the simplest method, which is check for the redirect tags.

Test with this URL: http://localhost:5000/detail/framing_effect/en/true

One quick change, we have to get rid of the /wiki/ part of the url otherwise we will get URLs like this:
```
http://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=/wiki/framing_(social_sciences)
```

After that, we have out automatic redirects working.  At least for that one.  Time to test a bit.


## Missing WikiMedia descriptions

After adding a basic tool tip to display the short message, it was noticed that most of them were missing.  Only the WikiData descriptions which are spotty and some are just category names.

In Conchifolia this is done:
```
this.list[j].wikiMedia_description = key.desc;
```

Here we do almost the same thing:
```
this.list[j].wikiMedia_description = section[i].description;
```

The sad truth is that the description is sent as *desc* from the server.  But there is still more work to do.  For some reason, the tool tip description for "Courtesy bias a.k.a. The Shy Tory Factor" is off to the right.

Also, it shouldn't be a tool tip so that mobile users can see it.  We will also want to add the controls for changing the status of the items, so a tool tip might be too fragile for that purpose.

After thinking about using the icon component to show arrows and expand and contract the descriptions,  I decided on using html5 details element.
```
<details>
    <summary>
        item
    </summary>
    <p>
        description
    </p>
</details>
```

In the past it would have been a javascript affair, either by adding listeners or using Angular.

With a bit of styling, the expand/contract works well, except we need a transition.  Can we set an animation with the expand as a trigger?  Should we use a hook to get the element in Angular and listen for the event?

If we were going to use Angular all along, then why did we opt for the html solution?

The docs for details show:
```
Attributes
open	Specifies that the details should be visible (open) to the user

Global Attributes
The <details> tag also supports the Global Attributes in HTML.

Event Attributes
The <details> tag also supports the Event Attributes in HTML.
```

Right at the bottom of the events docs, it says:
```
Misc Events
Attribute	Value	Description
ontoggle	script	Fires when the user opens or closes the <details> element
```

Bingo!  So with Angular, in the html all we have to do is this:
```
(ontoggle)="setVar()"
```

Except that doesn't work.  Or is it onToggle?  No.

Also tried:
```
<details [onToggle]="detailsToggle()">
```

Got this:
```
compiler.js:1016 Uncaught Error: Template parse errors:
Binding to event property 'onToggle' is disallowed for security reasons, please use (Toggle)=...
If 'onToggle' is a directive input, make sure the directive is imported by the current module. ("t; let i = index">
    <li *ngIf="item.cognitive_biasLabel || item.wikiMedia_label">
      <details [ERROR ->][onToggle]="detailsToggle()">
        <summary>
          <span (click)="navigateAction(item.sortName"): ng:///ListPageModule/ListPage.html@19:15
Can't bind to 'onToggle' since it isn't a known property of 'details'. ("t; let i = index">
    <li *ngIf="item.cognitive_biasLabel || item.wikiMedia_label">
      <details [ERROR ->][onToggle]="detailsToggle()">
        <summary>
          <span (click)="navigateAction(item.sortName"): ng:///ListPageModule/ListPage.html@19:15
```

Not sure what the event hook is for this right now.  The features this would be used for (like counting the number of times the short description has been viewed to change a style) is not ready for development yet.

It's time to finally get back to Loranthifolia so that it can catch up with all the features ironed out here.  After THAT then the React Native app needs a lot of catching up.  It only has the WikiData list, so would need to implement the WikiMedia section calls, merge and sort the list.  Then implement the language option.  All in good time.


## Fixing the unit tests

After fixing some issues with the links and the detail page, it's time to address the sorry state of the tests.  Running ```npm test``` shows what's up.

### 10 specs, 7 failures

So the first goal is to fix those 10 specs, and then write one or two more to get ready for some T/B driven dev.

A lot of those are config issues because we added routing, but that is not available in the tests setup.

The first test result goes:
```
Failed: Template parse errors:
'router-outlet' is not a known element:
1. If 'router-outlet' is an Angular component ... 
```

To fix this just import the RouterTestingModule and then add it to imports.
```
import { RouterTestingModule } from '@angular/router/testing';
...
    imports: [ RouterTestingModule ],
```

The app.component tests which were made to test the sample DOM that the App was built with such as *should have as title 'app'*, and *should render title in a h1 tag*.  Since we only have the router-outlet there now, they should be removed.  Or commented out and moved to to the pages.

### 8 specs, 4 failures

```
DetailPage should create
Error: StaticInjectorError(DynamicTestModule)[DetailPage -> ActivatedRoute]: 
  StaticInjectorError(Platform: core)[DetailPage -> ActivatedRoute]: 
    NullInjectorError: No provider for ActivatedRoute!
```

We import and use ActivatedRoute in that page. Adding it to the "main" module
as the accepted answer for [this question](https://stackoverflow.com/questions/45059075/error-error-uncaught-in-promise-error-no-provider-for-activatedroute).


That doesn't help.  
NullInjectorError: No provider for ActivatedRoute!
NullInjectorError: No provider for HttpClient!
NullInjectorError: No provider for InjectionToken SESSION_STORAGE!

The answer to [this question](https://stackoverflow.com/questions/48710238/angular-4-unit-test-but-getting-error-no-provider-for-hubwrappercomponent) seems to point us in the right direction.  Adding ActivatedRoute to the providers array which we had to create ourselves:
```
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        AppComponent,
      ],
      providers: [ActivatedRoute]
    }).compileComponents();
```

### 8 specs, 5 failures

Things got worse:
Failed: Can't resolve all parameters for ActivatedRoute: (?, ?, ?, ?, ?, ?, ?, ?).

What's the answer to [this question](https://stackoverflow.com/questions/48077725/angular-4-failed-cant-resolve-all-parameters-for-activatedroute?rq=1)?  It says: *inject a fake ActivatedRoute to your component, since you create it yourself in the test, and the router thus doesn't create it for you and inject an ActivatedRoute.*

So we should be doing something like this:
```
providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}]
```

But if we fix that:
```
import { HttpClientModule } from '@angular/common/http';
```

And use it in the providers:
```
NullInjectorError: No provider for HttpClient!
```

If we change that to:
```
import { HttpClient } from '@angular/common/http';
```

Then we get:
```
NullInjectorError: No provider for HttpHandler!
```

Then, if we add that to the imports and providers in the detail page, we get this brief error:
```
DetailPage should create
[object ErrorEvent] thrown
```

### 8 specs, 5 failures

If we do the same thing for the list page, then there we get this error:
```
NullInjectorError: No provider for Router!
```

The answer to [this question](https://stackoverflow.com/questions/48617318/nullinjectorerror-no-provider-for-router-error-angular-2) says *no provider has been specified for Router in your project. To solve this you will need to add RouterModule to the exports in your module.*

Does that mean the list page module?  Same error.  Or the app module?  Same error.

Following [this SO answer](https://stackoverflow.com/questions/42829796/no-provider-for-router) by putting
```
RouterModule.forRoot([{ path: "", component: ListPage }])
```

In providers array and there is a new error now:
```
ListPage should create
Failed: Invalid provider for the NgModule 'DynamicTestModule' - only instances of Provider and Type are allowed, got: [[object Object], HttpClient, HttpHandler, ?[object Object]?, ...]
```

Found another [answer to this question](https://stackoverflow.com/questions/40734256/no-provider-for-router-error-in-jasmine-spec) which shows using another mockRouter in the providers.  After that, we get to the next error:
```
NullInjectorError: No provider for DataService!
```
Import that and put it in the providers array and then we get to the last error on the list above:
```
NullInjectorError: No provider for InjectionToken SESSION_STORAGE!
```

So import the token, and now in our providers array we have all this junk:
```
{ provide: ActivatedRoute, useValue: fakeActivatedRoute },
{ provide: Router, useValue: mockRouter },
{ provide: SESSION_STORAGE, useValue: {} },
```

### 8 specs, 3 failures

```
BackendApiService should be created
Error: StaticInjectorError(DynamicTestModule)[BackendApiService -> HttpClient]: 
  StaticInjectorError(Platform: core)[BackendApiService -> HttpClient]: 
    NullInjectorError: No provider for HttpClient!
```

### 8 specs, 1 failure

```
DetailPage should create [object ErrorEvent] thrown
```

Getting close here.  What does this error mean?  [This answer](https://stackoverflow.com/questions/45722256/how-do-i-debug-a-object-errorevent-thrown-error-in-my-karma-jasmine-tests) indicates that you must run your tests without sourcemaps as a workaround:
```
CLI v6.0.8 and above: --source-map=false
```

So trying this:
```
$ npm test --source-map=false
```

But still getting the same error.  Also trying:
```
$ npm test --sourceMap=false
```

Another answer not marked as correct suggested choosing the 'Debug' button on the Jasmine/Karma Chrome window and look at the error in the console there.  It shows:
```
list.page.ts:91 error TypeError: _this.handler.handle is not a function
    at MergeMapSubscriber.project (_karma_webpack_/webpack:/node_modules/@angular/common/fesm5/http.js:974)
    at 
```

That line is for the list page backendApiService.getList() error handler.  Our error however is for the detail page.

Another answer suggests *it may be related to testing routing*.  Leo with 1,705 reputation points goes on to say: *The problem lies with the test environment attempting to evaluate this.route.snapshot.paramMap.get('id').*

So replaced this:
```
this.itemName = this.route.snapshot.paramMap.get('id');
const listLanguage = this.route.snapshot.paramMap.get('listLanguage');
const backupTitle = this.route.snapshot.paramMap.get('title');
```

with this:
```
this.itemName = this.route.snapshot.paramMap[0];
const listLanguage = this.route.snapshot.paramMap[1];
const backupTitle = this.route.snapshot.paramMap[2];
```

Still same error.  User roo2 said in another answer that the error is *related to having a promise resolved in the ngOnInit of a component.*

Guess where we have that call?  After trying roo2's suggestion of putting this in the test:    
```
component.ngOnInit()
tick()
fixture.detectChanges()
```

This seems to connect with what user Leo said:
```
TypeError: Cannot read property 'get' of undefined
```

I'm guessing that the router being called in the test is looking for a paramMap which is not there.  Do we have to stub that?  Had a terrible waste of time looking for how to do it with the useValue value:
```
useValue: { 'paramMap': observableFromPromise([{ 'id': '1'}]) } },
```

This will not work.  Have burnt up about four hours now on this.  And people wonder why front end dev's are known to not write unit tests!  Time for lunch...

I take that back.  This is time well spent.  Now we have a (mostly) passing suite of tests.  It's time to write a new one to highlight the issue with some items on the list that show the "(psychology)" category, which indicates that the link should be that in the title that includes the category, otherwise we will be served the disambiguation page.

This includes first creating a test list that has some sample names including a psychology redirect page. 

More good news is that with test passing, we can refactor the parseSectionList function down to about 20 lines.  More refactoring to follow as we move to include the entire DOM element from the table row into the list and use those directly to create the links for the detail page.


## Detail page errors

Choosing zero-sum_bias causes a 500 error on the server.  The server logs show:
```
wikiRes.headers { date: 'Sat, 25 Aug 2018 21:26:00 GMT',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '345',
  connection: 'close',
  server: 'mw1316.eqiad.wmnet',
  'x-powered-by': 'HHVM/3.18.6-dev',
  'mediawiki-api-error': 'missingtitle',
  p3p: 'CP="This is not a P3P policy! See https://en.wikipedia.org/wiki/Special:CentralAutoLogin/P3P for more info."',
  'cache-control': 'private, must-revalidate, max-age=0',
  vary: 'Accept-Encoding',
  'content-disposition': 'inline; filename=api-result.json',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'backend-timing': 'D=37194 t=1535232360022838',
  'x-varnish': '153898556, 471160060, 750619118, 957749309',
  via: '1.1 varnish (Varnish/5.1), 1.1 varnish (Varnish/5.1), 1.1 varnish (Varnish/5.1), 1.1 varnish (Varnish/5.1)',
  'accept-ranges': 'bytes',
  age: '0',
  'x-cache': 'cp1083 pass, cp2013 pass, cp5010 pass, cp5010 pass',
  'x-cache-status': 'pass',
  'strict-transport-security': 'max-age=106384710; includeSubDomains; preload',
  'set-cookie': 
   [ 'WMF-Last-Access=25-Aug-2018;Path=/;HttpOnly;secure;Expires=Wed, 26 Sep 2018 12:00:00 GMT',
     'WMF-Last-Access-Global=25-Aug-2018;Path=/;Domain=.wikipedia.org;HttpOnly;secure;Expires=Wed, 26 Sep 2018 12:00:00 GMT',
     'GeoIP=AU:NSW:Yagoona:-33.90:151.02:v4; Path=/; secure; Domain=.wikipedia.org' ],
  'x-analytics': 'https=1;nocookies=1',
  'x-client-ip': '49.195.85.96' }
Url: https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=zero-sum_bias
```

The list will redirect to this link:
```
https://en.wikipedia.org/wiki/Zero-sum_thinking
```

This kind of thing needs to be handled on the server.  It should follow re-directs, or at least provide the re-direct page.  No one has decided yet how to handle all these missing pages.

However, I don't see what we can do programmatically here.  There is no Zero-sum_thinking in the response from the server.  If we look at that url in the browser, we get:
```
{"error":{"code":"missingtitle","info":"The page you specified doesn't exist.","*":"See https://en.wikipedia.org/w/api.php for API usage. Subscribe to the mediawiki-api-announce mailing list at &lt;https://lists.wikimedia.org/mailman/listinfo/mediawiki-api-announce&gt; for notice of API deprecations and breaking changes."},"servedby":"mw1280"}
```

The only hack that comes to mind is a specific mapping table.  But then what do we do for generic user generated lists?  It's fine to have herdwired solutions if this is just going to be a list of cognitive biases forever, but we would like to use this app for all kinds of Wikipedia and WikiData content.

One half-hacked solution would be to let the user create their own lookup table.  The user would have to do their own search and provide an alternative name.

But wait, the Wikipedia list has a link which points directly to the altername name page, so there must be something in the list which creates the correct link.  The zero sum bias is part of the *Decision-making, belief, and behavioral biases* category which is section 1.  Let's look at that response on the server.

The raw data from the server shows the link:
```
<tr>
    <td>
        <a href=\"/wiki/Zero-sum_thinking\" 
            title=\"Zero-sum thinking\">Zero-sum bias</a>
    </td>
</tr>
```

This data is parsed on the client, so actually, it is there that the URLs should be captured and used instead of just replacing spaces with _ and adding the Wikipedia base URL.  This might solve a lot of the missing pages.

We could capture the title of the link and if that is different than the text in the anchor element, show it in a 'also known as' section.  Some learners might be interested in seeing a list of a.k.a.s.  However, that is not on our feature list for now.  We will add it there and deal with just fixing this issue for now.

We can get the title, and if it's different from the name, add a 'title' property to the item.  There turn out to be nine of these situations.

Unfortunately, we will have to make the bad request and then use the title to create a new url and try that one.  Also, the user might think the app is malfunctioning if they choose one bias from the list and get sent the detail page for something called the *Shy Tory Factor*.  It turns out this is another name for the Courtesy bias.  Most of the other ones look something like this: Naïve realism -> Naïve realism (psychology).

It's worth checking all these after we are done here:
```
Courtesy bias -> Shy Tory Factor
Experimenter's -> Experimenter's bias
Form function attribution bias -> Form function attribution bias (page does not exist)
Framing effect -> Framing effect (psychology)
Information bias -> Information bias (psychology)
Moral credential effect -> Moral credential
Reactance -> Reactance (psychology)
Zero-sum bias -> Zero-sum thinking
Naïve realism -> Naïve realism (psychology)
```

A note about the routing here, we need to add a second route to pass a conditional parameter.  It looks like this:
```
{ 
    path: 'detail/:id/:listLanguage', 
    loadChildren: './pages/detail/detail.module#DetailPageModule' },
{ 
    path: 'detail/:id/:listLanguage/:title', 
    loadChildren: './pages/detail/detail.module#DetailPageModule' }
```

Another catch here, is that once the app loads a list, it wont load it again and instead use the list from local storage.  So to start to address this (before the UX department can think of a better solution), we will put a refresh icon next to the list name in the header to force the app to load the list again.  Really, we need an options page for this app like we did for the Ionic app.  

Instead of just adding the icon in line, we will make a component to hold the svg.  Is this a good idea?  Since we have no UI framework like Bootstrap or Material Design to use the icons from, seems like a new an improved way to handle icons needed by the app.  There could be multiple places where we want a refresh icon.

Another feature would be to create one component for all the icons, and pass in the required icon name as a component input.  This is purely an Angular thing, but I'm guessing with the rise of Web Components, there will be a lot of options in the future that will do this kind of things without the overhead of any framework.

Anyhow, after finish this part of our task and going thru the list above to confirm that the redirects are working, right off the bat there is another issue:
```
GET http://localhost:5000/api/detail/shy_tory_factor/en 500 (Internal Server Error)
```

But if we look at the actual link, it will be:
```
https://en.wikipedia.org/wiki/Shy_Tory_Factor
```

So in this case the title and the link text are also different.  Great.  Now we will have to parse the title from the href.  Not a big deal I guess, but we have to remember not to convert the underscore later.  Or it will have no affect anyhow.


After all that however, we still get:
```
redirect error HttpErrorResponse {headers: HttpHeaders, status: 500, statusText: "Internal Server Error", url: "http://localhost:5000/api/detail/Shy_Tory_Factor/en", ok: false, …}
```

We have a feeling that the curator is lower-casing our urls, which is OK for most, but not all.  This is the call in question:
```
curator.createSingleWikiMediaPageUrl(req.params.id,req.params.lang)
```

And yes, it does lower case all the letters.  So, we either need a flag or a new API.  Since we have a strong suspicion that no one actually uses this lib except us, let's break it!  See you back here after adding a flag.

Bumped curator to version 2.1.0.  The flag is not optional without creating another API endpoint.  Anyone using 2.1 will have to use it.  We should have gone to 3.0, but since no one is using this package, there are only our apps to worry about.  

If the third param to that function is true, then the case is left alone.  Now we have to change the back-end API service and then the server app to pass that preference along.

Now the first item on our naughty list, 

The second item however is bad news again.
*Experimenter'* appears on the list with the backup title of *Experimenter's bias*
```500 Experimenter%27s_bias redirect error Internal Server Error```

Some of us here were wondering if that was a typo in the readme or not.
The actual Wikipedia page is a redirect:
```
Observer-expectancy effect (Redirected from Experimenter's bias)
```

This one shows an actual redirect link from the WikiMedia response.  Why doesn't that happen for the former?
```
Framing effect (Framing_effect_(psychology))
```

Another problem is this one:
```
Form function attribution bias (index.php?title=Form_function_attribution_bias&action=edit&redlink=1)
```

There are a few different types of re-directs.  But, since they are not actually broken, we don't need to worry about them yet.

Two things to work on right now, the Experimenter's bias, and either removing the underscores from the backup titles, or capturing the title string and adding that to the data model.  The latter is the more mature way to go.  Less hidden business login in the code.  If it's in the data model, then it's part of the easy to understand business logic.

It would also be good to refactor the parseSectionList() function.  It's over 100 loc (lines of code in case anyone doesn't know).  The craftsman programmer would say a function should be short enough to be viewed in one screen in your editor.  This editor will show 30 loc a screen without scrolling.  Anyhow, it's a good indication that code should be broken up into meaningfully named function calls to increase readability for a function that is easy to reason about.

Since this is where we will be adding code, let's refactor that now.

Taking out the backup title and link functions helps a bit.  The current problem is the  
```
title = Form function attribution bias (page does not exist)
```

The new function returns a backup link of 
```
index.php?title=Form_function_attribution_bias&action=edit&redlink=1
```

Going to the link in the Wikipedia list page goes to this:
```
https://en.wikipedia.org/wiki/Form_function_attribution_bias
```

Where it says: *Wikipedia does not have an article with this exact name. Please search for Form function attribution bias in Wikipedia to check for alternative titles or spellings.*

If the text is red we know that it has no page.  This would be the ```a.new { color: #ba0000; }``` class

The next question is, how do we let the user know that there is no page?  Maybe have a red style of our own?  It's not a very semantic class name.  Just because an entry is new doesn't mean it can't have it's own page.

So whatever we do that depends on that keyword might change in the future if for example a designer renames the class *pageless* or something.  Well, that's what we should call ours.

Just had a thought, rather than destructuring this anchor tag, maybe we should just be handing that around and letting the system do what it want's with the properties?  Nice idea. Let's stick with the plan for now.

For now, forget about adding a missing page style.  When the redirection fails, there will still be the short description and other planned features like ready made links to other content.

So if the link contains 'index.php', we know the link didn't work out.

Next up, the underscore, and other escaped characters:
```
Naïve realism (Na%C3%AFve_realism_(psychology))
```

If we just use the title and not the link, then everything seems to work.  Underscores are added to the backup title, which, if it exists, will not be lower-cased by the curator package on the server.

Next problem: Regressive bias also causes an error:"No data in response:[object Object]"

The server shows it using this link:
```
https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=regressive_bias
```

On the Wikipedia 'list of biases' page, the name is text only, not an anchor, and unlike *Form function attribution bias*, there is no 'new' class to indicate this.

We need a better plan to deal with items that have no pages.  For now, we are still not sure programmatically if there are no pages, or the redirect is broken.

The item *Information bias* has a title with the category.  However, using the name in this case goes to a redirect page, whereas going to the link URL works:
https://en.wikipedia.org/wiki/Information_bias_(psychology)

So in this case, although it's a page returned (a disambiguation page) it's not right page, when we should know better.

## Item State

When a user chooses an item from the list, or slides it to show the short description (not implemented here yet), or any other action on the item changes its state.  In the Loranthifolia Ionic app, something like this is done when the user selects an item:
```
    this.list[i].detailState = 'viewed';
    this.dataService.setItem(this.itemName, this.list);
```

This is what needs to be added to our detail.model class:
```
    detailState:  string; // un-viewed/viewed
    descriptionState:  string; // un-viewed/viewed
    itemState:  string; // show/removed
    itemOrder:  string; // itemOrderNumber
    listSortingProperty:  string; // property name (default sortName)
```

Combine that with the styles that get added or removed based on the change:
```
<span class="ion-list__defaultItem"
    [ngClass]="{
        'list__both': item.cognitive_biasLabel && item.wikiMedia_label, 
        'list__text-wikimedia': !item.cognitive_biasLabel,
        'list__item--viewed': item.detailState ==='viewed'}">
```

And the style:
```
.list__item--viewed {
    opacity: 0.5;
}
```

All this stuff works together to create the item state, JS, data model, conditional styles.  It almost seems like it could be a state component that could be used across all the apps.  Can't see how that would work right now since would operate on data model outside each item.  

I suppose it would have to be a mix of components.  An item with state styles, a shared data model, and the calling page having to take care of changing the state.


## Implementing a spinner

In the Ionic app, we can use the out of the box framework spinner like this"
```
<ion-spinner name="bubbles"></ion-spinner>
```

However, since this Angular app has no UI framework (by design), we need to create our own.

With a quick search found a nice css only spinner to use.  Since we want to use this in multiple situations,  lets create a component for it instead of trying to share styles or create a global stylesheet which is considered an anti-pattern these days.

Start off using the CLI:
```
$ ng generate component components/spinner
```

By default, the CLI will add the component to the declarations array in the app modules.  But this is not what we want.  We can only use that in one module, which you would think is the app.module class.  But then trying to use the spinner in a child module, like one of our pages will result in the usual error saying something like: *if spinner is an Angular component, then verify that it is part of this module.* or *the spinner angular component is not a known element*.

You cannot import it into multiple child modules either, as Angular will complain.  I guess there are a lot of people out there creating a custom component for just one place in your app, but if you want to share the love, you could create a shared module to hold things like that.

It looks something like this:
```
@NgModule({
    imports: [ ],
    declarations: [ SpinnerComponent ],
    exports: [ SpinnerComponent ]
})
export class SharedModule {}
```

Then we import that in the app.module, as well as the other child modules, and we are good to go.  We will let each page handle showing or hiding the spinner like this:
```
<app-spinner *ngIf="showSpinner"></app-spinner>
```

With the spinner chosen, a more fitting name might be the 'pulsator'. 




## Scroll position restoration

Since reading about a new feature in Angular 6.1 called scrollPositionRestoration, we have been holding off in creating out own bookmarking feature.  So now, bumping the versions in the package.json file for Angular from "^6.0.3", to 6.1.4, trying it out at fist nothing has changed.  Of course we have done an npm i, then threw away the node_modules and did it again after that didn't work.

Not sure if we are experiencing [this open issue](https://github.com/angular/angular/issues/24547).  That's for scroll positioning when the DOM is first rendered and before the async fetch function returns and populates the list, the scroll adjustment is made.  If it were static content this might not happen.  Only three days ago the last comment.  Have to watch this conversation and come back to this.

Also took a moment up upgrade npm: *Update available 5.6.0 → 6.4.0*:
```
npm i -g npm
```

Still, it's not doing what we expected it to do.  Will have to come back to this later, after issue 24547 has been closed and a new version with a fix is available.  If that doesn't happen then we can create our own list bookmarking.


## Updating server calls with language settings

Since the client decided to add language settings to the API calls, these functions have been modified in the curator package:
```
createWikiDataUrl(lang)
createWikiMediaUrl(sectionNum, lang)
createSingleWikiMediaPageUrl(pageName, lang)
```

We therefore need to allow the client to pass this extra arg in via the NodeJS app.  That means modifying theses API calls in the index.js file:
```
get('/api/list/:lang')
get('/api/wiki-list/:id/:lang')
get('/api/detail/:id/:lang')
```

And then pass the lang arg on to the curator calls.  Then, to test it out, in the dream app backend-api.service.ts file:
```
  private backendListUrl = '/api/list';
  private backendWikiListUrl = '/api/wiki-list';
  private backendDetailUrl = '/api/detail';
```

We can add the arg like this:
```
return this.httpClient.get<DetailModel>(this.backendDetailUrl+'/'+detailId+'/'+this.lang).pipe(data => data);
```      

Next, the problems.  Our list looks like this:
```
Q18570
Q29598
Q136783
...
```

Can fix that with encodings.  Or can we?  Those look more like Wikipedia item codes...

It gets worse when we look at the url provided us from the curator for this page:
```
https://kr.wikipedia.org/w/api.php?action=parse&section=1&prop=text&format=json&page=List_of_cognitive_biases
```

The response being:
```
{"error":{"code":"missingtitle","info":"The page you specified doesn't exist.","*":"See https://kr.wikipedia.org/w/api.php for API usage. Subscribe to the mediawiki-api-announce mailing list at &lt;https://lists.wikimedia.org/mailman/listinfo/mediawiki-api-announce&gt; for notice of API deprecations and breaking changes."},"servedby":"mw1344"}
```

The fact that there is no list of cognitive bias in Korean on Wikipedia should have been the first thing checked before this feature was begun.  There are 11 languages supported, so it wont be wasted.  Also, it will be good to plug these points of failure in the app and move towards more generic user generated categories.

But being Korean is the only other language we wanted to test, it's a bit of a disappointment.  The encoding for Korean is kr, but changing [the url](https://kr.wikipedia.org/wiki/List_of_cognitive_biases) in the browser from en to kr points to a closed page that shows what it was a Kanuri page which is a language in Northern Nigeria.  So it's actually ko!

The first bias on the list, Ambiguity effect lists nine languages:
```
bn	এম্বিগিউইটি প্রভাব
cs	Ambiguity effect
en	Ambiguity effect
fa	اثر فرار از ابهام
fr	Effet d'ambiguité
nl	Ambiguïteitseffect
pt	Efeito de ambiguidade
ru	Эффект неоднозначности
uk	Ефект неоднозначності
```

The main list of biases supports 12:
```
az	Təhrif
ca	Llista de biaixos cognitius
de	Liste von kognitiven Verzerrungen
en	List of cognitive biases
es	Anexo:Sesgos cognitivos
fa	فهرست سوگیری‌های شناختی
pl	Lista błędów poznawczych
pt	Lista de vieses cognitivos
ru	Список когнитивных искажений
th	รายชื่อความเอนเอียงทางประชาน
uk	Перелік когнітивних упереджень
zh	認知偏誤列表
```

So this would be the main problem with even trying to support one setting for languages.  The full list would lead to dead ends for a lot of languages.

Possibly we could let the user choose an available language on the detail page.  We should see about getting the list back and deal with the main list translations later.

Anyhow, it we back up and use the correct indicator for Korean (ko not kr), we get a partial list like this:
```
호손 효과
현상유지편향
주술적 사고
Q177603
Q178647
Q182490
```

Choosing the first item, the app will use this url:
https://ko.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=호손_효과

This page does exist, but the category is encoded and would look like this:
https://ko.wikipedia.org/wiki/%ED%98%B8%EC%86%90_%ED%9A%A8%EA%B3%BC

We're still getting the text error:
```
core.js:1671 ERROR TypeError: Cannot read property 'text' of undefined
    at ListPage.push../src/app/pages/list/list.page.ts.ListPage.parseList (list.page.ts:135)
    at SafeSubscriber._next (list.page.ts:50)
```

So we should start with that, and then encode our subject, then get rid of the Q... items, and then we can deal with separating the language option to more locations, such as the list and individual pages.  If we could get that list of available languages, we could automatically generate a select on the detail page for easy use.

The error is for the WikiMedia sections which don't exist.  We can catch the error, but how should the app report to the user that there are no WikiMedia lists to merge with the WikiData list?  To be decided.

Next, the codes instead of labels.  The data for one item looks like this:
```
{
      "cognitive_bias" : {
        "type" : "uri",
        "value" : "http://www.wikidata.org/entity/Q177603"
      },
      "cognitive_biasLabel" : {
        "type" : "literal",
        "value" : "Q177603"
      }
    }
```

This is the social perception bias.  Following that link shows among other things, this:
*Korean	No label defined  No description defined*

Compare that with what we get for our first item:
```
"호손 효과" : "http://www.wikidata.org/entity/Q18570"
```

This page has *Korean 호손 효과 No description defined*

So we can safely exclude items that have a label with Q and a number.  After this we add a select to the list page and we have i18n on the list.  However, the detail pages give a
```
"Http failure response for https://radiant-springs-38893.herokuapp.com/api/detail/%ED%98%84%EC%83%81%EC%9C%A0%EC%A7%80%ED%8E%B8%ED%96%A5/ko: 500 Internal Server Error"
```

In the server console, we are seeing:
```
id 호손_효과
wikiRes.headers { date: 'Wed, 22 Aug 2018 00:54:12 GMT',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '573',
  connection: 'close',
  server: 'mw1233.eqiad.wmnet',
  'x-powered-by': 'HHVM/3.18.6-dev',
  'mediawiki-api-error': 'missingtitle',
  p3p: 'CP="This is not a P3P policy! See https://ko.wikipedia.org/wiki/%ED%8A%B9%EC%88%98:CentralAutoLogin/P3P for more info."',
  'cache-control': 'private, must-revalidate, max-age=0',
  vary: 'Accept-Encoding',
  'content-disposition': 'inline; filename=api-result.json',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'backend-timing': 'D=28540 t=1534899252332751',
  'x-varnish': '556411686, 676824251, 248249759, 722088521',
  via: '1.1 varnish (Varnish/5.1), 1.1 varnish (Varnish/5.1), 1.1 varnish (Varnish/5.1), 1.1 varnish (Varnish/5.1)',
  'accept-ranges': 'bytes',
  age: '0',
  'x-cache': 'cp1085 pass, cp2013 pass, cp5009 pass, cp5010 pass',
  'x-cache-status': 'pass',
  'strict-transport-security': 'max-age=106384710; includeSubDomains; preload',
  'set-cookie': 
   [ 'WMF-Last-Access=22-Aug-2018;Path=/;HttpOnly;secure;Expires=Sun, 23 Sep 2018 00:00:00 GMT',
     'WMF-Last-Access-Global=22-Aug-2018;Path=/;Domain=.wikipedia.org;HttpOnly;secure;Expires=Sun, 23 Sep 2018 00:00:00 GMT',
     'GeoIP=AU:NSW:Yagoona:-33.90:151.02:v4; Path=/; secure; Domain=.wikipedia.org' ],
  'x-analytics': 'https=1;nocookies=1',
  'x-client-ip': '49.195.85.96' }
Url: https://ko.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=호손_효과
```

But after encoding the URL for the detail page, the 28 links are working as well as the English version.  There are still a lot of redirects and a few missing pages, just like the English version.  These issues will all be addressed soon.

Right now we don't have local storage working for the Angular website.  When the user goes back, the list is reloaded and the default English list is shown even if you had just been viewing the Korean list and gone to a detail page.

Quickly adding a somewhat popular local storage option called [Angular Web Storage Service](https://www.npmjs.com/package/angular-webstorage-service).  But this option seems to be not as simple to use as the Ionic Storage that was using in Conchifolia.

The basic get example:
```
this.storage.get(itemName).then((val) => {
            resolve(val);
          });
```

Fails with an error that says cannot read 'then' of undefined.  So the get() function, if the list has not been stored yet, returns an error, not a promise catch block as was expected?  Anyhow, it seems strange to have to do this:
```
if (this.storage.get(itemName)) {
  this.storage.get(itemName).then((val) => {
    resolve(val);
  });
} else {
    reject();
}
```

But that seems to work.  However, there seems to be no way to check if the set function is completing.  Right now, the http method gets called each time, which would indicate that the storage is not working at all.  So maybe the above code is just masking a setup issue with the storage lib?  If we put some console logs there:
```
if (this.storage.get(itemName)) {
  console.log('1');
  this.storage.get(itemName).then((val) => {
    console.log('2');
    resolve(val);
  });
} else {
    reject();
}
```

We can get to '1', but not '2'.  But if 1 is OK, then we should get to 2.  We are getting the result, but there *is* no then needed.  That get function just returns the result like this:
```
if (this.storage.get(itemName)) {
    resolve(Object.values((this.storage.get(itemName))));
} else {
    reject();
}
```

Not sure if this is how it should go down, but this web app is just a try out for the Ionic version, which already has local storage working.  We have to save the language choice option for now so that when the user goes back from a detail page in Korean, they land back on the Korean list.

It was simple then to re-use the data service for storing a single language option.  We can add a list of options later, such as the sort order or whatever.  Now it's back to the Ionic app to implement i18n there.


## Handling CORS preflight options

The Longifolia project is still having problems with CORS because we are not handling the preflight OPTIONS request properly.

In the [Serene Brushlands project](https://github.com/timofeysie/serene-brushlands/blob/master/index.js), we start off with this:
```
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
var ssl = {
	cert: fs.readFileSync('/etc/letsencrypt/live/trineura.cf/fullchain.pem'),
	key: fs.readFileSync('/etc/letsencrypt/live/trineura.cf/privkey.pem')
};
https.createServer(ssl, app).listen(443);
```

However, on Heroku this may not be necessary.  See [this answer](https://stackoverflow.com/questions/25148507/https-ssl-on-heroku-node-express):
*on your dyno you don't need to "mess" with certs etc, and you will be seeing only incoming http traffic: whether directly from http clients, or from Heroku servers who talk https to clients and http to you.*

Trying [this solution](https://stackoverflow.com/questions/11001817/allow-cors-rest-request-to-a-express-node-js-application-on-heroku) which has a ```allowCrossDomain``` function.

However, this still does not allow the OPTIONS call to complete.  Saw this in the logs:
```
 Tue, 07 Aug 2018 01:06:16 GMT express deprecated res.send(status): Use res.sendStatus(status) instead at index.js:25:9
```

Worth fixing.  But that will not solve this issue.  However, in the Ionic 4 app, we are now getting a new error:
```
http.js:1082 Refused to set unsafe header "Access-Control-Request-Method"
...
detail/magical%20thinking:1 Failed to load https://radiant-springs-38893.herokuapp.com/api/detail/magical%20thinking: Request header field Access-Control-Allow-Origin is not allowed by Access-Control-Allow-Headers in preflight response.
```

After removing the CORS headers from the service in that project, the detail API calls are permitted and this saga can end!


## Local storage options

Right now, the list is reloaded each time the user navigates back to the list page.  There are ways to cache this, such as another service which holds the complete list, but since we will need to persist the state of each item as part of planned features, it would be better to address this need now.

The first option to consider is [Async local storage for Angular](https://github.com/cyrilletuzi/angular-async-local-storage) 

The author of this repo,  puts the situation well:

*The localStorage API is simple to use but synchronous, so if you use it too often, your app will soon begin to freeze.*

*The IndexedDB API is asynchronous and efficient, but it's a mess to use: you'll soon be caught by the callback hell, as it does not support Promises yet.*

In Ionic, we could use PouchDB, SQLites or a native plugin, but that's not going to work in React.  Since we want to implement the same features in React Native, a pure JavaScript approach is needed.

One problem with these dbs is the lack of a get all or query functionality.  We would have to store the whole list each time something changes.  Not sure how costly this would be.  Since we only have 191 objects that is only likely to grow very slowly, it may not be that bad.

We will also want to store the app preferences in the db, so there will be at least two tables to worry about.

We should at least have a list of options before jumping in however.
```
PouchDB (no SQL option with sync)
SQLite (Local storage; you supply the sync and backup, but will in work on a website?)
Async Storage ("built-in" to React Native)
Firebase (JSON document store beside the real-time database)
Realm (devices handle sporadic or lossy network connectivity)
MongoDB (Local only NoSQL solution)
PWA (still needs to use a storage options)
Use the NodeJS server (won't scale, or rather we don't want to handle scale)
```

Since we don't need to sync anything (at least it's not part of any foreseeable feature for now), SQLite with it's query abilities might be a good option.  But so far, I think this requires native functionality.  If this was an Electron app of used via a plugin with Ionic, it would be OK, but it's not.

It's worth noting that with Ionic 4 the docs recommend Ionic Storage which is built on top of the LocalForage library. will run through SQLite for native, IndexedDB (if available), WebSql, or Local Storage.  That sounds a lot like our Async local storage for Angular lib.  Still, if it's only for Angular, then that doesn't fit our needs.  What is the best local storage that can be shared across multiple projects?

```
PouchDB (no SQL option with sync)
SQLite (Local storage; you supply the sync and backup, but will in work on a website?)
Async Storage ("built-in" to React Native)
Firebase (JSON document store beside the real-time database)
Realm (devices handle sporadic or lossy network connectivity)
MongoDB (Local only NoSQL solution)
PWA (still needs to use a storage options)
Use the NodeJS server (won't scale, or rather we don't want to handle scale)
```



## Adding WikiMedia Items to the list

Since the WikiData result for cognitive biases only returns 90, and there are almost 300 on Wikipedia, we know we have a problem.

Usually the name of item can be got this way:
```
itemName = tableDiv[0].getElementsByTagName('a')[0].innerText;
```

A few however, like 'frequency illusion' are not links, so are just the contents of the <td> tag.
Some, such as 'regression bias' have a <span> inside the tag.

Now, checking if a WikiMedia item is already on the WikiData list and then sorting the list needs to be done so as not to shed the DOM as the results for those section calls come back.

It's straightforward enough to look thru the list on each WikiMedia item, and then sort at the end of each merge.  But this will hang the browser during those 17,000 or so iterations on the UI thread.

Sometimes there is even an error when the list seems like it's undefined.  Maybe when it's being accessed when it's being modified?
```
core.js:1671 ERROR TypeError: Cannot read property 'length' of undefined
    at ListPage.push../src/app/pages/list/list.page.ts.ListPage.addItems (list.page.ts:85)
    at SafeSubscriber._next (list.page.ts:49)
    at SafeSubscriber.push../node_modules/rxjs/_esm5/internal/Subscriber.js.SafeSubscriber.__tryOrUnsub (Subscriber.js:195)
    at 
```

Line 85 is in the addItems function.

TODO: WIP - A solution for this is being tested that involves nested subscriptions.  One solution for this would be a chain of Promises that use a 'then' statement to make sure the sequence.  But will a series of API calls, it is faster to make all the calls at once, and only do the sort and/or the add function(s) after all the lists have returned.

What is the rxjs solution for this.  I have use ```Promise.all()``` before.  That looks something like this:
```
function requestAsync(url) {
    return new Promise(function(resolve, reject) {
        request(url, function(err, res, body) {
            if (err) { return reject(err); }
            return resolve([res, body]);
        });
    });
}
Promise.all([requestAsync('url1'), requestAsync('url2')])
    .then(function(allData) {
        // All data available here in the order it was called.
    });
```
The method right now works to solve the issue, and local storage will make sure that we only have to wait for it to load once per user.  After that, we should only show alerts if something has changed.  So this is not a pressing issue, just something to think about for now.

Anyhow, this processing is all needed, so maybe using a spinner would be the best way to show the content but also indicate that some items are still pending.

There is an item at the top of the list: "Women are wonderful" effect.  Obviously this is true because the item comes first!
```
https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=%22women_are_wonderful%22_effect
```

That link won't work, but this link does:
```
https://en.wikipedia.org/wiki/Women_are_wonderful_effect
```

So removing the quotes from the search string property lets that item be sorted normally and it loses its special spot at the top of the list.

Also, the sort function mostly works, except at the bottom of the list, Zero-sum bias
 is followed by affect heuristic.

Not sure what's going on there.

Each time the user goes back to the list from a detail, the list is re-loaded, which is costly.  It seems the lazy loading feature is not working as described in [the docs](https://angular.io/guide/router):
*The lazy loading and re-configuration happen just once, when the route is first requested; the module and routes are available immediately for subsequent requests.*

In the Ionic app, we used the RxJS Behavior Subject class to load the list and provide it to the list page.  This will return the cached list but also get a new version and return that if it's different.  There are a [few different subjects](https://github.com/Reactive-Extensions/RxJS/tree/master/doc/api/subjects) in RxJS.

The Reactive Extensions provide Angular, NodeJS and other bindings, but there is no mention of ReactJS.  I think in React, state is so strong, that an observable taking over the job of say a click event could be considered sacrilegious.  How will the component know when to update?  You would have to invoke this.setState().  Also, with React Native we wouldn’t be able to select elements in the same way.  Or maybe not.  Maybe this lib would work there also.

There are [libraries like this](https://github.com/recyclejs/recycle) that try to bridge this gap, but we would rather use a standard JavaScript land approach.  Since we want to use a local storage solution, really that is the starting point for caching and providing the list and the state of the items in it.  Since our lists right now aren't too long, just putting the entire list in local storage under one name isn't a big deal.  But what if someone wanted to use the list of cities in Asia?  This is a page itself of lists.  Say a list of cities in China only goes up to 668.  That might not be a big problem.  If someone wanted to learn a list of 10,000 words, that would be a problem.  But it looks like we could get around this by using sub-categories which will always be more manageable.

So, for now we will move on to using a storage solution that will also provide a solution for this issue.


## Detail page issues

http://localhost:5000/detail/denomination_effect
This has a "Part of a series on Psychology" preamble with a long list of categories before the description.

https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page="women_are_wonderful"_effect
Should be:
https://en.wikipedia.org/wiki/Women_are_wonderful_effect

Another problem:
```
id dunning–kruger_effect
raw data 
undefined:1
SyntaxError: Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at IncomingMessage.wikiRes.on (/Users/tim/repos/loranthifolia-teretifolia-curator/conchifolia/index.js:100:35)
    at emitNone (events.js:111:20)
```

This will crash the server, so we need a error handler for this case.

The error returned from the url in the browser is:
```
{"error":{"code":"missingtitle","info":"The page you specified doesn't exist.","*":"See https://en.wikipedia.org/w/api.php for API usage. Subscribe to the mediawiki-api-announce mailing list at &lt;https://lists.wikimedia.org/mailman/listinfo/mediawiki-api-announce&gt; for notice of API deprecations and breaking changes."},"servedby":"mw1315"}
```

The name Wikipedia expects is: https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect
Dunning–Kruger_effect

Is it just a matter of capitals?  It is, because this url will work:
```
https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=Dunning%E2%80%93Kruger_effect
```


## Creating full links

On the detail page we display the html contents of a description from the WikiMedia (aka Wikipedia) API result.  It therefore has all the notes (which we have called preambles), footnotes and other errata that we want to hide.

We have some functions to remove preambles from the content in the Curator lib, but that was based on parsing using the DOM.  Since this causes problems for non-NodeJS environments, we are going to migrate these functions to reg-ex parsing.

The goal now is to turn links in the WikiData content into functional external links.

We want to go from something like this:
```
<a href="/wiki/Emotional_bias" title="Emotional bias">emotional bias</a>
```

To this:
```
<a href="https://en.wikipedia.org/wiki/Emotional_bias" title="Emotional bias">emotional bias</a>
```

This will require the language info which is captured in the list data.  It would be easy to just pass this to the detail page with the subject, but we would like the user to be able to change the language setting, so it should be a global setting.  The UX department has said a gear or some icon at the upper right hand of the screen is their first idea about creating this.  This will link to a settings page where it can be changed.  It will default to English.

We might also want to remove this at the end of the description.
```
<!-- NewPP limit report
...
--!>
```

We should also look more into sanitizing the result as this message suggests:
```
core.js:7327 WARNING: sanitizing HTML stripped some content (see http://g.co/ng/security#xss).
```

Currently we just do this:
```
<p [innerHTML]="descriptions"></p>
```

If we are sure about the content we could use this solution from our most popular StackOverflow [question](https://stackoverflow.com/questions/43035989/how-to-use-bypasssecuritytruststyle-correctly):
```
sanitizer.bypassSecurityTrustStyle(value);
```


## Implementing detail page routing

Using the CLI to create the routing module like this: 
```
ng generate module app-routing --flat --module=app
```

Then create two pages:
```
ng generate page pages/list
ng generate page pages/detail
```

The list page can contain the markup we have already in the app.component.  The detail page will be to hold the full description result from the API call we have just finished.

Got this error:
```
Schematic "page" not found in collection "@schematics/angular".
```

That's a CLI thing.  So tried this:
```
$ sudo npm install -g @angular/cli
...
Your global Angular CLI version (6.1.1) is greater than your local
version (6.0.8). The local Angular CLI version is used.
To disable this warning use "ng config -g cli.warnings.versionMismatch false".
Schematic "page" not found in collection "@schematics/angular".
```

So did this:
```
$ npm install @angular/cli
```

But we still get the same mismatch error.  Tried again, but despite using sudo:
```
$ sudo npm install -g angular-cli
...
gyp ERR! configure error 
gyp ERR! stack Error: EACCES: permission denied, mkdir '/Users/tim/.nvm/versions/node/v8.9.4/lib/node_modules/angular-cli/node_modules/node-sass/build'
gyp ERR! System Darwin 14.5.0
```

This is not the recommended install line.  Strange things are happening now:
```
$ npm install @angular/cli@latest
+ @angular/cli@6.1.1
added 9 packages from 9 contributors, updated 4 packages and audited 21762 packages in 36.357s
QuinquenniumF:my-dream-app tim$ ng generate page pages/detail
-bash: /Users/tim/.nvm/versions/node/v8.9.4/bin/ng: No such file or directory
QuinquenniumF:my-dream-app tim$ nvm use 8
Now using node v8.9.4 (npm v6.1.0)
QuinquenniumF:my-dream-app tim$ ng generate page pages/detail
-bash: ng: command not found
QuinquenniumF:my-dream-app tim$ sudo npm install -g @angular/cli@latest
npm ERR! path /Users/tim/.nvm/versions/node/v8.9.4/bin/ng
npm ERR! code EEXIST
npm ERR! Refusing to delete /Users/tim/.nvm/versions/node/v8.9.4/bin/ng: ../lib/node_modules/angular-cli/bin/ng symlink target is not controlled by npm /Users/tim/.nvm/versions/node/v8.9.4/lib/node_modules/@angular/cli
npm ERR! File exists: /Users/tim/.nvm/versions/node/v8.9.4/bin/ng
npm ERR! Move it away, and try again.
npm ERR! A complete log of this run can be found in:
```

Could have just added the pages by hand by now]\\=][][]'

So that's just what we'll do.  Copy the pages directory from loranthifolia, but change HomePage to ListPage which makes more sense.  The modules only have to be configured in the router module which we already have.

```
$ sudo npm i -g @angular/cli
npm ERR! path /Users/tim/.nvm/versions/node/v8.9.4/bin/ng
npm ERR! code EEXIST
npm ERR! Refusing to delete /Users/tim/.nvm/versions/node/v8.9.4/bin/ng: ../lib/node_modules/angular-cli/bin/ng symlink target is not controlled by npm /Users/tim/.nvm/versions/node/v8.9.4/lib/node_modules/@angular/cli
```

Installed node 9 via nvm and built again:
```
This usually happens because your environment has changed since running `npm install`.
Run `npm rebuild node-sass` to download the binding for your current environment.
...
$ npm rebuild node-sass
```

The the ng build command completes.  First test of the navigation reveals this error:
```
core.js:1671 ERROR Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'detail'
Error: Cannot match any routes. URL Segment: 'detail'
```

After fooling with things a bit, the app.component loads but to a white screen and the list page is not shown, despite it being the default redirect.  Oh.  Had a type in the list module path name.  But still the white screen.  The url shows the redirect to the list route.

The @Component({ selector: 'app-page-list' should be this, right?  The list page constructor is never called.  Maybe we need to put everything in the ng on init function?  Trying the route config for the base route without the ```pathMatch: 'full'``` part.

Then we get this error:
```
Error: Invalid configuration of route '{path: "", redirectTo: "list"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.
```

Trying the value *prefix* then.  Bingo.  Now we are back to the detail page error:
```
core.js:1671 ERROR Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'detail'
Error: Cannot match any routes. URL Segment: 'detail'
```

There is now a double 'list/list' in the url.  Changing this:
```path: 'list',``` to ```path: '',``` in the module, and for detail.  That's how we had it in the loranthifolia project.  Doesn't help.  Maybe we need this: ```path: 'detail/:id',```.  That didn't help.  Then while offline testing, it seems that since the ids are sent thru with spaces in them.  I think the curator lib replaces spaces with a dash, so if we do that here, it should all work.

We can either create a pipe, or more simply use a function to route the app to the details page and do it programmatically.  Now refresh one's memory as to how that's done. 

```
import { Router } from '@angular/router';
...
constructor(private router: Router) { 
...
navigateAction(item: string) {
  this.router.navigate(['detail/'+itemRoute]);
}
```

Now ab out that item route, looking at the curator code, the subject is modified like this:
```
let subject = pageName.replace(/\s+/g, '_').toLowerCase();
```

That worked for our offline hard-wired click event.  But then it fails using the actual link.  What?!  Taking the blank routing info out of the page modules results in this error:
```
core.js:1671 ERROR RangeError: Maximum call stack size exceeded
```

So going back to the ```path: '',``` idea from above and the route works!




## Creating the Angular Service

Create a service with the CLI command ```ng g s services/backendApi```.
Import that into the app.module.ts file and add it to the providers list.
Also create two models for a list and details that can be used to check the responses against.
Since we are using http now we also need to import the HttpClientModule and add it to the imports array in the app.module.ts or we will get a "no provider for" error.

Things have changed a bit in Angular and the first problem here is the difference between using these:
``` 
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
```

There is no json in which can be used like this:
```
.then(response => response.json() as ListModel[])
```

The response object is a JSON by default, so there's no need to parse it.  Also, the type checking is done like this ```return this.httpClient.get<ListModel>``` instead of something like this ```getList(): Promise<void | ListModel[]>```

There are other differences in using rxjs.  Doing this import ```import { Observable } from "rxjs/Observable";``` causes this error: *Observable is declared but its value is never read.*  The new Angular 6 way to do this is ```import { Observable } from "rxjs";```.

We can also use an interceptor which allow middleware logic to be inserted in the pipeline as well as listen for progress, but we wont be doing any of that yet.  There is still the question of how to use these http functions.  [This blog](https://www.academind.com/learn/javascript/rxjs-6-what-changed/) has a good intro to what has changed.

There are so many defaults now, that errors don't need to be handled by, ahem, hand.  Everything can be done on one line:
```
getList() {return this.httpClient.get<ListModel>(this.backendListUrl).pipe(data => data)}
```

Still, some might prefer how this looks:
```
  getList() {
    return this.httpClient.get<ListModel>(this.backendListUrl)
      .pipe(data => data);
  }
```  

The next problem then is the port used to develop using ng serve is 4200, but the server is using 5000, so we get this error:
```GET http://localhost:4200/api/list 404 (Not Found)```

To see if the code works first, we can build the project and restart the server.  It does work, but this is not a great work flow.  What we need is to specify the port for http calls when running on localhost.  But since the build is pretty quick, putting up with this for now.  The service works as expected so moving on to routing for the detail page now.


## The Beginning

The base Heroku NodeJS example app was cloned from [this repo](https://github.com/heroku/node-js-getting-started.git).  It's serving an Angular 6 app created using the Angular CLI and built into the existing views directory.  This was created with the ```ng new my-dream-app``` Angular CLI command.

[This](https://blog.cloudboost.io/run-your-angular-app-on-nodejs-c89f1e99ddd3) was the helpful blog which helped us serve the Angular app using the Heroku base app. It basically shows how to create an array of file types to check for and serve as well as default to the index.html file.

It was decided to deploy the built Angular project instead of having the server build the project because of the need to have the server have all the build tools installed.  A lot of people recommend including all the dev dependencies in the dependencies section of the package.json file, but given the failed first attempt it's simpler to to the dev work locally and just build the project before deploying.

The .gitignore file from the angular project was copied into the node file with the extension of the my-dream-app/ added at the beginning of each path.  This will make sure that the node_modules and other files are not deployed to the server.  The vendor.js file can take between 11 to 15 seconds to load on the server.  The Content-Length is 2941257.  This is not great.

## Previous Floating Fjord

The first try ended in failure.  Changing the server app and trying to deploy the Angular app went too far and so it was easier to start over with a fresh install.  Here are the notes with the problems encountered on the first try.

This is the base Heroku NodeJS app cloned from [this repo](https://github.com/heroku/node-js-getting-started.git).  It's serving an Angular 6 app created using the Angular CLI.

[This](https://blog.cloudboost.io/run-your-angular-app-on-nodejs-c89f1e99ddd3) was the helpful blog which helped us serve the Angular app using the Heroku base app.  This was to solve the error:
```
Refused to execute script from 'http://localhost:5000/runtime.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.
```

The problem was we were only serving the the index file and not responding to the calls within that file for the rest of the build packages such as:
```
main.js
polyfills.js
runtime.js
styles.js
vendor.js
```

However, after going through the steps to deploy the app to Heroku:
```
$ heroku create
$ git push heroku master
$ heroku ps:scale web=1
$ heroku open
```

We get the static files in views directory served.  First of all, get rid of those bindings in the index.js file.  Second, add the Angular site to the git repo so it actually gets pushed.

Then, we get this error:
```
Error: ENOENT: no such file or directory, stat '/app/my-app/dist/my-app/index.html'
```

Could that be this line?
```
  .use(express.static(path.join('dist', 'my-app/dist/')))
```

In the logs, this:
```
console.log('path.resolve',path.resolve('.'));
console.log('path.resolve',path.resolve('/'));
```

Turns into this:
```
2018-07-28T14:52:27.992622+00:00 app[web.1]: path.resolve /app
2018-07-28T14:52:27.993728+00:00 app[web.1]: path.resolve /
```

So use this instead:
```
path.join('/', 'my-app/dist/')
```

Looks for a path with a leading /.  So don't use any path joins at all.  Then the error is:
```
2018-07-28T15:03:21.567268+00:00 app[web.1]: TypeError: path must be absolute or specify root to res.sendFile
```

Trying ```.use(express.static('./my-app/dist/'))``` causes this error:
```
2018-07-28T15:06:31.317990+00:00 app[web.1]: TypeError: path must be absolute or specify root to res.sendFile
2018-07-28T15:06:31.318009+00:00 app[web.1]: at ServerResponse.sendFile (/app/node_modules/express/lib/response.js:421:11)
2018-07-28T15:06:31.318011+00:00 app[web.1]: at express.use.use.use.use.set.get (/app/index.js:28:11)
```

Tried to defeat Heroku by renaming my-app to app:
```
2018-07-28T15:12:18.654033+00:00 app[web.1]: Error: ENOENT: no such file or directory, stat '/app/app/dist/my-app/index.html'
```

Can't actually put the app into the root directory because then there would be two package.json and two node_modules.

Using this again:
```
.use(express.static(path.join(__dirname, 'dist/')))
```

Causes this:
```
Error: ENOENT: no such file or directory, stat '/app/dist/my-app/index.html'
```

But that file exists.  Is it the leading slash that is causing the failure?

How about this?
```
path.join('app', 'dist/')
```

No getting rid of that slash:
```
Error: ENOENT: no such file or directory, stat '/app/dist/my-app/index.html'
```

Well, despite there being no dist ignored in the git ignore file, it was ignored.
Tried this:
```
QuinquenniumF:heroku-getting-started tim$ git add app/dist -f
QuinquenniumF:heroku-getting-started tim$ git status
On branch master
Your branch is ahead of 'origin/master' by 14 commits.
  (use "git push" to publish your local commits)
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   app/dist/my-app/3rdpartylicenses.txt
	new file:   app/dist/my-app/favicon.ico
	new file:   app/dist/my-app/index.html
```

However, still getting this in the logs:
```
2018-07-28T16:06:03.925867+00:00 app[web.1]: Error: ENOENT: no such file or directory, stat '/app/dist/my-app/index.html'
```

Running ```heroku run bash``` and going to that dir:
```
~/app/dist/my-app $ ls -l
total 6348
-rw------- 1 u20856 dyno   23678 Jul 28 16:05 3rdpartylicenses.txt
-rw------- 1 u20856 dyno    5430 Jul 28 16:05 favicon.ico
-rw------- 1 u20856 dyno     574 Jul 28 16:05 index.html
```

So it is there.  What the?  Time to start over.

# node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku (#Deploying-to-Heroku)

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
