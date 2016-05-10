var wt_dynamic_properties = {
    master_script: "http://localhost/hack/warthog/test/master-script.php?req=dynamic_url",

    init: function() {
        var url = this.get_url();

        if(!url) {
            wt_core_caller.get(this.master_script, this.set_url);
        } else {
            console.log("cache");
            wt_core.url = url;
        }
    },

    get_url: function() {
        return wt_core_cache.get("wt_core_url");
    },

    set_url: function(data) {
        data = JSON.parse(data);
        wt_core.url = data["wt_core_url"];

        wt_core_cache.save("wt_core_url", wt_core.url);
    }
};
