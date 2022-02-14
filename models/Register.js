const db = require("../dbconnection");

var Register = {
  getcheckAdmin: function (username, callback) {
    return db.query(
      "SELECT id FROM admin WHERE username = ? AND active = 1",
      [username],
      callback
    );
  },

  getcheckDepart: function (username, callback) {
    return db.query(
      "SELECT id FROM department WHERE username = ? AND active = 1",
      [username],
      callback
    );
  },

  getcheckMember: function (data, callback) {
    let rfid = data.rfid;
    let username = data.username;
    return db.query(
      `SELECT (SELECT  count(rfid)
      FROM   member
      WHERE  rfid = ? AND active = 1) AS checkRfid,
     (SELECT  count(rfid)
      FROM   member
      WHERE  username = ? AND active = 1)  AS checkUsername`,
      [rfid, username],
      callback
    );
  },

  getcheckEquip: function (data, callback) {
    let rfid = data.rfid;
    let equipment_number = data.equipment_number;
    let serial_number = data.serial_number;
    return db.query(
      `SELECT (SELECT  count(rfid)
      FROM   equipment
      WHERE  rfid = ? AND active = 1)  AS checkRfid, 
		 (SELECT  count(rfid)
      FROM   equipment
      WHERE  equipment_number = ? AND active = 1) AS checkEquipNum,
     (SELECT  count(rfid)
      FROM   equipment
      WHERE  serial_number = ? AND active = 1)  AS checkSerial`,
      [rfid, equipment_number, serial_number],
      callback
    );
  },

  insertdataAdmin: function (data, password, callback) {
    let username = data.username;
    let firstname = data.firstname;
    let lastname = data.lastname;
    let telephone = data.telephone;
    let gender = data.gender;
    let datetime = data.datetime;
    let create_by = data.create_by;
    return db.query(
      "INSERT INTO `admin`(`username`, `enc_password`, `firstname`, `lastname`, `telephone`, `gender`, `create_by`, `create_at`, `update_by`, `update_at`, `active`)" +
        "VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        username,
        password,
        firstname,
        lastname,
        telephone,
        gender,
        create_by,
        datetime,
        create_by,
        datetime,
        1,
      ],
      callback
    );
  },

  insertdataDepartmant: function (data, password, callback) {
    let username = data.username;
    let firstname = data.firstname;
    let department_name = data.department_name;
    let description = data.description;
    let datetime = data.datetime;
    let create_by = data.create_by;
    return db.query(
      "INSERT INTO `department`(`username`, `enc_password`, `department_name`, `description`, `create_by`, `create_at`, `update_by`, `update_at`, `active`)" +
        "VALUES (?,?,?,?,?,?,?,?,?)",
      [
        username,
        password,
        department_name,
        description,
        create_by,
        datetime,
        create_by,
        datetime,
        1,
      ],
      callback
    );
  },

  insertdataMember: function (data, password, callback) {
    let rfid = data.rfid;
    let username = data.username;
    let firstname = data.firstname;
    let lastname = data.lastname;
    let telephone = data.telephone;
    let gender = data.gender;
    let datetime = data.datetime;
    let create_by = data.create_by;
    return db.query(
      "INSERT INTO `member`(`rfid`, `username`, `enc_password`, `firstname`, `lastname`, `telephone`, `gender`, `image_file`, `create_by`, `create_at`, `update_by`, `update_at`, `active`)" +
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        rfid,
        username,
        password,
        firstname,
        lastname,
        telephone,
        gender,
        null,
        create_by,
        datetime,
        create_by,
        datetime,
        1,
      ],
      callback
    );
  },

  insertdataEquipment: function (data, callback) {
    let rfid = data.rfid;
    let equipment_name = data.equipment_name;
    let brand = data.brand;
    let model = data.model;
    let equipment_number = data.equipment_number;
    let serial_number = data.serial_number;
    let description = data.description;
    let datetime = data.datetime;
    let create_by = data.create_by;
    return db.query(
      "INSERT INTO `equipment`(`rfid`, `equipment_name`, `brand`, `model`, `equipment_number`, `serial_number`, `description`," +
        "`create_by`, `create_at`, `update_by`, `update_at`, `active`)" +
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        rfid,
        equipment_name,
        brand,
        model,
        equipment_number,
        serial_number,
        description,
        create_by,
        datetime,
        create_by,
        datetime,
        1,
      ],
      callback
    );
  },
};
module.exports = Register;
