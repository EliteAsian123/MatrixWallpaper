const characters = "゠アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレワヰヱヲンヺ・ーヽヿ0123456789"

let settings = {
	color: {
		r: 0,
		g: 255,
		b: 70
	},
	rainbowSpeed: 1.75,
	rainbow: true,
	rainbowLightness: 60,
	rainbowSaturation: 100,
	speed: 60,
	size: 12,
};

let c = document.getElementById("c");
let ctx = c.getContext("2d");

let hue;
let drops;

function updateFromURL() {
	const urlParams = new URLSearchParams(window.location.search);
	let urlSettings = JSON.parse(urlParams.get("s"));
	if (urlSettings) {
		settings = { ...settings, ...urlSettings };
		console.log(settings);
	}
}

function init() {
	hue = 0;

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
	// Set fonts
	ctx.font = settings.size + "px arial";

	// Fade out the old drops
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);

	// Foreach drop...
	for (let i = 0; i < drops.length; i++) {
		// Draw character BG
		ctx.fillStyle = "rgba(10, 10, 10, 1)";
		ctx.fillRect(i * settings.size, drops[i] * settings.size, settings.size, settings.size);

		// Get a character
		let text = characters[Math.floor(Math.random() * characters.length)];

		// Set color
		if (settings.rainbow) {
			ctx.fillStyle = `hsl(${hue}, ${settings.rainbowSaturation}%, ${settings.rainbowLightness}%)`;
		} else {
			ctx.fillStyle = `rgba(${settings.color.r},${settings.color.g},${settings.color.b})`;
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

	// Update hue
	hue += settings.rainbowSpeed;

	// Request next frame
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
			settings.rainbowSpeed = val / 4;
			break;
		case "rainbowLightness":
			settings.rainbowLightness = val;
			break;
		case "rainbowSaturation":
			settings.rainbowSaturation = val;
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

updateFromURL();
init();
draw();