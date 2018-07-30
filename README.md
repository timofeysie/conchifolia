# radiant-springs-38893

A NodeJS server app with a combined Angular client.

The app is available at [this location](https://radiant-springs-38893.herokuapp.com/).

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

To see if the code works first, we can build the project and restart the server.  It does work, but this is not a great work flow.  What we need is to specify the port for http calls when running on localhost.


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

## Deploying to Heroku

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
