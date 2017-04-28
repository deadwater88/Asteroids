
// Function.prototype.inherits =  function(superclass) {
//   function Surrogate(){};
//   Surrogate.prototype = superclass.prototype;
//   this.prototype = new Surrogate();
//   this.prototype.constructor = this;
// };

Function.prototype.inherits =  function(superclass) {
  this.prototype = Object.create(superclass.prototype)
};


function MovingObject () {};

function Ship () {};
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

MovingObject.prototype.fly = () => console.log("flaps");
Ship.prototype.shoot = () => console.log("pshew pshew");

var StarFalcon37778xB = new Ship;
StarFalcon37778xB.fly()
// console.log(StarFalcon37778xB.prototype.__proto__)
//
var Rock = new MovingObject;
// Rock.shoot();
