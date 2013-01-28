var PROJECTILE = (function() {
	var exports = {};
	var xPos;
	var yPos;
	var width = 10;
	var height = 10;
	var projList = [];
	var image = new Image();
	const busterX = 0, busterY = 44;
	const chargedX = 0, chargedY = 0;
	const chargedFrameX = 36, chargedFrameY = 22;
	const busterFrameX = 8, busterFrameY = 6;
	const badX = 0, badY = 50;
	const badFrameX = 15, badFrameY = 11;
	image.src = "sprites/buster1.png";

	// Constructor for Mega Man's projectiles. Takes coordinates, a starting direction
	function Projectile(xPos, yPos, left, charged, enemy) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.width = width;
		this.height = height;
		this.left = left;
		this.enemy = enemy;
		this.charged = charged;
    this.getTopY = function() {
      return this.yPos;
    };
    this.getBottomY = function() {
      return this.yPos + height;
    };
    this.getLeftX = function() {
      return this.xPos;
    };
    this.getRightX = function() {
      return this.xPos + width;
    };
	}


	// This fn is used to connect the projectile to the shooter
	exports.makeProjectile = function(xPos, yPos, left, charged, enemy) {
		proj = new Projectile(xPos, yPos, left, charged, enemy);
		drawShot(proj);
		projList.push(proj);
	}

	function drawShot (proj) {
		xPos = proj.xPos;
		yPos = proj.yPos;
		if (proj.charged)
				ctx.drawImage(image, chargedX, chargedY + (proj.left) ? chargedFrameY : 0, 
					chargedFrameX, chargedFrameY, xPos, yPos-chargedFrameY/2, 
					chargedFrameX, chargedFrameY);
		else if (proj.enemy) 
			ctx.drawImage(image, badX, badY, badFrameX + proj.left ? badFrameX : 0, 
										badFrameY, xPos, yPos, badFrameX, badFrameY);	
		else
			ctx.drawImage(image, busterX, busterY, busterFrameX, 
										busterFrameY, xPos, yPos, busterFrameX, 
										busterFrameY);

	}

	exports.moveProjectiles = function() {
    collisionToPlatform();
		if (projList.length > 0) {
			for (var i = 0; i < projList.length; i++) {
				var proj = projList[i];
        var xPos = proj.xPos;
        //console.log(proj.left == false);
				if (proj.left && xPos > (0 - 100)) {
					proj.xPos = (xPos - 15);
          drawShot(proj);
				} else if (!proj.right && xPos < (SCREEN_WIDTH + 20)) {
					proj.xPos = (xPos + 15);
          drawShot(proj);
				} else {
					//console.log(proj + "is outside the canvas bounds")
				}
			}
		}
	}

  function collisionToPlatform() {
    if (projList.length > 0) {
      //console.log('got here');
      var doDelete = false;
      var delProj;
      var platforms = PLATFORM.platformList;
      for(var i = 0; i < projList.length; i ++) {
        for(var j = 0; j < platforms.length; j++) {
          platform = platforms[j];
          projectile = projList[i];
          if (collisionToPlatformLeft(platform, projectile)) { //|| collisionToPlatformRight(platform, projectile)) {
            //console.log('Delete this projectile from list: ' + i);
            delProj = i;
            doDelete = true;
          }
        }
      }
      if (doDelete === true) {
        deleteProjectile(delProj); 
      }
    }
  }

  function collisionToPlatformLeft(platform, projectile) {
    //console.log(platform, projectile);
    if  (
      (((projectile.getBottomY() >= platform.getTopY())  &&   (projectile.getBottomY() <= platform.getBottomY()))   ||  
        ((projectile.getTopY() <= platform.getBottomY())    &&  (projectile.getTopY() >= platform.getTopY())))  &&   
      (((projectile.getLeftX() >= platform.getLeftX())  &&  (projectile.getLeftX() <= platform.getRightX()))  ||  
        ((projectile.getRightX() >= platform.getLeftX())   &&  (projectile.getRightX() <= platform.getRightX())))
        )
    {
      console.log('its true');
      return true;
    } else {
      return false;
    }
  }

  // function collisionToPlatformRight(platform, projectile) {
  //   if ((projectile.getLeftX() - platform.getRightX() > -21)  && ((projectile.getLeftX() - platform.getRightX()) < 21)
  //       && (((platform.getTopY() >= projectile.getTopY() && platform.getBottomY() <= projectile.getBottomY())
  //           ||  (platform.getBottomY() >= projectile.getTopY() && platform.getTopY() <= projectile.getBottomY())) 
  //           || (platform.getBottomY() <= projectile.getTopY() && platform.getTopY() >= projectile.getBottomY())
  //           || (platform.getBottomY() <= projectile.getTopY() && platform.getTopY() >= projectile.getBottomY()) ))  {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  function deleteProjectile(i) {
    console.log('projList before: ' + projList.length);
    console.log('i = ' + i);
    projList.splice(i, 1);
    console.log('projList after: ' + projList.length);
  }

  return exports;
}());