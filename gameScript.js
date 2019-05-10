var canvas = document.getElementById("canvas_gameCanvas");
var canvasContext = canvas.getContext("2d");
var pointsText;
var gameStartText;
var gameStartSubText;
var gameOverText;
var gameOverSubText;
var man;
var meteorsLimitedArray;
var gameStarted;
var gameOver;
var mouseWasClicked;
var points;


window.onload = function() {
	initializeGame();
};

function initializeGame() {
	pointsText = new Text(POINTS_TEXT_LOCATION.copy(), POINTS_TEXT_COLOR, POINTS_TEXT_FONT, POINTS_TEXT + "0");
	gameStartText = new Text(new Point(canvas.width / 2 - 325, canvas.height / 4 - 60 + 40), GAME_START_TEXT_COLOR, GAME_START_TEXT_FONT, GAME_START_TEXT);
	gameStartSubText = new Text(new Point(canvas.width / 2 - 80, canvas.height / 4 - 15 + 40), GAME_START_SUB_TEXT_COLOR, GAME_START_SUB_TEXT_FONT, GAME_START_SUB_TEXT);
	gameOverText = new Text(new Point(canvas.width / 2 - 250, canvas.height / 2 - 50 + 40), GAME_OVER_TEXT_COLOR, GAME_OVER_TEXT_FONT, GAME_OVER_TEXT);
	gameOverSubText = new Text(new Point(canvas.width / 2 - 125, canvas.height / 2 - 15 + 40), GAME_OVER_SUB_TEXT_COLOR, GAME_OVER_SUB_TEXT_FONT, GAME_OVER_SUB_TEXT);
	man = new Man(MAN_INITIAL_LOCATION.copy(), new Size(document.getElementById("image_characterWithJetpackOff").width, document.getElementById("image_characterWithJetpackOff").height), MAN_INITIAL_Y_SPEED);
	meteorsLimitedArray = new LimitedArray(METEORS_LIMITED_ARRAY_MAX_CAPACITY);
	gameStarted = false;
	gameOver = false;
	mouseWasClicked = false;
	points = 0;
	
	for (var i = 0; i < METEORS_LIMITED_ARRAY_MAX_CAPACITY; i++)
		generateANewMeteor();
	man.draw(canvasContext, document.getElementById("image_characterWithJetpackOff"));
	for (var i = 0; i < meteorsLimitedArray.length; i++)
		meteorsLimitedArray.get(i).draw(canvasContext, document.getElementById("image_meteor"), null);
	pointsText.draw(canvasContext);
	gameStartText.draw(canvasContext);
	gameStartSubText.draw(canvasContext);
}

function generateANewMeteor() {
	if (meteorsLimitedArray.length == 0)
		meteorsLimitedArray.push(new Meteor(
		   new Point(FIRST_METEOR_INITIAL_X_LOCATION, getRandomNumber(0, canvas.height - document.getElementById("image_meteor").height)),
		   new Size(document.getElementById("image_meteor").width, document.getElementById("image_meteor").height),
		   METEORS_X_SPEED
		));
	else
		meteorsLimitedArray.push(new Meteor(
		   new Point(meteorsLimitedArray.getLast().location.x + X_DISTANCE_BETWEEN_METEORS, getRandomNumber(0, canvas.height - document.getElementById("image_meteor").height)),
		   new Size(document.getElementById("image_meteor").width, document.getElementById("image_meteor").height),
		   METEORS_X_SPEED
		));
}

window.setInterval(function() {
	if (gameStarted && !gameOver) {
		if (man.location.y < 0 || man.location.y + man.size.height >= canvas.height)
			endGame();
		else {
			man.location.y -= man.ySpeed;
			if (!mouseWasClicked)
				man.ySpeed += GRAVITY;
			else if (man.ySpeed < JETPACK_MAX_Y_SPEED)
				man.ySpeed += JETPACK_ACCELERATION;
		}
	}
}, MAN_MOVEMENT_TIMER_INTERVAL);

window.setInterval(function() {
	if (gameStarted && !gameOver) {
		for (var i = 0; i < meteorsLimitedArray.length; i++) {
			if (meteorsLimitedArray.get(i).isManClashesWithMeteor(man))
				endGame();
			else
				meteorsLimitedArray.get(i).location.x += METEORS_MOVEMENT_AMOUNT;
		}
		if (meteorsLimitedArray.getFirst().location.x + document.getElementById("image_meteor").width < 0) {
			generateANewMeteor();
			points++;
		}
	}
}, METEORS_MOVEMENT_TIMER_INTERVAL);

window.setInterval(function() {
	if (gameStarted && !gameOver) {
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		if (mouseWasClicked)
			man.draw(canvasContext, document.getElementById("image_characterWithJetpackOn"));
		else
			man.draw(canvasContext, document.getElementById("image_characterWithJetpackOff"));
		for (var i = 0; i < meteorsLimitedArray.length; i++)
			meteorsLimitedArray.get(i).draw(canvasContext, document.getElementById("image_meteor"), document.getElementById("image_meteorTrails"));
		pointsText.text = POINTS_TEXT + points;
		pointsText.draw(canvasContext);
	}
}, GRAPHICS_REFRESH_TIMER_INTERVAL);

window.onmousedown = function() {
	if (!gameOver) {
		gameStarted = true;
		mouseWasClicked = true;
	} else {
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		initializeGame();
	}
}

window.onmouseup = function() {
	mouseWasClicked = false;
}

function endGame() {
	gameOver = true;
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	man.draw(canvasContext, document.getElementById("image_characterWithJetpackOffWhenGameOver"));
	for (var i = 0; i < meteorsLimitedArray.length; i++)
		meteorsLimitedArray.get(i).draw(canvasContext, document.getElementById("image_meteor"), null);
	pointsText.draw(canvasContext);
	gameOverText.draw(canvasContext);
	gameOverSubText.draw(canvasContext);
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min - 1)) + min;
}
