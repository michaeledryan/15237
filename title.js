/*

Mega Man 237

Josh Gerbasi    jgerbasi
Michael Ryan    mer1
Marco Talabacu  mtalabac

*/

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
      instructionsText = "This is Mega Man! Fight enemies and get to the end of the levels. \n Controls: \n Z: shoot \n X: jump \n Arrow keys: move \n Hold X to charge your shots!",
      citationText = "Sprites, from Mega Man 7, Mega Man 8 and Mega Man X.\n\nTurret enemy and blast:\nhttp://www.sprites-inc.co.uk/files/X/X1/Enemy/old%20(up%20untill%20the%20rest%20are%20re-ripped)/mmm-mmxwallblast.gif\n\nFlying and Walking Enemies:\nhttp://www.spriters-resource.com/snes/mmx/enemies1.png\nBackground:\nhttp://wallpaperbackgrounds.com/Content/wallpapers/video%20game/mega%20man/16803-50973.jpg\n\nTitle Screen:\nhttp://www.bonus-level.com/Bonus_Level_Uploads/2010/11/nesessities_megamanii_title.jpg\nBuster Shots and Health Bar:\nhttp://spriters-resource.com/snes/mmx/weapons.png\n\nMega Man:\nhttp://www.freewebs.com/rinicthefox/A%20Sprite%20Sheet%20of%20Bass,Megaman,Protoman,and%20sk8brder40.PNG\n\nPlatforms:\nhttp://www.vgmaps.com/Atlas/SuperNES/MegaManVII-TurboMan.png\n\nTheme Song:\nhttp://www.anonpartyhard.com/loops/5/low/Megaman%202%20-%20Theme.mp3"
      titleScore = 0;


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function titleKeyDown(event) {
  if (event.keyCode === 38)
    select = (select + 2) % 3; // Move the cursor
  if (event.keyCode === 40)
    select = (select + 1) % 3; // Move the cursor
  if (event.keyCode === 13)
      if (select === 1)
        alert(instructionsText);
      else if (select === 2)
        alert(citationText);
      else {
        canvas.removeEventListener('keydown', titleKeyDown, false);
        ctx.clearRect(0,0, 800, 600);
        inTitle = false;
      }
}

// Draws the menu cursor
function drawCursor() {
  var ypos = 330 + select * 100;
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
    ctx.fillText("START", 275, 350);
    ctx.fillText("CONTROLS", 275, 450);
    ctx.fillText("CITATIONS", 275, 550);
    ctx.fillText("Score: " + titleScore, 250, 70);
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

  exports.setTitle = function(score) {
    titleScore = score;
    inTitle = true;
    canvas.addEventListener('keydown', titleKeyDown, false);    
  }

// Allows keystroke interactivity
canvas.addEventListener('keydown', titleKeyDown, false);

return exports;
}());