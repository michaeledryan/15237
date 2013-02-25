var canvas, ctx, adding;
var listings = [];
var pinsOnMap = [];
var image = new Image();
var earliestDate = new Date();

// Used to calculate time ranges
const SECPERDAY = 3600 * 24;
const SECPERWEEK = SECPERDAY * 7;
const SECPERMONTH = SECPERDAY * 31; 

// For date radio buttons
const dateEnum = {
  DAY : 0,
  WEEK : 1,
  MONTH: 2,
  ALL : 3
}

// For type radio buttons
const TypeEnum = {
      STUDY : 0,
      FOOD : 1,
      SHOW : 2,
      TALK : 3,
      MISC : 4,
  }

// Invers of TypeEnum
const TypeArray = ["Study", "Food", "Show", "Talk", "Misc."]

/*
  Sets up the canvas with proper listeners and
  initializes DOM elements with default data and listeners.
 */
$(document).ready(function() {

  var localDate = new Date().toLocaleDateString();
  var dateStrArray = localDate.split("/");
  var localDateString = dateStrArray[2] + "-"  + 
                        ((dateStrArray[0].length === 1) ? "0" : "") 
                        + dateStrArray[0] + "-" + 
                        ((dateStrArray[1].length === 1) ? "0" : "") +
                        dateStrArray[1];


  // Canvas setup
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  canvas.setAttribute('tabindex','0');
  canvas.focus();
  canvas.addEventListener("mousedown", getPosition, false);
  canvas.addEventListener("mousemove", hoverMouse, false)

  // Get listing data
  NODECOM.get();

  // Set up DOM objects
  $(':checkbox').change(refreshDOM);
  $("input[name='filterTime']").change(refreshDOM)
  $("#filterDate").val(localDateString);
  $("#date").val(localDateString);

});


 
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

/*
  Refreshes the DOM. Does several things:
  Checks to see what events the current user wants to see.
  Clears the canvas and empties the event list at the bottom of the page.
  Iterates through listings, drawing pins on the map populating the event
  list with events that the user has not filtered out.
 */
function refreshDOM(){
	if (listings === undefined){
		return;
	}
  var filterTypes = [];
  $(":checkbox").each(function() { 
      if ($(this)[0].checked)
        filterTypes.push(TypeEnum[$(this).val()]);
  });
  
  pinsOnMap = [];

  canvas.width = canvas.width;

	var container = $('ul.listings');
	container.html("");

  for (var prop in listings) { 
    if (filterByDate(new Date(prop))) {
      for (var event in listings[prop]) {

        var item = listings[prop][event];

        if (($.inArray(parseInt(item.type), filterTypes)) > -1) {

          pinsOnMap.push(item);
          
          drawPin(item.x, item.y, false);

          populateList(item, container);
        } 
      } 
    }
  } 
}


/*
  Given an item and container, adds a new listing to the container.
 */
function populateList(item, container) {
  // Get relevate attributes from the item
  var startDate = new Date(item.startDate);
  var month = startDate.toDateString().slice(4, 7);
  var date = startDate.getDate();
  var li = $("<li>");
  var leftCol = $("<div>").addClass('left');
  var rightCol = $("<div>").addClass('right');
  var calendar = $('<div>').addClass('calendar');
  var calmonth = $('<div>').addClass('month');
  var caldate = $('<div>').addClass('date');
  var labelTime = $('<p>').html("Time");
  var labelHost = $('<p>').html("Host");
  var time = $('<p>').html(dateToTime(item.startDate) + 
              " - " + dateToTime(item.endDate));
  var host = $('<p>').html(item.host);
  var name = $('<h3>').html(item.eventName);
  var desc = $('<p>').html(item.desc);

  //Should we show the type of event?
  var type = $('<p>').html(TypeArray[item.type]);

  calmonth.html(month);
  caldate.html(date);
  calendar.append(calmonth,caldate);
  labelTime.addClass('captionHead');
  labelHost.addClass('captionHead')
  time.addClass('caption');
  host.addClass('caption');
  leftCol.append(calendar,labelTime,time,labelHost,host);
  
  rightCol.append(name,desc,type);
  li.append(leftCol,rightCol);
  container.append(li);
}

/*
  Helper function. Gets a well-formatted time string
  from a given Date object.
*/
function dateToTime(date) {
  var myDate = new Date(date);
  return (myDate.getHours() % 13) + ":" + 
          (myDate.getMinutes() < 10 ? 0 : "") +
          myDate.getMinutes() + " " +
        ((myDate.getHours() > 12) ? "PM" : "AM");
}

/*
  Draws a pin on the map at the given coordinates.
 */
function drawPin(x, y, hovering){
 	ctx.beginPath();
 	ctx.arc(x,y, 3, 0,2 * Math.PI,false);	
  ctx.fillStyle = hovering ? 'white' : 'lightgrey';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = hovering ? 'tomato' : 'crimson';
  ctx.stroke();
}

function addMyEvent(x,y) {
  var name = $("#event").val();
  var startDate = new Date($("#date").val() + " " + $("#timeStart").val());
  var endDate = new Date($("#date").val() + " " + $("#timeEnd").val());
  var host = $("#host").val();
  var desc = $("#description").val();
  var type = $("input[name='type']:checked").val();

  $("canvas").toggleClass('switchCursor');
  window.scrollBy( 1, 1 );
  window.scrollBy( -1, -1 );

  if (startDate.getYear() < earliestDate && 
      startDate.getMonth() < earliestDate.getMonth() && 
      startDate.getDay()< earliestDate.getDay()){
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
    NODECOM.add(new Listing(x, y, name, startDate, endDate, 
                 host, desc, type));
    NODECOM.get();
  }

  return false;
}

function prepareToAdd() {
  adding = true;  
  $("canvas").toggleClass('switchCursor');
  $(".alert").css({"visibility": "visible"});
}

function getPosition(event) {
  var x = event.pageX;
  var y = event.pageY;

  console.log("Before subtracting offset x: " + x);
  console.log("Before subtracting offset y: " + y);


  x -= canvas.offsetLeft;
  y -= (canvas.offsetTop + 1);

  console.log("Afer subtracting offset x: " + x);
  console.log("Afer subtracting offset y: " + y);


  if (adding) {

    addMyEvent(x,y);

    adding = false;
      $(".alert").css({"visibility": "hidden"});

  }

  else 
    clickListings(x, y);
}

function clickListings(x, y) {
  var closeEvents = [];

  // Iterate through the pins on the map, selecting close ones.
  for (var i = 0; i < pinsOnMap.length; i++) {
    
    if (distance(pinsOnMap[i].x, x, 
        pinsOnMap[i].y, y) < 9)
      closeEvents.push(pinsOnMap[i]);
  }

  var container = $('ul.sideListings');
  container.html("");

  // Add nearby events to the listng on the side.
  for (var i in closeEvents) {
    populateList(closeEvents[i], container);
  }

  //closeEvents = [];

}

/*
  Helper function. Pythagorean Theorem.
 */
function distance(x1, x2, y1, y2) {
  var x = x1 - x2;
  var y = y1 - y2;
  return Math.sqrt(x*x + y*y);
}

/*
  Listener for mouseMove on the canvas. Redraws close by icons 
  in a different color
 */
function hoverMouse(event) {
  var x = event.pageX;
  var y = event.pageY;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  var closeEvents = [];

  // Iterate through the pins on the map, selecting close ones.
  for (var i = 0; i < pinsOnMap.length; i++) {
    if (distance(pinsOnMap[i].x, x, 
        pinsOnMap[i].y, y) < 9)
      closeEvents.push(pinsOnMap[i]);
    else
      drawPin(pinsOnMap[i].x, pinsOnMap[i].y, false);
  }

  // Draw nearby pins differently.
  for (var i in closeEvents) {
    drawPin(closeEvents[i].x, closeEvents[i].y, true);
  }

  //closeEvents = [];
}


/*
  Constructor for a Listing object, which stores information
  about a given event.
 */
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