(function() {
  var _, config, qs, url, utils;

  utils = exports;

  _ = require('lodash');

  qs = require('querystring');

  url = require('url');

  config = require('./config');


  /*
   * Returns a random alpha-numeric character
   */

  utils.random_alpha_numeric = function() {
    var possible;
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return possible.charAt(Math.floor(Math.random() * possible.length));
  };


  /*
   * Generates a random string containing numbers and letters
   * param  {number} length The length of the string
   * return {string} The generated string
   */

  utils.generate_random_string = function(length) {
    var text;
    text = '';
    _.times(length, function() {
      return text += utils.random_alpha_numeric();
    });
    return text;
  };


  /*
   * Warn user about missing environment variables
   */

  utils.env_error = function() {
    console.log("Please add the following to your shell env: \n SPOTIFY_CLIENT_ID='your_client_id'  \n SPOTIFY_CLIENT_SECRET='your_secret' \n UPM_REDIRECT_URI='your_redirect_uri' \n");
    return process.exit(1);
  };


  /*
   * Give the console some nice feedback when starting the node server
   */

  utils.log_server = function(port, err) {
    if (err) {
      return console.log(err);
    } else {
      return console.log("===== Serving on port " + port + " ======");
    }
  };

}).call(this);

//# sourceMappingURL=utils.js.map
