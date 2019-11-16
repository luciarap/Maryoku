var WIDTH = 989;
var HEIGHT = 700;
var scoreBgImg = new Image(WIDTH, HEIGHT);
scoreBgImg.src = 'obrazky/score.png';
function draw() { 
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
	}

function scoreScreen(ctx)
{
	localStorage.initScreen = 'false';
	localStorage.score = 'true';
	ctx.drawImage(scoreBgImg, 0, 0, 989, 700)
	var img10 = document.getElementById("ok");
	game.ScoreMenuButton = new Button(350, 580, 284, 78, img10, "ok");
	game.ScoreMenuButton.draw(this.ctx)
	window.addEventListener("click", function(event) {
			game.ScoreMenuButton.clickHandler(event.clientX, event.clientY, ctx)
	})
	ctx.fillStyle = "black";
	ctx.font = "70px VT323";
	ctx.fillText('High score: ' + localStorage.HighScore, 150, 350);
}