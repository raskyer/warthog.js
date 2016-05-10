var wt_core_cache = {
    service: 0,

    save: function(key, val) {
        if (this.service == 0) {
            sessionStorage.setItem(key, val);
        }
    },

    get: function(key) {
        if (this.service == 0) {
            return sessionStorage.getItem(key);
        }
    }
};
