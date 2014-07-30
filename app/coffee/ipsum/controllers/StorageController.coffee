define ->

	class StorageController

		saveItems: [
			"content"
			"settings"
		]

		data: []

		init: ->
			@.setData()

		setData: ->
			i = 0
			while i < @.saveItems.length
				@.data.push( ipsum[@.saveItems[i]])
				i++

			@.retrieve()
			@.addListeners()

		addListeners: ->
			document.getElementsByTagName("menu")[0].addEventListener "keyup" , =>
				@.update()

			document.getElementsByTagName("menu")[0].addEventListener "click" , =>
				@.update()

		update: ->
			clearTimeout @.timer
			@.timer = setTimeout ->
				ipsum.storage.save()
				ipsum.builder.run()
			, 1000

		save: =>
			i = 0
			while i < @.data.length
				for property of @.data[i].data
					value = @.data[i].data[property]
					localStorage.setItem( "n#{i}:#{property}" , value )
				i++

		retrieve: =>
			i = 0
			while i < @.data.length
				for property of @.data[i].data
					stored = localStorage.getItem( "n#{i}:#{property}" )
					# console.log "#{property}: #{stored}"
					if stored isnt null then @.data[i].data[property] = stored
				i++