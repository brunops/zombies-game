/* global Game */
(function () {
  'use strict';

  Game.init();

  var then = Date.now();
  setInterval(function() {
    var now = Date.now(),
        delta = now - then;

    Game.update(delta / 1000);
    Game.render();

    then = now;
  }, 1000 / 60);
}());
