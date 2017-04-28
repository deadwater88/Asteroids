var Game = require('./game.js');

function GameView (game, ctx) {
  this.game = game;
  this.ctx = ctx;

}

GameView.prototype.start = function () {
  
  setInterval(this.game.moveObjects.bind(this.game), 20);
  setInterval(this.game.draw.bind(this.game), 20);
};


document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("mycanvas");
  canvas.width =  document.body.clientWidth ;
  canvas.height = document.body.clientHeight;
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);
  let game = new Game(ctx);
  let gameview = new GameView(game,ctx);
  gameview.start();
});


module.exports = GameView;
