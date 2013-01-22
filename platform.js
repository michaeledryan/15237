var PLATFORM = (function() {
	var exports = {};

  var xPos = 100,
  yPos = 560,
  width = 50,
  height = 10;

	exports.drawPlatform = function() {
		ctx.fillRect(xPos, yPos, width, height);
	}

  exports.getTopY = function() {
    return yPos;
  }

  exports.getLeftX = function() {
    return xPos;
  }

  exports.getRightX = function() {
    return xPos + width;
  }

	return exports;
}());