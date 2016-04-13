var config = require('../config.js');
var Client = require("node-rest-client").Client;

var client = new Client();


function errorHandler(data) {
  var error = JSON.parse(data.errorMessage);
  console.log("code: " + error.code + ", message: " + error.message);
}

// Must be authenticated before using this API.
var args = {
  data : {
    "username": config.USERNAME,
    "password": config.PASSWORD
  },
  headers : {
    "Content-Type": "application/json"
    }
};
client.post(config.BASE_URL + "/admin/v1/login", args, function(data, response) {
  console.log("Login call - statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
  if (data && response.statusCode === 200) {

    var headers = {
      "Content-Type": "application/json",
      "x-api-key": config.API_KEY,
      "Authorization": "Bearer" + data.token
    }

    args = {
      headers : headers
    };

    // Get user by ID.
    var url = config.BASE_URL + "/admin/v1/users/6125642220377735168?accountId=" + config.ACCOUNT_ID;
    client.get(url, args, function(data, response) {
      console.log("GET - Users call - statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
      if (data && response.statusCode == 200) {
        console.log("By ID: " + JSON.stringify(data, null, 2));

        // Change Twitter bio.
        var now = new Date();
        data.twitter.bio = "New Bio " + now.toUTCString();
        args = {
          data : data,
          headers : headers
        };

        // Update user.
        url = config.BASE_URL + "/admin/v1/users/" + data.id + "?accountId=" + config.ACCOUNT_ID;
        client.put(url, args, function(data, response) {
          console.log("PUT - Users call - statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
          if (data && response.statusCode == 200) {
            console.log(JSON.stringify(data, null, 2));
          }
          else {
            // Error updating user.
            errorHandler(data);
          }
        });
      }
      else {
        // Error getting user.
        errorHandler(data);
      }
    });
  }
  else {
    // Error authenticating
    errorHandler(data);
  }
});
