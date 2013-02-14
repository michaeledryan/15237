var canvas, ctx, adding, listings;

$(document).ready(function() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  canvas.setAttribute('tabindex','0');
  canvas.focus();
  canvas.addEventListener("mousedown", getPosition, false);
});


function addMyEvent(x,y) {
    var eventName = $("#event").val();
    var eventTime = $("#time").val();
    var host = $("#host").val();
    var desc = $("#description").val();
    if (x !== "" && y !== "" && eventName !== "" && 
        time !== "" && host !== ""){
      add(x, y, eventName, time, host, desc);
      listings.push( 
        {
          x : x, 
          y : y, 
          eventName : eventName, 
          time : time, 
          host : host,
          desc : desc
        }
      );
    }
    return false;
}

function prepareToAdd() {
  adding = true;  
}

function getPosition(event)
{
  var x = event.x;
  var y = event.y;


  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  if (adding) {

    addMyEvent(x,y);

    adding = false;
  }
}


// Implement the get() function
function get() {
  $.ajax({
    type: "get",
    url: "/listings",
    success: function(data) {
      listings = data.listings;
      refreshDOM();
    }
  });
}

// Implement the add(desc, author, price) function
function add(x, y, eventName, time, host, desc) {
  $.ajax({
    type: "post",
    data: {
      "x" : x, 
      "y" : y, 
      "eventName" : eventName, 
      "time" : time, 
      "host" : host,
      "desc" : desc
    },
    url: "/listings",
    success: function(data) { }
  });
}

/*
function edit(id, desc, author, price, sold) {
  $.ajax({
    type: "put",
    data: {desc: desc, author: author, price: price, sold: sold},
    url: "/listings/" + id,
    success: function(data) { }
  });
}*/

function del(id) {
  $.ajax({
    type: "delete",
    url: "/listings/" + id,
    success: function(data) { 
      //console.log(data);
    }
  });
}

function delAll() {
  $.ajax({
    type: "delete",
    url: "/listings",
    success: function(data) { }
  });
}