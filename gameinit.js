var game;
localStorage.HighScore = 0;

window.onload = function() {
	var canvas = document.getElementById("canvas")
	var ctx  = canvas.getContext("2d")
	game = new Game(ctx)

localStorage.initScreen = 'true'; // este sa nehra a je zobrazeny zaciatocny screen
localStorage.endGame = 'false'; // este sa nedohralo a nie je zobrazeny koncovy screen
localStorage.zvuk = 'true';
localStorage.tutorial = 'false';
localStorage.score = 'false';

}

function responderNaKoniec() {
	som_v_menu = "1";
	game.endGameScreen();
}

function KedVyhramHru() {
	som_v_menu = "1";
	game.gameFinished();
}


function znovaZobrazStart() {
	localStorage.initScreen = 'true';
	som_v_menu = "1";
	game.reloadStartScreen();
}

function CheckAudio() {
	znovaZobrazStart();
	if (localStorage.zvuk == 'false') {
	ctx.beginPath();
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;
	ctx.moveTo(860, 600);
	ctx.lineTo(930, 680);
	ctx.stroke();
	}
}