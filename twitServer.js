console.log("the bot is starting");


const Twit = require('twit');
const fs = require('fs');
const http = require('http');
var saveReady;


var T = new Twit({
    consumer_key:         '',
    consumer_secret:      '',
    access_token:         '',
    access_token_secret:  '',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })
//screen_name: 'deazee_m'}

function checkTwitter() {
  T.get('statuses/home_timeline', { screen_name: 'deazee_m', count : '40'}, function (err, data, response) {
    
    saveReady = JSON.stringify(data); 
    //fs.writeFileSync('twitterResponse.json', saveReady);

    console.log(saveReady);
    
    return saveReady;
  })
}

  checkTwitter();
  setInterval( checkTwitter, 60000);

  var server = http.createServer(function(req, res){
    console.log('request was made' + req.url);
    
    res.writeHead(200, {'Content-Type': 'application/JSON'})
    res.end(saveReady);
  })
  
  console.log(saveReady);
  var port = process.env.PORT || 3000;
  server.listen(port);
  console.log('listening to port 3000');