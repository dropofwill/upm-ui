(function() {
  var config, qs, spotify, url, utils;

  spotify = exports;

  qs = require('querystring');

  url = require('url');

  config = require('./config');

  utils = require('./utils');


  /*
   * Returns a URL string for phase 1 of the OAuth 2 process
   * Requires a string state parameter
   * Optionally pass a string host, string path, or array of scopes
   */

  spotify.auth_builder = function(state, host, path, scopes) {
    var scope;
    if (host == null) {
      host = config.accounts_host;
    }
    if (path == null) {
      path = config.auth_path;
    }
    if (scopes == null) {
      scopes = ['user-read-private', 'user-read-email'];
    }
    scope = scopes.join(" ");
    return url.format({
      protocol: 'https',
      hostname: host,
      pathname: path,
      query: {
        response_type: 'code',
        client_id: config.client_id,
        redirect_uri: config.redirect_uri,
        state: state,
        scope: scope
      }
    });
  };


  /*
   * Returns an options object for request to post to either retrieve an access
   * token (default) or refresh the current one (by passing in 'refresh_token' to
   * the grant param.
   */

  spotify.token_builder = function(code, grant, host, path) {
    var form, url_str;
    if (grant == null) {
      grant = 'authorization_code';
    }
    if (host == null) {
      host = config.accounts_host;
    }
    if (path == null) {
      path = config.token_path;
    }
    url_str = url.format({
      protocol: 'https',
      hostname: host,
      pathname: path
    });
    if (grant === 'authorization_code') {
      form = {
        grant_type: grant,
        code: code,
        redirect_uri: config.redirect_uri
      };
    } else {
      form = {
        grant_type: grant,
        refresh_token: refresh_token
      };
    }
    return {
      url: url_str,
      form: form,
      headers: {
        'Authorization': utils.basic_auth_header()
      },
      json: true
    };
  };

  spotify.query_builder = function() {};

}).call(this);

//# sourceMappingURL=spotify.js.map
