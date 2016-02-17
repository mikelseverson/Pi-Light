var express = require('express'),
	path = require('path');

var config = require('./config/config'),
	middleware = require('./middleware/middleware')

var publicRouter = require('./public/router'),
	apiRouter = require('./api/router')

var app = express()

//global middleware for application
middleware(app)

//Routing
app.use('/api', apiRouter);
app.use('/', publicRouter);

app.listen(config.port, () => {
	console.log("Listening on port: " + config.port);
});
