var gpio = require('rpi-gpio');
var express = require('express');

app = express();

var Led = function (pin) {

	this.on = false;
	this.pin = pin;
	this.turnOn = function() {
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

var led7 = new Led(11);
var led11 = new Led(7)


app.get('/', function(req, res) {
	res.json({
		led7: led7.on,
		led11: led11.on
	});
});

app.get('/on/:led', function(req, res) {
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


app.get('/on', function(req, res){
	led7.turnOn();
	led11.turnOn(function() {
			res.json({
				led7: led7.on,
				led11: led11.on
			});
		});
});

app.get('/off/:led', function(req, res) {
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

app.get('/off', function(req, res) {
	led7.turnOff();
	led11.turnOff(function() {
			res.json({
				led7: led7.on,
				led11: led11.on
			});
		})
});

app.listen(3000, function() {
	console.log('listening on port 3000');
});
