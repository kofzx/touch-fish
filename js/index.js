function drawBackground() {
	ctx.fillStyle = 'lightblue';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

let fish = null;
function drawFish() {
	if (!fish) {
		const direction = getRandomIntInclusive(0, 1) === 1 ? 1 : -1;
		fish = new Fish(
			direction === 1
				? canvasWidth
				: 0, 
			getRandomIntInclusive(60, 150), 
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

let hand = null;
function drawHand(x = 0, y = 0) {
	hand = Hand.getInstance();
	hand.draw();
}

function bindEvents() {
	let isMouseDown = false;
	canvas.addEventListener('mousedown', function(e) {
		e.preventDefault();
		isMouseDown = true;
		handleCollision();
	}, false);

	canvas.addEventListener('mousemove', function(e) {
		e.preventDefault();

		const { pageX, pageY } = e;
		if (hand instanceof Hand) {
			hand.x = pageX;
			hand.y = pageY;
		}

		if (isMouseDown) {
			handleCollision();
		}
	}, false);

	canvas.addEventListener('mouseup', function(e) {
		e.preventDefault();
		isMouseDown = false;
		restoreIdle();
	}, false);
}

function handleCollision() {
	if (hand instanceof Hand && fish instanceof Fish) {
		// 碰撞检测
		// 鱼面朝左边
		if (fish.direction === 1) {
			if (
				hand.centerX >= fish.headX
				&& hand.centerX <= fish.headX + fish.width - Math.floor(fish.width / 6)
				&& hand.centerY <= fish.headY + Math.floor(fish.height / 2)
				&& hand.centerY >= fish.headY
			) {
				handleTouched();
			}
			else {
				restoreIdle();
			}
		} 
		// 鱼面朝右边
		else {
			if (
				hand.centerX <= fish.headX
				&& hand.centerX >= fish.headX - fish.width - Math.floor(fish.width / 6)
				&& hand.centerY <= fish.headY + Math.floor(fish.height / 2)
				&& hand.centerY >= fish.headY
			) {
				handleTouched();
			}
			else {
				restoreIdle();
			}
		}
	}
}

// 鱼被摸事件
function handleTouched() {
	fish.switchAnimation('touched');
}

// 恢复鱼的空闲动画
function restoreIdle() {
	fish.switchAnimation('swim');
}

bindEvents();

function render() {
	drawBackground();
	drawFish();
	drawHand();

	requestAnimationFrame(render);
}
requestAnimationFrame(render);