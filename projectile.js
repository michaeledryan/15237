var PROJECTILE = (function() {
	var exports = {};
	var projList = [];
	var image = new Image();
	const busterX = 0, busterY = 44;
  const busterWidth = 10, busterHeight = 10;
	const chargedX = 0, chargedY = 0;
	const chargedWidth = 36, chargedHeight = 22;
	const busterFrameX = 8, busterFrameY = 6;
	const badX = 0, badY = 50;
	const badWidth = 15, badHeight = 11;
	image.src = "sprites/buster1.png";

	// Constructor for Mega Man's projectiles. Takes coordinates, a starting direction
	// Constructor for Mega Man's projectiles. Takes coordinates, a starting direction
  exports.Projectile = function(xPos, yPos, left, charged, enemy) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = charged ? chargedWidth : (enemy ? badWidth : busterWidth);
    this.height = charged ? chargedHeight : (enemy ? badHeight : busterHeight);
    this.left = left;
    this.enemy = enemy;
    this.charged = charged;
    this.getTopY = function() {
      return this.yPos;
    };
    this.getBottomY = function() {
      return this.yPos + this.height;
    };
    this.getLeftX = function() {
      return this.xPos;
    };
    this.getRightX = function() {
      return this.xPos + this.width;
    };
  }


	// This fn is used to connect the projectile to the shooter
	exports.makeProjectile = function(xPos, yPos, left, charged, enemy) {
		proj = new exports.Projectile(xPos, yPos, left, charged, enemy);
		drawShot(proj);
		projList.push(proj);
	}

  exports.clearList = function(){
    projList = [];
  }

	function drawShot (proj) {
		xPos = proj.xPos;
		yPos = proj.yPos;
		if (proj.charged)
				ctx.drawImage(image, chargedX, chargedY + (proj.left) ? chargedHeight : 0, 
					chargedWidth, chargedHeight, xPos, yPos-chargedHeight/2, 
					chargedWidth, chargedHeight);
		else if (proj.enemy) 
			ctx.drawImage(image, badX + proj.left ? 0: + badWidth, badY, badWidth, 
										badHeight, xPos, yPos, badWidth, badHeight);	
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
          if (exports.collisionToObject(platform, projectile)) {
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

  // If you comment this out where its called, all turrets shoot their projectiles, but when this is used
  // the last turret to be pushed onto list doesnt shoot his projectiles
  function collisionToEnemy() {
    if ((ENEMY.enemyList.length > 0) && (projList.length > 0)) {
      var doDelete = false;
      var delProj;
      var enemies = ENEMY.enemyList;
      for(var i = 0; i < projList.length; i ++) {
        for(var j = 0; j < enemies.length; j++) {
          enemy = enemies[j];
          projectile = projList[i];
          if (exports.collisionToObject(enemy, projectile)) {
            delProj = i;
            if (projectile.enemy === false) {
              doDelete = true;
              ENEMY.damageEnemy(enemy, j, projectile);
            }
            // Passes enemy object, index in enemyList array, and projectile type for damage calculation
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
        if (exports.collisionToObject(mm, projectile)) {
          delProj = i;
          if (projectile.enemy === true) {
            doDelete = true;
          }
          MEGAMAN.damageMegaman(projectile);
        }
      }
      if (doDelete === true) {
        deleteProjectile(delProj); 
      }
    }
  }

  exports.collisionToObject = function(object, projectile) {
    if 
      (((projectile.getBottomY() >= (object.getTopY() + 3))  &&   (projectile.getBottomY() <= (object.getBottomY() - 3))   ||  
        ((projectile.getTopY() <= (object.getBottomY() - 3))    &&  (projectile.getTopY() >= (object.getTopY() + 3))))  &&   
      (((projectile.getLeftX() >= (object.getLeftX() + 3))  &&  (projectile.getLeftX() <= (object.getRightX() - 3)))  ||  
        ((projectile.getRightX() >= (object.getLeftX() + 3))   &&  (projectile.getRightX() <= (object.getRightX() - 3))))
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