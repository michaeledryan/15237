var SCREEN_WIDTH = 800,
    SCREEN_HEIGHT = 600;        
   
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
      
var mmX = 0,
	mmY = 0,
	xpos = 142, 
  ypos = 36, 
  index = 0, 
  numFrames = 30, 
  frameX = 20,
  frameY = 25;
   
 //load the image
image = new Image();
image.src = "sprites/megaman.gif";

canvas.addEventListener('keydown', onKeyDown, false);
canvas.addEventListener('keyup', onKeyUp, false);

// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();

image.onload = function() {

    //we're ready for the loop
    init();
}
       

function init(){
  //we're ready for the loop

  beginStage();


  setInterval(loop, 1000/30);
}


function onKeyUp(event) {
    console.log('keyCode: ' + event.keyCode);
}


function onKeyDown(event) {
    switch(event.keyCode)
	{
		// right arrow
		case 39:
			mmX += 10;
			break;
		case 37:
			mmX -= 10;
			break;
		default:
			console.log('keyCode: ' + event.keyCode);
	}
	
}

function beginStage() {};

function drawMegaMan() {};

function loop() {
  //clear the canvas!
  ctx.clearRect(0,0, SCREEN_HEIGHT,SCREEN_WIDTH);
  
  drawMegaMan();

  /*our big long list of arguments below equates to: 
      1: our image source
      2 - 5: the rectangle in the source image of what we want to draw
      6 - 9: the  rectangle of our canvas that we are drawing into
        
      the area of the source image we are drawing from will change each time loop() is called.
      the rectangle of our canvas that we are drawing into however, will not. 
      tricky!
  */
  ctx.drawImage(image,xpos,ypos,frameX,frameY,mmX,mmY,frameX, frameY);
  
  //each time around we add the frame size to our xpos, moving along the source image
  //increase the index so we know which frame of our animation we are currently on
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
