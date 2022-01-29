const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();

var server = app.listen(3000, function () {
  console.log("Ready on port %d", server.address().port);
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//require routes
var CheckAPI = require("./routers/checkAPI");

//use routes
app.use("/", CheckAPI);

app.use(express.static("uploads")); //สำหรับโชว์รูปภาพใน service
