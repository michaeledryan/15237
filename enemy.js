var ENEMY = (function() {
	var exports = {};
  var firstRun = true;
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

	exports.drawEnemies = function() {
    if(firstRun === true) {
      exports.enemyList.push(new Enemy(425, 420, 50, 50, 0, 100, 20));
      firstRun = false;
    }
    for (var i = 0; i < exports.enemyList.length; i++) {
      var e = exports.enemyList[i];
      ctx.fillStyle = "red";
      ctx.fillRect(e.xPos, e.yPos, e.width, e.height);
    }
	}

	return exports;
}());