var dependencies = require("./dependencies");
var plugins      = require("./plugins");

var WarthogInterface = require("./core");
var Warthog          = new WarthogInterface(dependencies, plugins);

Warthog.init();
