var TITLE = (function() {
  var exports = {};
  var image = new Image();
  image.src = "sprites/title.png";


  var select = 0,
      inTitle = true,
      instructionText = "This is Mega Man! Fight enemies and get to the end of the levels. \n Controls: \n Z: shoot \n X: jump \n Arrow keys: move \n Hold X to charge your shots!"
      ;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function titleKeyDown(event) {
  if (event.keyCode === 38 || event.keyCode === 40) 
      select = (select + 1) % 2;
  if (event.keyCode === 13)
      if (select)
        alert(instructionText);
      else
        inTitle = false;
}



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


function drawTitle(event) {
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

exports.doTitle = function() {  
  drawTitle();
  return inTitle;

}


canvas.addEventListener('keydown', titleKeyDown, false);


// make canvas focusable, then give it focus!

return exports;

}());