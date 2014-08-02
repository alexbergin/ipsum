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
			# @.el.zeroYes.addEventListener "click" , =>
			# 	@.setZero( @.el.zeroYes )

			# @.el.zeroNo.addEventListener "click" , =>
			# 	@.setZero( @.el.zeroNo )

			@.el.lines.addEventListener "keyup" , =>
				@.setSplitAmount( @.el.lines )

		setup: ->
			# if @.data.zeroWidthSpace is "true"
			# 	@.setZero( @.el.zeroYes )
			# else
			# 	@.setZero( @.el.zeroNo )

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

		setSplitAmount: ( target ) ->
			target.value = Math.min( 100 , Math.max( 0 , target.value ))
			if isNaN( target.value ) then target.value = 0
			@.data.linesBetween = target.value