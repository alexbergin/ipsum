define(function() {
  var ContentView;
  return ContentView = (function() {
    function ContentView() {}

    ContentView.prototype.data = {
      useDefault: "true",
      customText: "",
      genType: "paragraphs",
      genAmount: 1
    };

    ContentView.prototype.el = {
      sourceDefault: null,
      sourceCustom: null,
      sourceTextarea: null,
      lengthParagraphs: null,
      lengthWords: null,
      lengthLetters: null,
      lengthAmount: null
    };

    ContentView.prototype.init = function() {
      this.getElements();
      this.addListeners();
      return this.setup();
    };

    ContentView.prototype.getElements = function() {
      var element, _results;
      _results = [];
      for (element in this.el) {
        _results.push(this.el[element] = document.getElementById(element));
      }
      return _results;
    };

    ContentView.prototype.addListeners = function() {
      this.el.sourceDefault.addEventListener("click", (function(_this) {
        return function() {
          return _this.sourceSet(_this.el.sourceDefault);
        };
      })(this));
      this.el.sourceCustom.addEventListener("click", (function(_this) {
        return function() {
          return _this.sourceSet(_this.el.sourceCustom);
        };
      })(this));
      this.el.sourceTextarea.addEventListener("click", (function(_this) {
        return function() {
          return _this.sourceSet(_this.el.sourceTextarea);
        };
      })(this));
      this.el.sourceTextarea.addEventListener("keyup", (function(_this) {
        return function() {
          return _this.sourceSet(_this.el.sourceTextarea);
        };
      })(this));
      this.el.lengthParagraphs.addEventListener("click", (function(_this) {
        return function() {
          return _this.lengthTypeSet(_this.el.lengthParagraphs);
        };
      })(this));
      this.el.lengthWords.addEventListener("click", (function(_this) {
        return function() {
          return _this.lengthTypeSet(_this.el.lengthWords);
        };
      })(this));
      this.el.lengthLetters.addEventListener("click", (function(_this) {
        return function() {
          return _this.lengthTypeSet(_this.el.lengthLetters);
        };
      })(this));
      return this.el.lengthAmount.addEventListener("keyup", (function(_this) {
        return function() {
          return _this.lengthSet(_this.el.lengthAmount);
        };
      })(this));
    };

    ContentView.prototype.setup = function() {
      this.el.sourceTextarea.value = this.data.customText;
      this.el.lengthAmount.value = this.data.genAmount;
      if (this.data.useDefault === "true") {
        this.sourceSet(this.el.sourceDefault);
      } else {
        this.sourceSet(this.el.sourceCustom);
      }
      switch (this.data.genType) {
        case "paragraphs":
          return this.lengthTypeSet(this.el.lengthParagraphs);
        case "words":
          return this.lengthTypeSet(this.el.lengthWords);
        case "letters":
          return this.lengthTypeSet(this.el.lengthLetters);
      }
    };

    ContentView.prototype.sourceSet = function(target) {
      switch (target) {
        case this.el.sourceDefault:
          this.el.sourceDefault.classList.remove("inactive");
          this.el.sourceCustom.classList.add("inactive");
          this.data.useDefault = "true";
          break;
        case this.el.sourceCustom:
          this.el.sourceDefault.classList.add("inactive");
          this.el.sourceCustom.classList.remove("inactive");
          this.data.useDefault = "false";
          break;
        case this.el.sourceTextarea:
          this.el.sourceDefault.classList.add("inactive");
          this.el.sourceCustom.classList.remove("inactive");
          this.data.useDefault = "false";
      }
      return this.data.customText = this.el.sourceTextarea.value;
    };

    ContentView.prototype.lengthTypeSet = function(target) {
      switch (target) {
        case this.el.lengthParagraphs:
          this.el.lengthParagraphs.classList.remove("inactive");
          this.el.lengthWords.classList.add("inactive");
          this.el.lengthLetters.classList.add("inactive");
          this.data.genType = "paragraphs";
          break;
        case this.el.lengthWords:
          this.el.lengthParagraphs.classList.add("inactive");
          this.el.lengthWords.classList.remove("inactive");
          this.el.lengthLetters.classList.add("inactive");
          this.data.genType = "words";
          break;
        case this.el.lengthLetters:
          this.el.lengthParagraphs.classList.add("inactive");
          this.el.lengthWords.classList.add("inactive");
          this.el.lengthLetters.classList.remove("inactive");
          this.data.genType = "letters";
      }
      return this.lengthSet(this.el.lengthAmount);
    };

    ContentView.prototype.lengthSet = function(target) {
      switch (this.data.genType) {
        case "paragraphs":
          target.value = Math.min(100, Math.max(0, target.value));
          break;
        case "words":
          target.value = Math.min(150000, Math.max(0, target.value));
          break;
        case "letters":
          target.value = Math.min(1200000, Math.max(0, target.value));
      }
      if (isNaN(target.value)) {
        target.value = 0;
      }
      return this.data.genAmount = target.value;
    };

    return ContentView;

  })();
});

//# sourceMappingURL=ContentView.js.map
