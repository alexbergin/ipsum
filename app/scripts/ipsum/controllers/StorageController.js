var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(function() {
  var StorageController;
  return StorageController = (function() {
    function StorageController() {
      this.retrieve = __bind(this.retrieve, this);
      this.save = __bind(this.save, this);
    }

    StorageController.prototype.saveItems = ["content", "settings"];

    StorageController.prototype.data = [];

    StorageController.prototype.init = function() {
      return this.setData();
    };

    StorageController.prototype.setData = function() {
      var i;
      i = 0;
      while (i < this.saveItems.length) {
        this.data.push(ipsum[this.saveItems[i]]);
        i++;
      }
      this.retrieve();
      return this.addListeners();
    };

    StorageController.prototype.addListeners = function() {
      document.getElementsByTagName("menu")[0].addEventListener("keyup", (function(_this) {
        return function() {
          return _this.update();
        };
      })(this));
      return document.getElementsByTagName("menu")[0].addEventListener("click", (function(_this) {
        return function() {
          return _this.update();
        };
      })(this));
    };

    StorageController.prototype.update = function() {
      clearTimeout(this.timer);
      return this.timer = setTimeout(function() {
        ipsum.storage.save();
        return ipsum.builder.run();
      }, 1000);
    };

    StorageController.prototype.save = function() {
      var i, property, value, _results;
      i = 0;
      _results = [];
      while (i < this.data.length) {
        for (property in this.data[i].data) {
          value = this.data[i].data[property];
          localStorage.setItem("n" + i + ":" + property, value);
        }
        _results.push(i++);
      }
      return _results;
    };

    StorageController.prototype.retrieve = function() {
      var i, property, stored, _results;
      i = 0;
      _results = [];
      while (i < this.data.length) {
        for (property in this.data[i].data) {
          stored = localStorage.getItem("n" + i + ":" + property);
          if (stored !== null) {
            this.data[i].data[property] = stored;
          }
        }
        _results.push(i++);
      }
      return _results;
    };

    return StorageController;

  })();
});

//# sourceMappingURL=StorageController.js.map
