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

    // Get reaction by ID.
    var url = config.BASE_URL + "/react/v1/reactions/6125751393157382144?accountId=" + config.ACCOUNT_ID;
    client.get(url, args, function(data, response) {
      console.log("GET - Reactions call - statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
      if (data && response.statusCode == 200) {
        console.log("By ID: " + JSON.stringify(data, null, 2));
      }
      else {
        // Error getting reaction.
        errorHandler(data);
      }
    });

    // Get reaction by Target
    url = config.BASE_URL + "/react/v1/reactions?accountId=" + config.ACCOUNT_ID + "&targetUrl=tweet_id";
    client.get(url, args, function(data, response) {
      console.log("GET - Reactions call - statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
      if (data && response.statusCode == 200) {
        console.log("By Target: " + JSON.stringify(data, null, 2));
      }
      else {
        // Error getting reaction.
        errorHandler(data);
      }
    });

    // Get reaction by Account
    url = config.BASE_URL + "/react/v1/reactions?accountId=" + config.ACCOUNT_ID;
    client.get(url, args, function(data, response) {
      console.log("GET - Reactions call - statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
      if (data && response.statusCode == 200) {
        console.log("By Account: " + JSON.stringify(data, null, 2));
      }
      else {
        // Error getting reaction.
        errorHandler(data);
      }
    });
  }
  else {
    // Error authenticating
    errorHandler(data);
  }
});
