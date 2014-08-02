define(function() {
  var MainView;
  return MainView = (function() {
    function MainView() {}

    MainView.prototype.el = {
      copy: null
    };

    MainView.prototype.init = function() {
      this.getElements();
      return this.addListeners();
    };

    MainView.prototype.getElements = function() {
      return this.el.copy = document.getElementsByTagName("main")[0].getElementsByTagName("p")[0];
    };

    MainView.prototype.addListeners = function() {
      return this.el.copy.addEventListener("click", (function(_this) {
        return function() {
          return _this.selectAll();
        };
      })(this));
    };

    MainView.prototype.selectAll = function() {
      var range;
      this.el.copy.innerText = this.el.copy.innerHTML;
      if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(this.el.copy);
        return range.select();
      } else {
        range = document.createRange();
        range.selectNodeContents(this.el.copy);
        window.getSelection().removeAllRanges();
        return window.getSelection().addRange(range);
      }
    };

    return MainView;

  })();
});

//# sourceMappingURL=MainView.js.map
