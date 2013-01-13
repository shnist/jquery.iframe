# jQuery Plugin .iframe( [handle [, options [, callback]]] )
	@version  : 1.0
	@author   : Bruce Thomas
	@requires : jQuery Core 1.7+
	@github   : https://github.com/fliptopbox/jquery.iframe/

## Purpose:
This plugin injects iframe tag into a DOM element,
and creates an Object reference to control the child iframe's DOM
and works on selectors that return unique or multiple DOM elements

- if the DOM element is unique the window reference will be @handle
- if the DOM element is not unique the window reference will be:
	- the ID attribute (if found) or
	- the REL attribute (if found) or
	- a unique numeric iteration prefixed by @handle

## Arguments (name, type, default value and description)
	@handle		String		'iframe'	window reference - eg. window.iframe['foo']
	@options	Object		{}			iframe attributes - eg. { height:100, id:bar ... }
	@callback	Function	null		executed after creation

## Methods for the window.iframe Object:
### Example: window.iframe.destroy('foo');

	.release(n)		removes child reference key from iframe Object
	.destroy(key)	removes reference, and deletes parent selector from DOM

## Methods for the child Object of window.iframe:
###	Example: window.iframe.foo.body;

	Method			Type		Description
	------------------------------------------------
	.id()			String		ID value
	.parent()		jQuery		parent window
	.iframe()		jQuery		parent iframe tag
	.handle()		String		child's handle
	.index()		Number		index of element
	.window()		DOM			content window
	.document()		DOM			document element
	.head()			jQuery		head elemeny
	.body()			jQuery		body element
	.destroy()		Function	method


###	*Usage example - injecting the iframe into a DOM element.*
**ZEN: .haystack (single DOM elemnt)**

	$('.haystack').iframe(); // window.iframe.iframe0
	$('.haystack').iframe('needle'); // window.iframe.needle


**ZEN: .haystack*2 -- (2 DOM elemts)**

	$('.haystack').iframe(); // window.iframe.iframe0 & *.iframe1
	$('.haystack').iframe('needle'); // window.iframe.needle0 & *.needle1


**ZEN: .haystack#straw+.haystack[rel=two]+.haystack*2 -- (4 DOM elements)**

	$('.haystack').iframe('needle');
	// window.iframe.straw, *.hay, *.needle0 & *.needle1

## Manipulating the child iframe:
**ZEN: .haystack (single DOM elemeny)**

	$('.haystack').iframe('needle'); // creates window.iframe.needle

	var child = window.iframe.needle; // the child controller
	child.body.addClass('donkey') // adds a class to <body/>
	child.body.append('Kong was here!') // adds string to <body/>
	child.head.html('<link rel="stylesheet" href="my.css" />') // add stylesheet

