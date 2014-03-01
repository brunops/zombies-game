/* global Entity */
(function() {
  'use strict';

  function Zombie(x, y, speed) {
    this.base = Entity;
    this.base(
      x,
      y,
      32,
      32,
      'public/images/sprites/zombies.png',
      [[0, 32], [32, 32], [64, 32], [32, 32]],
      220,
      speed || (12 + Math.random() * 15)
    );
  }

  Zombie.prototype = new Entity();
  Zombie.prototype.constructor = Zombie;

  // Make Zombie available globally
  window.Zombie = Zombie;

}());
