define(function() {
  var BuildController;
  return BuildController = (function() {
    function BuildController() {}

    BuildController.prototype.data = {
      "default": "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipiscing velit, sed quia non numquam do eius modi tempora incididunt, ut labore et dolore magnam aliquam quaerat voluptatem.\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat",
      puncuationMarks: ["!", ".", ".", ".", ".", "?", "?"],
      custom: ""
    };

    BuildController.prototype.settings = {
      useDefault: true,
      buildLength: 1,
      buildUnit: "paragraphs",
      useZeroSpace: true,
      splitType: "words",
      lines: 1
    };

    BuildController.prototype.storage = {
      string: "",
      stringbank: [],
      linebreak: /(\r\n|\n|\r)/gm,
      puncuation: /[\.,-\/#!?$%\^&\*;:{}=\-_`~()]/g,
      sentences: /[^\.!\?]+[\.!\?]+/g,
      clearMarks: /[^a-zA-Z0-9\s\:]*/,
      singlespace: /\s{2,}/g,
      muliline: /\n\s*\n/g
    };

    BuildController.prototype.init = function() {
      return this.run();
    };

    BuildController.prototype.run = function() {
      this.loadSettings();
      this.getSource();
      this.splitStrings();
      this.compile();
      return this.render();
    };

    BuildController.prototype.parseBool = function(string) {
      if (string.toLowerCase() === "true") {
        return true;
      } else {
        return false;
      }
    };

    BuildController.prototype.loadSettings = function() {
      this.settings.useDefault = this.parseBool(ipsum.content.data.useDefault);
      this.data.custom = ipsum.content.data.customText;
      this.settings.buildUnit = ipsum.content.data.genType;
      this.settings.buildLength = parseInt(ipsum.content.data.genAmount);
      this.settings.useZeroSpace = this.parseBool(ipsum.settings.data.zeroWidthSpace);
      this.settings.splitType = ipsum.settings.data.splitType;
      return this.settings.lines = parseInt(ipsum.settings.data.linesBetween);
    };

    BuildController.prototype.getSource = function() {
      if (this.settings.useDefault === true) {
        return this.storage.string = this.data["default"];
      } else {
        return this.storage.string = this.data.custom;
      }
    };

    BuildController.prototype.splitStrings = function() {
      var temp;
      temp = this.storage.string;
      switch (this.settings.splitType) {
        case "words":
          temp = temp.replace(this.storage.muliline, "\n");
          temp = temp.replace(this.storage.linebreak, " ");
          temp = temp.replace(this.storage.clearMarks, "");
          temp = temp.replace(this.storage.puncuation, " ");
          temp = temp.replace(this.storage.singlespace, " ");
          return this.storage.stringbank = temp.split(" ");
        case "sentences":
          temp = temp.replace(this.storage.muliline, "\n");
          temp = temp.replace(this.storage.linebreak, " ");
          temp = temp.replace(this.storage.singlespace, " ");
          return this.storage.stringbank = temp.match(this.storage.sentences);
        case "paragraphs":
          temp = temp.replace(this.storage.muliline, "\n");
          return this.storage.stringbank = temp.split("\n");
      }
    };

    BuildController.prototype.buildSentence = function() {};

    BuildController.prototype.buildParagraph = function() {};

    BuildController.prototype.compile = function() {
      var c, cap, checks, chosen, complete, i, s;
      complete = false;
      s = this.storage.stringbank;
      c = {
        output: "",
        complete: false,
        letters: {
          total: 0
        },
        words: {
          total: 0
        },
        sentence: {
          total: 0,
          length: 0,
          goal: 3 + Math.floor(Math.random() * 30),
          min: 3,
          max: 30
        },
        paragraph: {
          total: 0,
          length: 0,
          goal: 2 + Math.floor(Math.random() * 8),
          min: 2,
          max: 8
        },
        past: {
          words: [],
          sentences: [],
          paragraphs: []
        }
      };
      if (s.length > 8) {
        cap = true;
        while (complete === false) {
          chosen = "";
          checks = c.past.words.length;
          while (chosen === "" || c.past.words.indexOf(chosen) !== -1 || checks < 0) {
            chosen = s[Math.floor(Math.random() * s.length)].toLowerCase();
          }
          if (c.past.words.length > 6) {
            c.past.words.pop();
          }
          c.past.words.push(chosen);
          if (cap === true) {
            chosen = chosen.charAt(0).toUpperCase() + chosen.slice(1);
            cap = false;
          }
          c.output += "" + chosen;
          c.sentence.length++;
          c.letters.total += chosen.length;
          c.words.total++;
          if (c.sentence.length >= c.sentence.goal) {
            c.sentence.length = 0;
            c.paragraph.length++;
            c.sentence.goal = c.sentence.min + Math.floor(Math.random() * (c.sentence.max - c.sentence.min));
            c.output += this.data.puncuationMarks[Math.floor(Math.random() * this.data.puncuationMarks.length)];
            cap = true;
          }
          if (c.paragraph.length >= c.paragraph.goal) {
            c.paragraph.total++;
            c.paragraph.length = 0;
            c.paragraph.goal = c.paragraph.min + Math.floor(Math.random() * (c.paragraph.max - c.paragraph.min));
            i = 0;
            while (i < this.settings.lines) {
              c.output += "\n";
              i++;
            }
          } else {
            c.output += " ";
          }
          switch (this.settings.buildUnit) {
            case "paragraphs":
              if (c.paragraph.total >= this.settings.buildLength) {
                complete = true;
              }
              break;
            case "words":
              if (c.words.total >= this.settings.buildLength) {
                complete = true;
              }
              break;
            case "letters":
              if (c.letters.total >= this.settings.buildLength) {
                complete = true;
              }
          }
        }
      }
      if (c.output.substring(c.output.length - 1) !== "!" && c.output.substring(c.output.length - 1) !== "." && c.output.substring(c.output.length - 1) !== "?" && c.output.substring(c.output.length - 1) !== "\n") {
        c.output = c.output.substring(0, c.output.length - 1);
        c.output += this.data.puncuationMarks[Math.floor(Math.random() * this.data.puncuationMarks.length)];
      }
      if (this.settings.useZeroSpace === true) {
        c.output = "&nbsp;" + c.output;
      }
      return this.storage.string = c.output;
    };

    BuildController.prototype.render = function() {
      return document.getElementsByTagName("main")[0].getElementsByTagName("p")[0].innerHTML = this.storage.string;
    };

    return BuildController;

  })();
});

//# sourceMappingURL=BuildController.js.map
