# Reango Client Boilerplate
An isomorphic Relay boilerplate

### Features


* Isomorphic React + Relay
* React-Router beta 3
 * Webpack beta 2
 * HMR React Hot loader beta 3
 * Happypack for fast builds!
* Node ^6.6.0!

## Installation 
* `npm install -g webpack@2.1.0-beta.19`
* `npm install`
* `npm start:dev`
BOOM HMR!

## Client-side development
The isomorphic/hmr entry point is the routes used by react router. 
Rebuilds the client code in-memory & uses hot module reload so you can develop super fast! On my 2013 MBA an initial build takes about 8 seconds and updates usually take 800ms

## Server-side development

* npm run prod
* http://localhost:8888
* If you edit any client or universal files, run npm run bs to rebuild & serve the bundle
This mode is great because you can make changes to the server without having to recompile the client code That means you only wait for the server to restart! GAME CHANGER!

## Eslint
Deps have been left out for brefity this command will set you up
`npm install -g eslint eslint-config-airbnb eslint-plugin-babel eslint-plugin-import eslint-plugin-react`


Heavily inspired by the following projects.
* https://github.com/mattkrick/meatier
* http://todomvc.com/
* https://github.com/denvned/isomorphic-relay-boilerplate
* https://github.com/denvned/isomorphic-relay-router/tree/master/examples/todo


##Contributing
 - Pull requests welcomed!
 - Use the gitter for any questions
 - No donations necessary (but if you know of any jobs that'll let me move back to San Diego, let me know :wink:)