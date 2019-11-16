function update() {
	som_v_menu = 0;
	if (localStorage.endGame == 'false') {
		ctx.clearRect(0, 0, ctx.width, ctx.height); 
		frameCount++;
		ctx.drawImage(bgImg, 0, 0, WIDTH, HEIGHT) 
		if (frameCount % 75 === 0) {
	    	spawnEnemy();
		}

		if(frameCount % 500 === 0)    
        generateUpgrade();

		if (frameCount % 75 === 0) {
		    spawnEnemyBullet(EnemyId);
		}

		EnemyId++;

		if (frameCount % 100 === 0) {
	    	score+=20;
		}

		bossTimerToSpawn++;
		if (bossTimerToSpawn > 2000) {
			if (boss === undefined) { //vytvori jedneho bossa
				var bossHP = (localStorage.levelID == "1") ? 10 : 20;
				boss = new Boss(450, 50, 122,205, bossHP, bossImg);
			}
			boss.draw();
	    	boss.move();
	    	ctx.fillStyle = "white";
	    	ctx.font = "23px VT323";
	    	ctx.fillText(" Boss Hp " + boss.hp, boss.x, boss.y);
	    	if(frameCount % 50 === 0) {
				spawnBossBullet()
			}

			var isColliding = testCollision(boss, player);
				if (isColliding) {
					if (localStorage.zvuk == 'true') LostLife.play();
					player.hp = 0;
				}

		}

		player.update(); //Pohnutie hracom
		player.draw(); //Nakreslenie hraca

		for (var key in bossBulletList) {
			updateObject(bossBulletList[key]);
			var isColliding = testCollision(bossBulletList[key], player);
			if (isColliding) {
				if (localStorage.zvuk == 'true') LostLife.play();
				delete bossBulletList[key];
				player.hp = player.hp - 1;
				break;
			}

			if (bossBulletList[key].timer > 75) {
	            delete bossBulletList[key];
	        }
		}

		for(var key in enemyList) {
	        updateObject(enemyList[key]);
			var isColliding = testCollision(enemyList[key], player);
			if (isColliding) {
				delete enemyList[key];
				if (localStorage.zvuk == 'true') LostLife.play();
				player.hp = player.hp - 1;
				break;
			}
	    }
	    
	     for (var key in enemyBulletList) {
			updateObject(enemyBulletList[key]);

			var isColliding = testCollision(enemyBulletList[key], player);

			if (isColliding) {
				console.log("for enemyBulletList");
				delete enemyBulletList[key];
				if (localStorage.zvuk == 'true') LostLife.play();
				player.hp = player.hp - 1;
				console.log(player.hp);
				break;
			}

			if (enemyBulletList[key].timer > 75) {
	            delete enemyBulletList[key];
	        }

		}

		for(var key in upgradeList) {
            updateObject(upgradeList[key]);
            var isColliding = testCollision(player, upgradeList[key]);
            if(isColliding) {
            	if (localStorage.zvuk == 'true') bonus.play();
                if(upgradeList[key].category === 'score')
                    score += 300;
                if(upgradeList[key].category === 'health') {
                	if (player.hp < 5)
                    	player.hp += 1;
                }
                delete upgradeList[key];
            }
        }

		if (player.hp <= 0)
		{
			som_v_menu = 1;
			if (localStorage.zvuk == 'true') Death.play();
			shooting.stop();
			ctx.clearRect(0, 0, ctx.width, ctx.height);
			localStorage.levelID = '1'; // dalsia hra zacne opat v leveli 1
			localStorage.endGame = 'true'; // uz sa dohralo a je zobrazeny koncovy screen
			responderNaKoniec(); // zacni odpovedat na tlacidla na koncovej obrazovke
			ctx.fillStyle = "black";
			ctx.font = "50px VT323";
			ctx.fillText(score,450,260);
			boss = undefined;

		}

	     for(var key in bulletList) {
            updateObject(bulletList[key]);

            var toRemove = false;
            bulletList[key].timer++;
            if (bulletList[key].timer > 75) {
	            toRemove = true;
	        }

            for (var key2 in enemyList) {
            	var isColliding = testCollision(bulletList[key], enemyList[key2]);
            	if (isColliding) {
            		toRemove = true;
            		delete enemyList[key2];
            		score = score + 300;
            		if (localStorage.zvuk == 'true') enemyKilled.play();
            		break;
            	}
            }

			if (boss !== undefined) {
				var isCollidingWithBoss = testCollision(bulletList[key], boss);
				if (isCollidingWithBoss) {
					boss.hp = boss.hp - 1;
					score +=500;
					delete bulletList[key];
					break;
				}
			}
	            
            if (toRemove) {
        		delete bulletList[key];
	        }
	    }


   		if (boss !== undefined && boss.hp <= 0) {
			if (localStorage.levelID == '1') {
				if (localStorage.zvuk == 'true') bossKilled.play();
				localStorage.levelID = '2';
				if (localStorage.zvuk == 'true') newLevel.play();
				urobLevel2();
				
				boss = undefined;
			}

			else {
				console.log("koniec hry");
				ctx.clearRect(0, 0, ctx.width, ctx.height);
				localStorage.endGame = 'true';
				if (localStorage.zvuk == 'true') bossKilled.play();
				som_v_menu = 1;
				ctx.clearRect(0, 0, ctx.width, ctx.height);
				localStorage.endGame = 'true'; // uz sa dohralo a je zobrazeny koncovy screen
				if (localStorage.zvuk == 'true') KedVyhramHru();
				gameWon.play();
				if (score > localStorage.HighScore)
				{
					localStorage.HighScore = score;
				}
				ctx.fillStyle = "black";
				ctx.font = "60px VT323";
	    		ctx.fillText(score, 420, 250);
	    		ctx.font = "70px VT323";
	    		ctx.fillText('High score: ' + localStorage.HighScore, 200, 350);
				localStorage.levelID = '1'; // refresh stranky bude na level 1
				boss = undefined; 
			}
			
		}

	ctx.beginPath();
	ctx.rect(0, 0, 1000, 40);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.fillStyle = "white";
    ctx.font = "25px VT323";
    ctx.fillText(player.hp + " Hp",30, 25);
    ctx.fillText('Score: ' + score,200,25);
	requestAnimationFrame(update);
	}
}

window.onmousemove = function () { //Updajtuje poziciu mysi, ale iba ked sa nou pohne
    mouseX = window.event.clientX - 8;
    mouseY = window.event.clientY - 8;

    if (mouseX < player.width/2) 
    	mouseX = player.width/2;
   	if (mouseX > WIDTH-player.width/2)
   		mouseX = WIDTH - player.width/2;
   	if (mouseY < player.height/2)
   		mouseY = player.height/2;
   	if (mouseY > HEIGHT - player.height)
   		mouseY = HEIGHT - player.height;
}

startNewGame = function() {
	if (boss !== undefined && localStorage.levelID == '1') {
		boss.hp = 10; 
	}
	else if (boss !== undefined && localStorage.levelID == '2') {
		boss.hp = 20; 
	}	
        player.hp = 5;
        frameCount = 0;
        score = 0;
        bossTimerToSpawn = 0;
        enemyList = {};
        upgradeList = {};
        bulletList = {};      
        localStorage.levelID = "1";
}

