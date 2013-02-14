/*

Mega Man 237

Josh Gerbasi    jgerbasi
Michael Ryan    mer1
Marco Talabacu  mtalabac

*/

const SCREEN_WIDTH  = 800,
      SCREEN_HEIGHT = 600;


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var currentLevel = 1;
var lives = 5;

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
        lives = 5;
        TITLE.setTitle(0);
        return;
      }
    }
    if (nextLevel = MEGAMAN.checkFinishedLevel()){
      if (((currentLevel + nextLevel - 2) > 0) 
        &&  ((currentLevel + nextLevel - 2) < 5)) {
        currentLevel += nextLevel - 2;
        if (currentLevel === 4) {
          currentLevel = 1;
          loadLevel(currentLevel);
          MEGAMAN.gameOver = false;
          TITLE.setTitle(MEGAMAN.score);
          return;
        }
        loadLevel(currentLevel);
      }
    }
  }
}

playMP3();
loadLevel(currentLevel);
window.setInterval(loop, 1000/30);