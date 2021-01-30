class Fish {
	constructor(headX, headY, faceTo = 'left') {
		this.speed = 1.5;
		this.width = 30;
		this.size = 25;
		this.faceTo = faceTo;
		this.direction = this.faceTo === 'left' ? -1 : 1;
		this.headX = headX;
		this.headY = headY;
	}
	draw() {
		this.headX = this.headX + this.speed * this.direction;

		ctx.fillStyle = 'grey';
		ctx.beginPath();
		ctx.moveTo(
			this.faceTo === 'left' 
				? this.headX - this.width 
				: this.headX + this.width, 
			this.headY
		);
	    ctx.lineTo(this.headX, this.headY - this.size);
	    ctx.lineTo(this.headX, this.headY + this.size);
	    ctx.fill();
	}
	// 是否存活
	isAlive() {
		return this.headX >= 0 && this.headX <= canvasWidth;
	}
}