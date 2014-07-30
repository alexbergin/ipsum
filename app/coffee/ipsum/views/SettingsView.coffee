define ->

	class SettingsView

		# define data for storage/recall
		data:
			zeroWidthSpace: "true"
			splitType: "words"
			linesBetween: 1

		# use element id's
		el:
			zeroYes: null
			zeroNo: null
			splitParagraphs: null
			splitSentences: null
			splitWords: null
			lines: null

		init: ->
			@.getElements()
			@.addListeners()
			@.setup()

		getElements: ->	

			# retrieve elements based on property name to id
			for element of @.el
				@.el[element] = document.getElementById element

		addListeners: ->
			@.el.zeroYes.addEventListener "click" , =>
				@.setZero( @.el.zeroYes )

			@.el.zeroNo.addEventListener "click" , =>
				@.setZero( @.el.zeroNo )

			@.el.splitParagraphs.addEventListener "click" , =>
				@.setSplitType( @.el.splitParagraphs )

			@.el.splitSentences.addEventListener "click" , =>
				@.setSplitType( @.el.splitSentences )

			@.el.splitWords.addEventListener "click" , =>
				@.setSplitType( @.el.splitWords )

			@.el.lines.addEventListener "keyup" , =>
				@.setSplitAmount( @.el.lines )

		setup: ->
			if @.data.zeroWidthSpace is "true"
				@.setZero( @.el.zeroYes )
			else
				@.setZero( @.el.zeroNo )

			switch @.data.splitType
				when "paragraphs" then @.setSplitType( @.el.splitParagraphs )
				when "sentences" then @.setSplitType( @.el.splitSentences )
				when "words" then @.setSplitType( @.el.splitWords )

			@.el.lines.value = @.data.linesBetween

		setZero: ( target ) ->
			if target is @.el.zeroYes
				@.el.zeroYes.classList.remove "inactive"
				@.el.zeroNo.classList.add "inactive"
				@.data.zeroWidthSpace = "true"
			else
				@.el.zeroYes.classList.add "inactive"
				@.el.zeroNo.classList.remove "inactive"
				@.data.zeroWidthSpace = "false"

		setSplitType: ( target ) ->
			switch target
				when @.el.splitParagraphs
					@.el.splitParagraphs.classList.remove "inactive"
					@.el.splitSentences.classList.add "inactive"
					@.el.splitWords.classList.add "inactive"
					@.data.splitType = "paragraphs"

				when @.el.splitSentences
					@.el.splitParagraphs.classList.add "inactive"
					@.el.splitSentences.classList.remove "inactive"
					@.el.splitWords.classList.add "inactive"
					@.data.splitType = "sentences"

				when @.el.splitWords
					@.el.splitParagraphs.classList.add "inactive"
					@.el.splitSentences.classList.add "inactive"
					@.el.splitWords.classList.remove "inactive"
					@.data.splitType = "words"

		setSplitAmount: ( target ) ->
			target.value = Math.min( 100 , Math.max( 0 , target.value ))
			if isNaN( target.value ) then target.value = 0
			@.data.linesBetween = target.value