/*
 * main.js.
 * Main file for Mega Man. Calls the game loop, the functionality of which 
 * is split between several files. Also plays the game music.
 */
const SCREEN_WIDTH  = 800,
      SCREEN_HEIGHT = 600;


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener('keydown', MEGAMAN.keyDownListener, false);
canvas.addEventListener('keyup', MEGAMAN.keyUpListener, false);

canvas.setAttribute('tabindex','0');
canvas.focus();

function playMP3() {
  document.getElementById("mp3").play();
}

function loop() {
  MEGAMAN.doGame();
  PLATFORM.drawPlatforms();
  PROJECTILE.moveProjectiles();
  if (!TITLE.doTitle()){
    MEGAMAN.doGame();
    PLATFORM.drawPlatforms();
    PROJECTILE.moveProjectiles();
  }
};

//playMP3();
window.setInterval(loop, 1000/30);