(function() {
  'use strict';

  function Player(x, y) {
    this.init(x, y);
  }

  Player.width = 32;
  Player.height = 52;

  Player.prototype.init = function (x, y, speed) {
    this.x = x;
    this.y = y;

    // Speed is defined as pixels per second
    this.speed = speed || 256;

    this.loadSprite();
  };

  Player.prototype.loadSprite = function () {
    var self = this;

    this.spriteLoaded = false;
    this.sprite = new Image();

    this.sprite.src = 'public/images/sprites/heroes.png';
    this.sprite.onload = function () {
      self.spriteLoaded = true;
    };
  };

  Player.prototype.setPosition = function (x, y) {
    this.setX(x);
    this.setY(y);
  };

  Player.prototype.setX = function (x) {
    this.x = x;
  };

  Player.prototype.setY = function (y) {
    this.y = y;
  };

  Player.prototype.render = function (context) {
    // ctx.drawImage(sprites,srcX,srcY,srcW,srcH,destX,destY,destW,destH);
    if (this.spriteLoaded) {
      context.drawImage(this.sprite, 56, 12, Player.width, Player.height, this.x, this.y, Player.width, Player.height);
    }
  };

  // Make Player available globally
  window.Player = Player;

}());
