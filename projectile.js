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
	// Constructor for Mega Man's projectiles. Takes coordinates, a starting direction
  exports.Projectile = function(xPos, yPos, left, charged, enemy) {
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
		proj = new exports.Projectile(xPos, yPos, left, charged, enemy);
		drawShot(proj);
		projList.push(proj);
	}

  exports.clearList = function(){
    platformList = [];
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
    collisionToEnemy();
    collisionToPlatform();
    collisionToMegaman();
		if (projList.length > 0) {
			for (var i = 0; i < projList.length; i++) {
				var proj = projList[i];
        var xPos = proj.xPos;
				if (proj.left && xPos > (0 - 100)) {
					proj.xPos = (xPos - 15);
          drawShot(proj);
				} else if (!proj.right && xPos < (SCREEN_WIDTH + 20)) {
					proj.xPos = (xPos + 15);
          drawShot(proj);
				} else {
				}
			}
		}
	}

  // Makes sure projectiles disappear after collision with platform
  function collisionToPlatform() {
    if (projList.length > 0) {
      var doDelete = false;
      var delProj;
      var platforms = PLATFORM.platformList;
      for(var i = 0; i < projList.length; i ++) {
        for(var j = 0; j < platforms.length; j++) {
          platform = platforms[j];
          projectile = projList[i];
          if (collisionToObject(platform, projectile)) {
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

  // If you comment this out where its called, all turrets shoot their projectiles, but for some reason if this method is used,
  // the last turret to be pushed onto the list's projectiles get deleted instantly
  function collisionToEnemy() {
    if ((ENEMY.enemyList.length > 0) && (projList.length > 0)) {
      var doDelete = false;
      var delProj;
      var enemies = ENEMY.enemyList;
      for(var i = 0; i < projList.length; i ++) {
        for(var j = 0; j < enemies.length; j++) {
          enemy = enemies[j];
          projectile = projList[i];
          if (collisionToObject(enemy, projectile)) {
            delProj = i;
            doDelete = true;
            // Passes enemy object, index in enemyList array, and projectile type for damage calculation
            ENEMY.damageEnemy(enemy, j, projectile);
          }
        }
      }
      if (doDelete === true) {
        deleteProjectile(delProj); 
      }
    }
  }

  function collisionToMegaman() {
    if ((!MEGAMAN.gameOver) && (projList.length > 0)) {
      var doDelete = false;
      var delProj;
      var mm = MEGAMAN;
      for(var i = 0; i < projList.length; i ++) {
        projectile = projList[i];
        if (collisionToObject(mm, projectile)) {
          delProj = i;
          doDelete = true;
          MEGAMAN.damageMegaman();
        }
      }
      if (doDelete === true) {
        deleteProjectile(delProj); 
      }
    }
  }

  function collisionToObject(object, projectile) {
    if  (
      (((projectile.getBottomY() >= object.getTopY())  &&   (projectile.getBottomY() <= object.getBottomY()))   ||  
        ((projectile.getTopY() <= object.getBottomY())    &&  (projectile.getTopY() >= object.getTopY())))  &&   
      (((projectile.getLeftX() >= object.getLeftX())  &&  (projectile.getLeftX() <= object.getRightX()))  ||  
        ((projectile.getRightX() >= object.getLeftX())   &&  (projectile.getRightX() <= object.getRightX())))
        )
    {
      return true;
    } else {
      return false;
    }
  }

  function deleteProjectile(i) {
    projList.splice(i, 1);
  }

  return exports;
}());