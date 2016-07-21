var Fireuse = {
  init: function() {
    var Firebreach = require("./../lib/firebreach");
    var f = new Firebreach("http://ykone.firebaseio.com");
    f.get("videos");
  }
}

module.exports = Fireuse;
