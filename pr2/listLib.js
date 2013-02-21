// add to listings. 
// get from listings.  
// sort listings. DONE
//

var LISTUTILS = (function() {
  var exports = {};

  // Creates a new item for our listing
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

  exports.deleteItem = function(item) {
    listings.(item.dayDate).
  }

  // Sorts a list of Listings by start time
  function sortByTime(listingRow) {
    listingRow.sort( function(i1, i2) {
      return (i1.startDate > i2.startDate);
    });
  }

  // Rounds a Date to the nearest day
  function nearestDay(exactDate) {
      return new Date(exactDate.getFullYear(), 
                      exactDate.getMonth(), 
                      exactDate.getDate());
  }

  // Adds new item to our listings.
  exports.addToListings = function (item) {
    if (listings.(item.dayDate) === undefined)
      listings.(item.dayDate) = [];
    listings.(item.dayDate).push(item);

  }

  return exports;
}());