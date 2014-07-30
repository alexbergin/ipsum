define(["ipsum/controllers/BuildController", "ipsum/controllers/StorageController", "ipsum/views/ContentView", "ipsum/views/MainView", "ipsum/views/SettingsView"], function(BuildController, StorageController, ContentView, MainView, SettingsView) {
  var App;
  return App = function() {
    window.ipsum = {
      builder: new BuildController,
      storage: new StorageController,
      content: new ContentView,
      main: new MainView,
      settings: new SettingsView,
      start: function() {
        var i, run, _results;
        run = ["storage", "content", "main", "settings", "builder"];
        i = 0;
        _results = [];
        while (i < run.length) {
          ipsum[run[i]].init();
          _results.push(i++);
        }
        return _results;
      }
    };
    return ipsum.start();
  };
});

//# sourceMappingURL=App.js.map
