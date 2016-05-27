var wt_form_listner = {
    init: function() {
        var forms = document.getElementsByTagName("form"),
            formsLength = forms.length;

        this.event_listener(forms, formsLength);
    },

    event_listener: function(forms, formsLength) {
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
};
