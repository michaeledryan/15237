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

//TO DO
function refreshDOM(){
	if (listings===undefined){
		return;
	}
	var container = $('ul');
	container.html("");
	
	for (var i = 0; i < listings.length; i++) {
		var li = $('li');
		var event = listings[i];
		//li.append(name);
		container.append(li);
	}
}




function redraw() {
  canvas.width = canvas.width;
  ctx.drawImage(image, 0, 0);
}

function drawPin(x,y){
 	ctx.beginPath();
 	ctx.arc(x,y,5,0,2 * Math.PI,false);	
 	
}

function addMyEvent(x,y) {
    var eventName = $("#event").val();
    var startTime = $("#timeStart").val();
    var endTime = $("#timeEnd").val();

    var host = $("#host").val();
    var desc = $("#description").val();
    
    var type = $("input[name='type']:checked").val();

    console.log("name" + eventName);
    console.log("time" + startTime);
    console.log("host" + host);
    console.log("Desc" + desc);
    console.log("Type" + type);

    if (x !== "" && y !== "" && eventName !== "" && 
        startTime !== "" && host !== ""){
	  
	  NODECOM.add(x, y, eventName, startTime,endTime, host, desc, type);
	  drawPin(x,y);
      listings.push( 
        {
          x : x, 
          y : y, 
          eventName : eventName, 
          startTime : startTime,
          endTime : endTime, 
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
    this.startTime = start;
    this.endDate = end;
    this.host = host;
    this.desc = desc;
    this.type = type;
  }