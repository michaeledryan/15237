var canvas, ctx, adding;
var listings = [];
var pinsOnMap = [];
var image = new Image();
var earliestDate = new Date();

const SECPERDAY = 3600 * 24;
const SECPERWEEK = SECPERDAY * 7;
const SECPERMONTH = SECPERDAY * 31; 

const dateEnum = {
  DAY : 0,
  WEEK : 1,
  MONTH: 2,
  ALL : 3
}

const TypeEnum = {
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
    //ctx.drawImage(image, 0, 0,569,492);
    //ctx.drawImage(image, 0, 0, 2366, 2049, 0, 0, 2366/3, 2049/3)
  }
  canvas.setAttribute('tabindex','0');
  canvas.focus();
  canvas.addEventListener("mousedown", getPosition, false);
  canvas.addEventListener("mousemove", hoverMouse, false)

  // Get listing data
  NODECOM.get();

  $(':checkbox').change(refreshDOM);
  $("input[name='filterTime']").change(refreshDOM)
  $("#filterDate").val(new Date().toISOString().slice(0,10));
  $("#date").val(new Date().toISOString().slice(0,10));

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
 

 
 /*
  Checks to see whether or not a given event is within the current
  range specified by the user.
  */
function filterByDate(date) {
  var dateFilter = $("input[name='filterTime']:checked").val();
  var selectedDate = new Date($("#filterDate").val() + " 00:00");

  switch(parseInt(dateFilter)) {
    case dateEnum.DAY:
      return ((date - selectedDate >= 0) && 
              (date - selectedDate <= SECPERDAY));
      break;
    case dateEnum.WEEK:
      return ((date - selectedDate >= 0) && 
              (date - selectedDate <= SECPERWEEK));
      break;
    case dateEnum.MONTH:
      return ((date - selectedDate >= 0) && 
              (date - selectedDate <= SECPERMONTH));
      break;
    case dateEnum.ALL:
      return true;
      break;
  }

}

 
 

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

  pinsOnMap = [];

  redraw();

  for (var prop in listings) { 
    if (filterByDate(new Date(prop))) {
      for (var event in listings[prop]) { 

        var item = listings[prop][event];

        if (($.inArray(parseInt(item.type), filterTypes)) > -1) {

          pinsOnMap.push(item);
          drawPin(item.x, item.y, false);
          var startDate = new Date(item.startDate);
          var month = startDate.toDateString().slice(4, 7);
          var day = startDate.toDateString().slice(0, 3);
          var date = startDate.getDate();
          var year = startDate.getYear();
          var li = $("<li>");
          var leftCol = $("<div>").addClass('left');
          var rightCol = $("<div>").addClass('right');
          
          var calendar = $('<div>').addClass('calendar');
          
          var calmonth = $('<div>').addClass('month');
          var caldate = $('<div>').addClass('date');
          calmonth.html(month);
          caldate.html(date);
          calendar.append(calmonth,caldate);
        
          var labelTime = $('<p>').html("Time");
          var labelHost = $('<p>').html("Host");
          labelTime.addClass('captionHead');
          labelHost.addClass('captionHead')
          var time = $('<p>').html(dateToTime(item.startDate));
          time.addClass('caption');
          var host = $('<p>').html(item.host);
          host.addClass('caption');
          leftCol.append(calendar,labelTime,time,labelHost,host);
          var endDate = $('<p>').html(dateToString(item.endDate));

          var name = $('<h3>').html(item.eventName);
          var desc = $('<p>').html(item.desc);
          var type = $('<p>').html(item.type);
          
          rightCol.append(name,desc);
          li.append(leftCol,rightCol);
          container.append(li);
        } 
   
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


function drawPin(x, y, hovering){
 	ctx.beginPath();
 	ctx.arc(x,y,5,0,2 * Math.PI,false);	
  ctx.lineWidth = 15;
  ctx.strokeStyle = hovering ? 'lightblue' : 'cadetblue';
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
    }

  return false;
}

function prepareToAdd() {
  adding = true;  
}

function getPosition(event) {
  var x = event.pageX;
  var y = event.pageY;

  x -= canvas.offsetLeft;
  y -= (canvas.offsetTop + 1);

  if (adding) {

    addMyEvent(x,y);

    adding = false;
  }
  else hoverMouse(event);
}

function distance(x1, x2, y1, y2) {
  var x = x1 - x2;
  var y = y1 - y2;
  return Math.sqrt(x*x + y*y);
}


function hoverMouse(event) {
  var x = event.pageX;
  var y = event.pageY;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  var closeEvents = [];
  for (var i = 0; i < pinsOnMap.length; i++) {
    //console.log(distance(pinsOnMap[i].x, x, pinsOnMap[i].y, y));
    if (distance(pinsOnMap[i].x, x, 
        pinsOnMap[i].y, y) < 15)
      closeEvents.push(pinsOnMap[i]);
    else
      drawPin(pinsOnMap[i].x, pinsOnMap[i].y, false);
  }

  for (var i in closeEvents) {
    drawPin(closeEvents[i].x, closeEvents[i].y, true);
  }

  closeEvents = [];

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