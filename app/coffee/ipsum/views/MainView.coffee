define ->

	class MainView

		el:
			copy: null

		init: ->
			@.getElements()
			@.addListeners()

		getElements: ->
			@.el.copy = document.getElementsByTagName("main")[0].getElementsByTagName("p")[0]

		addListeners: ->
			@.el.copy.addEventListener "click" , =>
				@.selectAll()

		selectAll: ->
			@.el.copy.innerText = @.el.copy.innerHTML
			if document.selection
				range = document.body.createTextRange()
				range.moveToElementText( @.el.copy  )
				range.select()
			else
				range = document.createRange()
				range.selectNodeContents( @.el.copy )
				window.getSelection().removeAllRanges()
				window.getSelection().addRange( range )