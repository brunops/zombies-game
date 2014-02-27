/* global Entity */
(function() {
  'use strict';

  function Player(x, y, speed) {
    this.base = Entity;
    this.base(
      x,
      y,
      Player.width,
      Player.height,
      'public/images/sprites/heroes.png',
      56,
      12,
      speed || 150
    );
  }

  Player.width = 32;
  Player.height = 52;

  Player.prototype = new Entity();

  // Make Player available globally
  window.Player = Player;

}());
