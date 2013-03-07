/*
  Ready function binds functions to localStorage and sessionStorage.
 */
$(document).ready(function() {
  // Get existing info.
  if (localStorage.counter){
    $("#total").html("Total: " + localStorage.counter);
  }
  if (sessionStorage.counter){
    $("#session").html("Session: " + sessionStorage.counter);
  }

  // Update counters in localStorage and sessionStorage.
  $(".button").click(function(){
    if (localStorage.counter){
      localStorage.counter++;
    } else {
      localStorage.counter = 1;
    }
    if (sessionStorage.counter){
      sessionStorage.counter++;
    } else {
      sessionStorage.counter = 1;
    }

    //update DOM.
    $("#session").html("Session: " + sessionStorage.counter);
    $("#total").html("Total: " + localStorage.counter);
  });

});