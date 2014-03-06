(function () {
  'use strict';

  function FlashMessage(message, x, y, color, size, font) {
    this.init(message, x, y, color, size, font);
  }

  FlashMessage.prototype.init = function (message, x, y, duration, color, size, font) {
    this.message = message;
    this.x = x;
    this.y = y;
    this.duration = duration;
    this.color = color || '#fff';
    this.size = size || '14px';
    this.font = font || 'Helvetica';

    this.createdAt = Date.now();
  };

  FlashMessage.prototype.render = function (context) {
    context.fillStyle = this.color;
    context.font = [this.size, this.font].join(' ');
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillText(this.message, this.x, this.y);
  };

  // make FlashMessage globally available
  window.FlashMessage = FlashMessage;
}());
