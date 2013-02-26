//====================================//
//Variables and constants             //
//====================================//

var canvas, ctx, adding;
var listings = [];
var pinsOnMap = [];
var sideListings = [];
var itemToBeAdded;

// Used to calculate time ranges
const SECPERDAY = 3600 * 24;
const SECPERWEEK = SECPERDAY * 7;
const SECPERMONTH = SECPERDAY * 31; 
const CANWIDTH = 568, CANHEIGHT = 492;

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
const TypeArray = ["study", "food", "show", "talk", "misc"]

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
  canvas.addEventListener("mousedown", clickMouse, false);
  canvas.addEventListener("mousemove", hoverMouse, false)

  // Get listing datarefre
  NODECOM.get();

  // Set up DOM objects
  $(':checkbox').change(DOMUTILS.refreshDOM);
  $("input[name='filterTime']").change(DOMUTILS.refreshDOM)
  $("#filterDate").val(localDateString);
  $("#date").val(localDateString);

});

 
/*
  Draws a pin on the map at the given coordinates.
 */
function drawPin(x, y, type, hovering){
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, 2 * Math.PI,false); 
  ctx.fillStyle = hovering ? 'white' : 'lightgrey';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = getPinColor(type, hovering);
  ctx.stroke();
}

/* 
  Announces that we're attempting to add to the map.
  Pops up the alert by the map and switches the cursor
  on the canvas.
 */
function prepareToAdd() {
  var name = $("#event").val();
  var startDate = new Date($("#date").val() + " " + $("#timeStart").val());
  var endDate = new Date($("#date").val() + " " + $("#timeEnd").val());
  var host = $("#host").val();
  var desc = $("#description").val();
  var type = $("input[name='type']:checked").val();

  if (adding) {
    adding = false;
    $("#submitButton").val("Add to map!");
    $(".alert").css({"visibility": "hidden"});
    $("canvas").toggleClass('switchCursor');
    return;
  }

  if ((name !== "") && (startDate !== "")
      && (endDate !== "") && (host !== "")
      && (desc !== "")) {
    adding = true;  
    $("canvas").toggleClass('switchCursor');
    $("#submitButton").val("Wait! I made a typo.");
    $(".alert").css({"visibility": "visible"});
    $(".error").css({"display": "none"});
  }

  else {
    $(".error").css({"display": "inline"});
  }

}

/*
  Adds an event to the server-side store, then refreshes the current
  client's listings.
 */
function addMyEvent(x,y) {
  var name = $("#event").val();
  var startDate = new Date($("#date").val() + " " + $("#timeStart").val());
  var endDate = new Date($("#date").val() + " " + $("#timeEnd").val());
  var host = $("#host").val();
  var desc = $("#description").val();
  var type = $("input[name='type']:checked").val();

  $("canvas").toggleClass('switchCursor');


  if ((name !== "") && (startDate !== "")
      && (endDate !== "") && (host !== "")
      && (desc !== "")) {
    $("#submitButton").val("Add to map!");
    $(".alert").css({"visibility": "hidden"});
    NODECOM.add(new Listing(x, y, name, startDate, endDate, 
                 host, desc, type));
    NODECOM.get();
  }

  else
    $(".error").css({"display": "inline"});}

/*
  Listener for a mouseDown on the canvas.
  If we're currently adding an event, adds it to the server-side
  datastore. Otherwise, calls selectListings.
 */
function clickMouse(event) {
  var x = event.pageX;
  var y = event.pageY;

  x -= canvas.offsetLeft;
  y -= (canvas.offsetTop + 1);

  if (adding) {
    addMyEvent(x,y);
    adding = false;
  }

  else 
    selectListings(x, y);
}

/*
  Called when the user clicks on the map but is not adding a new 
  event. Populates the right-hand sidebar with the selected events. 
  Shows multiple events if you click on overlapping pins.
 */
function selectListings(x, y) {
  var closeEvents = [];
  var container = $('ul.sideListings');
  sideListings = [];

  // Iterate through the pins on the map, selecting close ones.
  for (var i = 0; i < pinsOnMap.length; i++) {
    
    if (distance(pinsOnMap[i].x, x, 
        pinsOnMap[i].y, y) < 9)
      closeEvents.push(pinsOnMap[i]);
  }

  container.html("");

  // Add nearby events to the listng on the side.
  for (var i in closeEvents) {
    DOMUTILS.populateSideList(closeEvents[i], container);
    sideListings.push(closeEvents[i]);
  }

  if (sideListings.length === 0)
    container.html("None.");


}

/*
  Listener for mouseMove on the canvas. Redraws close by icons 
  in a different color
 */
function hoverMouse(event) {
  var x = event.pageX;
  var y = event.pageY;
  var closeEvents = [];
  var item;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  canvas.width = canvas.width;

  // Iterate through the pins on the map, selecting close ones.
  for (var i = 0; i < pinsOnMap.length; i++) {
    item = pinsOnMap[i];
    if (distance(item.x, x, 
        item.y, y) < 9)
      closeEvents.push(item);
    else
      drawPin(item.x, item.y, parseInt(item.type), false);
  }

  // Draw nearby pins differently.
  for (var i in closeEvents) {
    item = closeEvents[i];
    drawPin(item.x, item.y, parseInt(item.type), true);
    ctx.font = "10pt Arial";
    drawTitleRect(item);
  }

}


//====================================//
//Begin helper functions              //
//====================================//

/*
  Returns the min of two numbers.
 */
function min(x, y) {
  return (x > y) ? y : x;
}

/*
  Returns the max of two numbers.
 */
function max(x, y) {
  return (x < y) ? y : x;
}

function drawTitleRect(item) {
    var width = ctx.measureText(item.eventName).width + 10;
    var startingX = max(2, min(item.x, CANWIDTH - width - 2));
    var startingY = max(min(item.y - 15, CANHEIGHT - 17), 2);
    ctx.beginPath();
    ctx.rect( startingX, startingY, width, 20);
    ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'blue';
    ctx.fillText("  " + item.eventName, startingX, startingY + 15);

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


/*
 Rounds a Date to the nearest day
 */
function nearestDay(exactDate) {
    return new Date(exactDate.getFullYear(), 
                    exactDate.getMonth(), 
                    exactDate.getDate());
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
 Gets a date string in a hand-rolled format from a vanilla JS 
 date string.
 */
function dateToString(date) {
  var myDate = new Date(date);
  return (myDate.toLocaleTimeString().split(":")[0]) + ":" + 
          (myDate.getMinutes() < 10 ? 0 : "") +
          myDate.getMinutes() + " " +
        ((myDate.getHours() > 12) ? "PM" : "AM");
}

/*
  Helper function. Gets a well-formatted time string
  from a given Date object.
*/
function dateToTime(date) {
  var myDate = new Date(date);
  return (myDate.toLocaleTimeString().split(":")[0]) + ":" + 
          (myDate.getMinutes() < 10 ? 0 : "") +
          myDate.getMinutes() + " " +
        ((myDate.getHours() > 12) ? "PM" : "AM");
}

/*
  Given an event type and a boolean, returns specific pin colors.
 */
function getPinColor(type, hovering) {
  switch(type) {
    case 0:
      return hovering ? "rgb(153, 146, 115)" : "rgb(153, 146, 122)";
      break;
    case 1:
      return hovering ? "rgb(204, 175, 51)" : "rgb(204, 172, 61)";
      break;
    case 2:
      return hovering ? "rgb(255, 190, 89)" : "rgb(255, 189, 102)";
      break;
    case 3:
      return hovering ? "rgb(153, 236, 255)" : "rgb(166, 246, 255)";
      break;
    case 4:
      return hovering ? "rgb(51, 204, 191)" : "rgb(61, 204, 178)";
      break;
  }
}

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