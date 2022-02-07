const db = require("../dbconnection");

var Login = {
  getcheckAdmin: function (username, callback) {
    return db.query(
      "SELECT * FROM admin WHERE username = ? AND active = 1",
      [username],
      callback
    );
  },

  getcheckDepartment: function (username, callback) {
    return db.query(
      "SELECT * FROM department WHERE username = ? AND active = 1",
      [username],
      callback
    );
  },

  getcheckMember: function (username, callback) {
    return db.query(
      "SELECT * FROM member WHERE username = ? AND active = 1",
      [username],
      callback
    );
  },
};
module.exports = Login;
