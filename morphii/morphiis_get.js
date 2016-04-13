var config = require('../config.js');
var Client = require("node-rest-client").Client;

var client = new Client();

function errorHandler(data) {
  var error = JSON.parse(data.errorMessage);
  console.log("code: " + error.code + ", message: " + error.message);
}

// You do not need to be authenticated before using this API.
var args = {
  headers : {
    "Content-Type": "application/json",
    "x-api-key": config.API_KEY,
    }
};

// Get all public Morphii records.
var url = config.BASE_URL + "/morphii/v1/morphiis?publicOnly=true&accountId=" + config.ACCOUNT_ID;
client.get(url, args, function(data, response) {
  console.log("GET - Morphiis call - statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
  if (data && response.statusCode == 200) {
    console.log("Public Only: " + JSON.stringify(data, null, 2));
  }
  else {
    // Error getting morphii records.
    errorHandler(data);
  }
});

// Get your Morphii records.
url = config.BASE_URL + "/morphii/v1/morphiis?&accountId=" + config.ACCOUNT_ID + "&twitterId=66772";
client.get(url, args, function(data, response) {
  console.log("GET - Morphiis call - statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
  if (data && response.statusCode == 200) {
    console.log("By Account Id: " + JSON.stringify(data, null, 2));
  }
  else {
    // Error getting morphii records.
    errorHandler(data);
  }
});
