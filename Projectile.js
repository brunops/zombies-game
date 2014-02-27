(function () {
  'use strict';

  function Projectile(x, y, speed) {
    this.init(x, y, speed);
  }

  Projectile.width = 45;
  Projectile.height = 35;

  Projectile.prototype.init = function (x, y, speed) {
    this.x = x;
    this.y = y;

    // Speed is defined as pixels per second
    this.speed = speed || 400;

    this.loadSprite();
  };

  Projectile.prototype.loadSprite = function () {
    var self = this;

    this.spriteLoaded = false;
    this.sprite = new Image();

    this.sprite.src = 'public/images/sprites/fireball2.png';
    this.sprite.onload = function () {
      self.spriteLoaded = true;
    };
  };

  Projectile.prototype.setPosition = function (x, y) {
    this.setX(x);
    this.setY(y);
  };

  Projectile.prototype.setX = function (x) {
    this.x = x;
  };

  Projectile.prototype.setY = function (y) {
    this.y = y;
  };

  Projectile.prototype.render = function (context) {
    // ctx.drawImage(sprites,srcX,srcY,srcW,srcH,destX,destY,destW,destH);
    if (this.spriteLoaded) {
      context.drawImage(this.sprite, 0, 290, Projectile.width, Projectile.height, this.x, this.y, Projectile.width, Projectile.height);
    }
  };

  // Make Projectile globally available
  window.Projectile = Projectile;

}());
