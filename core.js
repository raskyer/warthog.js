var WarthogCore = function() {
	this.dependancies = [];
	this.dependanciesLoaded = 0;
	alert(23);
}

WarthogCore.prototype.ajax = function ajax() {

}

WarthogCore.prototype.socket = function socket() {

}

WarthogCore.prototype.init = function init() {

}

WarthogCore.prototype.dependancyInjection = function dependancyInjection() {
	var dependanciesLgt = this.dependancies.length;	

	for(var i = 0; i < dependanciesLgt; i++) {
		var id = this.dependancies[i].id;
		var url = this.dependancies[i].url;
		var callback = this.dependancies[i].callback;

		this.injectScript("script", id, url, callback);
	}
}

WarthogCore.prototype.injectScript = function injectScript(type, id, url, callback) {
	var js, fjs = document.getElementsByTagName(type)[0];

	if (document.getElementById(id)) { return; }

    	js = document.createElement(type);
    	js.id = id;
    	js.onload = callback;
    	js.src = url;

    	fjs.parentNode.insertBefore(js, fjs);
}

WarthogCore.prototype.startup = function startup() {

}

var x = new WarthogCore();
