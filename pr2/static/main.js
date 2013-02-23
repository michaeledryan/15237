var canvas, ctx, adding;
var listings = [];
var image = new Image();

const TYPEPLACEHOLDER = 0;

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
/* 
  So listings on both sides is a mapping of dates to arrays of events
  that happen on those dates.
  So we need to pick specific dates, and iterate through them
  in whatever way we want. Then we can populate the DOM with items
  in the list. I assume adding stuff to canvas can be done in a similar
  way. We probably also need more complicated event listening...

  Let's have a flag set so that if you aren't in "Add Listing" mode,
  when you mouse over a pin you get the info. If you ARE in add listing mode,
  Maybe the pins disappear and then you can add your own and see clearly?

  I will try to work on this as soon as I can. If I can get basic listing
  traversal down, populating the dom shouldn't be that bad.

  Then we get to work on filtering, which is a whole other load of fun!

  Also, how is that slider going to work?
 */
function refreshDOM(){
	if (listings === undefined){
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
  console.log("drawing!");
  redraw();
 	ctx.beginPath();
 	ctx.arc(x,y,5,0,2 * Math.PI,false);	
  ctx.lineWidth = 15;
  ctx.strokeStyle = 'cadetblue';
  ctx.stroke();
}


function addMyEvent(x,y) {
    var name = $("#event").val();
    var startDate = new Date($("#date").val() + " " + $("#timeStart").val());
    var endDate = new Date($("#date").val() + " " + $("#timeEnd").val());
    var host = $("#host").val();
    var desc = $("#description").val();
    var type = $("input[name='type']:checked").val();

    console.log("name: " + name);
    console.log("time: " + startDate);
    console.log("host: " + host);
    console.log("Desc: " + desc);
    console.log("Type: " + type);

    if (name !== "" && startDate !== ""
     && endDate !== "" && host !== "") {
      console.log("success!")
      NODECOM.add(x, y, name, startDate, endDate, host, desc, TYPEPLACEHOLDER);
      listings.push(new Listing(x, y, name, startDate, endDate, 
                    host, desc, type));
	    drawPin(x,y);
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
    this.eventName = name;
    this.dayDate = nearestDay(start);
    this.startDate = start;
    this.endDate = end;
    this.host = host;
    this.desc = desc;
    this.type = type;
  }


   // Rounds a Date to the nearest day
  function nearestDay(exactDate) {
      return new Date(exactDate.getFullYear(), 
                      exactDate.getMonth(), 
                      exactDate.getDate());
  }