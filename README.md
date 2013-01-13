jQuery Plugin .frame( [handle [, options [, callback]]] )

@version: 1.0
@author Bruce Thomas
@requires jQuery Core 1.7+


Arguments (type and default)
@handle		String		'iframe'	window reference
@options	Object		{}			iframe attributes
@callback	Function	null		a function callback


Purpose:
This plugin injects an <iframe/> into a DOM element,
and creates an Object reference to control the child iframe's DOM
and works on selectors that return unique or multiple DOM elements

- if the DOM element is unique the window reference will be @handle
- if the DOM element is not unique the window reference will be:
		the ID attribute (if found) or
		the REL attribute (if found) or
		a unique numeric iteration prefixed by @handle
