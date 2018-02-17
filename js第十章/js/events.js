(function(window, undefined) {
	var events = function(selector, context) {
		return new events.fn.init(selector, context);
	};
	events.fn = events.prototype = {
		constructor: events,
		init: function(selector, context) {
			if(typeof selector === 'string') {
				var nodes = document.querySelectorAll(selector);
				this.length = nodes.length;
				for(var i = 0; i < this.length; i++) {
					this[i] = nodes[i];
				}
			} else {
				this[0] = selector;
				this.length = 1;
			}

			return this;
		},
		on: function(type, listener) {
			var self = this;
			for(var i = 0; i < this.length; i++) {
				if(this[i].events) {
					if(this[i].events[type]) {
						this[i].events[type].push(listener)
					} else {
						this[i].events[type] = [listener];
					}

				} else {
					this[i].events = {};
					this[i].events[type] = [listener];
				}
				if(this[i]['event' + type]) continue;
				this[i]['event' + type] = true;
				this[i].addEventListener(type, function(ev) {

					for(var i = 0; i < this.events[type].length; i++) {

						this.events[type][i].call(this, ev);
					}
				}, false);
			}
		},
		off: function(type, listener) {
			var
				len = this.length,
				events,
				index,
				self = this;
			setTimeout(function() {
				if(type) {
					if(listener) {
						for(var i = 0; i < len; i++) {
							if(!(self[i].events && self[i].events[type])) {
								continue;
							}
							index = self.indexOf(self[i].events[type], listener);
							if(index !== -1) {
								self[i].events[type].splice(index, 1);
							}
						}
					} else {
						for(var i = 0; i < len; i++) {
							if(!(self[i].events && self[i].events[type])) {
								continue;
							}
							self[i].events[type] = [];
						}
					}
				} else {
					for(var i = 0; i < len; i++) {
						if(!self[i].events) {
							continue;
						}
						for(var attr in self[i].events) {

							self[i].events[attr] = [];
						}
					}
				}
			})
		},
		trigger: function(type, data) {
			var len = this.length;
			for(var i = 0; i < len; i++) {
				if(!(this[i].events && this[i].events[type])) {
					continue;
				}
				for(var j = 0; j < this[i].events[type].length; j++) {

					this[i].events[type][j].apply(this[i], [{
						target: this[i],
						type: type
					}].concat(data));
				}
			}
		},
		indexOf: function(data, s) {
			for(var i = 0; i < data.length; i++) {
				if(data[i] === s) {
					return i;
				}
			}
			return -1;
		}
	};
	events.fn.init.prototype = events.fn;
	window.$ = events;
})(window, undefined)