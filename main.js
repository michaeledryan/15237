function init() {

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.font = "60px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Hello World!", 200, 200);

  ctx.font = "60px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "blue";
  ctx.fillText("Hello World!", 200, 200);

  var text = "Go Steelers!";
  ctx.font = "bold italic 30px sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "green";
  ctx.strokeText(text, 400, 100);

  var width = ctx.measureText(text).width;
  ctx.strokeStyle = "orange";
  ctx.strokeRect(400-width,100-30/2,width,30);

}