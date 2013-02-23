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






function redraw() {
  canvas.width = canvas.width;
  ctx.drawImage(image, 0, 0);
}

function addMyEvent(x,y) {
    var name = $("#event").val();
    var startDate = new Date($("#date").val() + " " + $("#timeStart").val());
    var endDate = new Date($("#date").val() + " " + $("#timeEnd").val());
    var host = $("#host").val();
    var desc = $("#description").val();

    console.log("name" + name);
    console.log("time" + startDate);
    console.log("host" + host);
    console.log("Desc" + desc);

    if (name !== "" && startDate !== "" && endDate !== "" && host !== "") {
      NODECOM.add(x, y, name, startDate, endDate, host, desc, TYPEPLACEHOLDER);
      listings.push(new Listing(x, y, name, startDate, endDate, 
                    host, desc, TYPEPLACEHOLDER));
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
  }

   // Rounds a Date to the nearest day
  function nearestDay(exactDate) {
      return new Date(exactDate.getFullYear(), 
                      exactDate.getMonth(), 
                      exactDate.getDate());
  }
