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

## Arguments (type and default)
	@handle		String		'iframe'	window reference
	@options	Object		{}			iframe attributes
	@callback	Function	null		a function callback

## window.iframe methods:
	eg. window.iframe.destroy('foo');
	.release(n)		removes child reference key from iframe Object
	.destroy(key)	removes reference, and deletes parent from DOM

## window.iframe[child] methods:
	eg. window.iframe.foo.body;
	.id()			ID value (String)
	.parent()		parent window (jQuery Object)
	.iframe()		parent iframe tag (jQuery Object)
	.handle()		child's handle (String)
	.index()		index of element (Number)
	.window()		content window (DOM Object)
	.document()		document element (DOM Object)
	.head()			head elemeny (jQuery)
	.body()			body element (jQuery)
	.destroy()		method (Function)


###	*Usage example - injecting the iframe into a DOM element.*
**ZEN: .haystack (single DOM elemnt)**

	$('.haystack').frame(); // window.iframe.iframe0
	$('.haystack').frame('needle'); // window.iframe.needle


**ZEN: .haystack*2 -- (2 DOM elemts)**

	$('.haystack').frame(); // window.iframe.iframe0 & *.iframe1
	$('.haystack').frame('needle'); // window.iframe.needle0 & *.needle1


**ZEN: .haystack#straw+.haystack[rel=two]+.haystack*2 -- (4 DOM elements)**

	$('.haystack').frame('needle');
	// window.iframe.straw, *.hay, *.needle0 & *.needle1

## Manipulating the child iframe:
**ZEN: .haystack (single DOM elemeny)**

	$('.haystack').frame('needle'); // creates window.iframe.needle
	var child = window.iframe.needle; // the child controller
	child.body.addClass('donkey') // adds a class to <body/>
	child.body.append('Kong was here!') // adds string to <body/>
	child.head.html('<link rel="stylesheet" href="my.css" />') // add stylesheet

