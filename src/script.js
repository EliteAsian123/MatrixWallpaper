const characters = "゠アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレワヰヱヲンヺ・ーヽヿ0123456789"

let settings = {
	color: {
		r: 125,
		g: 52,
		b: 253
	},
	rainbowSpeed: 0.01,
	rainbow: true,
	speed: 60,
	size: 12
};

let hueFw;
let hue;
let c;
let ctx;
let drops;

function init() {
	//clearTimeout(draw);

	hueFw = false;
	hue = -0.01;

	// Get the canvas
	c = document.getElementById("c");
	ctx = c.getContext("2d");

	// Make the canvas full screen
	c.height = window.innerHeight;
	c.width = window.innerWidth;

	// Fill screen with color
	ctx.fillStyle = "rgba(10, 10, 10, 1)";
	ctx.fillRect(0, 0, c.width, c.height);

	// The number of drops in a row
	let columns = c.width / settings.size;

	// Each drop's y coordinate
	drops = [];
	let range = c.height / settings.size;
	for (let x = 0; x < columns; x++) {
		drops[x] = Math.floor(Math.random() * range) + 1;
	}
}

function draw() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = "#BBB";
	ctx.font = settings.size + "px arial";

	// Foreach drop...
	for (let i = 0; i < drops.length; i++) {
		// Draw character BG
		ctx.fillStyle = "rgba(10, 10, 10, 1)";
		ctx.fillRect(i * settings.size, drops[i] * settings.size, settings.size, settings.size);

		// Get a character
		let text = characters[Math.floor(Math.random() * characters.length)];

		// Rainbow!!!
		if (settings.rainbow) {
			hue += (hueFw) ? 0.01 : -0.01;
			let rr = Math.floor(127 * Math.sin(settings.rainbowSpeed * hue + 0) + 128);
			let rg = Math.floor(127 * Math.sin(settings.rainbowSpeed * hue + 2) + 128);
			let rb = Math.floor(127 * Math.sin(settings.rainbowSpeed * hue + 4) + 128);
			ctx.fillStyle = 'rgba(' + rr + ',' + rg + ',' + rb + ')';
		} else {
			ctx.fillStyle = 'rgba(' + settings.color.r + ',' + settings.color.g + ',' + settings.color.b + ')';
		}

		// Draw character
		ctx.fillText(text, i * settings.size, drops[i] * settings.size);

		// Incrementing Y coordinate
		drops[i]++;

		// Loop drop (add randomness)
		if (drops[i] * settings.size > c.height) {
			drops[i] = Math.floor(Math.random() * -10);
		}
	}

	setTimeout(draw, settings.speed);
}

function livelyPropertyListener(name, val) {
	switch (name) {
		case "matrixColor":
			settings.color = hexToRgb(val);
			break;
		case "rainbow":
			settings.rainbow = val;
			break;
		case "rainbowSpeed":
			settings.rainbowSpeed = val / 100;
			break;
		case "matrixSpeed":
			settings.speed = val;
			break;
		case "matrixSize":
			settings.size = val;
			init();
			break;
	}
}

function hexToRgb(hex) {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

init();
draw();