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
var CheckAPI = require("./routers/CheckAPI");
var Register = require("./routers/Register");
var UploadFiles = require("./routers/UploadFiles");

//use routes
app.use("/", CheckAPI);
app.use("/Register", Register);
app.use("/UploadFiles", UploadFiles);

app.use(express.static("uploads")); //สำหรับโชว์รูปภาพใน service
