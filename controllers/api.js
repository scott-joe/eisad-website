'use strict';

module.exports = function( server ) {
	server.route('/contact')
		.post(function( req, res ) {
			var nodemailer = require('nodemailer');
			var sanitizeHtml = require('sanitize-html');

			var transporter = nodemailer.createTransport({
			    service: 'Gmail',
			    auth: {
			        user: process.env.GMAIL_USERNAME,
			        pass: process.env.GMAIL_PASSWORD
			    }
			});

			var mailOptions = {
			    from: process.env.GMAIL_USERNAME,
			    replyTo: req.body.name+' <'+req.body.email+'>',
			    to: 'info@ansiblenetwork.org',
			    subject: 'Member Network Request: '+req.body.name,
			    text: sanitizeHtml(req.body.message)
			};

			transporter.sendMail(mailOptions, function(error, info){
				var response = {
					status: '',
					details: ''
				}

			    if(error){
			    	response.status = 'error';
			    	response.details = 'Sorry, there was an error processing your request...';
			    	console.log(error);
			    } else {
			    	response.status = 'success';
			    	response.details = 'Sent! We\'ll get back to you soon!';
			    }

			    res.json(response);
			});
		})
};
