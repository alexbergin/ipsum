define [

	"ipsum/controllers/BuildController"
	"ipsum/controllers/StorageController"
	"ipsum/views/ContentView"
	"ipsum/views/MainView"
	"ipsum/views/SettingsView"

] , (

	BuildController
	StorageController
	ContentView
	MainView
	SettingsView

) ->

	App = ->
		window.ipsum =

			# controllers
			builder: new BuildController
			storage: new StorageController

			# views
			content: new ContentView
			main: new MainView
			settings: new SettingsView

			# run the application
			start: ->
			
				# array of properties to run
				run = [
					"storage"
					"content"
					"main"
					"settings"
					"builder"
				]

				# run init on each
				i = 0
				while i < run.length
					ipsum[ run[i] ].init()
					i++

		do ipsum.start