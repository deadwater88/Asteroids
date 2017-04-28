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
