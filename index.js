require('./keep_alive')
var cron = require('node-cron');
const dotenv = require('dotenv').config()


function bump() {
  req.send({
    "content": "!d bump",
    "tts": false
  });
  
  req.end(function (res) {
    if (res.error) throw new Error(res.error);
  
    console.log(res.body);
  });
}



var unirest = require("unirest");

var req = unirest("POST", process.env.BUMP_URL);

req.headers({
  "Authorization": process.env.TOKEN,
  "Content-Type": "application/json"
});

req.type("json");
cron.schedule('0 */2 * * *', () => {
  bump()
})

bump()
