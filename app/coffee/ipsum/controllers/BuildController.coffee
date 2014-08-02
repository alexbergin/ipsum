define ->

	class BuildController

		data:
			default: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipiscing velit, sed quia non numquam do eius modi tempora incididunt, ut labore et dolore magnam aliquam quaerat voluptatem.\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
			puncuationMarks: ["!",".",".",".",".","?","?"]
			custom: ""

		settings:
			useDefault: true
			buildLength: 1
			buildUnit: "paragraphs"
			useZeroSpace: true
			splitType: "words"
			lines: 1

		storage:
			string: ""
			stringbank: []
			linebreak: /(\r\n|\n|\r)/gm
			puncuation: /[\.,-\/#!?$%\^&\*;:{}=\-_`~()]/g
			sentences: /[^\.!\?]+[\.!\?]+/g
			clearMarks: /[^a-zA-Z0-9\s\:]*/
			singlespace: /\s{2,}/g
			muliline: /\n\s*\n/g

		init: ->
			@.run()

		run: ->
			@.loadSettings()
			@.getSource()
			@.splitStrings()
			@.compile()
			@.render()

		parseBool: ( string ) ->
			if string.toLowerCase() is "true" then return true else return false

		loadSettings: ->
			@.settings.useDefault = @.parseBool(ipsum.content.data.useDefault)
			@.data.custom = ipsum.content.data.customText
			@.settings.buildUnit = ipsum.content.data.genType
			@.settings.buildLength = parseInt(ipsum.content.data.genAmount)
			@.settings.useZeroSpace = @.parseBool(ipsum.settings.data.zeroWidthSpace)
			@.settings.splitType = ipsum.settings.data.splitType
			@.settings.lines = parseInt( ipsum.settings.data.linesBetween )

		getSource: ->
			if @.settings.useDefault is true
				@.storage.string = @.data.default
			else
				@.storage.string = @.data.custom

		splitStrings: ->
			temp = @.storage.string

			switch @.settings.splitType
				when "words"
					temp = temp.replace( @.storage.muliline , "\n" )
					temp = temp.replace( @.storage.linebreak , " ")
					temp = temp.replace( @.storage.clearMarks , "" )
					temp = temp.replace( @.storage.puncuation , " " )
					temp = temp.replace( @.storage.singlespace , " " )
					@.storage.stringbank = temp.split(" ")

				when "sentences"
					temp = temp.replace( @.storage.muliline , "\n" )
					temp = temp.replace( @.storage.linebreak , " ")
					temp = temp.replace( @.storage.singlespace , " " )
					@.storage.stringbank = temp.match( @.storage.sentences )

				when "paragraphs"
					temp = temp.replace( @.storage.muliline , "\n" )
					@.storage.stringbank = temp.split( "\n" )

		buildSentence: ->

		buildParagraph: ->

		compile: ->
			complete = false
			s = @.storage.stringbank
			c =
				output: ""
				complete:false
				letters:
					total:0

				words:
					total: 0

				sentence:
					total: 0
					length: 0
					goal: 3 + Math.floor( Math.random() * 30 )
					min: 3
					max: 30

				paragraph:
					total: 0
					length: 0
					goal: 2 + Math.floor( Math.random() * 8 )
					min: 2
					max: 8

				past:
					words:[]
					sentences: []
					paragraphs: []

			if s.length > 6
				cap = true

				while complete is false
					chosen = ""
					checks = c.past.words.length
					while chosen is "" or c.past.words.indexOf( chosen ) isnt -1 or checks < 0
						chosen = s[ Math.floor( Math.random() * s.length )].toLowerCase()

					if c.past.words.length > 6 then c.past.words.pop()
					c.past.words.push( chosen )

					if cap is true
						chosen = chosen.charAt(0).toUpperCase() + chosen.slice(1)
						cap = false

					c.output += "#{chosen}"
					c.sentence.length++
					c.letters.total += chosen.length
					c.words.total++

					if c.sentence.length >= c.sentence.goal
						c.sentence.length = 0
						c.paragraph.length++
						c.sentence.goal = c.sentence.min + Math.floor( Math.random() * ( c.sentence.max - c.sentence.min ))
						c.output += @.data.puncuationMarks[ Math.floor( Math.random() * @.data.puncuationMarks.length )]
						cap = true
						
					if c.paragraph.length >= c.paragraph.goal
						c.paragraph.total++
						c.paragraph.length = 0
						c.paragraph.goal = c.paragraph.min + Math.floor( Math.random() * ( c.paragraph.max - c.paragraph.min ))
						i = 0
						while i < @.settings.lines
							c.output += "\n"
							i++

					else
						c.output += " "

					switch @.settings.buildUnit
						when "paragraphs"
							if c.paragraph.total >= @.settings.buildLength then complete = true

						when "words"
							if c.words.total >= @.settings.buildLength then complete = true

						when "letters"
							if c.letters.total >= @.settings.buildLength then complete = true

			if c.output.substring( c.output.length - 1 ) isnt "!" and c.output.substring( c.output.length - 1  ) isnt "." and c.output.substring( c.output.length - 1 ) isnt "?" and c.output.substring( c.output.length - 1 ) isnt "\n" 
				c.output = c.output.substring( 0 , c.output.length - 1 )
				c.output += @.data.puncuationMarks[ Math.floor( Math.random() * @.data.puncuationMarks.length )]
			@.storage.string = c.output

		render: ->
			document.getElementsByTagName("main")[0].getElementsByTagName("p")[0].innerHTML = @.storage.string












