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
      105,
      142,
      speed || 150
    );
  }

  Player.width = 32;
  Player.height = 48;

  Player.prototype = new Entity();
  Player.prototype.constructor = Player;

  // Make Player available globally
  window.Player = Player;

}());
