var MEGAMAN = (function() {
  var exports = {};
  image = new Image();
  image.src = "sprites/mm.png";

  var jump = 0,
      up = false,
      top = 0,
      mmX = 0,
      // Screen height - height of megaman, to put him on the bottom of the canvas.
      mmY = 600 - 45,
      xpos = 0,
      ypos = 200,
      index = 0,
      frameX = 50,
      frameY = 45,
      jumpHeight = 60,
      left = false,
      shot = false,
      keys = {};

  exports.keyDownListener = function(event) {
    keys[event.keyCode] = true;
    if (event.keyCode === 32) {
      if (!shot){
        shoot();
      }
      shot = true;
    }
  }

  exports.keyUpListener = function(event) {
    keys[event.keyCode] = undefined;
    if (event.keyCode === 32) {
      shot = false;
    }
  }

  exports.doGame = function() {
    exports.jumpMegaman();
    exports.drawMegaman();
  }

  function doDraw(){
    ctx.clearRect(0,0, SCREEN_WIDTH,SCREEN_HEIGHT);
    ctx.drawImage(image, xpos, ypos, frameX, frameY, mmX, mmY, frameX, frameY);
  }

  exports.moveMegaMan = function() {
    // move right
    if (keys["39"]) {
      mmX += 10;
      left = false;
    }
    // move left
    if (keys["37"]) {
      mmX -= 10;
      left = true;
    }
    // jump
    if (keys["38"]) {
      if (jump === 0) {
        up = true;
      }
    }
    // shoot
 /*   if (keys["32"]) {
      shoot();
    }*/
  }


  function drawMegaManMoving(){
    //if (keys["32"])
        

    ypos += 200;

    doDraw();
    
    index += 1;
    if (index >= 8) {
      xpos = 0;
      index = 0;
    } else {
      xpos += frameX;
    }

  }

   exports.drawMegaman = function() {
    exports.moveMegaMan();
    if (!!left) 
      ypos = 525;

    else ypos = 0;
   
    
    if (!!jump) {
      xpos = 50;
      ypos += 406;
      doDraw();
      xpos = 0;
    }

    // JS doesn't have an XOR?
    else if (keys["37"] || keys["39"] && !(keys["37"] && keys["39"])) {
      drawMegaManMoving();
    }

    else {


      ypos += 50, xpos = 150;
    }  

      doDraw();

   
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
      if (checkVerticalCollision()) {
        jump = 0;
        mmY = PLATFORM.getTopY() - frameY;
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
    if ((exports.getBottomY() - PLATFORM.getTopY()) > -3 && (exports.getBottomY() - PLATFORM.getTopY()) < 2
        && exports.getCenterX() >= PLATFORM.getLeftX() && exports.getCenterX() <= PLATFORM.getRightX()) {
      return true;
    } else {
      return false;
    }
  }

  function shoot() {
    PROJECTILE.makeProjectile(mmX, (mmY + (frameY / 2)), left);
  }

  return exports;
}());
