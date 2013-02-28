## 1. Javascript
* Listing object 
  * static/main.js (349) and listUtils.js (5)
* All app logic in Javascript

## 2. Canvas
* Users place pins on the canvas over the map
* Refreshes based on current filter information
  * static/main.js for most canvas interaction
    * drawPin (100), clickMouse (200), hoverMouse (252)

## 3. HTML 
* static/index.html
* Date Input / Time Input on Form
* Placeholders on Input
* Three Column Layout

## 4. CSS
* static/styles.css
* CSS reset (1)
* Hover on buttons (168, 207)
* Visibility, (75)
* Positioning
* Custom cursor over canvas (94)
  * Class switched on by JQuery after certain events.

## 5. DOM manipulation
* static/domutils.js
* Event appears in the DOM when added (13)
* Changes to filter selection updates DOM in real time
  * static/main.js (65-67)

## 6. jQuery
* Click events on DOM elements
  * static/domutils.js (106)
* Data from HTML form
  * static/main.js (90, 126)
* Generate HTML with JQuery
  * static/domutils.js (116, 153)
* Changes CSS to show/hide DOM elements
  * static/main.js (127)

## 7. AJAX client (consume an API)
* static/nodecom.js
* Interacts with AJAX API to send/receive data 

## 8. AJAX server (provide an API)
* app.js
* Provides API for consumption by static/nodecom.js