var express = require("express"); // imports express
var app = express();              // create a new instance of express
var Listutils = require("./listUtils.js");

// imports the fs module (reading and writing to a text file)
var fs = require("fs");

// the bodyParser middleware allows us to parse the
// body of a request
app.use(express.bodyParser());

// The global datastores for this example
var listings = {};

var TypeEnum = {
    STUDY : 0,
    FOOD : 1,
    SHOW : 2,
    TALK : 3,
    MISC : 4,
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

// Get all items
app.get("/listings", function(request, response){
  response.send({
    listings: listings,
    success: true
  });
});

// Get one item
app.get("/listings/:id", function(request, response){
  var id = request.params.id;
  var item = getProperList(request.params.list)[request.params.id];
  response.send({
    listings: item,
    success: (item !== undefined)
  });
});

// Create new item
app.post("/listings", function(request, response) {
  
  var item = request.body.item;

  var successful = 
      (item.x !== undefined) &&
      (item.y !== undefined) &&
      (item.eventName !== undefined) &&
      (item.host !== undefined) &&
      (item.dayDate !== undefined) &&
      (item.startDate !== undefined) &&
      (item.endDate !== undefined) &&
      (item.desc !== undefined);

  if (successful) {
    Listutils.addToListings(item, listings);
    writeFile("listings.txt" , JSON.stringify(listings));
  } 

  else {

    item = undefined;
  }
  response.send({ 
    item: item,
    success: successful
  });
});


// Delete all stored data. This function seems unsafe.
app.delete("/listings", function(request, response){
  
  listings = {};

  writeFile("listings.txt" , JSON.stringify(listings));
  response.send({
    listings: listings,
    success: true
  });
});

// Delete one item
app.delete("/listings/:id", function(request, response){
  var id = request.params.id;
  var item = request.body.item;
  var success = Listutils.deleteItem(item, listings);
  writeFile("listings.txt" , JSON.stringify(listings));
  response.send({
    success: success
  });
});

// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});

function initServer() {
  // When we start the server, we must load the stored data
  var defaultList = "{}";
  readFile("listings.txt", defaultList, function(err, data) {
    listings = JSON.parse(data);
  });
}

// Finally, initialize the server, then activate the server at port 8889
initServer();
app.listen(8889);