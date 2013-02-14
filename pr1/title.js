/*
 * title.js
 *
 * Handles the title screen of the game. Allows user to start or see 
 * a set of controls.
 */

var TITLE = (function() {
  var exports = {};
  var image = new Image();
  image.src = "sprites/title.png";


  var select = 0, // The menu option being selected.
      inTitle = true, // Whether or not the player is still on the title screen.
      instructionsText = "This is Mega Man! Fight enemies and get to the end of the levels. \n Controls: \n Z: shoot \n X: jump \n Arrow keys: move \n Hold X to charge your shots!";


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function titleKeyDown(event) {
  if (event.keyCode === 38 || event.keyCode === 40) 
      select = (select + 1) % 2; // Move the cursor
  if (event.keyCode === 13)
      if (select)
        alert(instructionsText);
      else {
        canvas.removeEventListener('keydown', titleKeyDown, false);
        ctx.clearRect(0,0, 800, 600);
        inTitle = false;
      }
}

// Draws the menu cursor
function drawCursor() {
  var ypos = 380 + select * 100;
  ctx.beginPath();
  ctx.lineTo(240, ypos);
  ctx.lineTo(190, ypos+20);
  ctx.lineTo(210, ypos);
  ctx.lineTo(190, ypos-20);
  ctx.closePath();
  ctx.fill();
}

// Draw the image used for the title.
function drawTitle() {
    ctx.fillStyle = "#010008";
    ctx.clearRect(0,0, 800, 600);
    ctx.fillRect(0,0, 800, 600);
    ctx.drawImage(image, 0, 0, 552, 175, 120, 100, 552, 175);
    ctx.fillStyle = "white";
    ctx.font = "normal 64px monospace";
    ctx.fillText("START", 275, 400);
    ctx.fillText("CONTROLS", 275, 500);
    drawCursor();
    ctx.fillStyle = "black";
}

// Wrapper function for this file's functionality.
exports.doTitle = function() {  
  if (!inTitle)
      return false;
  drawTitle();
  return inTitle;

}

// Allows keystroke interactivity
canvas.addEventListener('keydown', titleKeyDown, false);

return exports;
}());