// This code is to query data using NodeJS
// Copied from Postman, this is the request being sent to the server
var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'wise-goat-rgjb32-dev-ed.trailblaze.my.salesforce.com',
  'path': '/services/data/v59.0/graphql',
  'headers': {
    'X-Chatter-Entity-Encoding': 'false',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 00D8b0000022ug0!AQ8AQNTa3hnDkxotlAq3X7yCQzFhivXYjgmeENq4U8iupcPK94j3PYwpgp8m0vsJDHdXicJFQ8jo2izMhtrzSvB9SrnRMmL8',
    'Cookie': 'BrowserId=WNlT7asTEe6p9bdEItgJ6Q; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  query: `query contacts {
  uiapi {
    query {
      Contact (first: 200) {
        totalCount
        edges {
          node {
            Id
            Name {
              value
            }
          }
        }
      }
    }
  }
}`,
  variables: {}
});

req.write(postData);

req.end();