/* global Entity */
(function() {
  'use strict';

  function Projectile(x, y, speed, power) {
    Entity.call(this,
      x,
      y,
      45,
      35,
      'public/images/sprites/fireball2.png',
      [[0, 290]],
      0,
      speed || 400,
      35,
      25
    );

    this.power = power || 1;
  }

  Projectile.prototype = new Entity();
  Projectile.prototype.constructor = Projectile;

  // Make Projectile available globally
  window.Projectile = Projectile;

}());
