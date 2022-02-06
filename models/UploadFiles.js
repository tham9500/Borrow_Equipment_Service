const db = require("../dbconnection");

var UploadFiles = {
  updateImage: function (image_name, rfid, callback) {
    return db.query(
      "UPDATE `member` SET `image_file`= ? WHERE rfid = ? AND active = 1",
      [image_name, rfid],
      callback
    );
  },

  getImageName: function (rfid, callback) {
    return db.query(
      "SELECT image_file FROM `member` WHERE rfid = ? AND active = 1",
      [rfid],
      callback
    );
  },
};
module.exports = UploadFiles;
