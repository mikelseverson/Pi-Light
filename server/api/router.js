var router = require('express').Router();
var gpio = require('rpi-gpio');


var Led = function (pin) {
	this.on = false;
	this.pin = pin;
	this.turnOn = function(callback) {
		gpio.write(this.pin, true, (err) => {
			if(err) throw err;
			this.on = true;
			if(callback) return callback()
		})
	}
	this.turnOff = function(callback) {
		gpio.write(this.pin, false, (err) => {
			if(err) throw err;
			this.on = false;
			if(callback) return callback()
		})
	}
	gpio.setup(this.pin, gpio.DIR_OUT);
};

var led7 = new Led(7);
var led11 = new Led(11);
var led18 = new Led(18);
var led22 = new Led(22);


router.get('/', function(req, res) {
	res.json({
		led7: led7.on,
		led11: led11.on
	});
});

router.get('/on/:led', function(req, res) {
	led = req.params.led
	if(led == 7) {
		led7.turnOn(function() {
				res.json({
					led7: led7.on,
					led11: led11.on
				});
			})
	}
	else if(led == 11) {
		led11.turnOn(function() {
				res.json({
					led7: led7.on,
					led11: led11.on
				});
			})
	}
});


router.get('/on', function(req, res){
	led7.turnOn();
	led18.turnOn();
	led22.turnOn();
	led11.turnOn(function() {
			res.json({
				led7: led7.on,
				led11: led11.on
			});
		});
});

router.get('/off/:led', function(req, res) {
	led = req.params.led
	if(led == 7) {
		led7.turnOff(function() {
				res.json({
					led7: led7.on,
					led11: led11.on
				});
			})
	}
	else if(led == 11) {
		led11.turnOff(function() {
				res.json({
					led7: led7.on,
					led11: led11.on
				});
			})
	}
});

router.get('/off', function(req, res) {
	led7.turnOff();
	led18.turnOff();
	led22.turnOff();
	led11.turnOff(function() {
			res.json({
				led7: led7.on,
				led11: led11.on
			});
		})
});

//api catchall so it doesn't move on to frontend requests
//the public router will look for a file in dist/api/* without this
router.get("/*", function(req, res) {
    res.send('Not found');
});

module.exports = router;
