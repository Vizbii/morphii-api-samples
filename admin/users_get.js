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
    args = {
      headers : {
        "Content-Type": "application/json",
        "x-api-key": config.API_KEY,
        "Authorization": "Bearer" + data.token
      }
    };

    // Get user by ID.
    var url = config.BASE_URL + "/admin/v1/users/6125642220377735168?accountId=" + config.ACCOUNT_ID;
    client.get(url, args, function(data, response) {
      console.log("GET - Users call - statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
      if (data && response.statusCode == 200) {
        console.log("By ID: " + JSON.stringify(data, null, 2));
      }
      else {
        // Error getting user.
        errorHandler(data);
      }
    });

    // Get User by Twitter Id
    url = config.BASE_URL + "/admin/v1/users?accountId=" + config.ACCOUNT_ID + "&twitterId=66772";
    client.get(url, args, function(data, response) {
      console.log("GET - Users call - statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
      if (data && response.statusCode == 200) {
        console.log("By Twitter ID: " + JSON.stringify(data, null, 2));
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
