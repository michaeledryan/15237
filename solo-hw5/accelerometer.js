$(document).ready(function() {
  window.addEventListener('devicemotion', function(event) {
    // the event object will contain acceleration and rotation values if available
    $("#div").html(event); 
  });

});