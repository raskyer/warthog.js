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

	init(): void {
		this.forms = document.getElementsByTagName("form");
		this.eventListener();
	}

	eventListener(): void {
		var self: FormListener = this;

		for (var i = 0; i < this.forms.length; i++) {
			if (this.forms[i].addEventListener) {
				this.forms[i].addEventListener("submit", function(evt) { self.execute(evt, this); }, false);
				continue;
			}
			
			if (this.forms[i].attachEvent) {
				this.forms[i].attachEvent("onsubmit", function(evt) { self.execute(evt, this); });
			}
		}
	}

	execute(e: any, scope: any): void {
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

		var xhr: XMLHttpRequest = this.parent.ajax("POST", this.url, null);
		xhr.send(data);
	}
}
