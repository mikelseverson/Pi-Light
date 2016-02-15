var gpio = require('rpi-gpio');
var express = require('express');

app = express();

var status = 'off';
gpio.setup(7, gpio.DIR_OUT);
gpio.setup(11, gpio.DIR_OUT);

app.get('/', function(req, res) {
	res.send("Hey, the light is " + status);
	
});

app.get('/on', function(req, res) {
	gpio.write(11, true);
    
gpio.write(7, true, function(err) {
        if(err) throw err;
	console.log('light turned on');
	status = "on"
	res.send("You turned it on");
	});
});

app.get('/off', function(req, res) {
	gpio.write(11, false);

	gpio.write(7, false, function(err) {
		if(err) throw err;
		console.log('light turned off');
		res.send("you turned it off");
		status = "off";	
	});
});

app.listen(3000, function() {
	console.log('listening');

});
