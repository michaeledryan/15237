/*
  Constructor for a Listing object, which stores information
  about a given event.
 */
exports.Listing = function(x, y, name, start, end, host, desc, type) {
  this.x = x;
  this.y = y;
  this.eventName = eventName;
  this.dayDate = nearestDay(start);
  this.startDate = start;
  this.endDate = end;
  this.host = host;
  this.desc = desc;
  this.type = type;
}

/*
  Deletes an item from the given listing,
 */
exports.deleteItem = function(item, listings) {
  var startDate = item.dayDate;
  for (var i = 0; i < listings[startDate].length; i++) {
    if (itemEquals(listings[startDate][i], item)) {
      listings[startDate].splice(i,1);
      return;
    }
  }
  return;
}

/*
  Helper for deleteItem. Checks to see if item1 === item2.
 */
function itemEquals(item1, item2) {
 return (item1.x === item2.x) &&
  (item1.y === item2.y) &&
  (item1.eventName === item2.eventName) &&
  (item1.dayDate === item2.dayDate) &&
  (item1.startDate === item2.startDate) &&
  (item1.endDate === item2.endDate) &&
  (item1.host === item2.host) &&
  (item1.desc === item2.desc) &&
  (item1.type === item2.type);
}


/* 
  Sorts a list of Listings by start time. Used for insertion
  into Listings.
 */
function sortByTime(listingRow) {
  listingRow.sort( function(i1, i2) {
    return (i1.startDate > i2.startDate);
  });
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
 Adds a new item to our listings.
 */
exports.addToListings = function(item, listings) {
  if (listings[item.dayDate] === undefined)
    listings[item.dayDate] = [];
  listings[item.dayDate].push(item);
}