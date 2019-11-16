var WIDTH = 989;
var HEIGHT = 700;
var tutorialImg = new Image(WIDTH, HEIGHT);
tutorialImg.src = 'obrazky/tutorial.png';
function draw() { 
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
	}

function tutorial(ctx)
{
	localStorage.initScreen = 'false';
	localStorage.tutorial = 'true';
	ctx.drawImage(tutorialImg, 0, 0, 989, 700)
	var img6 = document.getElementById("ok");
	game.OKButton = new Button(350, 500, 284, 78, img6, "ok");
	game.OKButton.draw(this.ctx)
	window.addEventListener("click", function(event) {
			game.OKButton.clickHandler(event.clientX, event.clientY, ctx)
	})
	
}