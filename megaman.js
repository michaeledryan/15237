var MEGAMAN = (function() {
  var exports = {};
  var image = new Image();
  image.src = "sprites/mm.png";
  var background = new Image();
  background.src = "sprites/city.png";

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
      keys = {},
      vert = 0,
      headVert = 0,
      leftHorz = 0,
      rightHorz = 0,
      shot = 0,
      charge = 0,
      moving = false,
      keys = {};
      const chargeX = 354, chargeY = 407,
      chargeFrameX = 16, chargeFrameY = 14;

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

  function doDraw(){
    ctx.clearRect(0,0, SCREEN_WIDTH,SCREEN_HEIGHT);
    ctx.drawImage(background, 0, 0, 600, 800, 0, 0, 800, 600)
    ctx.drawImage(image, xpos, ypos, frameX, frameY, mmX, mmY, frameX, frameY);
    if (charge === 300 || charge % 40){
      ctx.drawImage(image, chargeX, chargeY + (!!left ? chargeFrameY : 0),
                    chargeFrameX, chargeFrameY, mmX + (left ? -5 : frameX *3/4),
                    (mmY + (frameY / 3)) - (!!jump ? 10 : 0), chargeFrameX, chargeFrameY);
    }


  }

  exports.moveMegaMan = function() {
    // move left
    if (keys["37"]) {
      left = true;
        if(checkRightPlatformCollision() === true) {
        mmX = (rightHorz + (frameX + 15));
        moving = false;
      }
      else{
        mmX -= 10;
        moving = true;
      }
    }
    // move right
    if (keys["39"]) {
      left = false;
      if(checkLeftPlatformCollision() === true){
        mmX = (leftHorz - (frameX - 15));
        moving = false;
      }
      else{
        mmX += 10;
        moving = true;
      }
    }

    // jump
    if (keys["88"]) {
      if (jump === 0) {
        up = true;
      }
    }
    // shoot
    if (keys["90"]) {
      shoot();
    }
    else {
      if (charge === 300) {
        PROJECTILE.makeProjectile(mmX + (left ? 0 : frameX), 
                                  (mmY + (frameY / 2)), left, true);
      }
      shot = 0;
      charge = 0;
    }

    if (!(keys["37"] || keys["39"]))
      moving = false;
}

  function drawMegaManMoving(){
    if (keys["90"]) {
      ypos += 100;
    }

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
      ypos += keys["90"] ? 466 : 406;
      doDraw();
      xpos = 0;
    }

    // JS doesn't have an XOR?
    else if (moving)  {
      drawMegaManMoving();
    }

    else if (keys["90"])
      xpos = 50, ypos += 100;
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
      if(checkHeadCollision() === true){
        jump = jumpHeight;
      }
      else{
        jump += 5;
        mmY -= 5;
      } 

    }
    else if (jump === jumpHeight) {
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
      if (checkVerticalCollision() === true) {
        jump = 0;
        mmY = vert - frameY;
      } else {
        mmY += 5;
      }
    } else {
      jump = 0;
      up = false;
    }
  }

  exports.getTopY = function() {
    return mmY;
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

  exports.getCenterY = function() {
    return exports.getTopY() + frameY / 2;
  }

  // To land on platforms
  function checkVerticalCollision() {
    if (PLATFORM.platformList !== undefined) {
      for (var i = 0; i < PLATFORM.platformList.length; i++) {
        var p = PLATFORM.platformList[i];
        if ((exports.getBottomY() - p.getTopY() > -3) && ((exports.getBottomY() - p.getTopY()) < 2)
            && (exports.getCenterX() >= p.getLeftX()) && (exports.getCenterX() <= p.getRightX())) {
          vert = p.getTopY();
          return true;
        }
      }
      return false;
    }
  }

  // To make sure megaman's head cant phase thru platforma
  function checkHeadCollision(){
    if (PLATFORM.platformList !== undefined) {
      for (var i = 0; i < PLATFORM.platformList.length; i++) {
        var p = PLATFORM.platformList[i];
        if ((exports.getTopY() - p.getBottomY() > -3) && ((exports.getTopY() - p.getBottomY()) < 2)
            && (exports.getCenterX() >= p.getLeftX()) && (exports.getCenterX() <= p.getRightX())) {
          headVert = p.getBottomY();
          return true;
        }
      }
      return false;
    }
  }

  //To check left horizontal collisions
  function checkLeftPlatformCollision(){
    if (PLATFORM.platformList !== undefined) {
      for (var i = 0; i < PLATFORM.platformList.length; i++) {
        var p = PLATFORM.platformList[i];
        if ((exports.getRightX() - p.getLeftX() > -16)  && ((exports.getRightX() - p.getLeftX()) < 16)
            && (((p.getTopY() >= exports.getTopY() && p.getBottomY() <= exports.getBottomY())
                ||  (p.getBottomY() >= exports.getTopY() && p.getTopY() <= exports.getBottomY())) 
                || (p.getBottomY() <= exports.getTopY() && p.getTopY() >= exports.getBottomY())
                || (p.getBottomY() <= exports.getTopY() && p.getTopY() >= exports.getBottomY()) ))  {
          leftHorz = p.getLeftX();
          return true;
        }
      }
      return false;
    }
  }

  function checkRightPlatformCollision(){
    if (PLATFORM.platformList !== undefined) {
      for (var i = 0; i < PLATFORM.platformList.length; i++) {
        var p = PLATFORM.platformList[i];
        if ((exports.getLeftX() - p.getRightX() > -16)  && ((exports.getLeftX() - p.getRightX()) < 16)
            && (((p.getTopY() >= exports.getTopY() && p.getBottomY() <= exports.getBottomY())
                ||  (p.getBottomY() >= exports.getTopY() && p.getTopY() <= exports.getBottomY())) 
                || (p.getBottomY() <= exports.getTopY() && p.getTopY() >= exports.getBottomY())
                || (p.getBottomY() <= exports.getTopY() && p.getTopY() >= exports.getBottomY()) ))  {
          rightHorz = p.getLeftX();
          return true;
        }
      }
      return false;
    }
  }


  function chargeShot(){
    if (charge < 300)
      charge += 10;
  }

  function shoot() {
    if (shot > 30)
      chargeShot();
    else if (shot == 0) {
      PROJECTILE.makeProjectile(mmX + (left ? 0 : frameX), (mmY + (frameY / 2)), left, false);
      shot += 5;
    }
    else 
      shot += 5;
  }

  return exports;
}());
