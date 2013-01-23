var MEGAMAN = (function() {
  var exports = {};
  image = new Image();
  image.src = "sprites/megaman.gif";

  var jump = false,
      mmX = 0,
      // Screen height - height of megaman, to put him on the bottom of the canvas.
      mmY = 600 - 25,
      xpos = 142,
      ypos = 36,
      index = 0,
      numFrames = 30,
      frameX = 20,
      frameY = 25,
      jumpHeight;
      up = false;
      moveRight = false;
      moveLeft = false;

  exports.moveStartListener = function(event) {
    switch(event.keyCode)
    {
    // right arrow
    case 39:
      moveRight = true;
      mmX += 10;
      break;
    // left arrow
    case 37:
      moveLeft = true;
      mmX -= 10;
      break;
    default:
      console.log('keyCode: ' + event.keyCode);
    }
  }

  exports.moveEndListener = function(event) {
    switch(event.keyCode) {
      case 39:
        moveRight = false;
        break;
      case 37:
        moveLeft = false;
        break;
    }
  }

  exports.jumpListener = function(event) {
    switch(event.keyCode)
    {
    // up arrow 
    case 38:
      if (jump === false) {
        up = true;
        jumpHeight = mmY - 50;
        exports.jumpMegaman();
      }
      break;
    default:
      console.log('keyCode: ' + event.keyCode);
    }
  }

  exports.drawMegaman = function() {
    ctx.clearRect(0,0, SCREEN_HEIGHT,SCREEN_WIDTH);
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
  // When jump is true, it stops the user from jumping again until he has fallen back down. 
  // When up is true, megaman is ascending. 
  // when up is false, megaman is descennding

  exports.jumpMegaman = function() {
    if (mmY > jumpHeight && up === true) {
      jump = true;
      mmY -= 2;
      if (moveLeft) {
        mmX -= 2;
      } 
      if (moveRight) {
        mmX += 2;
      }
    } else if (mmY === jumpHeight) {
      up = false;
      mmY += 2;
    } else if ((mmY + frameY) < SCREEN_HEIGHT && up == false) {
      console.log(checkVerticalCollision());
      if (checkVerticalCollision()) {
        jump = false;
      } else {
        mmY += 2;
        if (moveLeft) {
          mmX -= 2;
        } 
        if (moveRight) {
          mmX += 2;
      }
      }
    } else {
      jump = false;
    }
  }

  exports.getBottomY = function() {
    return mmY + frameY;
  }

  exports.getLeftX = function() {
    return mmX;
  }

  exports.getRightX = function() {
    return mmX + frameX;
  }

  exports.getCenterX = function() {
    return exports.getLeftX() + ((exports.getRightX() - exports.getLeftX()) / 2);
  }

  function checkVerticalCollision() {
    if (exports.getBottomY() === PLATFORM.getTopY() && exports.getCenterX() >= PLATFORM.getLeftX() && exports.getCenterX() <= PLATFORM.getRightX()) {
      return true;
    } else {
      return false;
    }
  }

  return exports;
}());
