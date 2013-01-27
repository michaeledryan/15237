var PROJECTILE = (function() {
	var exports = {};
	var xPos;
	var yPos;
	var width = 10;
	var height = 10;
	var projList = [];
	var image = new Image();
	const busterX = 0, busterY = 29;
	const chargedX = 0, chargedY = 0;
	const chargedFrameX = 36, chargedFrameY = 22;
	const busterFrameX = 8, busterFrameY = 6;
	image.src = "sprites/buster1.png";

	// this fn takes x,y coordiantes for initial positioning and 'left' bool for direction
	function Projectile(xPos, yPos, left, charged) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.width = width;
		this.height = height;
		this.left = left;
		this.charged = charged;
	}


	// This fn is used to connect the projectile to the shooter
	exports.makeProjectile = function(xPos, yPos, left, charged) {
		proj = new Projectile(xPos, yPos, left, charged);
		drawShot(proj);
		projList.push(proj);
	}

	function drawShot (proj) {
		xPos = proj.xPos;
		yPos = proj.yPos;
		if (proj.charged)
			if (proj.left)
				ctx.drawImage(image, chargedX, chargedY + chargedFrameY, 
					chargedFrameX, chargedFrameY, xPos, yPos-chargedFrameY/2, 
					chargedFrameX, chargedFrameY);
			else
				ctx.drawImage(image, chargedX, chargedY, 
					chargedFrameX, chargedFrameY, xPos, yPos-chargedFrameY/2, 
					chargedFrameX, chargedFrameY);
		else
			ctx.drawImage(image, busterX, busterY, busterFrameX, busterFrameY, xPos, yPos, busterFrameX, busterFrameY);

	}

	exports.moveProjectiles = function() {
		if (projList.length > 0) {
			for (var i = 0; i < projList.length; i++) {
				var proj = projList[i];
        var xPos = proj.xPos;
        //console.log(proj.left == false);
				if (proj.left && xPos > (0 - 100)) {
					proj.xPos = (xPos - 20);
          drawShot(proj);
				} else if (!proj.right && xPos < (SCREEN_WIDTH + 20)) {
					proj.xPos = (xPos + 20);
          drawShot(proj);
				} else {
					//console.log(proj + "is outside the canvas bounds")
				}
			}
		}
	}

  return exports;
}());