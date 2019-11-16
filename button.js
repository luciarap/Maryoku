class Button extends GraphicObject {
	constructor(x, y, width, height, img, tlacidloID) {
		super(x, y, width, height, img)

		this.tlacidloID = tlacidloID
	}

	clickHandler(x, y, ctx) {
		// klik sa spracuje, iba ak bol nad tlacidlom
		if (x >= this.x && x <= (this.x + this.width) && y >= this.y && y <= (this.y + this.height)  ) {
			// je zapnuta uvodna obrazovka 
			if (localStorage.initScreen == 'true') { 
				switch (this.tlacidloID) {
					case "newGame":
						VykresliLevel();
						level1(ctx)
					break;

					case "scoreMenu":
						scoreScreen(ctx);
					break;

					case "tutorial":
						tutorial(ctx);
					break;

					case "Sound":

						localStorage.zvuk = 'false';
						console.log("Klikla som na zvuk")
						CheckAudio();
						//znovaZobrazStart();

					break;
				}
				 
			}

			// je zapnuta koncova obrazovka
			else if (localStorage.endGame == 'true') { 
				switch (this.tlacidloID) {
					case "buttonMenu":
						localStorage.initScreen = 'true';
						znovaZobrazStart();
						VykresliLevel();
						console.log("klikol si na menu");
						localStorage.endGame = 'false';
						
					break;

					case "PlayAgain":
						localStorage.endGame = 'false';
						VykresliLevel();
						console.log("klikol si na PLAY AGAIN ");
						level1(ctx)
					break;

					case "MainMenuButton":
						localStorage.initScreen = 'true';
						znovaZobrazStart();
						VykresliLevel();
						console.log("klikol si na menu");
						localStorage.endGame = 'false';

					break;
				}
				
			}

			//je zapnuta obrazovka tutorial 
			else if (localStorage.tutorial == 'true') { 
				switch (this.tlacidloID) {
					case "ok":
						localStorage.initScreen = 'true';
						znovaZobrazStart();
					break;
				}
				
			}

			else if (localStorage.score == 'true') { 
				switch (this.tlacidloID) {
					case "ok":
						localStorage.initScreen = 'true';
						znovaZobrazStart();
					break;
				}
				
			}


		}
	}
}