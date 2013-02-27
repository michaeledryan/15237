var DOMUTILS = (function() {
  var exports = {};


/*
  Refreshes the DOM. Does several things:
  Checks to see what events the current user wants to see.
  Clears the canvas and empties the event list at the bottom of the page.
  Iterates through listings, drawing pins on the map populating the event
  list with events that the user has not filtered out.
  Does the same for sideListings, but does not redraw pins.
 */
exports.refreshDOM = function(){
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
          
          drawPin(item.x, item.y, parseInt(item.type), false);

          exports.populateList(item, container);
        } 
      } 
    }
  }

  container = $("ul.sideListings");
  container.html("");
  var newSideListings = [];

  /*
    Iterate through sideListings to filter out now-
    unwanted events.
   */
  for (var i in sideListings) { 
    item = sideListings[i];
    if (filterByDate(new Date(item.startDate))) {

        if (($.inArray(parseInt(item.type), filterTypes)) > -1) {
          //pinsOnMap.push(item);
          
          drawPin(item.x, item.y, parseInt(item.type), false);

          exports.populateSideList(item, container);
          newSideListings.push(item);
        } 
      } 
  }

  sideListings = newSideListings;
  if (sideListings.length === 0)
    container.html("None.");
}

/*
  Function for populating the main list of events at the bottom
  ofthe page. Parses the item into appropriate HTML elements,
  then add it to the specifie container.
 */
exports.populateList = function(item, container) {
  // Get relevant attributes from the item
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
              " - <br>" + dateToTime(item.endDate));
  var host = $('<p>').html(item.host);
  var name = $('<h3>').html(item.eventName);
  var desc = $('<p>').html(item.desc);
  var block = $('<div>').addClass('block');
  var type = $('<p>').html(TypeArray[item.type]);

  var del = $("<div>").addClass("delButton");

  del.html("delete this listing");
  del.click(function() {
    NODECOM.del(item);
    if ($.inArray(item, sideListings) !== -1) {
      console.log($.inArray(item, sideListings));
      sideListings.splice($.inArray(item, sideListings), 1);
      console.log(sideListings);
    }
    NODECOM.get();
  });

  li.addClass(TypeArray[item.type]);

  // Compose content.
  calmonth.html(month);
  caldate.html(date);
  calendar.append(calmonth,caldate);
  labelTime.addClass('captionHead');
  labelHost.addClass('captionHead')
  
  type.css({ "color" : getPinColor(parseInt(item.type),
                           false)});
  time.addClass('caption');
  host.addClass('caption');

  leftCol.append(calendar,labelTime,time,labelHost,host, type);
  rightCol.append(name,desc,del);
  block.append(leftCol,rightCol);
  li.append(block);
  container.append(li);

}

/*
  Adds the given item to the sidebar. Grabs relevant data from the
  item and Composes the desired HTML.
 */
exports.populateSideList = function(item,container) {
  // Parse item data.
  var startDate = new Date(item.startDate);
  var month = startDate.toDateString().slice(4, 7);
  var day = startDate.toDateString().slice(0, 3);
  var date = startDate.getDate();
  var year = startDate.getYear();
 
  // Generate HTML. 
  var li = $("<li>");
  var name = $('<h3>').html(item.eventName);
  var host = $('<p>').html("hosted by: " + item.host);
  var date = $('<p>').html(month + " " + date);
  var time = $('<p>').html(dateToTime(item.startDate) + 
              " - " + dateToTime(item.endDate)); 
  var desc = $('<p>').html(item.desc);

  date.addClass("captionHead");
  time.addClass("caption");
  
  li.append(name, host, date, time, $("<hr>"), desc);
  container.append(li);
  
}
  return exports;
}());