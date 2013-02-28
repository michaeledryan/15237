var NODECOM = (function() {
  var exports = {};

/*
 Gets all the events that have been added.
 */
exports.get = function() {
  $.ajax({
    type: "get",
    url: "/listings",
    success: function(data) { 
      listings = data.listings;
      DOMUTILS.refreshDOM();
    }
  });
}

/* 
  Adds one event to the server-side datastore.
 */
exports.add = function(item) {
  $.ajax({
    type: "post", 
    data: {
      "item" : item
    },
    url: "/listings",
    success: function(data) {
     }
  });
}


/*
 Deletes an item in the server-side datastore.
 */
exports.del = function(item) {
  $.ajax({
    type: "delete",
    data: {
      item: item,
    },
    url: "/listings/" + item.dayDate,
    success: function(data) {
    }
  });
}

  return exports;
}());