"use strict"

require.config(

	baseUrl: "../scripts"

	paths:
		"jquery": "vendor/jquery/dist/jquery"
		"moment": "vendor/moment/moment"
		"classlist": "vendor/classlist/classList"

	deps: [
		"classlist"
	]
)

require( [ "ipsum/App" ] , ( App ) ->
	new App()
)