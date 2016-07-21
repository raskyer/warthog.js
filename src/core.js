var WarthogCore = function(dependencies, plugins) {
	this.dependencies = dependencies || [];
  this.plugins = plugins || [];
}

WarthogCore.prototype.ajax = function ajax() {}

WarthogCore.prototype.socket = function socket() {}

WarthogCore.prototype.init = function init() {
	this._dependencyInjection();
}

WarthogCore.prototype.buildScript = function buildScript(script) {
  var js = document.createElement("script");
	js.id = script.id;

  if(script.type === "remote") {
		js.src = script.url;
	} else if(script.type === "inline") {
		js.text = script.content;
	}

  return js;
}

WarthogCore.prototype.injectScript = function injectScript(js) {
    fjs = document.getElementsByTagName("script")[0];
  	fjs.parentNode.insertBefore(js, fjs);
}

WarthogCore.prototype._nextStep = function _nextStep(callback, i) {
  if(typeof callback == "function") {
    callback();
  }

  this._dependencyInjection(i + 1);
}

WarthogCore.prototype._dependencyInjection = function _dependencyInjection(i) {
  if(typeof i == "undefined") {
    i = 0;
  }

  var script = this.dependencies[i];
  if(typeof script == "undefined") {
    return this.startup();
  }

	if (document.getElementById(script.id)) { this._dependencyInjection(i + 1); }

	var js = this.buildScript(script);
  var self = this;
	js.onload = function() {
    self._nextStep(script.callback, i);
  };
  this.injectScript(js);

  if(script.type === "inline") {
    this._nextStep(script.callback, i);
  }
}

WarthogCore.prototype.startup = function startup() {
  var lgt = this.plugins.length;

  for(var i = 0; i < lgt; i++) {
    this.plugins[i].init();
  }
}

module.exports = WarthogCore;
