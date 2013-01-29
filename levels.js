var LEVELS = (function() {
  var exports = {};
  var currentLevel;
  
  exports.getPlatforms = function(level) {
    var result = [];

    switch(level){
      case 1:
        result.push(new PLATFORM.Platform(100, 400, 100, 40));
        result.push(new PLATFORM.Platform(200, 540, 100, 60));
        //result.push(new PLATFORM.Platform(250, 500, 100, 60));
        result.push(new PLATFORM.Platform(420, 430, 100, 80));
        result.push(new PLATFORM.Platform(560, 560, 100, 40));
        result.push(new PLATFORM.Platform(600, 500, 100, 40));
      break;
    }

    console.log(result);
    return result;
  }


  exports.getEnemies = function(level) {
    var result = [];

    switch(level){
      case 1:
        result.push(new ENEMY.Flyer(300, 300));
        result.push(new ENEMY.Turret(200, 404, false, 0));
        result.push(new ENEMY.Turret(20, 550, false, 30));
        result.push(new ENEMY.Walker(100, 100, false, 00, 350));
        break;
    }

    return result;
  }

  exports.getMMLocation = function(level) {
    var result = {};

    switch(level) {
      case 1:
        result.X = 0;
        result.Y = 555;
        break;
    }

    return result;
  }

  return exports;
}());