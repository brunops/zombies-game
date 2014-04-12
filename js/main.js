/* global require */
window.requestAnimFrame = (function () {
  'use strict';
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         function (callback) {
           window.setTimeout(callback, 1000 / 60);
         };
})();

var Game = require('./Game');

(function () {
  'use strict';

  Game.init();

  var before = Date.now();
  window.requestAnimFrame(function update() {
    var now = Date.now(),
        delta = now - before,
        modifier = delta / 1000;

    Game.update(modifier < 1 ? modifier : 0);
    Game.render();

    before = now;
    window.requestAnimFrame(update);
  });
}());
