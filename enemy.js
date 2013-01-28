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