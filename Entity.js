(function () {
  'use strict';

  function Entity(x, y, width, height, spriteSrc, spriteSrcX, spriteSrcY, speed) {
    this.init(x, y, width, height, spriteSrc, spriteSrcX, spriteSrcY, speed);
  }

  Entity.prototype.init = function (x, y, width, height, spriteSrc, spriteSrcX, spriteSrcY, speed) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.spriteSrc = spriteSrc;
    this.spriteSrcX = spriteSrcX;
    this.spriteSrcY = spriteSrcY;

    // Speed is defined as pixels per second
    this.speed = speed || 200;

    this.loadSprite();
  };

  Entity.prototype.loadSprite = function () {
    var self = this;

    this.spriteLoaded = false;
    this.sprite = new Image();

    this.sprite.src = this.spriteSrc;
    this.sprite.onload = function () {
      self.spriteLoaded = true;
    };
  };

  Entity.prototype.setPosition = function (x, y) {
    this.setX(x);
    this.setY(y);
  };

  Entity.prototype.setX = function (x) {
    this.x = x;
  };

  Entity.prototype.setY = function (y) {
    this.y = y;
  };

  Entity.prototype.render = function (context) {
    if (this.spriteLoaded) {
      context.drawImage(this.sprite, this.spriteSrcX, this.spriteSrcY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
  };

  // Make Entity available globally
  window.Entity = Entity;

}());
