var Util = require("./utils.js");
var MovingObject = require('./moving_object.js');

function Asteroid(options) {
    options.color = "white";
    options.radius = 75;
    options.vel = Util.randomVec(2);
    MovingObject.call(this,options);
  }


Util.inherits(Asteroid, MovingObject);
module.exports = Asteroid;
