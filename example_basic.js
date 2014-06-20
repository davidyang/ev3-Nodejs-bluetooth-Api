var robot = new Ev3_base("/dev/tty.EV3-SerialPort"); // put your bluetooth socket.

robot.connect(function(){
  robot.start_program(function(adapter){
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
      if(result == Ev3.COL_BLACK){
        //set motors A and D to back 100%
        target.setMotors(-100,0,0,-100);
      }
    });

    //set motors A and D to forward 100%
    target.setMotors(100,0,0,100);
  });
});
