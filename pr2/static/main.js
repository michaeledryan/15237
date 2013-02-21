var canvas, ctx, adding;
var listings = [];
var image = new Image();

$(document).ready(function() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  image.src = "mapBasic.png";
  image.onload = draw;

  function draw(){               
    ctx.drawImage(image, 0, 0);
  }
  canvas.setAttribute('tabindex','0');
  canvas.focus();
  canvas.addEventListener("mousedown", getPosition, false);

});


function onMouseDown(event){
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;
		console.log("X"+x+"Y"+y);
		
}



function redraw() {
  canvas.width = canvas.width;
  ctx.drawImage(image, 0, 0);
}

function addMyEvent(x,y) {
    var eventName = $("#event").val();
    var eventTime = $("#time").val();
    var host = $("#host").val();
    var desc = $("#description").val();

    console.log("name" + eventName);
    console.log("time" + eventTime);
    console.log("host" + host);
    console.log("Desc" + desc);

    if (x !== "" && y !== "" && eventName !== "" && 
        eventTime !== "" && host !== ""){
      NODECOM.add(x, y, eventTime, eventName, host, desc, "");
      listings.push( 
        {
          x : x, 
          y : y, 
          eventName : eventName, 
          time : eventTime, 
          host : host,
          desc : desc
        }
      );
    }
    return false;
}

function prepareToAdd() {
  adding = true;  
}

function getPosition(event)
{
  var x = event.x;
  var y = event.y;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  if (adding) {

    addMyEvent(x,y);

    adding = false;
  }
}