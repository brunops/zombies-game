/* global module, require */

var Entity = require('./Entity');

module.exports = (function () {
  'use strict';

  function Explosion(x, y) {
    Entity.call(this,
      x,
      y,
      32,
      52,
      'public/images/sprites/fireball2.png',
      [[0, 7], [32, 7], [64, 7], [96, 7]],
      100,
      0,
      32,
      32
    );
  }

  Explosion.prototype = new Entity();
  Explosion.prototype.constructor = Explosion;

  return Explosion;
}());
