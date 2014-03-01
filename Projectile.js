/* global Entity */
(function() {
  'use strict';

  function Projectile(x, y, speed) {
    this.base = Entity;
    this.base(
      x,
      y,
      Projectile.width,
      Projectile.height,
      'public/images/sprites/fireball2.png',
      [[0, 290]],
      0,
      speed || 400
    );
  }

  Projectile.width = 45;
  Projectile.height = 35;

  Projectile.prototype = new Entity();
  Projectile.prototype.constructor = Projectile;

  // Make Projectile available globally
  window.Projectile = Projectile;

}());
