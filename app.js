var express = require('express');
var mongoose = require('mongoose');
var sass = require('node-sass');
var helmet = require('helmet');

// Conect to DB
mongoose.connect('mongodb://localhost/ecomony');

var app = express();

app.configure(function(){
		app.use(express.bodyParser());		  
	  app.use('/', express.static(__dirname + '/web/public'));
	  app.use(express.methodOverride());
	  app.use(express.favicon());  
	  app.use(express.logger('dev'));  
	  app.use(helmet.xframe());  
	  app.use(helmet.iexss());  
	  app.use(helmet.contentTypeOptions());  
	  app.use(helmet.cacheControl());  
	  app.use(express.methodOverride());  
	  app.use(express.cookieParser());  
	  app.use(express.session({  
	    secret: "godmorgonsverige",  
	    cookie: {httpOnly: true, secure: true},  
	  }));  
	  app.use(app.router);
	  
	  

	  
	  
	  
	});

app.listen(8000, function() {
	console.log('listening' );
});

var entryController = require('./server/controllers/entryController')(app);

//Compile SASS files 
//sass.render({
//	src : 'web/scss',
//	dest: 'web/public/css',
//	debug: true, // obvious
//	success : function(css) {
//		console.log('Scss compiled successfully');
//	},
//	error : function(error) {
//		console.log(error);
//	}
//});