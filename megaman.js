var MEGAMAN = (function() {
	var exports = {};
  image = new Image();
  image.src = "sprites/megaman.gif";

  var jump = false;
      mmX = 0,
	    mmY = 500,
	   	xpos = 142,
    	ypos = 36,
     	index = 0,
     	numFrames = 30,
    	frameX = 20,
     	frameY = 25,
      origY = mmY,

	exports.moveMegaman = function(event) {
    switch(event.keyCode)
		{
		// right arrow
		case 39:
			exports.clearMegaman();
			mmX += 20;
			break;
    // left arrow
		case 37:
		  exports.clearMegaman();
		  mmX -= 20;
			break;
		// up arrow	
		case 38:
			if (jump === false) {
				origY = mmY;
				exports.clearMegaman();
				exports.jumpMegaman();
			}
			break;
		default:
			console.log('keyCode: ' + event.keyCode);
		}
	}

	exports.drawMegaman = function() {
  	ctx.drawImage(image, xpos, ypos, frameX, frameY, mmX, mmY, frameX, frameY);
  	index += 1;
  	//if our index is higher than our total number of frames, we're at the end and better start over
  	if (index >= 2) {
      xpos -= 31;
      index=0;
  	//if we've gotten to the limit of our source image's width, we need to move down one row of frames
  	} else {
      xpos += 31;
  	}
  }
  
  // this is hacky
  exports.gravityMegaman = function() {
    if (origY !== mmY) {
    	jump = true;
    	exports.clearMegaman();
    	mmY += 25;
    } else {
    	jump = false;
    }
  }

  exports.jumpMegaman = function() {
  	mmY -= 50;
  }

  exports.clearMegaman = function() {
  	ctx.clearRect(0,0, SCREEN_HEIGHT,SCREEN_WIDTH);
  }

  return exports;
}());
