function drawBackground() {
	ctx.fillStyle = 'lightblue';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

let fish = null;
function drawFish() {
	if (!fish) {
		const direction = getRandomIntInclusive(0, 1) === 1 ? 'left' : 'right';
		fish = new Fish(
			direction === 'left' ? canvasWidth : 0, 
			getRandomIntInclusive(80, 150), 
			direction
		);
	}

	if (fish instanceof Fish && fish.isAlive()) {
		fish.draw();
	}

	if (fish instanceof Fish && !fish.isAlive()) {
		fish = null;
	}
}

function drawHand() {
	const hand = Hand.getInstance();
	hand.draw();
}

function render() {
	drawBackground();
	drawFish();
	drawHand();

	requestAnimationFrame(render);
}
requestAnimationFrame(render);