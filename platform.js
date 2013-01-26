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
    this.getLeftX = function() {
      return xPos;
    };
    this.getRightX = function() {
      return xPos + width;
    };
  }

	exports.drawPlatforms = function() {
    if (firstRun === true) {
      exports.platformList.push(new Platform(200, 550, 80, 10));
      exports.platformList.push(new Platform(400, 550, 80, 10));
      exports.platformList.push(new Platform(300, 550, 80, 10));
      firstRun = false;
    }
    for (var i = 0; i < exports.platformList.length; i++) {
      var p = exports.platformList[i];
      ctx.fillRect(p.xPos, p.yPos, p.width, p.height);
    }
	}

	return exports;
}());