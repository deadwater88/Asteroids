var Game = require('./game.js');

function  MovingObject(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
  }

  MovingObject.prototype.draw = function(ctx) {
    let centerX = this.pos[0];
    let centerY = this.pos[1];
    let radius = this.radius;
    // console.log(this.color)
    let color = this.color;
    ctx.beginPath();
    ctx.arc(centerX,centerY,radius,0,7);
    ctx.fillStyle = color;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fill();
  };

  MovingObject.prototype.move = function(){
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];
    let width = document.body.clientWidth
    let height = document.body.clientHeight

    this.pos[0] = (this.pos[0] + width) % width;
    this.pos[1] = (this.pos[1] + height) % height;
  };



module.exports = MovingObject;
