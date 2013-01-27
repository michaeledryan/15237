var PLATFORM = (function() {
	var exports = {};
  var firstRun = true;
  exports.platformList = [];

  function Platform(xPos, yPos, width, height) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
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

	exports.drawPlatforms = function() {
    if (firstRun === true) {
      exports.platformList.push(new Platform(200, 545, 103, 55));
      exports.platformList.push(new Platform(400, 450, 103, 150));
      exports.platformList.push(new Platform(250, 500, 103, 50));
      exports.platformList.push(new Platform(100, 475, 103, 10));
      exports.platformList.push(new Platform(500, 550, 103, 50));
      exports.platformList.push(new Platform(600, 500, 103, 50));
      firstRun = false;
    }
    for (var i = 0; i < exports.platformList.length; i++) {
      var p = exports.platformList[i];
      ctx.fillStyle = "grey";
      ctx.fillRect(p.xPos, p.yPos, p.width, p.height);
    }
	}

	return exports;
}());