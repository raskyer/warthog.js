/**
 * Firebreach instance - Common operation
 *
 * @author LeakLessGfy
 * @param {string} url - The firebase url
 */
export function Firebreach(url) {
  this._url = url;
  this._user = {
      email   : null,
      password: null,
      uid     : null,
      token   : null
  };
  //this._firebase = new Firebase(this._url);
  this.auth = new FirebreachAuth(this._firebase);
}

/* @callback: Handle success return */
Firebreach.prototype.handleSuccess = function handleSuccess(snap) {
  console.log(snap.val());
}

/* @callback: Handle error return */
Firebreach.prototype.handleError = function handleError(err) {
  console.log(err);
}

/* @callback: Simple callback */
Firebreach.prototype.callback = function callback(err) {
  if(err) {
    console.log(err);
  }
}

/* @callback: Get apropriate callback */
Firebreach.prototype.getCallback = function getCallback(callback) {
  if(typeof callback != "function") {
    return this.callback;
  }

  return callback;
}

/* @callback: Get apropriate callbacks(one for success and one for error) */
Firebreach.prototype.getCallbacks = function getCallbacks(onSuccess, onError) {
  if(typeof onSuccess != "function") {
    onSuccess = this.handleSuccess;
  }

  if(typeof onError != "function") {
    onError = this.handleError;
  }

  return {s: onSuccess, e: onError};
}

/**
 * Get a collection by item name
 *
 * @param {string} itemName - The collection name
 * @param {function} [onSuccess = this.handleSuccess] - An optionnal on success callback
 * @param {function} [onError = this.handleError] - An optionnal on error callback
 */
Firebreach.prototype.get = function get(itemName, onSuccess, onError) {
  var c = this.getCallbacks(onSuccess, onError);
  this._firebase.child(itemName).on("value", c.s, c.e);
}

/**
 * Set (replace if exist) a collection by item name
 *
 * @param {string} itemName - The collection name
 * @param {object} object - The object to set
 * @param {function} [callback = this.callback] - An optionnal callback
 */
Firebreach.prototype.set = function set(itemName, object, callback) {
  callback = this.getCallback(callback);
  this._firebase.child(itemName).set(object, callback);
}

/**
 * Push an item in collection
 *
 * @param {string} itemName - The collection name
 * @param {object} object - The object to push
 * @param {function} [callback = this.callback] - An optionnal callback
 */
Firebreach.prototype.push = function push(itemName, object, callback) {
  callback = this.getCallback(callback);
  this._firebase.child(itemName).push(object, callback);
}

/**
 * Update a specific firebase item
 *
 * @param {object} item - The firebase item
 * @param {object} object - The update values
 * @param {function} [callback = this.callback] - An optionnal callback
 */
Firebreach.prototype.update = function update(item, object, callback) {
  callback = this.getCallback(callback);
  item.update(object, callback);
}

/**
 * Remove a specific firebase item
 *
 * @param {object} item - The firebase item
 * @param {function} [callback = this.callback] - An optionnal callback
 */
Firebreach.prototype.remove = function remove(item, callback) {
  callback = this.getCallback(callback);
  item.remove(callback);
}

/**
 * Will create a global variable (in f$Bag) from firebase object
 *
 * @param {string} varName - The name of the new variable
 * @param {string} itemName - The collection name where the firebase object is
 * @param {string} field - The field to look for
 * @param {string} value - The value of the field
 */
Firebreach.prototype.forge = function forge(varName, itemName, field, value) {
  this._firebase.child(itemName).orderByChild(field).equalTo(value).once('value', function(s) {
    window[varName] = s;
  }, this.handleError);
}

/**
 * Find a specific item by field and value
 *
 * @param {string} itemName - The collection name
 * @param {string} field - The field to look for
 * @param {string} value - The value of the field
 * @param {function} [onSuccess = this.handleSuccess] - An optionnal on success callback
 * @param {function} [onError = this.handleError] - An optionnal on error callback
 */
Firebreach.prototype.findBy = function findBy(itemName, field, value, onSuccess, onError) {
  var c = this.getCallbacks(onSuccess, onError);
  this._firebase.child(itemName).orderByChild(field).equalTo(value).once('value', c.s, c.e);
}

/**
 * Trigger the reset password function for email
 *
 * @param {string} email - The email we want to reset password
 * @param {function} [callback = this.callback] - An optionnal callback
 */
Firebreach.prototype.resetPassword = function resetPassword(email, callback) {
  callback = this.getCallback(callback);
  this._firebase.resetPassword({email: email}, callback);
}

/**
 * Get firebase user's information
 *
 * @return {object} - The user's information object
 */
Firebreach.prototype.getUserInfo = function getUserInfo() {
  var conf = this._firebase.getAuth();

  var uid = conf.uid,
      token = conf.token,
      email = conf.password.email;

  return {uid: uid, token: token, email: email};
}

/**
 * Hydrate the _user for Firebreach from firebase value
 * and store it in local storage
 *
 * @param {string} password - The user's password
 * @param {boolean} reset - A boolean to indicate if hydrate user should refresh
 */
Firebreach.prototype.hydrateUser = function hydrateUser(password, reset) {
  if(localStorage.getItem("firebreach_user") !== undefined && reset === undefined) {
      this._user = JSON.parse(localStorage.getItem("firebreach_user"));
      return;
  }

  var config = this.getUserInfo();

  this._user = {
    email   : config.email,
    password: password,
    uid     : config.uid,
    token   : config.token
  };

  localStorage.setItem("firebreach_user", JSON.stringify(this._user));
}

/**
 * FirebreachAuth instance - Authentification operation
 *
 * @author LeakLessGfy
 */
var FirebreachAuth = function(firebase) {
  this._firebase = firebase;
}

/* init the object */
FirebreachAuth.prototype.init = function init(p) {
  this._firebase = p._firebase;
}

/* @callback: Simple callback */
FirebreachAuth.prototype.callback = function callback(err, s) {
  if (err) {
    console.log("Failed: ", err);
    return;
  }

  console.log("Successfull: ", s);
}

/* @callback: Get apropriate callback */
FirebreachAuth.prototype.getCallback = function getCallback(callback) {
  if(typeof callback != "function") {
    return this.callback;
  }

  return callback;
}

/**
 * Process authentification by token
 *
 * @param {string} token - The token for auth
 * @param {function} [callback = this.callback] - An optionnal callback
 */
FirebreachAuth.prototype.byToken = function byToken(token, callback) {
  callback = this.getCallback(callback);
  this._firebase.authWithCustomToken(token, callback);
}

/**
 * Process authentification with anonymous user
 *
 * @param {function} [callback = this.callback] - An optionnal callback
 */
FirebreachAuth.prototype.anonymously = function anonymously(callback) {
  callback = this.getCallback(callback);
  this._firebase.authAnonymously(callback);
}

/**
 * Process authentification by email (default)
 *
 * @param {string} email - The email for auth
 * @param {string} password - The password for auth
 * @param {function} [callback = this.callback] - An optionnal callback
 */
FirebreachAuth.prototype.byEmail = function byEmail(email, password, callback) {
  callback = this.getCallback(callback);
  this._firebase.authWithPassword({
    email   : email,
    password: password
  }, callback);
}

/**
 * Process authentification by provider
 *
 * @param {string} provider - The provider for auth (Facebook, Google, GitHub, etc...)
 * @param {int} [mode] - The mode for auth (in popup by default, redirection if = 1)
 * @param {function} [callback = this.callback] - An optionnal callback
 */
FirebreachAuth.prototype.byProvider = function byProvider(provider, mode, callback) {
  callback = this.getCallback(callback);

  if(mode === 1) {
      this._firebase.authWithOAuthRedirect(provider, callback);
      return;
  }
  this._firebase.authWithOAuthPopup(provider, callback);
}

/**
 * Process registration
 *
 * @param {string} email - The email for registration
 * @param {string} password - The password for registration
 * @param {function} [callback = this.callback] - An optionnal callback
 */
FirebreachAuth.prototype.register = function register(email, password, callback) {
  callback = this.getCallback(callback);

  this._firebase.createUser({
    email   : email,
    password: password
  }, callback);
}
