var gpio = require('rpi-gpio');
var express = require('express');

app = express();

var Led = function (pin) {
	this.on = false;
	this.pin = pin
	this.turnOn = function() {
		gpio.write(this.pin, true, (err) => {
			if(err) throw err;
			this.on = true;
		})
	}
	this.turnOff = function() {
		gpio.write(this.pin, false, (err) => {
			if(err) throw err;
			this.on = false;
		})
	}
	gpio.setup(this.pin, gpio.DIR_OUT);
};

var led7 = new Led(11);
var led11 = new Led(7)

app.get('/', function(req, res) {
	res.send("led7: " + led7.on + " led11: " + led11.on);
});

app.get('/on/:led', function(req, res) {
	led = req.params.led
	if(led == 7) {
		led7.turnOn();
		res.send('turned on 7');
	}
	else if(led == 11) {
		led11.turnOn();
		res.send('turned on 11');
	}
	else {
		led7.turnOn();
		led11.turnOn();
		res.send('turning all leds on');
	}
});

app.get('/off', function(req, res) {
	led7.turnOff();
	led11.turnOff();
	res.send('Turning them off');
});

app.listen(3000, function() {
	console.log('listening on port 3000');
});
