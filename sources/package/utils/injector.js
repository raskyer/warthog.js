var wt_injector = {
	auto_launch: "{{ AUTO_LAUNCH }}",
	content_source: "{{ CONTENT_SOURCE }}",
	content: "{{ CONTENT }}",
	selector_type: "{{ SELECTOR_TYPE }}",
	selector: "{{ SELECTOR }}",

	init: function() {
		this.event_listener();

		if(this.auto_launch) {
			this.start();
		}
	},

	event_listener: function() {
	},

	get_content: function() {
		if(this.content_source == 1) {
			wt_core.caller.get(this.content, this.inject);
			return true;
		}

		if(this.content_source == 2) {
			return false;
		}
	},

	start: function() {
		var content = this.get_content();

		if(content) {
			this.inject(content);
		}
	},

	get_selector: function() {
		if(this.selector_type == 1) {
			return document.getElementById(this.selector);
		}

		if(this.selector_type == 2) {
			return document.getElementsByTagName(this.selector);
		}

		if(this.selector_type == 3) {
			return document.getElementsByClassName(this.selector);
		}
	},

	inject: function(content) {
		var selector = this.get_selector();
		selector.innerHTML(content);
	}
};
