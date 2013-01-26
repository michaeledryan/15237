// setup
var SCREEN_WIDTH  = 800,
    SCREEN_HEIGHT = 600;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var inTitle = true;

canvas.addEventListener('keydown', MEGAMAN.keyDownListener, false);
canvas.addEventListener('keyup', MEGAMAN.keyUpListener, false);

// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();

function playMP3() {
  document.getElementById("mp3").play();
}

function loop() {
  if (!TITLE.doTitle()){
    MEGAMAN.doGame();
    PLATFORM.drawPlatform();
    PROJECTILE.moveProjectiles();
  }
};

//playMP3();
window.setInterval(loop, 1000/30);