//Global middleware these will be used on every request to the server whether it to the API for DB access or Auth or for front end assets
var	bodyParser = require('body-parser');

module.exports = (app) => {
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
}
