/*
  Get canvas, set event listeners.
 */
$(document).ready(function() {
  window.canvas = document.getElementById('canvas');
  window.ctx = canvas.getContext('2d');
  window.touches = [];
  window.timer = setInterval(doDraw, 10);

  // Canvas fills screen
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  // For all these listeners, we just want to update the currently
  // existing touch events and pass things off.
  canvas.addEventListener('touchend', function() {
    window.touches = event.touches;
  });

  canvas.addEventListener('touchmove', function(event) {
    event.preventDefault();
    window.touches = event.touches;
  });

  canvas.addEventListener('touchstart', function(event) {
    window.touches = event.touches;
  });

});

/*
  Draw the current touches as purple circles.
 */
function doDraw() {
  // clear canvas.\
  canvas.width = canvas.width;
  
  // use global touches var
  for (var i = 0; i < window.touches.length; i++) {
    touch = window.touches[i];
    x = touch.pageX;
    y = touch.pageY;

    ctx.beginPath();
    ctx.arc(x, y, 60, 0, 2*Math.PI, true);

    ctx.fillStyle = "darkmagenta";
    ctx.fill();

    ctx.lineWidth = 2.0;
    ctx.strokeStyle = "fuschia";
    ctx.stroke();
  };
}

