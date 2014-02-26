/* global Player */

(function () {
  'use strict';

  var Game = {
    init: function () {
      Game.keysDown = {};

      Game.createCanvas();
      Game.loadBackground();

      Game.player = new Player(50, 50);

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
          horizontalBoundary = 35;

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
    },

    render: function () {
      if (Game.backgroundReady) {
        Game.context.drawImage(Game.backgroundImg, 0, 0);
      }

      Game.player.render(Game.context);
    }
  };

  // expose Game globally
  window.Game = Game;
}());
