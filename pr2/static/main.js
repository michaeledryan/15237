var canvas, ctx, adding;
var listings = [];
var image = new Image();

$(document).ready(function() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  //ctx.drawImage(image, 0, 0, 496, 339, 0, 0, 496, 339);
  image.src = "mapBasic.png";
  image.onload = draw;

  function draw(){               
    ctx.drawImage(image, 0, 0);
  }

  //ctx.fillRect( 0, 0, 496, 339);
  canvas.setAttribute('tabindex','0');
  canvas.focus();
  canvas.addEventListener("mousedown", getPosition, false);
});


function redraw() {
  canvas.width = canvas.width;
  ctx.drawImage(image, 0, 0);
}

function addMyEvent(x,y) {
    var eventName = $("#event").val();
    var eventTime = $("#time").val();
    var host = $("#host").val();
    var desc = $("#description").val();

    console.log(eventName);
    console.log(eventTime);
    console.log(host);
    console.log(desc);

    if (x !== "" && y !== "" && eventName !== "" && 
        time !== "" && host !== ""){
      add(x, y, eventName, eventTime, host, desc);
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
    }
  });
}

function add(x, y, eventName, time, host, desc) {
  $.ajax({
    type: "post",
    data: {
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