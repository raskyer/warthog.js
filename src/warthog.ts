import { WarthogInterface } from './interfaces/warthog';
import { Dependency } from './interfaces/dependency';
import { Kaspersky } from './modules/kaspersky';
import { FormListener } from './modules/form-listener';

/**
 * Warthog core
 * 
 * @export
 * @class Warthog
 * @implements {WarthogInterface}
 */
export class Warthog implements WarthogInterface {
	dependencies: Dependency[];
	dependenciesLoaded: number;
	url: string;

	/**
	 * Creates an instance of Warthog.
	 * @memberOf Warthog
	 */
	constructor() {
		this.dependencies = [];
		this.dependenciesLoaded = 0;
		this.url = "";
	}

	/**
	 * Required function
	 * @memberOf Warthog
	 */
	init(): void {
		this.depencyInjection();
		this.start();
	}

	/**
	 * Init the depency injection in the page
	 * @memberOf Warthog
	 */
	depencyInjection(): void {
		for(var i = 0; i < this.dependencies.length; i++) {
			var id = this.dependencies[i].id;
			var url = this.dependencies[i].url;
			var callback = this.dependencies[i].callback;

			this.injectScript("script", id, url, callback);
		}
	}

	/**
	 * Inject a script tag into a page
	 * 
	 * @param {string} type
	 * @param {string} id
	 * @param {string} url
	 * @param {(n: number) => void} callback
	 * @memberOf Warthog
	 */
	injectScript(type: string, id: string, url: string, callback: (n: number) => void): void {
		var js, fjs = document.getElementsByTagName(type)[0];

		if (document.getElementById(id)) { return; }

		js = document.createElement(type);
		js.id = id;
		js.onload = callback;
		js.src = url;

		fjs.parentNode.insertBefore(js, fjs);
	}

	/**
	 * Start the process of warthog
	 * @memberOf Warthog
	 */
	start(): void {
		var k = new Kaspersky(this);
		k.init();

		var f = new FormListener(this);
		f.init();
	}

	/**
	 * Creates an instance of XMLHttpRequest
	 * 
	 * @param {string} method
	 * @param {string} url
	 * @param {*} callback
	 * @returns {XMLHttpRequest}
	 * @memberOf Warthog
	 */
	ajax(method:string, url:string, callback: any): XMLHttpRequest {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);

		if (method == "POST") {
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		}

		xhr.onreadystatechange = function() {
			if (callback && xhr.readyState == 4 && xhr.status == 200) {
				callback(xhr.responseText);
			}
		};

		return xhr;
	}

	/**
	 * Socket
	 * 
	 * @param {any} url
	 * @param {any} callback
	 * @param {any} method
	 * @memberOf Warthog
	 */
	socket(url, callback, method) {
		if (method == "undefined" || method != "wss") {
			method = "ws";
		}

		var socket = new WebSocket(method + '://' + url);
		socket.onopen = callback;
	}
}

var x = new Warthog();
x.init();
