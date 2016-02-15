var router = require('express').Router();

// This may be a great place to add middleware for API requests
// I would like any API request to require auth so I am hoping I can
// throw an error when this point is accessed without auth

//this will happen when there are requests to /api/*
router.use((req, res, next) => {
	console.log('hit');
	next();
});

router.use('/test', require('./test/testRoutes'));

//api catchall so it doesn't move on to frontend requests 
//the public router will look for a file in dist/api/* without this
router.get("/*", function(req, res) {
    res.send('Not found');
});

module.exports = router;


