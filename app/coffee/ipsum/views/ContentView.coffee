define ->

	class ContentView

		# define data for storage/recall
		data:
			useDefault: "true"
			customText: ""
			genType: "paragraphs"
			genAmount: 1

		# use element id's
		el:
			sourceDefault: null
			sourceCustom: null
			sourceTextarea: null
			lengthParagraphs: null
			lengthWords: null
			lengthLetters: null
			lengthAmount: null

		init: ->
			@.getElements()
			@.addListeners()
			@.setup()

		getElements: ->

			# retrieve elements based on property name to id
			for element of @.el
				@.el[element] = document.getElementById element

		addListeners: ->

			# set the source of the content
			@.el.sourceDefault.addEventListener "click" , =>
				@.sourceSet( @.el.sourceDefault )

			@.el.sourceCustom.addEventListener "click" , =>
				@.sourceSet( @.el.sourceCustom )

			@.el.sourceTextarea.addEventListener "click" , =>
				@.sourceSet( @.el.sourceTextarea )

			@.el.sourceTextarea.addEventListener "keyup" , =>
				@.sourceSet( @.el.sourceTextarea )

			# units of length
			@.el.lengthParagraphs.addEventListener "click" , =>
				@.lengthTypeSet( @.el.lengthParagraphs )

			@.el.lengthWords.addEventListener "click" , =>
				@.lengthTypeSet( @.el.lengthWords )

			@.el.lengthLetters.addEventListener "click" , =>
				@.lengthTypeSet( @.el.lengthLetters )

			# actual amount of unit
			@.el.lengthAmount.addEventListener "keyup" , =>
				@.lengthSet( @.el.lengthAmount )

		setup: ->
			@.el.sourceTextarea.value = @.data.customText
			@.el.lengthAmount.value = @.data.genAmount

			if @.data.useDefault is "true"
				@.sourceSet( @.el.sourceDefault )
			else
				@.sourceSet( @.el.sourceCustom )

			switch @.data.genType
				when "paragraphs" then @.lengthTypeSet( @.el.lengthParagraphs )
				when "words" then @.lengthTypeSet( @.el.lengthWords )
				when "letters" then @.lengthTypeSet( @.el.lengthLetters )

		sourceSet: ( target ) ->
			switch target
				when @.el.sourceDefault
					@.el.sourceDefault.classList.remove "inactive"
					@.el.sourceCustom.classList.add "inactive"
					@.data.useDefault = "true"

				when @.el.sourceCustom
					@.el.sourceDefault.classList.add "inactive"
					@.el.sourceCustom.classList.remove "inactive"
					@.data.useDefault = "false"

				when @.el.sourceTextarea
					@.el.sourceDefault.classList.add "inactive"
					@.el.sourceCustom.classList.remove "inactive"
					@.data.useDefault = "false"

			@.data.customText = @.el.sourceTextarea.value


		lengthTypeSet: ( target ) ->
			switch target
				when @.el.lengthParagraphs
					@.el.lengthParagraphs.classList.remove "inactive"
					@.el.lengthWords.classList.add "inactive"
					@.el.lengthLetters.classList.add "inactive"
					@.data.genType = "paragraphs"

				when @.el.lengthWords
					@.el.lengthParagraphs.classList.add "inactive"
					@.el.lengthWords.classList.remove "inactive"
					@.el.lengthLetters.classList.add "inactive"
					@.data.genType = "words"

				when @.el.lengthLetters
					@.el.lengthParagraphs.classList.add "inactive"
					@.el.lengthWords.classList.add "inactive"
					@.el.lengthLetters.classList.remove "inactive"
					@.data.genType = "letters"

			@.lengthSet( @.el.lengthAmount )

		lengthSet: ( target ) ->
			switch @.data.genType
				when "paragraphs" then target.value = Math.min( 100 , Math.max( 0 , target.value ))
				when "words" then target.value = Math.min( 150000 , Math.max( 0 , target.value ))
				when "letters" then target.value = Math.min( 1200000, Math.max( 0 , target.value ))
			
			if isNaN( target.value ) then target.value = 0
			@.data.genAmount = target.value