wt_core_caller = {
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
};
