// 15-237 Homework 3 - Eebae Server

var express = require("express"); // imports express
var app = express();              // create a new instance of express

// imports the fs module (reading and writing to a text file)
var fs = require("fs");

// the bodyParser middleware allows us to parse the
// body of a request
app.use(express.bodyParser());

// The global datastores for this example
var techTalks, shows, studying, food, misc, listings;

// gets the appropriate datastore
function getProperList(list) {
  if (list === "techTalks")
    return techTalks;
  else if (list === "shows")
    return shows;
  else if (list === "studying")
    return studying;
  else if (list === "food")
    return food;
  else if (list === "misc")
    return misc;
  else return listings;
}

function getProperListName(list) {
  if (list === "techTalks")
    return "techTalks.txt";
  else if (list === "shows")
    return "shows.txt";
  else if (list === "studying")
    return "studying.txt";
  else if (list === "food")
    return "food.txt";
  else if (list === "misc")
    return "misc.txt";
  else return "listings.txt";
}


// Asynchronously read file contents, then call callbackFn
function readFile(filename, defaultData, callbackFn) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log("Error reading file: ", filename);
      data = defaultData;
    } else {
      console.log("Success reading file: ", filename);
    }
    if (callbackFn) callbackFn(err, data);
  });
}

// Asynchronously write file contents, then call callbackFn
function writeFile(filename, data, callbackFn) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      console.log("Error writing file: ", filename);
    } else {
      console.log("Success writing file: ", filename);
    }
    if (callbackFn) callbackFn(err);
  });
}

// get all items
app.get("/listings", function(request, response){
  response.send({
    listings: listings,
    techTalks : techTalks,
    shows : shows,
    studying : studying,
    food : food,
    misc : misc,
    success: true
  });
});

// get one item
app.get("/listings/:id", function(request, response){
  var id = request.params.id;
  var item = getProperList(request.params.list)[request.params.id];
  response.send({
    listings: item,
    success: (item !== undefined)
  });
});

// create new item
app.post("/listings", function(request, response) {
  console.log(request.body);
  var item = {
      "list" : request.body.list,
      "x" : request.body.x, 
      "y" : request.body.y, 
      "eventName" : request.body.eventName, 
      "time" : request.body.time, 
      "host" : request.body.host,
      "desc" : request.body.desc,
    }

  var successful = 
      (item.x !== undefined) &&
      (item.y !== undefined) &&
      (item.eventName !== undefined) &&
      (item.host !== undefined) &&
      (item.time !== undefined) &&
      (item.desc !== undefined);

  if (successful) {
    console.log("success");
    getProperList(request.body.list).push(item);
    writeFile(getProperListName(request.body.list) , JSON.stringify(getProperList(request.body.list)));
  } else {
    item = undefined;
  }

  response.send({ 
    item: item,
    success: successful
  });
});

// update one item
app.put("/listings/:id", function(request, response){
  // change listing at index, to the new listing
  var id = request.params.id;
  console.log(id);
  var oldItem = getProperList(request.body.list)[id];
  var item = {
      "list" : request.body.list,
      "x" : request.body.x, 
      "y" : request.body.y, 
      "eventName" : request.body.eventName, 
      "time" : request.body.time, 
      "host" : request.body.host,
      "desc" : request.body.desc,
    }
  item.desc = (item.desc !== undefined) ? item.desc : oldItem.desc;
  item.host = (item.host !== undefined) ? item.host : oldItem.host;
  item.time = (item.time !== undefined) ? item.time : oldItem.time;
  item.eventName = (item.eventName !== undefined) ? item.eventName : oldItem.eventName;
  item.x = (item.x !== undefined) ? item.x : oldItem.x;
  item.y = (item.y !== undefined) ? item.y : oldItem.y;

  // commit the update
  getProperList(item.list)[id] = item;

  response.send({
    item: item,
    success: true
  });
});


// Delete all stored data. This function seems unsafe.
app.delete("/listings", function(request, response){
  
  // Clear all datastores.
  listings = [];
  misc = [];
  techTalks = [];
  shows = [];
  food = [];
  studying = [];

  writeFile(getProperListName(request.body.list) , JSON.stringify(getProperList(request.body.list)));
  response.send({
    listings: listings,
    success: true
  });
});

// delete one item
app.delete("/listings/:id", function(request, response){
  var id = request.params.id;
  var old = getProperList(request.params.list)[id];
  listings.splice(id, 1);
  writeFile(getProperListName(request.body.list) , JSON.stringify(getProperList(request.body.list)));
  response.send({
    listings: old,
    success: (old !== undefined)
  });
});

// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});

function initServer() {
  // When we start the server, we must load the stored data
  var defaultList = "[]";
  readFile("listings.txt", defaultList, function(err, data) {
    listings = JSON.parse(data);
  });
  readFile("techTalks.txt", defaultList, function(err, data) {
    techTalks = JSON.parse(data);
  });
  readFile("food.txt", defaultList, function(err, data) {
    food = JSON.parse(data);
  });
  readFile("misc.txt", defaultList, function(err, data) {
    misc = JSON.parse(data);
  });
  readFile("studying.txt", defaultList, function(err, data) {
    studying = JSON.parse(data);
  });
  readFile("shows.txt", defaultList, function(err, data) {
    shows = JSON.parse(data);
  });
}

// Finally, initialize the server, then activate the server at port 8889
initServer();
app.listen(8889);