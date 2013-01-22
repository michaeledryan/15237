// setup
var SCREEN_WIDTH  = 800,
    SCREEN_HEIGHT = 600;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener('keydown', MEGAMAN.moveMegaman, false);

// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();

window.setInterval(MEGAMAN.drawMegaman, 10);
window.setInterval(MEGAMAN.gravityMegaman, 100);