# Webpack Config
Webpack configs

Development config

When the page is opened, a basic HTML layout is sent to the client along with a stringified redux store and a request for the common chunk of the JS. The client then injects the redux store & router to create the page. The redux devtools & logger are also loaded so you track your every state-changing action. The routes are loaded async, check your networks tab in chrome devtools and you'll see funny js files load now & again. If this isn't crazy amazing to you, then go away.

Production config

Builds the website & saves it to the build folder. Maps the styles to the components, but uses the prerendered CSS from the server config (below) Separates the vendor packages and the app packages for a super quick, cachable second visit. Creates a webpack manifest to enable longterm caching (eg can push new vendor.js without pushing a new app.js) Optimizes the number of chunks, sometimes it's better to have the modules of 2 routes in the same chunk if they're small

Server config

A webpack config builds the entire contents of the routes on the server side. This is required because node doesn't know how to require .css. When a request is sent to the server, react-router matches the url to the correct route & sends it to the client. Any browser dependency is ignored & uglified away. To test this, disable javascript in the browser. You'll see the site & css loads without a FOUC.
 
### Client Plugins
* CSS Extractions
* Prefetches
* happyack
Dev
* HMR
* Occurrence order plugin
Prod 
* Named modules Plugin
* CommonsChunkPlugin
* AggressiveMergingPlugin
* MinChunkSizePlugin
* UflifyJsPlguin
* AssetsPlguin
* DefinePlugin

### Server Plugins
* NoErrors
* UglifyJs
* LimitChunkCountPlugin

### Prod Output
#### Server
First the express server is compiled using babel.

Then the webpack-server config is used to generate the isomorphic portion of the server/client 
using the routes directory as input and outputed to the lib dir.

### Client
The client has the CSS extracted, vendor packages (react, relay, router) and routes and outputs it in the assets folder.
