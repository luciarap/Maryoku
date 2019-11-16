var WIDTH = 989;
var HEIGHT = 700; //Vyska a Sirka canvas

var WIDTH = 989;
var HEIGHT = 700;
var som_v_menu = 1;


var gameFinished = new Image(WIDTH, HEIGHT);
gameFinished.src = 'obrazky/gameFinished.png';

var frameCount = 0;
var score = 0;
var time = Date.now();

var enemyKilled;
var playerImg = new Image(76, 149);
var bgImg = new Image(WIDTH, HEIGHT);
var bulletImg = new Image(16, 19);
var enemyImg = new Image(51, 74);
var enemyBulletImg = new Image(20, 21);
var bossImg = new Image(122,205);
var bossBulletImg = new Image(12,12);
var bonusUpgrade = new Image(82, 68);
bonusUpgrade.src = 'obrazky/starBONUS.png';

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var mouseX = 450;
var mouseY = 500; //Na tychto hodnotach je hrac

var bulletList = {};
var enemyList = {};
var enemyBulletList = {};
var bossBulletList = {};
var EnemyId = 0;
var upgradeList = {};


var bossTimerToSpawn = 0;
var boss;

updateObject = function (something) {
	updateObjectPosition(something);
	drawObject(something);
}

updateObjectPosition = function(something) {
	something.x += something.spdX;
	something.y += something.spdY;
}

drawObject = function(something) {
	ctx.drawImage(something.img, something.x, something.y, something.width, something.height); 
}

testCollision = function (entity1, entity2) { 
	var rect1 = {
	    x:entity1.x-entity1.width/2,
	    y:entity1.y-entity1.height/2,
	    width:entity1.width,
	    height:entity1.height,
	    }

	var rect2 = {
	    x:entity2.x-entity2.width/2,
	    y:entity2.y-entity2.height/2,
	    width:entity2.width,
	    height:entity2.height,
	    }

	return testCollisionRect(rect1,rect2);      
}

testCollisionRect = function(rect1, rect2) {
	return rect1.x <= rect2.x + rect2.width
	       && rect2.x <= rect1.x + rect1.width
	       && rect1.y <= rect2.y + rect2.height
	       && rect2.y <= rect1.y + rect1.height;
}

class Player {
	constructor (x, y, width, height, img, ID) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.img = img;
		this.ID = ID;


		this.dx = 0;
		this.dy = 0;
		this.hp = 5;
}

	update() { 
		this.dx = (mouseX - this.x - this.width/2) * 0.125;
	    this.dy = (mouseY - this.y) * 0.125;
	    if(Math.abs(this.dx) + Math.abs(this.dy) < 0.1) {
	        this.x = mouseX - this.width/2; 
	        this.y = mouseY;
	    } 
	    else {
	        this.x += this.dx;
	        this.y += this.dy;
	    }
	}

	draw() { 
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
	}
}

class Boss {
	constructor (x, y, width, height, hp, img) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.img = img;

		this.dx = 3;
		this.dy = 3;
		this.hp = hp;
	}

	move() { 
	    this.x += this.dx;
	    this.y += this.dy;

	    if(this.x < 0 || this.x > WIDTH) {
	    this.dx = -this.dy;
	    }

	    if(this.y < 0 || this.y > HEIGHT) {
	    this.dy = -this.dy;
	    }
	}

	draw() { 
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
	}
}


Bullet = function (id, x, y, spdX, spdY, width, height, img) {
	var oneBullet = {
		x:x,
		spdX:spdX,
		y:y,
		spdY:spdY,
		id:id,
		width:width,
		height:height,
		img:bulletImg
	};
	bulletList[id] = oneBullet;
}


BossBullet = function (id, x, y, spdX, spdY, width, height, img) {
	var oneBullet = {
		x:x,
		spdX:spdX,
		y:y,
		spdY:spdY,
		id:id,
		width:width,
		height:height,
		img:bossBulletImg	
	};
	bossBulletList[id] = oneBullet;

}

enemyBullet = function (id, x, y, spdX, spdY, width, height, img) {
	var oneEnemyBullet = {
		x:x,
		spdX:spdX,
		y:y,
		spdY:spdY,
		id:id,
		width:width,
		height:height,
		img:enemyBulletImg
	};
	enemyBulletList[id] = oneEnemyBullet;
}

Enemy = function (id, x, y, spdX, spdY, width, height, img) {
	var enemy = {
        x:x,
        spdX:spdX,
        y:y,
        spdY:spdY,
        id:id,
        width:width,
        height:height,
        img:enemyImg
	};
    enemyList[id] = enemy;  
}

Upgrade = function (id, x, y, spdX, spdY, width, height, category, img) {
    var upgrade = {
        x:x,
        spdX:spdX,
        y:y,
        spdY:spdY,
        id:id,
        width:width,
        height:height,
        img:bonusUpgrade,
        category:category,
    };
    upgradeList[id] = upgrade;
}

generateUpgrade = function() {
    var x = Math.random()*WIDTH;
    var y = 0;
    var height = 68;
    var width = 82;
    var id = Math.random();
    var spdX = 4;
    var spdY = 4;
   
    if (Math.random() < 0.5) {
        var category = 'health';
    } 

    else {
        var category = 'score';
    }
   
    Upgrade(id, x, y, spdX, spdY, width, height, category);
}

spawnEnemy = function() {
    var x = Math.random() * WIDTH;
    var y = 0;
   	var height = 74;    
   	var width = 51;
    var spdX = Math.random() * 3;
    var spdY = Math.random() * 3;
    Enemy(EnemyId, x, y, spdX, spdY, width, height);
}

spawnBullet = function() {
	var x = player.x +25;
	var y = player.y +25;
	var height = 10;
	var width = 10;
	var id = Math.random();

	var angle = 270;
	var spdX = Math.cos(angle/180*Math.PI)*5;
	var spdY = Math.sin(angle/180*Math.PI)*5;
	Bullet(id, x, y, spdX, spdY, width, height);
}

spawnEnemyBullet = function(EnemyId) {
	var x = enemyList[EnemyId].x +25;
	var y = enemyList[EnemyId].y +25;
	var height = 10;
	var width = 10;
	var id = Math.random();

	var angle = 90;
	var spdX = Math.cos(angle/180*Math.PI)*7;
	var spdY = Math.sin(angle/180*Math.PI)*7;
	enemyBullet(id, x, y, spdX, spdY, width, height);
}

spawnBossBullet = function() {
	var x = boss.x +100;
	var y = boss.y +100;
	var height = 10;
	var width = 10;
	var id = Math.random();

	var angle = Math.random()*360;
	var spdX = Math.cos(angle/180*Math.PI)*7;
	var spdY = Math.sin(angle/180*Math.PI)*7;
	BossBullet(id, x, y, spdX, spdY, width, height);
}

function sound(src) {
	this.soundCreate = function() {
		this.sound = document.createElement("audio");
		this.sound.src = src;
		this.sound.setAttribute("preload", "auto");
		this.sound.setAttribute("controls","none");
		this.sound.style.display = "none";
		document.body.appendChild(this.sound);
	}

	this.play = function() {
		this.sound.play();
	}

	this.stop = function() {
		this.sound.pause();
	}
}

var shooting = new sound("zvuky/Shoot.wav");
var bossKilled = new sound("zvuky/BossKilled.wav");
var LostLife = new sound("zvuky/lostlife.wav");
var newLevel = new sound("zvuky/stageCompleted.wav");
var enemyKilled = new sound("zvuky/EnemyKilled.wav");
var Death = new sound("zvuky/Death-sad Chimes.wav");
var Menu = new sound("zvuky/Wind Chimes MainMenu.mp3");
var bonus = new sound("zvuky/bonus.wav");
var gameWon = new sound("zvuky/gameWon.wav");
shooting.soundCreate();
bossKilled.soundCreate();
LostLife.soundCreate();
newLevel.soundCreate();
enemyKilled.soundCreate();
Death.soundCreate();
Menu.soundCreate();
bonus.soundCreate();
gameWon.soundCreate();


document.onclick = function(mouse) {
	spawnBullet();
	if (som_v_menu == "0" && localStorage.zvuk == 'true')
		shooting.play();
}

player = new Player(450, 500, 76, 149, playerImg, "Player"); 
	

function urobLevel2() {
	console.log("prerabka na level 2");
	playerImg.src = 'obrazky/mainChar.png'; 
	bgImg.src = 'obrazky/screen2.png';
	bulletImg.src = 'obrazky/mainChars.png'; 
	enemyImg.src = 'obrazky/enemy2.png'; 
	enemyBulletImg.src = 'obrazky/enemy2s.png'; 
	bossImg.src = 'obrazky/MainBoss.png'; 
	bossBulletImg.src = 'obrazky/MainBossS.png';

	bossTimerToSpawn = 0;
}

function VykresliLevel() {

if (localStorage.levelID == "1") {
	console.log("zac na leveli 1");
	playerImg.src = 'obrazky/mainChar.png'; 
	bgImg.src = 'obrazky/screen1.png';
	bulletImg.src = 'obrazky/mainChars.png'; 
	enemyImg.src = 'obrazky/enemy4.png'; 
	enemyBulletImg.src = 'obrazky/enemy4s.png'; 
	bossImg.src = 'obrazky/boss2.png'; 
	bossBulletImg.src = 'obrazky/boss2s.png';
}
else urobLevel2();
}
