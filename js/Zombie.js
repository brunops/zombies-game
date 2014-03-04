/* global Entity */
(function() {
  'use strict';

  function Zombie(x, y, speed) {
    Entity.call(this,
      x,
      y,
      32,
      32,
      'public/images/sprites/zombies.png',
      [[0, 32], [32, 32], [64, 32], [32, 32]],
      220,
      speed || (12 + Math.random() * 15)
    );

    // there are 8 different zombie types in sprites/zombie.png
    this.zombieType = Math.floor(Math.random() * 8);
  }

  Zombie.prototype = new Entity();
  Zombie.prototype.constructor = Zombie;

  // Define frames position for each type of possible zombie
  Zombie.framesPosition = [
    [[0, 32], [32, 32], [64, 32], [32, 32]],
    [[96, 32], [128, 32], [160, 32], [128, 32]],
    [[192, 32], [224, 32], [256, 32], [224, 32]],
    [[288, 32], [320, 32], [352, 32], [320, 32]],
    [[0, 160], [32, 160], [64, 160], [32, 160]],
    [[96, 160], [128, 160], [160, 160], [128, 160]],
    [[192, 160], [224, 160], [256, 160], [224, 160]],
    [[288, 160], [320, 160], [352, 160], [320, 160]]
  ];

  // Override render method from Entity to consider zombie type
  Zombie.prototype.render = function (context) {
    if (Zombie.spriteLoaded) {
      context.drawImage(
        Zombie.sprite,
        Zombie.framesPosition[this.zombieType][this.currentFrame][0],
        Zombie.framesPosition[this.zombieType][this.currentFrame][1],
        Zombie.width,
        Zombie.height,
        this.x,
        this.y,
        Zombie.renderedWidth,
        Zombie.renderedHeight);
    }
  };

  // Override update method from Entity yo consider zombie type
  Zombie.prototype.update = function (now) {
    now = now || Date.now();

    if (now - this.lastFrameUpdate > Zombie.frameCooldown) {
      this.currentFrame += 1;
      this.lastFrameUpdate = now;
      if (Zombie.framesPosition[0].length <= this.currentFrame) {
        this.currentFrame = 0;
      }
    }
  };

  // Make Zombie available globally
  window.Zombie = Zombie;

}());
