require("./keep_alive");
var cron = require("node-cron");
require("dotenv").config();
var unirest = require("unirest");

var req = unirest("POST", process.env.BUMP_URL);

req.headers({
  Authorization: process.env.TOKEN,
  "Content-Type": "application/json",
});

req.type("json");
function bump() {
  req.send({
    content: "!d bump",
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    console.log(res.body);
  });
}
cron.schedule("0 */2 * * *", () => {
  bump();
});
