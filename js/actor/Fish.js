class Fish {
	constructor(headX, headY, direction = 1) {
		this.speed = 1.5;
		this.width = 105;
		this.height = 78;
		this.direction = direction;
		this.headX = headX;
		this.headY = headY;
		this.index = 0;
		this.count = 0;
		this.imgs = null;

		this.init();
	}
	init() {
		this.switchAnimation('swim');
	}
	switchAnimation(action) {
		let len = 0;
		switch(action) {
			case 'swim':
				len = 5;
				break;
			case 'touched':
				len = 2;
		}

		let imgs = [];
		for (let i = 1; i <= len; i++) {
			const img = new Image();
			img.src= `assets/fish/${action}/${i}.png`;
			imgs.push(img);
		}
		this.imgs = imgs;
	}
	draw() {
		this.headX = this.headX + this.speed * this.direction * -1;
		const speed = 0.1;
		this.count += speed;
		if (this.index >= this.imgs.length - 1) {
			this.count = 0;
		}
		this.index = Math.floor(this.count);

		ctx.save();
		ctx.scale(1 * this.direction, 1);
		ctx.drawImage(
			this.imgs[this.index], 
			this.headX * this.direction, 
			this.headY,
			this.width,
			this.height
		);
		ctx.restore();
	}
	// 是否存活
	isAlive() {
		return this.headX + this.width >= 0 && this.headX <= canvasWidth + this.width;
	}
}