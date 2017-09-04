//Core Modules
var http			= require('http');
var path            = require('path');

//Basic Dependencies
var express         = require('express');
var _               = require('underscore');

//required express 4 middleware
var bodyParser      = require('body-parser');
var flash           = require('connect-flash');
var exphbs          = require('express-handlebars');
var methodOverride  = require('method-override');

//getting main controller for routes
var mainController  = require('./controllers/main');

//handlebars helpers
var helpers         = require('./lib/hbs-helpers');

//Loading configuration options
var config          = require('config');

var app = express();

// setting mime types for webfonts and other things
express.static.mime.define( { 'application/x-font-woff': [ 'woff' ] } );
express.static.mime.define( { 'application/x-font-ttf': [ 'ttf' ] } );
express.static.mime.define( { 'application/vnd.ms-fontobject': [ 'eot' ] } );
express.static.mime.define( { 'font/opentype': [ 'otf' ] } );
express.static.mime.define( { 'image/svg+xml': [ 'svg' ] } );

app.disable( 'X-Powered-By' ); //SITE SECURITY: this way people cant see that we are using express.js and exploit its vulnerabilities
app.set( 'port', process.env.PORT || config.port ); //setting port

// view engine setup
app.engine('hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
	helpers: helpers,
	partialsDir: "views/partials"
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simulation for PUT and DELETE
app.use( methodOverride() );

app.use(express.static(path.join(__dirname, 'public')));

// routing for application
mainController( app );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
