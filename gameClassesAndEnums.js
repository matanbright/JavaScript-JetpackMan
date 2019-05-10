class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	copy() {
		return new Point(this.x, this.y);
	}
}

class Size {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
	
	copy() {
		return new Size(this.width, this.height);
	}
}

class Speed {
	constructor(xSpeed, ySpeed) {
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
	}
	
	copy() {
		return new Speed(this.xSpeed, this.ySpeed);
	}
}

class Man {
	constructor(location, size, ySpeed) {
		this.location = location;
		this.size = size;
		this.ySpeed = ySpeed;
	}
	
	draw(canvasContext, manImage) {
		if (manImage != null)
			canvasContext.drawImage(manImage, this.location.x, this.location.y);
	}
}

class Meteor {
	constructor(location, size, xSpeed) {
		this.location = location;
		this.size = size;
		this.xSpeed = xSpeed;
	}
	
	draw(canvasContext, meteorImage, meteorTrailsImage) {
		if (meteorImage != null)
			canvasContext.drawImage(meteorImage, this.location.x, this.location.y);
		if (meteorTrailsImage != null)
			canvasContext.drawImage(meteorTrailsImage, this.location.x, this.location.y);
	}
	
	isManClashesWithMeteor() {
		return (((man.location.x + man.size.width >= this.location.x && man.location.x + man.size.width <= this.location.x + this.size.width) &&
		   (man.location.y + man.size.height >= this.location.y && man.location.y <= this.location.y + this.size.height)) ||
		   ((man.location.x >= this.location.x && man.location.x <= this.location.x + this.size.width) &&
		   (man.location.y + man.size.height >= this.location.y && man.location.y <= this.location.y + this.size.height)) ||
		   ((man.location.y + man.size.height >= this.location.y && man.location.y + man.size.height <= this.location.y + this.size.height) &&
		   (man.location.x + man.size.width >= this.location.x && man.location.x <= this.location.x + this.size.width)) ||
		   ((man.location.y >= this.location.y && man.location.y <= this.location.y + this.size.height) &&
		   (man.location.x + man.size.width >= this.location.x && man.location.x <= this.location.x + this.size.width)));
	}
}

class LimitedArray {
	constructor(maxCapacity) {
		this.maxCapacity = maxCapacity;
		this.array = [];
		this.length = 0;
	}
	
	push(item) {
		if (this.array.length >= this.maxCapacity)
			this.array.shift();
		this.array.push(item);
		this.length = this.array.length;
	}
	
	pop(item) {
		var item = this.array.pop();
		this.length = this.array.length;
		return item;
	}
	
	pop(item) {
		var item = this.array.shift();
		this.length = this.array.length;
		return item;
	}
	
	unshift(item) {
		if (this.array.length >= this.maxCapacity)
			this.array.pop();
		this.array.unshift(item);
		this.length = this.array.length;
	}
	
	get(index) {
		return this.array[index];
	}
	
	getFirst() {
		return this.array[0];
	}
	
	getLast() {
		return this.array[this.length - 1];
	}
}

class Text {
	constructor(location, color, font, text) {
		this.location = location;
		this.color = color;
		this.font = font;
		this.text = text;
	}
	
	draw(canvasContext) {
		canvasContext.fillStyle = this.color;
		canvasContext.font = this.font;
		canvasContext.fillText(this.text, this.location.x, this.location.y);
	}
}
