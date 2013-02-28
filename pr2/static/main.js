//====================================//
//Variables and constants             //
//====================================//

var canvas, ctx, adding;
var listings = [];
var pinsOnMap = [];
var sideListings = [];
var itemToBeAdded;

// Used to calculate time ranges
const SECPERDAY = 3600 * 24 * 1000;
const SECPERWEEK = SECPERDAY * 7;
const SECPERMONTH = SECPERDAY * 31; 
const CANWIDTH = 800, CANHEIGHT = 620;

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
  ctx.font = "10pt Brandon Grotesque";
  canvas.setAttribute('tabindex','0');
  canvas.focus();
  canvas.addEventListener("mousedown", clickMouse, false);
  canvas.addEventListener("mousemove", hoverMouse, false)

  // Get listing datarefre
  NODECOM.get();

  // Set up DOM elements
  $(':checkbox').change(DOMUTILS.refreshDOM);
  $("input[name='filterTime']").change(DOMUTILS.refreshDOM)
  $("#filterDate").change(DOMUTILS.refreshDOM);
  $("#filterDate").val(localDateString);
  $("#date").val(localDateString);
  $("#addNew").click(toggleExpandedAdd);

  $(".chevronExpand").click(toggleExpandedAdd);

  //$("#event-listing").click(prepareToAdd);


  // Make type labels clickable.
  $(".study").click(function() {
    flipCheckBox("STUDY");
  });
  $(".food").click(function() {
    flipCheckBox("FOOD");
  });
  $(".show").click(function() {
    flipCheckBox("SHOW");
  });
  $(".talk").click(function() {
    flipCheckBox("TALK");
  });
  $(".misc").click(function() {
    flipCheckBox("MISC");
  });


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
  var location = $("#location").val();
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
      && (desc !== "") && (location !== "")
      && (type !== undefined)) {
    adding = true;  
    $("canvas").toggleClass('switchCursor');
    $("#submitButton").val("Cancel.");
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
  var location = $("#location").val();
  var type = $("input[name='type']:checked").val();

  $("canvas").toggleClass('switchCursor');

  if ((name !== "") && (startDate !== "")
      && (endDate !== "") && (host !== "")
      && (desc !== "") && (location !== "")
      && (type !== undefined)) {

    $("#submitButton").val("Add to map!");
    $(":input[value="+ TypeArray[parseInt(type)].toUpperCase() + "]")
          .prop("checked", true);
    NODECOM.add(new Listing(x, y, name, startDate, endDate, 
                 host, desc, location, type));
    $(".alert").html("Your event has been added!");

    setTimeout(function() {
      $(".alert").html("Click on the map to set a pin.");
      $(".alert").css({"visibility": "hidden"});
    }, 5000)

    $("#event").val("");
    $("#host").val("");
    $("#description").val(""); 
    $("#location").val("");
    $("input[name='type']:checked").prop('checked',false);   
    
    NODECOM.get();
  }

  else
    $(".error").css({"display": "inline"}); 
  }


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
        item.y, y) < 8)
      closeEvents.push(item);
    else
      drawPin(item.x, item.y, parseInt(item.type), false);
  }

  for (var i in closeEvents) {
    item = closeEvents[i];
    drawPin(item.x, item.y, parseInt(item.type), true);
  }

  if (closeEvents.length > 0)
    drawTooltipRect(closeEvents);
  
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

/*
  Draws the tooltip display for an item on the map.
  Requires that closeEvents not be empty, which is ensured
  by the caller.
 */ 
function drawTooltipRect(closeEvents) {
  var item;
  var len = closeEvents.length;
  var startingX = 2;
  var startingY = max(min(closeEvents[0].y - 15, 
                  CANHEIGHT - 15 * len), 2);
  var width = 0;
  
  for (var i = 0; ((i < len) && (i < CANHEIGHT/20)); i++) {
    item = closeEvents[i];
    width = max(width, (ctx.measureText(item.eventName).width + 8));
    startingX = max(startingX,item.x);

  };

  startingX = max(2, min(startingX, 
                CANWIDTH - width - 2));
  ctx.beginPath();
  ctx.rect(startingX, startingY, width, 
           14.3 * min(len, CANHEIGHT/20));
  ctx.fillStyle = 'rgba(50, 50, 50, 0.7)';
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.fill();
  ctx.stroke();

  for (var i = 0; ((i < len) && i < (CANHEIGHT/20)); i++) {
    item = closeEvents[i];
    ctx.fillStyle = getPinColor(parseInt(item.type));
    ctx.fillText("  " + item.eventName, 
      startingX - 2, startingY + 14 * (i + 1) - 3);
  };

}



/*
  Constructor for a Listing object, which stores information
  about a given event.
 */
function Listing(x, y, name, start, end, host, desc, location, type) {
    this.x = x;
    this.y = y;
    this.eventName = name;
    this.dayDate = nearestDay(start);
    this.startDate = start;
    this.endDate = end;
    this.host = host;
    this.desc = desc;
    this.type = type;
    this.location = location;
  }


/*
  Rounds a Date to the nearest day.
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
  switch(type) {		//hover color			//regular color
    case 0: //study			
      return hovering ? "rgb(33, 214, 207)" : "rgb(24, 153, 148)";
      break;
    case 1: //food
      return hovering ? "rgb(255,118,226)"  : "rgb(211, 98, 187)";
      break;
    case 2: //show
      return hovering ? "rgb(255, 190, 89)"  : "rgb(255, 189, 102)";
      break;
    case 3: //talk
      return hovering ? "rgb(191,204,75)"	 : "rgb(150, 160, 59)";
      break;
    case 4: //misc
      return hovering ? "rgb(64,185,255)"	 : "rgb(54, 155, 214)";
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

/*
  Flips a checkboc DOM element with the given value.
 */
function flipCheckBox(value) {
    var checkbox = $("input[value=" + value +"]");
    if (checkbox.prop("checked"))
      checkbox.prop("checked", false);
    else
      checkbox.prop("checked", true);
 }

/*
  Opens up the "Add new Event" menu.
 */
function toggleExpandedAdd() {
  $("#event-listing").toggleClass("displayAdd");

  if ($(".displayAdd").css("display")=="none")
    $(".chevronExpand").html("&#x2C6;");
  
  else 
    $(".chevronExpand").html("&#x2C7;");
  
}
