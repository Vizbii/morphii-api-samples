var config = require('../config.js');
var Client = require("node-rest-client").Client;

var client = new Client();

function errorHandler(data) {
  var error = JSON.parse(data.errorMessage);
  console.log("code: " + error.code + ", message: " + error.message);
}

// The login API requires a username and password.
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
  console.log("statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
  if (response.statusCode == 200) {
    console.log(JSON.stringify(data, null, 2));
  }
  else {
    errorHandler(data);
  }
});
