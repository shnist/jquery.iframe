/*jslint bitwise: true, eqeq: true, passfail: false, nomen: true, sloppy: true, plusplus: false, undef: true, evil: true */
/*global window, document, console, $, jQuery, setInterval, LBI, self , BarrDevel, DWH : true, BH :true */

/**

	jQuery Plugin .frame( [handle [, options [, callback]]] )
	@version: 1.0
	@author Bruce Thomas
	@requires jQuery Core 1.7+

	Purpose:
	This plugin injects iframe tag into a DOM element,
	and creates an Object reference to control the child iframe's DOM
	and works on selectors that return unique or multiple DOM elements

	- if the DOM element is unique the window reference will be @handle
	- if the DOM element is not unique the window reference will be:
		- the ID attribute (if found) or
		- the REL attribute (if found) or
		- a unique numeric iteration prefixed by @handle

	Arguments (type and default)
	@handle		String		'iframe'	window reference
	@options	Object		{}			iframe attributes
	@callback	Function	null		a function callback

	window.iframe methods:
	eg. window.iframe.destroy('foo');
	.release(n)		removes child reference key from iframe Object
	.destroy(key)	removes reference, and deletes parent from DOM

	window.iframe[child] methods:
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


	For example:
	ZEN: .haystack (single DOM elemnt)
	$('.haystack').frame(); // window.iframe.iframe0
	$('.haystack').frame('needle'); // window.iframe.needle

	ZEN: .haystack*2 -- (2 DOM elemts)
	$('.haystack').frame(); // window.iframe.iframe0 & *.iframe1
	$('.haystack').frame('needle'); // window.iframe.needle0 & *.needle1

	ZEN: .haystack#straw+.haystack#hay+.haystack*2 -- (4 DOM elements)
	$('.haystack').frame('needle');
	// window.iframe.straw, *.hay, *.needle0 & *.needle1

	Manipulating the child iframe:
	ZEN: .haystack (single DOM elemeny)
	$('.haystack').frame('needle'); // creates window.iframe.needle
	var child = window.iframe.needle; // the child controller
	child.body.addClass('donkey') // adds a class to <body/>
	child.body.append('Kong was here!') // adds string to <body/>
	child.head.html('<link rel="stylesheet" href="my.css" />') // add stylesheet


*/
(function ( $, window, document, undefined ) {
	// Create the defaults once
	var pluginName = 'iframe',
		uniqueHandle = null,
		uuid = function (prefix) {
			// returns a unique object reference
			var i = 0, uniqueName =  prefix || pluginName;
			while (window[pluginName].hasOwnProperty(uniqueName)) {
				uniqueName = prefix + (i += 1);
			}
			return String(uniqueName);
		},
		defaults = {
			"allowTransparency": true,
			"overflow": "hidden",
			"width": "100%",
			"height": "100px",
			"border": "0",
			"frameBorder": "0",
			"scoll": "no",
			"scrolling": "no"
		};

	var destroy = function (key) {
			var me = window[pluginName];
			if(!me[key]) { return; }
			me[key].parent.remove();
			delete me[key];
		},
		release = function (n) {
			if(!(/(number|string)/).test(typeof n)) { return; }
			$.each(window[pluginName], function (key, obj) {
				var which = typeof n === 'string' ? 'handle' : 'index';
				if(obj[which] === n) {
					//obj.parent.html('gone');
					delete window[pluginName][obj.handle];
				}
			});
		};

	window[pluginName] = window[pluginName] || {};
	window[pluginName].release = release;
	window[pluginName].destroy = destroy;

	// The actual plugin constructor
	function Plugin ( element, handle, options, callback, count, index ) {
		this.element = element;
		this.count = count;
		this.index = index;
		this.handle = handle;
		this.callback = callback;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}


	Plugin.prototype.init = function () {
		var container = $(this.element), //$(this.handle),
			iFrameDoc, handle, iframe,
			that = this, id, rel, parent,
			multiple = that.count > 1,
			index = this.index, // sent to callback function
			callback = this.callback,
			html = '<!DOCTYPE html><html><head></head><body></body></html>';

		$.each(container, function (n) {
			id = this.id || null;
			rel = $(this).attr('rel') || null;
			parent = $(this);

			// prevent id duplications.
			if (multiple && that.options.id) {
				that.options.id = (that.options.id + that.index);
			}

			// ensure Object reference is unique.
			handle = multiple ? uuid(id || rel || (that.handle + that.index)) : that.handle;
			iframe = $('<iframe/>').attr(that.options);
			$(this).html(iframe)
			$(this).append('<!-- window.' + pluginName + '.' + handle + ' -->');

			iFrameDoc = iframe[0].contentWindow.document;
			iFrameDoc.open('text/html', 'replace');
			iFrameDoc.write(html);
			iFrameDoc.close();

			// create the window reference
			window[pluginName][handle] = {
				'id': that.options.id,
				'parent': parent,
				'iframe': parent.find('iframe'),
				'handle': handle,
				'index': index,
				'window': iframe[0].contentWindow,
				'document': iFrameDoc,
				'head': (function () {
					return $(iFrameDoc).find('head');
				}()),
				'body': (function () {
					return $(iFrameDoc).find('body');
				}()),
				'destroy': function () {
					destroy(this.handle);
				}
			};

			// execute the callback
			callback.call(window[pluginName][handle]);
		});
	};

	// Create the plugin
	$.fn[pluginName] = function ( handle, options, callback ) {
		options = options && options.constructor === Object ? options : {};
		handle = typeof handle === 'string' ? handle : null;
		callback = typeof callback === 'function' ? callback : function () {};
		var count = this.length;

		return this.each(function (n) {
			if ($.data(this, 'plugin_' + pluginName)) {
				// an iframe already exists ...
				window[pluginName].release(n); // release the Object handle
			}
			$.data(this, 'plugin_' + pluginName, new Plugin( this, handle, options, callback, count, n));
		});
	};
}( jQuery, window, document ));










