class Hand {
	constructor() {
		this.width = 30;
		this.height = 100;
	}
	static getInstance() {
		if (!Hand.instance) {
			Hand.instance = new Hand();
		}
		return Hand.instance;
	}
	draw() {
		ctx.fillStyle = 'orange';
		ctx.fillRect(
			Math.floor(canvasWidth / 2) - Math.floor(this.width / 2),
			0,
			this.width,
			this.height
		);
	}
}