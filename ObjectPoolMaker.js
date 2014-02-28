(function () {
  'use strict';

  function ObjectPoolMaker(Constructor, size) {
    var objectPool = [],
        nextAvailableIndex = 0,
        poolSize = 1;

    if (size) {
      expandPool(size);
    }

    function expandPool(newSize) {
      var i;

      for (i = 0; i < newSize - poolSize; i++) {
        objectPool.push(new Constructor());
      }

      poolSize = newSize;
    }

    return {
      create: function () {
        if (nextAvailableIndex >= poolSize - 1) {
          expandPool(poolSize * 2);
        }

        var obj = objectPool[nextAvailableIndex];
        obj.index = nextAvailableIndex;
        nextAvailableIndex += 1;
        Constructor.apply(obj, arguments);

        return obj;
      },

      destroy: function (obj) {
        nextAvailableIndex -= 1;

        var lastObj = objectPool[nextAvailableIndex],
            lastObjIndex = lastObj.index;

        objectPool[nextAvailableIndex] = obj;
        objectPool[obj.index] = lastObj;

        lastObj.index = obj.index;
        obj.index = lastObjIndex;
      },

      size: function () {
        return nextAvailableIndex;
      },

      objectPool: function () {
        return objectPool;
      }
    };
  }


  // make ObjectPoolMaker available globally
  window.ObjectPoolMaker = ObjectPoolMaker;
}());
