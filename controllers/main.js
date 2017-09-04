'use strict';

var errorController = require( './error' );
var pageController = require( './page' );
var apiController = require( './api' );

module.exports = function( app ) {
	errorController( app );
	pageController( app );
	apiController( app );
};
