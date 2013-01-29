var LEVELS = (function() {
  var exports = {};
  var currentLevel;
  
  exports.getPlatforms = function(level) {
    var result = [];

    switch(level){
      case 1:
        //***********Border Platforms*************
        result.push(new PLATFORM.Platform(0, 0, 800, 80));
        result.push(new PLATFORM.Platform(0, 80, 40, 520));
        result.push(new PLATFORM.Platform(760, 80, 40, 460));

        //*************Left Side******************

        //      3 step
        result.push(new PLATFORM.Platform(260, 560, 180, 40));
        result.push(new PLATFORM.Platform(320, 520, 120, 40));
        result.push(new PLATFORM.Platform(380, 480, 60, 40));

        //     Floaters
        result.push(new PLATFORM.Platform(270, 405, 80, 40));
        result.push(new PLATFORM.Platform(120, 405, 80, 40));
        result.push(new PLATFORM.Platform(40, 355, 40, 40));
        result.push(new PLATFORM.Platform(140, 285, 40, 40));
        result.push(new PLATFORM.Platform(40, 210, 40, 40));
        result.push(new PLATFORM.Platform(180, 180, 160, 40));

        //*************Divider*********************
        result.push(new PLATFORM.Platform(440, 200, 80, 400));

        //*************Right Side******************
        result.push(new PLATFORM.Platform(520, 200, 120, 40));
        result.push(new PLATFORM.Platform(640, 300, 120, 40));
        result.push(new PLATFORM.Platform(520, 400, 120, 40));
        result.push(new PLATFORM.Platform(640, 500, 120, 40));



      break;
    }

    console.log(result);
    return result;
  }


  exports.getEnemies = function(level) {
    var result = [];

    switch(level){
      case 1:
        //result.push(new ENEMY.Flyer(400, 100));

        result.push(new ENEMY.Turret(419, 449, true, 30));
        result.push(new ENEMY.Turret(419, 319, true, 30));
        result.push(new ENEMY.Turret(299, 524, true, 30));
        result.push(new ENEMY.Turret(419, 249, true, 30));
        result.push(new ENEMY.Turret(38, 80, false, 30));
        result.push(new ENEMY.Turret(38, 180, false, 30));
        result.push(new ENEMY.Turret(518, 249, false, 30));
        result.push(new ENEMY.Turret(518, 449, false, 30));
        result.push(new ENEMY.Turret(739, 349, true, 30));



        result.push(new ENEMY.Walker(270, 354, false, 270, 350));
        result.push(new ENEMY.Walker(120, 354, false, 120, 200));
        result.push(new ENEMY.Walker(180, 129, false, 180, 340));
        result.push(new ENEMY.Walker(440, 149, false, 440, 640));
        result.push(new ENEMY.Walker(520, 549, false, 520, 760));

        break;
    }

    return result;
  }

  exports.getMMLocation = function(level) {
    var result = {};

    switch(level) {
      case 1:
        result.X = 40;
        result.Y = 555;
        break;
    }

    return result;
  }

  return exports;
}());