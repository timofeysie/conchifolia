# Conchifolia

A NodeJS server app with a combined Angular client.

The app is available at [this location](https://radiant-springs-38893.herokuapp.com/).

This the pure Angular version of the WikiData parsing project that has identical implementations is Ionic 4, React Native, and now Angular 6.  Next will be a pure React 16 version of the app.

[React Native version](https://github.com/timofeysie/teretifolia)


[Ionic 4 version](https://github.com/timofeysie/loranthifolia)


This is the Angular 6 version

All of these apps rely on the [Curator](https://github.com/timofeysie/curator), a [npm library](https://npms.io/search?q=art-curator) that provides shared tools for working with WikiData and WikiMedia content.




#

## Table of Contents

1. [Setup and Workflow](#setup-and-sorkflow)
1. [Planned features](#planned-features)
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

* settings page
* language change option
* bookmark the last viewed item
* let the user build a short description
* swipe right to see short description
* swipe up/down on the short description to send the item to the top/bottom of the list
* swipe right to remove it from the list
* save named list changes in local storage
* metrics for the list (number of removed items out of total items)
* detail page metrics (number of preambles, expand/contract preambles, footnotes)
* create a new category
* component style library shared by all the app


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
