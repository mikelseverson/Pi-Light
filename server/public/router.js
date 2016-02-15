var router = require('express').Router();
var path = require('path');
var config = require('../config/config');

//Routes


//dist catch-all
router.get("/*", (req, res) => {
    var file = req.params[0] || config.dist.defaultFile;
    res.sendFile(path.join(__dirname, "../public/dist", file), function(err) {
    	if (err) res.status(404).send("I uh.. lost the page you wanted.");
    });
});

module.exports = router;