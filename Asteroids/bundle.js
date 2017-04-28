/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(6);
var MovingObject = __webpack_require__(4);

function Asteroid(options) {
    options.color = "white";
    options.radius = 75;
    options.vel = Util.randomVec(2);
    MovingObject.call(this,options);
  }


Util.inherits(Asteroid, MovingObject);
module.exports = Asteroid;


/***/ }),
/* 1 */
/***/ (function(module, exports) {



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Asteroid = __webpack_require__(0);
var Util = __webpack_require__(6);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(2);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(2);

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {



/***/ }),
/* 6 */
/***/ (function(module, exports) {

const Util = {
  inherits(childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },

      // Return a randomly oriented vector with the given length.
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  distance(pos1,pos2) {
    let x1 = pos1[0];
    let x2 = pos2[0];
    let y1 = pos1[1];
    let y2 = pos2[1];
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  },

  norm(vel) {
    return Util.distance([0, 0], vel);
  }
};
module.exports = Util;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Ship = __webpack_require__(5);
var Utils = __webpack_require__(6);
var GameView = __webpack_require__(3);
var Asteroid = __webpack_require__(0);
var Bullet = __webpack_require__(1);
var MovingObject = __webpack_require__(4);
var Game = __webpack_require__(2);

// document.addEventListener("DOMContentLoaded", function(){
//   var canvas = document.getElementById("mycanvas");
//   canvas.width = 1000 ;
//   canvas.height = 1000 ;
//   var ctx = canvas.getContext("2d");
//   ctx.fillStyle = 'black';
//   ctx.fillRect(10, 10, 55, 50);
//    // sets the color to fill in the rectangle with
//
// });


/***/ })
/******/ ]);