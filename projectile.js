var PROJECTILE = (function() {
	var exports = {};
	var xPos;
	var yPos;
	var width = 10;
	var height = 10;
	var projList = [];

	// this fn takes x,y coordiantes for initial positioning and 'left' bool for direction
	function Projectile(xPos, yPos, left) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.width = width;
		this.height = height;
		this.left = left;
	}

	// This fn is used to connect the projectile to the shooter
	exports.makeProjectile = function(xPos, yPos, left) {
		proj = new Projectile(xPos, yPos, left);
		drawHitbox(proj);
		projList.push(proj);
	}

	function drawHitbox (proj) {
		xPos = proj.xPos;
		yPos = proj.yPos;
		ctx.fillRect(xPos, yPos, width, height);
	}

	exports.moveProjectiles = function() {
		if (projList.length > 0) {
			for (var i = 0; i < projList.length; i++) {
				var proj = projList[i];
        var xPos = proj.xPos;
        //console.log(proj.left == false);
				if (proj.left && xPos > (0 - 100)) {
					proj.xPos = (xPos - 20);
          drawHitbox(proj);
				} else if (!proj.right && xPos < (SCREEN_WIDTH + 20)) {
					proj.xPos = (xPos + 20);
          drawHitbox(proj);
				} else {
					//console.log(proj + "is outside the canvas bounds")
				}
			}
		}
	}

  return exports;
}());