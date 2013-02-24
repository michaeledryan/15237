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


  exports.deleteItem = function(item, listings) {
    var startDate = item.dayDate;
    for (var i = 0; i < listings[startDate].length; i++) {
      if (listings[i].startDate === item.startDate) {
        listings[i].splice(i,1);
        return;
      }
    }
    return;
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
  exports.addToListings = function(item, listings) {
    if (listings[item.dayDate] === undefined)
      listings[item.dayDate] = [];
    listings[item.dayDate].push(item);

  }