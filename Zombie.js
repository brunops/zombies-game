/* global Entity */
(function() {
  'use strict';

  function Zombie(x, y, speed) {
    this.base = Entity;
    this.base(
      x,
      y,
      Zombie.width,
      Zombie.height,
      'public/images/sprites/zombies.png',
      0,
      32,
      speed || 20
    );
  }

  Zombie.width = 32;
  Zombie.height = 32;

  Zombie.prototype = new Entity();
  Zombie.prototype.constructor = Zombie;

  // Make Zombie available globally
  window.Zombie = Zombie;

}());
