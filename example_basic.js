var Ev3 = require ("./module/Ev3.js");
var Ev3_base = Ev3.base;

var robot = new Ev3_base("/dev/tty.EV3-SerialPort"); // put your bluetooth socket.
var state;

robot.connect(function(){
  robot.start_program(function(target){
    //set up a listener for touch input on port 2
    target.registerSensor(2,target.S_TYPE_TOUCH,0)
    target.registerSensorListener(2,function(result){
      //result is a bool value
      console.log("TOUCH", result);
    });


    //register a listener for light input on port 1
    target.registerSensor(1,target.S_TYPE_COLOR,target.SM_COL_COLOR);
    target.registerSensorListener(1,function(result){
      //if we see black
      console.log("color result:", result, Ev3.COL_BLACK);
      if(result == Ev3.COL_BLACK){
        if(state === "forward") {
          state = "backward";
          console.log("switching gears");
          //set motors A and D to back 100%
          target.setMotors(-50,0,0,-50);
        } else if(state === "backward") {
          state = "forward";
          target.setMotors(50, 0, 0, 50);
        }
      }
    });

    //set motors A and D to forward 100%
    state = "forward";
    target.setMotors(50,0,0,50);
  });
});
