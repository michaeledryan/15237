/*
  Check for geolocation, then bind function to button div or display error.
 */
$(document).ready(function() {

  if (navigator.geolocation) {
    $(".button").click(function() {
      navigator.geolocation.getCurrentPosition(displayPosition);
    });
  }
  else {
    $("p").html("Your device does not support geolocation.");
  }

});

/*
  Gets the user's position, then calculate the distance to Entropy.
 */
function displayPosition(position){
  var myLat = parseFloat(position.coords.latitude);   // My coords
  var myLong = parseFloat(position.coords.longitude);
  var entLat = 40.442979;     // Entropy's coords
  var entLong = -79.942065;

  // Begin code from http://www.movable-type.co.uk/scripts/latlong.html
  var R = 6371; // km
  var dLat = (myLat-entLat) * Math.PI / 180;
  var dLon = (myLong-entLong) * Math.PI / 180;
  var entLat = entLat * Math.PI / 180;
  var myLat = myLat * Math.PI / 180;

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(entLat) * Math.cos(myLat); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  // End borrowed code

  // Update DOM
  var messageText = "You are at " + position.coords.latitude + ", " 
                    + position.coords.longitude +".<br>" + "Entropy is " + d + " km away.";

  $("p").html(messageText);

}
