var ENEMY = (function() {
	var exports = {};
  var firstRun = true;
  var image = new Image();
  image.src = "sprites/enemies.png";
	exports.enemyList = [];

	/*
   * Generates Walker enemies. These enemies pace bkac and forth on a given
   * plane between the leftLimit and rightLimit.
   */
  exports.Walker = function(xPos, yPos, left, leftLimit, rightLimit) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.spriteX = 106;
    this.spriteY = left ? 33 : 93;
    this.height = 51;
    this.width = 53;
    this.health = 50;
    this.left = left;
    this.timer = 0;
    this.turn = 0;
    this.leftLimit = leftLimit;
    this.rightLimit = rightLimit;
    this.type = "walker";

    this.getTopY = function() {
      return this.yPos;
    };

    this.getBottomY = function() {
      return this.yPos + this.height + 10;
    };

    this.getLeftX = function() {
      return this.xPos + this.width / 3;
    };

    this.getRightX = function() {
      return this.xPos + 2 * this.width /3;
    };
    
    /*
     * If they aren't at the limit, move them in the proper direction.
     * If they are, tell them to turn.
     */
    this.move = function() {
      enemyCollisionToMegaman();
      if (this.left && this.xPos >= leftLimit)
        this.xPos = (this.xPos - 4 === leftLimit) ? leftLimit : this.xPos - 4;
      else if (!(this.left) && this.xPos + this.width <= rightLimit)
        this.xPos = (this.xPos + 4 >= rightLimit) ? rightLimit : this.xPos + 4;
      else
        this.turn = (this.turn === 0) ? 1 : this.turn;
    }
  
    /*
     * Draws the walker walking or turning based on its state.
     */
    this.draw = function() {
        if (this.turn != 0) {
          if (this.left) {
            switch(this.turn) 
            {
            case 1:
              this.spriteX = 53;
              break;
            case 2:
              this.spriteX = 0;
              break;
            case 3:
              this.spriteY = 93;
              break;
            case 4:
              this.spriteX = 53;
              this.left = false;
              break;

            }

            this.turn = (this.turn + 1) % 5;
            ctx.drawImage(image, this.spriteX, this.spriteY, this.width, this.height, 
                          this.xPos, this.yPos, this.width, this.height);

          }


        else if (!this.left){
            switch(this.turn) 
            {
            case 1:
              this.spriteX = 53;
              break;
            case 2:
              this.spriteX = 0;
              break;
            case 3:
              this.spriteY = 33;
              break;
            case 4:
              this.spriteX = 53;
              this.left = true;
              break;
            }

            this.turn = (this.turn + 1) % 5;
            ctx.drawImage(image, this.spriteX, this.spriteY, this.width, this.height, 
                          this.xPos, this.yPos, this.width, this.height);
          }
        }

        else {
          this.spriteX += 53;
          if (this.spriteX >= 530) 
            this.spriteX = 106;
          ctx.drawImage(image, this.spriteX, this.spriteY, this.width, this.height, 
                    this.xPos, this.yPos, this.width, this.height);
        }
      }
  }


  /*
   * Generates a Turret enemy. Stays stationary and fires at an interval.
   */
  exports.Turret = function(xPos, yPos, left, offset) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.spriteX = 530;
    this.spriteY = left ? 0 : 32;
    this.height = 31;
    this.width = 23;
    this.health = 30;
    this.left = left;
    this.timer = 0;
    this.type = "turret";

    this.getTopY = function() {
          return this.yPos;
    };

    this.getBottomY = function() {
      return this.yPos + this.height - 2;
    };

    this.getLeftX = function() {
      return this.xPos + 5;
    };

    this.getRightX = function() {
      return this.xPos + this.width;
    };
    
    /*
     * This doesn't move, so we'll handle the firing.
     */
    this.move = function() {
      if (this.timer++ === 60 + offset) {
        PROJECTILE.makeProjectile(this.xPos + (this.left ? - 11 : this.width), 
                        (this.yPos + (this.height / 2) - 5), this.left, 
                        false, true);
        this.timer = 0;
      }
    }

    /*
     * Draws the turret.
     */
    this.draw = function() {
      ctx.drawImage(image, this.spriteX, this.spriteY, this.width, this.height, 
                    this.xPos, this.yPos, this.width, this.height);
      }
  }


  /*
   * Creates a Flyer enemy. This moves towards Mega Man relentelessly.
   */
  exports.Flyer = function(xPos, yPos, respawn) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.spriteX = 0;
    this.spriteY = 0;
    this.height = 32;
    this.width = 31;
    this.health = 30;
    this.type = "flyer";

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
    
    // Move towards Mega Man
    this.move = function() {

      if (distance(this.xPos + this.width/2, this.yPos + this.height/2, 
          MEGAMAN.getCenterX(), MEGAMAN.getCenterY()) > 300)
          return;

      var mmY = MEGAMAN.getTopY();
      var mmX = MEGAMAN.getCenterX();

      enemyCollisionToMegaman();
        if (mmY > this.yPos) 
          this.yPos = ((this.yPos + 5) > mmY) ? mmY : this.yPos + .5;
        else
          this.yPos = ((this.yPos - 5) < mmY) ? mmY : this.yPos - .5;    
        if (mmX > this.xPos) 
          this.xPos += .5;
        else
          this.xPos -= .5;
    }

    // Animates the helicopter blades.
    this.draw = function() {
      ctx.drawImage(image, this.spriteX, this.spriteY, this.width, this.height, 
                    this.xPos, this.yPos, this.width, this.height);
      this.spriteX += this.width;
      if (this.spriteX >= 124) 
        this.spriteX = 0;
      }

  }

  exports.setEnemyList = function(newList){
    exports.enemyList = newList;
  }

	exports.drawEnemies = function() {
    for (var i = 0; i < exports.enemyList.length; i++) {
      var e = exports.enemyList[i];
      e.move();
      e.draw();
    }
	}

  exports.damageEnemy = function(enemy, index, projectile) {
    // Makes sure projectile is from megaman
    if (projectile.enemy === false) {
      // Charged shot does more damage
      projectile.charged ? enemy.health -= 30 : enemy.health -= 10;
    }
    // Enemy has died, remove from enemyList array
    if(enemy.health <= 0) {
      MEGAMAN.score += 100;
      exports.enemyList.splice(index, 1);
    }
  }

  function enemyCollisionToMegaman() {
    if ((!MEGAMAN.gameOver) && (exports.enemyList.length > 0)) {
      var mm = MEGAMAN;
      for(var i = 0; i < exports.enemyList.length; i++) {
        enemy = exports.enemyList[i];
        if (enemy.leftLimit) {
          if (PROJECTILE.collisionToObject(enemy, mm)) 
          MEGAMAN.damageMegamanRamming();
        } 
        else {
          if (PROJECTILE.collisionToObject(mm, enemy)) 
            MEGAMAN.damageMegamanRamming();
        }
      }
    }
  }

  function distance(x1,y1,x2,y2) {
    var x = x2 - x1;
    var y = y2 - y1;
    var hyp = Math.sqrt(x*x + y*y);
    return hyp;
  }

	return exports;
}());