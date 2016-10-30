/*
 * All global function or variable will be here. Accessible through _wt
 */
module.exports = {
    ip: "",
    getip: function(r) {
        this.ip = r;
    }
}
