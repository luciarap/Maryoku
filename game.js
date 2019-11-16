class Game extends GraphicObject {
	constructor(ctx) {
		var img = document.getElementById("main") 
		super(0, 0, 989, 700, img)
		
		this.ctx = ctx
		this.draw(this.ctx) // vykresli obrazok hry
		
		this.startGameTlacidla();

	}


	reloadStartScreen() {
		localStorage.initScreen = 'true';
		this.img = document.getElementById("main")
		this.draw(this.ctx) 

		this.startGameTlacidla();
	}

	startGameTlacidla() {
		var img2 = document.getElementById("buttonStart")
		this.NewGameButton = new Button(540, 280, 280, 75, img2, "newGame")
		this.NewGameButton.draw(this.ctx) 

		var img3 = document.getElementById("buttonScore")
		this.ScoreButton = new Button(540, 380, 280, 75, img3, "scoreMenu")
		this.ScoreButton.draw(this.ctx) 

		var img4 = document.getElementById("buttonTutorial")
		this.TutorialButton = new Button(540, 480, 280, 75, img4, "tutorial")
		this.TutorialButton.draw(this.ctx) 

		var img5 = document.getElementById("Sound");
		this.SoundButton = new Button(845, 600, 107, 73, img5, "Sound");
		this.SoundButton.draw(this.ctx)

		// tlacitko zacne odpovedat, ked ho vytvorime a vykreslime
		window.addEventListener("click", function(event) {
			game.NewGameButton.clickHandler(event.clientX, event.clientY, ctx)
			game.ScoreButton.clickHandler(event.clientX, event.clientY, ctx)
			game.TutorialButton.clickHandler(event.clientX, event.clientY, ctx)
			game.SoundButton.clickHandler(event.clientX, event.clientY, ctx)
			//game.SoundDisabledButton.clickHandler(event.clientX, event.clientY, ctx)
		})

	}

	endGameScreen() {
		this.img = document.getElementById("gameOver")
		this.draw(this.ctx) 

		var img5 = document.getElementById("buttonMenu")
		this.MenuButton = new Button(380.5, 415, 280, 75, img5, "buttonMenu")
		this.MenuButton.draw(this.ctx) 
		var img6 = document.getElementById("PlayAgain")
		this.PlayAgainButton = new Button(380.5, 300, 280, 75, img6, "PlayAgain")
		this.PlayAgainButton.draw(this.ctx) 

		window.addEventListener("click", function(event) {
			game.MenuButton.clickHandler(event.clientX, event.clientY, ctx)
			game.PlayAgainButton.clickHandler(event.clientX, event.clientY, ctx)
		})
	}

	gameFinished() {
		this.img = document.getElementById("GameFinished")
		this.draw(this.ctx) 

		var img7 = document.getElementById("MainMenuButton")
		this.MainMenuButton = new Button(380.5, 580, 280, 75, img7, "MainMenuButton")
		this.MainMenuButton.draw(this.ctx) 

		window.addEventListener("click", function(event) {
			game.MainMenuButton.clickHandler(event.clientX, event.clientY, ctx)
		})

	}








}