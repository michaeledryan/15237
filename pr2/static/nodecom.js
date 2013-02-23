var NODECOM = (function() {
  var exports = {};

// Implement the get() function
exports.get = function() {
  $.ajax({
    type: "get",
    url: "/listings",
    success: function(data) { 
      techTalks = data.techTalks;
      shows = data.shows;
      studying = data.studying;
      food = data.food;
      misc = data.misc;
      listings = data.listings;
    }
  });
}

// Adds an event to the server-side datastore.
exports.add = function(x, y, eventName, startTime, endTime, host, desc) {
  var item = new Listing(x, y, name, startTime, endTime, host, desc, type)
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

exports.edit = function(x, y, eventName, time, host, desc, list) {
  $.ajax({
    type: "put",
    data: {list : list, desc: desc, author: author, price: price, sold: sold},
    url: "/listings/" + id,
    success: function(data) {

    }
  });
}

exports.del = function(item) {
  $.ajax({
    type: "delete",
    url: "/listings/" + id,
    success: function(data) {
      //console.log(data);
    }
  });
}

exports.delAll = function() {
  $.ajax({
    type: "delete",
    url: "/listings",
    success: function(data) {
      listings = data.listings;
    }
  });
}

  return exports;
}());