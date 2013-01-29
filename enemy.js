var ENEMY = (function() {
	var exports = {};
  var firstRun = true;
  var image = new Image();
  image.src = "sprites/enemies.png";
	exports.enemyList = [];

	function Enemy(xPos, yPos, width, height, type, health, damage) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.width = width;
		this.height = height;
		this.type = type;
    this.health = health;
    this.damage = damage;
		this.getTopY = function() {
        return yPos;
	    };
	    this.getBottomY = function() {
	      return yPos + height;
	    };
	    this.getLeftX = function() {
	      return xPos;
	    };
	    this.getRightX = function() {
	      return xPos + width;
	    };
	}

  function Walker(xPos, yPos, left, leftLimit, rightLimit) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.spriteX = 106;
    this.spriteY = left ? 33 : 93;
    this.height = 51;
    this.width = 53;
    this.health = 30;
    this.left = left;
    this.timer = 0;
    this.turn = 0;
    this.leftLimit = leftLimit;
    this.rightLimit = rightLimit;

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
    
    this.move = function() {

      if (this.left && this.xPos >= leftLimit)
        this.xPos = (this.xPos - 2 === leftLimit) ? leftLimit : this.xPos - 2;
      else if (!(this.left) && this.xPos + this.width <= rightLimit)
        this.xPos = (this.xPos + 2 >= rightLimit) ? rightLimit : this.xPos + 2;
      else
        //console.log("hey");
        this.turn = (this.turn === 0) ? 1 : this.turn;
    }
  
    this.draw = function() {

        // if stopped, we do the cycle, increment turn, and switch on turn?
        // if moving, we go through the images.
        // left x 106 - 424 by 53. y = 33
        // right x 106 - 424 by 53. y = 93

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
//          console.log("afasdf");
          ctx.drawImage(image, this.spriteX, this.spriteY, this.width, this.height, 
                    this.xPos, this.yPos, this.width, this.height);
        }
      }
  }


  function Turret(xPos, yPos, left) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.spriteX = 530;
    this.spriteY = left ? 0 : 32;
    this.height = 31;
    this.width = 23;
    this.health = 30;
    this.left = left;
    this.timer = 0;

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
    
    this.move = function() {
      if (this.timer++ === 30) {
        PROJECTILE.makeProjectile(this.xPos + (this.left ? - 11 : this.width), 
                        (this.yPos + (this.height / 2) - 5), this.left, 
                        false, true);
        this.timer = 0;
      }
    }

    this.draw = function() {
      ctx.drawImage(image, this.spriteX, this.spriteY, this.width, this.height, 
                    this.xPos, this.yPos, this.width, this.height);
      }
  }


  function Flyer(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.spriteX = 0;
    this.spriteY = 0;
    this.height = 32;
    this.width = 31;
    this.health = 30;

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
    
    this.move = function() {
      var mmY = MEGAMAN.getTopY();
      var mmX = MEGAMAN.getCenterX();

        if (mmY > this.yPos) 
          this.yPos = ((this.yPos + 5) > mmY) ? mmY : this.yPos + .5;
        else
          this.yPos = ((this.yPos - 5) < mmY) ? mmY : this.yPos - .5;    
        if (mmX > this.xPos) 
          this.xPos += 1;
        else
          this.xPos -= 1;
    }

    this.draw = function() {
      ctx.drawImage(image, this.spriteX, this.spriteY, this.width, this.height, 
                    this.xPos, this.yPos, this.width, this.height);
      this.spriteX += this.width;
      if (this.spriteX >= 124) 
        this.spriteX = 0;
      }

  }

	exports.drawEnemies = function() {
    if(firstRun === true) {
      exports.enemyList.push(new Flyer(300, 300));
      exports.enemyList.push(new Turret(200, 400, true));
      exports.enemyList.push(new Turret(20, 550, false));
      exports.enemyList.push(new Walker(100, 100, false, 00, 350));
      firstRun = false;
    }
    for (var i = 0; i < exports.enemyList.length; i++) {
      var e = exports.enemyList[i];
      e.move();
      e.draw();
    }
	}

	return exports;
}());