var config = require('../config.js');
var Client = require("node-rest-client").Client;

var client = new Client();

var fakeData = {
  "createdDateLocal": "2015-05-03T05:22:02-04:00",
  "accountId": config.ACCOUNT_ID,
  "morphii" : {
    "id": "6102888968381005825",
    "name": "Delighted",
    "intensity": 0.96
  },
  "target" : {
    "url": "tweet_id",
    "type": "twitter",
    "metadata": {
      "comment": "Add additional metadata here"
    }
  },
  "userId": "6102861918026858496",
  "userName": "Jay Green",
  "comment": "This is my comment.",
  "lat" : 32.8071081,
  "lng" : -79.8805699
}

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
      data : fakeData,
      headers : {
        "Content-Type": "application/json",
        "x-api-key": config.API_KEY,
        "Authorization": "Bearer" + data.token
      }
    };
    client.post(config.BASE_URL + "/react/v1/reactions", args, function(data, response) {
      console.log("POST - Reactions call - statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
      if (data && response.statusCode == 201) {
        console.log(JSON.stringify(data, null, 2));
      }
      else {
        // Error creating new reaction.
        errorHandler(data);
      }
    });
  }
  else {
    // Error authenticating
    errorHandler(data);
  }
});
