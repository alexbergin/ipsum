define(function() {
  var SettingsView;
  return SettingsView = (function() {
    function SettingsView() {}

    SettingsView.prototype.data = {
      zeroWidthSpace: "true",
      splitType: "words",
      linesBetween: 1
    };

    SettingsView.prototype.el = {
      zeroYes: null,
      zeroNo: null,
      splitParagraphs: null,
      splitSentences: null,
      splitWords: null,
      lines: null
    };

    SettingsView.prototype.init = function() {
      this.getElements();
      this.addListeners();
      return this.setup();
    };

    SettingsView.prototype.getElements = function() {
      var element, _results;
      _results = [];
      for (element in this.el) {
        _results.push(this.el[element] = document.getElementById(element));
      }
      return _results;
    };

    SettingsView.prototype.addListeners = function() {
      return this.el.lines.addEventListener("keyup", (function(_this) {
        return function() {
          return _this.setSplitAmount(_this.el.lines);
        };
      })(this));
    };

    SettingsView.prototype.setup = function() {
      return this.el.lines.value = this.data.linesBetween;
    };

    SettingsView.prototype.setZero = function(target) {
      if (target === this.el.zeroYes) {
        this.el.zeroYes.classList.remove("inactive");
        this.el.zeroNo.classList.add("inactive");
        return this.data.zeroWidthSpace = "true";
      } else {
        this.el.zeroYes.classList.add("inactive");
        this.el.zeroNo.classList.remove("inactive");
        return this.data.zeroWidthSpace = "false";
      }
    };

    SettingsView.prototype.setSplitAmount = function(target) {
      target.value = Math.min(100, Math.max(0, target.value));
      if (isNaN(target.value)) {
        target.value = 0;
      }
      return this.data.linesBetween = target.value;
    };

    return SettingsView;

  })();
});

//# sourceMappingURL=SettingsView.js.map
