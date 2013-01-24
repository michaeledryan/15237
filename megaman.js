var MEGAMAN = (function() {
  var exports = {};
  image = new Image();
  image.src = "sprites/mm.png";

  var jump = 0,
      up = false,
      top = 0,
      mmX = 0,
      // Screen height - height of megaman, to put him on the bottom of the canvas.
      mmY = 600 - 50,
      xpos = 0,
      ypos = 200,
      index = 0,
      frameX = 50,
      frameY = 50,
      jumpHeight = 60,
      left = false,
      keys = {};

  exports.keyDownListener = function(event) {
    keys[event.keyCode] = true;
  }

  exports.keyUpListener = function(event) {
    keys[event.keyCode] = undefined;
  }

  exports.doGame = function() {
    exports.jumpMegaman();
    exports.drawMegaman();
  }

  exports.moveMegaMan = function() {
    //if (keys["32"])
    if (keys["39"]) {
      mmX += 10;
      left = false;
    }
    if (keys["37"]){
      mmX -= 10;
      left = true;
    }
    if (keys["38"]) {
      if (jump === 0) {
        up = true;
      }
    }
  }

  exports.drawMegaman = function() {
    exports.moveMegaMan();
    if (!!left) {
      ypos = 725;
    } else ypos = 200;
    ctx.clearRect(0,0, SCREEN_WIDTH,SCREEN_HEIGHT);
    ctx.drawImage(image, xpos, ypos, frameX, frameY, mmX, mmY, frameX, frameY);
    index += 1;
    //if our index is higher than our total number of frames, we're at the end and better start over
    if (index >= 8) {
      xpos = 0;
      index = 0;
    //if we've gotten to the limit of our source image's width, we need to move down one row of frames
    } else {
      xpos += frameX;
    }
  }
  

  /*
   * Jump is now an int that gets increased to mark progress in the jump. We need to rewrite a lot about this.
   */
  exports.jumpMegaman = function() {
    if (jump < jumpHeight && up === true) {
      jump += 5;
      mmY -= 5;
    } else if (jump === jumpHeight) {
        up = false;
      if (top !== 3){
        top++;
      }
      else {
        top = 0;
        jump -= 5;
        mmY += 5;
      }
    } else if ((mmY + frameY+1) < SCREEN_HEIGHT && up == false) {
      console.log(checkVerticalCollision());
      if (checkVerticalCollision()) {
        jump = 0;
      } else {
        mmY += 5;
      }
    } else {
      jump = 0;
      up = false;
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
