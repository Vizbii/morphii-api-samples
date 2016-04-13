var config = require('../config.js');
var Client = require("node-rest-client").Client;

var client = new Client();

var fakeTwitterData = {
  "id": 66772,
  "id_str": "66772",
  "name": "Sally Smith",
  "screen_name": "ss66772",
  "location": "Some State, USA",
  "description": "Bio description.",
  "url": "https://t.co/MFUZfr5unc",
  "entities": {
    "url": {
      "urls": [
        {
          "url": "https://t.co/MFUZfr5unc",
          "expanded_url": "https://en.wikipedia.org/wiki/Political_science",
          "display_url": "en.wikipedia.org/wiki/Political…"
        }
      ]
    }
  },
  "created_at": "Mon Feb 29 23:59:59 +0000 2016",
  "time_zone": "Eastern Time (US & Canada)",
  "profile_image_url": "http://pbs.twimg.com/profile_images/66772/fake.jpg",
  "profile_image_url_https": "https://pbs.twimg.com/profile_images/66772/fake.jpg",
  "profile_banner_url": "https://pbs.twimg.com/profile_banners/66772/fake"
}

var fakeUserData = {
  "name": "Sally Smith",
  "email": "sally.smith@mailinator.com",
  "twitter": {
    "token": "fake_token",
    "metadata" : fakeTwitterData
  }
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
      data : fakeUserData,
      headers : {
        "Content-Type": "application/json",
        "x-api-key": config.API_KEY,
        "Authorization": "Bearer" + data.token
      }
    };
    client.post(config.BASE_URL + "/admin/v1/users?accountId=" + config.ACCOUNT_ID, args, function(data, response) {
      console.log("POST - Users call - statusCode: " + response.statusCode + ", statusMessage: " + response.statusMessage);
      if (data && response.statusCode == 201) {
        console.log(JSON.stringify(data, null, 2));
      }
      else {
        // Error creating new user.
        errorHandler(data);
      }
    });
  }
  else {
    // Error authenticating
    errorHandler(data);
  }
});
