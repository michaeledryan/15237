/*
  Get the type of system that you're running, favoring mobile devices first.
 */
$(document).ready(function() {
  var userAgent = navigator.userAgent;
  var text = "You are running ";

  // Check userAgent
  if (userAgent.indexOf("Android") !== -1) {
    text += "an Android device."
  } else if (userAgent.indexOf("iPad") !== -1) {
    text += "an iPad."
  } else if (userAgent.indexOf("iPhone") !== -1) {
    text += "an iPhone."
  } else if (userAgent.indexOf("iPod Touch") !== -1) {
    text += "an iPod Touch." 
  } else if (userAgent.indexOf("Mac OS X") !== -1) {
    text += "a system with Mac OS X."
  } else if (userAgent.indexOf("Linux") !== -1) {
    text += "a system with Linux."
  } else if (userAgent.indexOf("Windows") !== -1) {
    text += "a system with Windows."
  } else {
    text += "An unkown device."
  }

  // Set the text.
  $("h1").html(text);
});