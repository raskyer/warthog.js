wt_core = {
    url: "{{ URL }}",
    lib: [wt_form_listner, wt_dynamic_properties],

    init: function() {
        this.load_lib();
    },

    load_lib: function() {
        var lib_length = this.lib.length;

        for (var i = 0; i < lib_length; i++) {
            this.lib[i].init();
        }
    },

    post: function(data, callback) {
        wt_core_caller.post(this.url, data, callback);
    }
};
wt_core.init();
