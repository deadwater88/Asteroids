var Asteroid = require('./asteroid.js');
var Util = require('./utils.js');

function Game(ctx) {
  this.NUM_ASTEROIDS = 20;
  this.current_asteroids = [];
  this.ctx = ctx;
  this.addAsteroids();
}

Game.DIM_X = document.body.clientWidth;
Game.DIM_Y = document.body.clientHeight;

Game.prototype.addAsteroids = function() {
  let asteroid;
  while (this.current_asteroids.length < this.NUM_ASTEROIDS) {
    // debugger
    let potential_pos = Game.randomPosition();
    // console.log(this.overlap_existing_asteroids(potential_pos));
    while (this.overlap_existing_asteroids(potential_pos)) {
      potential_pos = Game.randomPosition();
    }
      asteroid = new Asteroid({"pos": potential_pos});
      this.current_asteroids.push(asteroid);
      asteroid.draw(this.ctx);
    //setTimeout(add_asteroid, 3000);};
  }


};
Game.randomPosition = function() {
  let x = Math.random()*Game.DIM_X;
  let y = Math.random()*Game.DIM_Y;
  return [x,y];
};

Game.prototype.overlap_existing_asteroids = function(pos) {
  return this.current_asteroids.some( function(asteroid) {
    return Util.distance(pos, asteroid.pos) < 150;
  });
};

Game.prototype.moveObjects = function() {
  // console.log("moving")
  this.current_asteroids.forEach(function(asteroid){
    asteroid.move();
  });
};

Game.prototype.draw = function() {
  let ctx = this.ctx;
  // console.log(ctx);
  ctx.fillStyle = 'black';
  ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y);
  ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);

  this.current_asteroids.forEach(function(asteroid){
    asteroid.draw(ctx);
  })};

module.exports = Game;
