var canvas, ctx, adding;
var listings = [];
var image = new Image();
var earliestDate = new Date();
var testDate;

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
  var filterTypes = [];
	container.html("");
  $(":checkbox").each(function() { 
      if ($(this)[0].checked)
        filterTypes.push(TypeEnum[$(this).val()]);
  });

  console.log(filterTypes);

  for (var prop in listings) { 
    for (var event in listings[prop]) { 
      var item = listings[prop][event];

      if (($.inArray(parseInt(item.type), filterTypes)) > -1) {
        var startDate = new Date(item.startDate);
        var month = startDate.toDateString().slice(4, 7);
        var day = startDate.toDateString().slice(0, 3);
        var date = startDate.getDate();
        var year = startDate.getYear();
        var li = $("<li>");
    		var name = $('<h4>').html(item.eventName);
    		var dateEvent = $('<h5>').html(dateToString(item.dayDate));
    		var startDate = $('<p>').html(dateToTime(item.startDate));
    		var endDate = $('<p>').html(dateToString(item.endDate));
    		var host = $('<p>').html(item.host);
    		var desc = $('<p>').html(item.desc);
        var type = $('<p>').html(item.type);

    		li.append(name,dateEvent,startDate,endDate,host,desc);
    		container.append(li);
      }

    }
  }	
}


function dateToString(date) {
  var myDate = new Date(date);
  return  myDate.toDateString()
  //return myDate.getDay() + ", " + myDate.getMonth() + 
   //     " " + myDate.getDate() + ", " + myDate.getFullYear();
}

function dateToTime(date) {
  var myDate = new Date(date);
  return (myDate.getHours() % 13) + ":" + 
          (myDate.getMinutes() < 10 ? 0 : "") +
          myDate.getMinutes() + " " +
        ((myDate.getHours() > 12) ? "PM" : "AM");
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

    if (startDate.getYear() < earliestDate && startDate.getMonth() < earliestDate.getMonth() && startDate.getDay()< earliestDate.getDay()){
	    earliestDate = startDate;
    }
    
    console.log("name: " + name);
    console.log("time: " + startDate);
    console.log("host: " + host);
    console.log("Desc: " + desc);
    console.log("Type: " + type);

    if (name !== "" && startDate !== ""
     && endDate !== "" && host !== "") {
      console.log("success!")
      NODECOM.add(x, y, name, startDate, endDate, host, desc, type);
      //listings.push(new Listing(x, y, name, startDate, endDate, 
       //             host, desc, type));
      NODECOM.get();
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
    console.log(this.dayDate);
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