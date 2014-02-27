/* global Player, Projectile, Zombie */

(function () {
  'use strict';

  var Game = {
    init: function () {
      Game.gameTime = 0;

      Game.keysDown = {};

      Game.createCanvas();
      Game.loadBackground();

      Game.player = new Player(
        Game.canvas.width / 2 - Player.width / 2,
        Game.canvas.height / 2 - Player.height / 2
      );

      Game.projectiles = [];
      Game.enemies = [];

      Game.lastProjectilesCollector = Date.now();
      Game.lastEnemiesCollector = Date.now();

      Game.lastProjectileTime = Date.now();
      Game.projectileCooldown = 150;

      Game.bind();
    },

    bind: function () {
      document.addEventListener('keydown', function (e) {
        Game.keysDown[e.keyCode] = true;
      }, false);

      document.addEventListener('keyup', function (e) {
        delete Game.keysDown[e.keyCode];
      }, false);
    },

    createCanvas: function () {
      Game.canvas = document.createElement('canvas');
      Game.context = Game.canvas.getContext('2d');

      Game.canvas.width = 512;
      Game.canvas.height = 480;

      document.body.appendChild(Game.canvas);
    },

    loadBackground: function () {
      Game.backgroundReady = false;

      Game.backgroundImg = new Image();
      Game.backgroundImg.src = 'public/images/background.png';

      Game.backgroundImg.onload = function () {
        Game.backgroundReady = true;
      };
    },

    update: function (modifier) {
      var verticalBoundary = 35,
          horizontalBoundary = 35,
          i,
          entitiesOutOfBounds = 0,
          stopCount = false,
          now = Date.now();

      Game.gameTime += modifier;

      // UP
      if (Game.keysDown[38] && Game.player.y > verticalBoundary) {
        Game.player.setY(Game.player.y - (Game.player.speed * modifier));
      }

      // DOWN
      if (Game.keysDown[40] && Game.player.y < Game.canvas.height - verticalBoundary - Player.height) {
        Game.player.setY(Game.player.y + (Game.player.speed * modifier));
      }

      // RIGHT
      if (Game.keysDown[39] && Game.player.x < Game.canvas.width - horizontalBoundary - Player.width) {
        Game.player.setX(Game.player.x + (Game.player.speed * modifier));
      }

      // LEFT
      if (Game.keysDown[37] && Game.player.x > horizontalBoundary) {
        Game.player.setX(Game.player.x - (Game.player.speed * modifier));
      }

      // update all projectiles
      for (i = 0; i < Game.projectiles.length; i++) {
        Game.projectiles[i].setX(Game.projectiles[i].x + (Game.projectiles[i].speed * modifier));

        // delete projectile if out of the scene
        if (!stopCount && Game.projectiles[i].x > Game.canvas.width) {
          entitiesOutOfBounds++;
        }
        else {
          stopCount = true;
        }
      }
      if (entitiesOutOfBounds && now - Game.lastProjectilesCollector > 1000) {
        Game.projectiles.splice(0, entitiesOutOfBounds);
        Game.lastProjectilesCollector = now;
      }

      // SPACE - shoot!
      if (Game.keysDown[32]) {
        // prevent spamming projectiles
        if (now - Game.lastProjectileTime > Game.projectileCooldown) {
          Game.projectiles.push(new Projectile(Game.player.x, Game.player.y + (Player.height / 2) - (Projectile.height / 2)));
          Game.lastProjectileTime = now;
        }
      }

      // update all enemies
      stopCount = false;
      entitiesOutOfBounds = 0;
      for (i = 0; i < Game.enemies.length; i++) {
        Game.enemies[i].setX(Game.enemies[i].x - (Game.enemies[i].speed * modifier));

        // delete projectile if out of the scene
        // Splice zombies out of bounds only once
        // splicing many times is stupid and moving big arrays around hurts performance
        if (!stopCount && Game.enemies[i].x + Zombie.width < 0) {
          entitiesOutOfBounds++;
        }
        else {
          stopCount = true;
        }
      }
      if (entitiesOutOfBounds && now - Game.lastEnemiesCollector > 1000) {
        Game.enemies.splice(0, entitiesOutOfBounds);
        Game.lastEnemiesCollector = now;
      }

      // Create some enemies
      // It gets harder as time goes by according to the equation: 1 - .998^Game.gameTime
      if (Math.random() < 1 - Math.pow(0.995, Game.gameTime)) {
        Game.enemies.push(new Zombie(
          Game.canvas.width,
          Math.random() * (Game.canvas.height - Zombie.height - (2 * verticalBoundary)) + verticalBoundary
        ));
      }
    },

    render: function () {
      var i;

      if (Game.backgroundReady) {
        Game.context.drawImage(Game.backgroundImg, 0, 0);
      }

      for (i = 0; i < Game.projectiles.length; ++i) {
        Game.projectiles[i].render(Game.context);
      }

      for (i = 0; i < Game.enemies.length; ++i) {
        Game.enemies[i].render(Game.context);
      }

      Game.player.render(Game.context);
    }
  };

  // expose Game globally
  window.Game = Game;
}());
