// setup
var SCREEN_WIDTH  = 800,
    SCREEN_HEIGHT = 600;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener('keydown', MEGAMAN.moveStartListener, false);
canvas.addEventListener('keyup', MEGAMAN.moveEndListener, false);
canvas.addEventListener('keydown', MEGAMAN.jumpListener, false);

// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();

function loop() {
  MEGAMAN.drawMegaman();
  MEGAMAN.jumpMegaman();
  PLATFORM.drawPlatform();
};

window.setInterval(loop, 10);