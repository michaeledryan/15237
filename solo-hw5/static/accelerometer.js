/*
  Bind listeners and set event loop, then place circles.
 */
$(document).ready(function() {

window.rad = 75;
window.score = 0;
window.horz = 0;
window.vert = 0;

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function () {
        checkOrientation(event.gamma, event.beta);
    }, true);
}

setInterval(doGame, 10);
setInterval(doScore, 1000);

$("#c1").css({ top : getRandomInt(0, window.innerHeight - 2 * rad),
                left : getRandomInt(0, window.innerWidth - 2 * rad)})
$("#c2").css({ top : getRandomInt(0, window.innerHeight - 2 * rad),
                left : getRandomInt(0, window.innerWidth - 2 * rad)})

});


/*
  Sets globals that signify the device's orientation.
 */
function checkOrientation(gamma, beta) {

  // Tilted horizontally
  if (gamma < -3) {
    window.horz = -1;
  } else if (gamma > 3) {
    window.horz = 1;
  } else {
    window.horz = -0;
  }

  // Tilted vertically
  if (beta > 35) {
    window.vert = 1;
  } else if (beta < 25) {
    window.vert = -1;
  } else {
    window.vert = 0;
  }

}

/*
  Updates the score once per second.
 */
function doScore() {
  score = (score - 1 < 0) ? 0 : score -1;
  $("h1").html("Score: " + score);
}

/*
  Performs game logic. Checks for collisions to updates the score and respawn
  circles, then moves the red circle according to the device orientation.
 */
function doGame() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var red = $("#c1");
  var blue = $("#c2")
  var redX = red.offset().left + rad;
  var redY = red.offset().top + rad;
  var blueX = blue.offset().left + rad;
  var blueY = blue.offset().top + rad;
  
  // Check for collision
  if (distance(redX, blueX, redY, blueY) < (2 * rad)) {
    
    blue.css({ top : getRandomInt(0, height - 2 * rad),
                left : getRandomInt(0, width - 2 * rad)})

    red.css({ top : getRandomInt(0, height - 2 * rad),
                left : getRandomInt(0, width - 2 * rad)})

    score += 10;
    $("h1").html("Score: " + score);
  }

  // Move circles.
  if (horz < 0) {
    red.css({left : (red.offset().left - 15 < 0) ? 0 : red.offset().left - 15});
  }
  if (horz > 0) {
    red.css({left : ((red.offset().left + 15 + 2 * rad) > width) ? 
                    (width - 2 * rad) : red.offset().left + 15 });
  }
  if (vert > 0) {
    red.css({top : ((red.offset().top + 15 + 2 * rad) > height) ?
                    (height - 2 * rad) : red.offset().top + 15});
  }
  if (vert < 0) {
    red.css({top : ((red.offset().top - 15) < 0) ? 0 : red.offset().top - 15});
  }
}

/*
  Pythagorean Theorem.
 */
function distance(x1, x2, y1, y2) {
  return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));

}

/*
 From https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}