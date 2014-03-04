/* global Entity */
(function() {
  'use strict';

  function Player(x, y, speed) {
    Entity.call(this,
      x,
      y,
      Player.width,
      Player.height,
      'public/images/sprites/heroes.png',
      [[105, 142]],
      0,
      speed || 150
    );

    this.level = 1;
  }

  Player.width = 32;
  Player.height = 48;

  Player.prototype = new Entity();
  Player.prototype.constructor = Player;

  // Make Player available globally
  window.Player = Player;

}());
