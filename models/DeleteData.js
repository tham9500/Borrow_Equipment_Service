const db = require("../dbconnection");

var DaleteData = {
  deletedataAdmin: function (data, callback) {
    return db.query(
      `UPDATE admin SET active = 0, update_at = ? WHERE id = ?`,
      [data.datetime, data.id],
      callback
    );
  },

  deletedataDepartmant: function (data, callback) {
    return db.query(
      `UPDATE department SET active = 0, update_at = ? WHERE id = ?`,
      [data.datetime, data.id],
      callback
    );
  },

  deletedataMember: function (data, callback) {
    return db.query(
      `UPDATE member SET active = 0, update_at = ? WHERE id = ?`,
      [data.datetime, data.id],
      callback
    );
  },

  deletedataEquipment: function (data, callback) {
    return db.query(
      `UPDATE equipment SET active = 0, update_at = ? WHERE id = ?`,
      [data.datetime, data.id],
      callback
    );
  },
};
module.exports = DaleteData;
