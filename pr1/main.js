/*
 * main.js.
 * Main file for Mega Man. Calls the game loop, the functionality of which 
 * is split between several files. Also plays the game music.
 */
const SCREEN_WIDTH  = 800,
      SCREEN_HEIGHT = 600;


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var nextLevel = 1;

canvas.addEventListener('keydown', MEGAMAN.keyDownListener, false);
canvas.addEventListener('keyup', MEGAMAN.keyUpListener, false);

canvas.setAttribute('tabindex','0');
canvas.focus();

function loadLevel(level){
  PLATFORM.setPlatformList(LEVELS.getPlatforms(level));
  ENEMY.setEnemyList(LEVELS.getEnemies(level));
  PROJECTILE.clearList();
  MEGAMAN.setMMLocation(LEVELS.getMMLocation(level));
}

function playMP3() {
  document.getElementById("mp3").play();
}

function loop() {
  if (!TITLE.doTitle()){
    MEGAMAN.doGame();
    PLATFORM.drawPlatforms();
    ENEMY.drawEnemies();
    PROJECTILE.moveProjectiles();
    MEGAMAN.drawHealth();
    if (MEGAMAN.checkFinishedLevel())
      loadLevel(++nextLevel);
  }
}

//playMP3();
loadLevel(nextLevel);
window.setInterval(loop, 1000/30);