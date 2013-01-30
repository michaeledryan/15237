var LEVELS = (function() {
  var exports = {};
  var currentLevel;
  
  function Exit(x, y, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.draw = function() {
        ctx.fillStyle = "rgba(0, 255, 100, 0.5)";
        ctx.fillRect(x, y, 40, height);
    }
  }

  exports.getExit = function(level) {
    switch(level) {

      case 1:
        return new Exit(760, 540, 60);
        break;

      case 2:
        return new Exit(760, 80, 60);
        break;

      case 3:
        return new Exit(760, 80, 60);
        break;

      default:
        return new Exit(760, 540, 60);
        break;
    }
    
  }

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
        result.push(new PLATFORM.Platform(180, 180, 160, 40));
        
        result.push(new PLATFORM.Flicker(40, 355, 60, 30));
        result.push(new PLATFORM.Platform(140, 285, 40, 40));
        result.push(new PLATFORM.Flicker(40, 210, 60, 10));
        

        //*************Divider*********************
        result.push(new PLATFORM.Platform(440, 240, 80, 360));

        //*************Right Side******************
        result.push(new PLATFORM.Platform(440, 200, 200, 40));
        result.push(new PLATFORM.Platform(640, 300, 120, 40));
        result.push(new PLATFORM.Platform(520, 400, 120, 40));
        result.push(new PLATFORM.Platform(640, 500, 120, 40));
        break;

      case 2:
        //***************Border****************
        result.push(new PLATFORM.Platform(0, 0, 800, 80));
        result.push(new PLATFORM.Platform(0, 80, 40, 440));
        result.push(new PLATFORM.Platform(760, 180, 40, 460));
        result.push(new PLATFORM.Platform(-40, 520, 40, 80));

        //***************Row 1*****************
        result.push(new PLATFORM.Platform(100, 560, 80, 40));
        result.push(new PLATFORM.Platform(300, 560, 80, 40));
        result.push(new PLATFORM.Platform(500, 560, 80, 40));
        result.push(new PLATFORM.Platform(720, 500, 40, 40));

        //***************Row 2********************
        result.push(new PLATFORM.Flicker(550, 460, 40, 40));
        result.push(new PLATFORM.Platform(425, 400, 40, 100));
        result.push(new PLATFORM.Platform(300, 340, 40, 160));

        //**************Top Half********************
        result.push(new PLATFORM.Platform(40, 300, 200, 40));
        result.push(new PLATFORM.Platform(40, 260, 80, 40));
        result.push(new PLATFORM.Flicker(40, 220, 40, 40));
        result.push(new PLATFORM.Platform(200, 180, 200, 40));
        result.push(new PLATFORM.Platform(360, 220, 40, 60));

        //****************Step Down******************
        result.push(new PLATFORM.Platform(400, 260, 40, 40));
        result.push(new PLATFORM.Platform(440, 280, 40, 40));
        result.push(new PLATFORM.Platform(480, 300, 40, 40));
        result.push(new PLATFORM.Platform(520, 320, 40, 40));
        result.push(new PLATFORM.Platform(560, 340, 40, 40));
        result.push(new PLATFORM.Platform(600, 360, 40, 40));

        //End platforms
        result.push(new PLATFORM.Platform(720, 280, 40, 40));
        result.push(new PLATFORM.Platform(550, 220, 100, 40));
        result.push(new PLATFORM.Flicker(510, 210, 40, 40));
        result.push(new PLATFORM.Platform(470, 90, 40, 120));
        result.push(new PLATFORM.Platform(680, 140, 120, 40));

        break;
      case 3:
        //***************Border****************
        result.push(new PLATFORM.Platform(0, 0, 800, 80));
        result.push(new PLATFORM.Platform(0, 80, 40, 440));
        result.push(new PLATFORM.Platform(760, 180, 40, 460));
        result.push(new PLATFORM.Platform(-40, 520, 40, 80));

        //      3 step
        result.push(new PLATFORM.Platform(260, 560, 180, 40));
        result.push(new PLATFORM.Platform(320, 520, 120, 40));
        result.push(new PLATFORM.Platform(380, 480, 60, 40));

        // pit fall
        break;



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

        result.push(new ENEMY.Turret(299, 524, true, 20));
        result.push(new ENEMY.Turret(38, 180, false, 0));
        
        // Middle Column facing left
        result.push(new ENEMY.Turret(419, 449, true, -10));
        result.push(new ENEMY.Turret(419, 319, true, -5));
        result.push(new ENEMY.Turret(419, 249, true, 0));

        // Right side
        result.push(new ENEMY.Turret(739, 80, true, 0));
        result.push(new ENEMY.Turret(518, 252, false, 0));
        result.push(new ENEMY.Turret(518, 452, false, 10));
        result.push(new ENEMY.Turret(739, 352, true, 0));

        result.push(new ENEMY.Walker(270, 354, false, 270, 350));
        result.push(new ENEMY.Walker(120, 354, false, 120, 200));
        result.push(new ENEMY.Walker(180, 129, false, 180, 340));
        result.push(new ENEMY.Walker(440, 149, false, 440, 640));
        result.push(new ENEMY.Walker(520, 549, false, 520, 760));

        result.push(new ENEMY.Flyer(270, 354, false));
        result.push(new ENEMY.Flyer(120, 354, false));
        result.push(new ENEMY.Flyer(180, 129, false));
        result.push(new ENEMY.Flyer(440, 149, false));
        result.push(new ENEMY.Flyer(520, 549, false));
            

        break;

      case 2:

        result.push(new ENEMY.Turret(38, 345, false, 5));
        result.push(new ENEMY.Turret(38, 376, false, 10));
        result.push(new ENEMY.Turret(38, 407, false, 15));
        result.push(new ENEMY.Turret(38, 125, false, 20));

        result.push(new ENEMY.Turret(179, 185, true, 5));
      
        result.push(new ENEMY.Turret(238, 305, false, -10));
        result.push(new ENEMY.Turret(338, 340, false, 10));
      
        result.push(new ENEMY.Turret(448, 145, true, 10));
        result.push(new ENEMY.Turret(463, 405, false, 30));

        result.push(new ENEMY.Turret(508, 170, false, 5));
        result.push(new ENEMY.Turret(508, 135, false, 10));
        result.push(new ENEMY.Turret(508, 100, false, 20));

        result.push(new ENEMY.Turret(699, 285, true, 0));
        result.push(new ENEMY.Turret(699, 505, true, 30));
        


        result.push(new ENEMY.Walker(180, 549, false, 180, 300));
        result.push(new ENEMY.Walker(380, 549, false, 380, 500));
        result.push(new ENEMY.Walker(580, 549, false, 580, 760));
        result.push(new ENEMY.Walker(120, 250, false, 120, 240));
        result.push(new ENEMY.Walker(200, 130, false, 200, 400));
        result.push(new ENEMY.Walker(250, 130, false, 200, 400));
        result.push(new ENEMY.Walker(300, 130, false, 200, 400));
        result.push(new ENEMY.Walker(350, 130, false, 200, 400));
        result.push(new ENEMY.Walker(680, 89, false, 680, 800));
        result.push(new ENEMY.Walker(730, 89, false, 680, 800));

        result.push(new ENEMY.Flyer(180, 440, false));
        result.push(new ENEMY.Flyer(110, 129, false));
        result.push(new ENEMY.Flyer(650, 100, false));
        result.push(new ENEMY.Flyer(600, 550, false));

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
      case 2:
        result.X = 0;
        result.Y = 555;
        break;
      case 3:
        result.X = 0;
        result.Y = 555;
        break;
      default:
        result.X = 0;
        result.Y = 555;
        break;
    }

    return result;
  }

  return exports;
}());