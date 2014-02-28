(function () {
  'use strict';

  function Entity(x, y, width, height, spriteSrc, spriteSrcX, spriteSrcY, speed) {
    this.init(x, y, width, height, spriteSrc, spriteSrcX, spriteSrcY, speed);
  }

  Entity.prototype.init = function (x, y, width, height, spriteSrc, spriteSrcX, spriteSrcY, speed) {
    this.x = x;
    this.y = y;

    this.constructor.width = width;
    this.constructor.height = height;

    this.constructor.spriteSrc = spriteSrc;
    this.constructor.spriteSrcX = spriteSrcX;
    this.constructor.spriteSrcY = spriteSrcY;
    if (spriteSrc) {
      this.loadSprite();
    }

    // Speed is defined as pixels per second
    this.speed = speed || 200;
  };

  Entity.prototype.loadSprite = function () {
    if (this.constructor.spriteLoaded) {
      return;
    }

    var self = this;

    this.constructor.spriteLoaded = false;
    this.constructor.sprite = new Image();

    this.constructor.sprite.src = this.constructor.spriteSrc;
    this.constructor.sprite.onload = function () {
      self.constructor.spriteLoaded = true;
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
    if (this.constructor.spriteLoaded) {
      context.drawImage(
        this.constructor.sprite,
        this.constructor.spriteSrcX,
        this.constructor.spriteSrcY,
        this.constructor.width,
        this.constructor.height,
        this.x,
        this.y,
        this.constructor.width,
        this.constructor.height);
    }
  };

  // Make Entity available globally
  window.Entity = Entity;

}());
