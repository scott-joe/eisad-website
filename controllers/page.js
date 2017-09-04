'use strict';

module.exports = function( server ) {
	server.route('/')
		.get(function( req, res ) {
			var payload = {pageClass: 'homepage'};
			res.render( 'index', payload);
		});
};
