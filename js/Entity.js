(function () {
  'use strict';

  function Entity(x, y, width, height, spriteSrc, framesPosition, frameCooldown, speed, renderedWidth, renderedHeight) {
    this.init(x, y, width, height, spriteSrc, framesPosition, frameCooldown, speed, renderedWidth, renderedHeight);
  }

  Entity.prototype.init = function (x, y, width, height, spriteSrc, framesPosition, frameCooldown, speed, renderedWidth, renderedHeight) {
    this.x = x;
    this.y = y;

    this.constructor.width = width;
    this.constructor.height = height;

    this.constructor.renderedWidth = renderedWidth ? renderedWidth : width;
    this.constructor.renderedHeight = renderedHeight ? renderedHeight : height;

    this.constructor.spriteSrc = spriteSrc;
    this.constructor.framesPosition = this.constructor.framesPosition || framesPosition;
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
        this.constructor.renderedWidth,
        this.constructor.renderedHeight);
    }
  };

  Entity.prototype.update = function (now) {
    now = now || Date.now();

    if (now - this.lastFrameUpdate > this.constructor.frameCooldown) {
      this.currentFrame += 1;
      this.lastFrameUpdate = now;
      if (this.constructor.framesPosition.length <= this.currentFrame) {
        this.currentFrame = 0;
      }
    }
  };

  // allow a little bit of proximity between entities before considering
  // a collision, it improves the experience, otherwise some
  // entities collide before it was expected
  Entity.adjust = 5;
  Entity.prototype.isCollided = function (entity2) {
    // no collision if there's any gap
    return !(this.x + this.constructor.renderedWidth - Entity.adjust <= entity2.x ||
      this.x > entity2.x + entity2.constructor.renderedWidth - Entity.adjust      ||
      this.y + this.constructor.renderedHeight - Entity.adjust <= entity2.y       ||
      this.y > entity2.y + entity2.constructor.renderedHeight - Entity.adjust
    );
  };

  // Make Entity available globally
  window.Entity = Entity;

}());
