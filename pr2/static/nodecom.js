var NODECOM = (function() {
  var exports = {};

// Implement the get() function
exports.get = function() {
  $.ajax({
    type: "get",
    url: "/listings",
    success: function(data) {
      listings = data.listings;
    }
  });
}

exports.add = function(x, y, eventName, time, host, desc, list) {
  $.ajax({
    type: "post", 
    data: {
      "list" : list,
      "x" : String(x), 
      "y" : String(y), 
      "eventName" : eventName, 
      "time" : time, 
      "host" : host,
      "desc" : desc
    },
    url: "/listings",
    success: function(data) { }
  });
}

exports.edit = function(x, y, eventName, time, host, desc, list) {
  $.ajax({
    type: "put",
    data: {list : list, desc: desc, author: author, price: price, sold: sold},
    url: "/listings/" + id,
    success: function(data) { }
  });
}

exports.del = function(id) {
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
    success: function(data) { }
  });
}


  return exports;
}());