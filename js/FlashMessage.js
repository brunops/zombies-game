(function () {
  'use strict';

  function FlashMessage(message, x, y, color, font, size) {
    this.init(message, x, y, color, font, size);
  }

  FlashMessage.prototype.init = function (message, x, y, color, font, size) {
    this.message = message;
    this.x = x;
    this.y = y;
    this.color = color || '#fff';
    this.font = font || 'Helvetica';
    this.size = size || '14px';

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
