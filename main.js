/*
 * main.js.
 * Main file for Mega Man. Calls the game loop, the functionality of which 
 * is split between several files. Also plays the game music.
 */
const SCREEN_WIDTH  = 800,
      SCREEN_HEIGHT = 600;


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var currentLevel = 1;
var lives = 3;

canvas.addEventListener('keydown', MEGAMAN.keyDownListener, false);
canvas.addEventListener('keyup', MEGAMAN.keyUpListener, false);

canvas.setAttribute('tabindex','0');
canvas.focus();

function loadLevel(level){
  PLATFORM.setPlatformList(LEVELS.getPlatforms(level));
  ENEMY.setEnemyList(LEVELS.getEnemies(level));
  PROJECTILE.clearList();
  MEGAMAN.setMMLocation(LEVELS.getMMLocation(level));
  MEGAMAN.setExit(LEVELS.getExit(level));
}

function playMP3() {
  document.getElementById("mp3").play();
}

function loop() {
  var nextLevel;
  if (!TITLE.doTitle()){
    MEGAMAN.doGame();
    PLATFORM.drawPlatforms();
    ENEMY.drawEnemies();
    PROJECTILE.moveProjectiles();
    MEGAMAN.drawHealth(lives, currentLevel);
    MEGAMAN.doExit();
    if (MEGAMAN.gameOver) {
      if (lives){
        //alert("You died! " + --lives + " lives left!");
        loadLevel(currentLevel);
        MEGAMAN.gameOver = false;
        lives--;
        return;
      }
      else {
        alert("Game over!");
        currentLevel = 1;
        loadLevel(currentLevel);
        MEGAMAN.gameOver = false;
        lives = 3;
        TITLE.setTitle();
        return;
      }
    }
    if (nextLevel = MEGAMAN.checkFinishedLevel()){
      currentLevel += nextLevel - 2;
      loadLevel(currentLevel);
    }
  }
}

//playMP3();
loadLevel(currentLevel);
window.setInterval(loop, 1000/30);