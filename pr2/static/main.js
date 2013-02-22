var canvas, ctx, adding;
var listings = [];
var image = new Image();

var TypeEnum = {
      STUDY : 0,
      FOOD : 1,
      SHOW : 2,
      TALK : 3,
      MISC : 4,
  }

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


  // Get listing data
  NODECOM.get();

});






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
      NODECOM.add(x, y, eventName, eventTime, host, desc, "");
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

function getPosition(event) {
  var x = event.x;
  var y = event.y;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  if (adding) {

    addMyEvent(x,y);

    adding = false;
  }
}

function Listing(x, y, name, start, end, host, desc, type) {
    this.x = x;
    this.y = y;
    this.eventName = eventName;
    this.dayDate = nearestDay(start);
    this.startDate = start;
    this.endDate = end;
    this.host = host;
    this.desc = desc;
  }
