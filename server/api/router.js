var router = require('express').Router();
var gpio = require('rpi-gpio');

function Led(pin) {
	this.status = false;
	this.pin = pin;
	this.turnOn = (callback) => {
		gpio.write(this.pin, true, (err) => {
			if(err) throw err;
			this.status = true;
			if(callback) return callback()
		})
	}
	this.turnOff = (callback) => {
		gpio.write(this.pin, false, (err) => {
			if(err) throw err;
			this.status = false;
			if(callback) return callback()
		})
	}
	gpio.setup(this.pin, gpio.DIR_OUT);
}

var led7 = new Led(7);
var led11 = new Led(11);
var led18 = new Led(18);
var led22 = new Led(22);

function getStatus() {
	return {
		led7: led7.status,
		led11: led11.status,
		led18: led18.status,
		led22: led22.status
	};
}

router.get('/', (req, res) => {
	res.json(getStatus())
});

router.get('/on/:led', (req, res) => {
	led = req.params.led
	if(led == 7) { 
		led7.turnOn(() => {
			res.json(getStatus())
		})
	}
	if(led == 11) { 
		led11.turnOn(() => {
			res.json(getStatus())
		})
	} 
	if(led == 18) { 
		led18.turnOn(() => {
			res.json(getStatus())
		})
	}
	if(led == 22) { 
		led22.turnOn(() => {
			res.json(getStatus())
		})
	}
});


router.get('/on', (req, res) => {
	led7.turnOn();
	led18.turnOn();
	led22.turnOn();
	led11.turnOn(res.json(getStatus()));
});

router.get('/off/:led', (req, res) => {
	led = req.params.led
	if(led == 7) { 
		led7.turnOff(() => {
			res.json(getStatus())
		})
	}
	if(led == 11) { 
		led11.turnOff(() => {
			res.json(getStatus())
		})
	}
	if(led == 18) { 
		led18.turnOff(() => {
			res.json(getStatus())
		})
	}
	if(led == 22) { 
		led22.turnOff(() => {
			res.json(getStatus())
		})
	}
});

router.get('/off', (req, res) =>  {
	led7.turnOff();
	led18.turnOff();
	led22.turnOff();
	led11.turnOff();
	res.json(res.json(getStatus()));
});

//api catchall so it doesn't move on to frontend requests
//the public router will look for a file in dist/api/* without this
router.get("/*", (req, res) => {
    res.send('Not found');
});

module.exports = router;
