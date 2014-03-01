(function () {
  'use strict';

  function Entity(x, y, width, height, spriteSrc, framesPosition, frameCooldown, speed) {
    this.init(x, y, width, height, spriteSrc, framesPosition, frameCooldown, speed);
  }

  Entity.prototype.init = function (x, y, width, height, spriteSrc, framesPosition, frameCooldown, speed) {
    this.x = x;
    this.y = y;

    this.constructor.width = width;
    this.constructor.height = height;

    this.constructor.spriteSrc = spriteSrc;
    this.constructor.framesPosition = framesPosition;
    this.constructor.frameCooldown = frameCooldown;
    this.lastFrameUpdate = Date.now();
    this.currentFrame = 0;
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
        this.constructor.framesPosition[this.currentFrame][0],
        this.constructor.framesPosition[this.currentFrame][1],
        this.constructor.width,
        this.constructor.height,
        this.x,
        this.y,
        this.constructor.width,
        this.constructor.height);
    }
  };

  Entity.prototype.update = function (now) {
    now = now || Date.now();

    if (now - this.lastFrameUpdate > this.constructor.frameCooldown) {
      this.currentFrame += 1;
      this.lastFrameUpdate = now;
    }
    if (this.constructor.framesPosition.length <= this.currentFrame) {
      this.currentFrame = 0;
    }
  };

  // Make Entity available globally
  window.Entity = Entity;

}());
