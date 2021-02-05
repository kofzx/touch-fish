class Hand {
	constructor() {
		this.width = 62;
		this.height = 46;
		this.x = 0;
		this.y = 0;
		this.centerX = 0;
		this.centerY = 0;
		this.img = null;

		this.init();
	}
	static getInstance() {
		if (!Hand.instance) {
			Hand.instance = new Hand();
		}
		return Hand.instance;
	}
	init() {
		const img = new Image();
		img.src= `assets/hand/idle/1.png`;
		this.img = img;
	}
	draw() {
		this.centerX = this.x - Math.floor(this.width / 2);
		this.centerY = this.y - Math.floor(this.height / 2);

		ctx.drawImage(
			this.img,
			this.centerX,
			this.centerY,
			this.width,
			this.height
		);
	}
}