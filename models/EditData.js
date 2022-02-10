const db = require("../dbconnection");

var EditData = {
  getcheckAdmin: function (id, username, callback) {
    return db.query(
      "SELECT id FROM admin WHERE id != ? AND username = ? AND active = 1",
      [id, username],
      callback
    );
  },

  getcheckDepart: function (id, username, callback) {
    return db.query(
      "SELECT id FROM department WHERE id != ? AND username = ? AND active = 1",
      [id, username],
      callback
    );
  },

  getcheckMember: function (data, callback) {
    let id = data.id;
    let rfid = data.rfid;
    let username = data.username;

    return db.query(
      `SELECT 
     (SELECT  count(rfid)
      FROM   member
      WHERE id != ? AND rfid = ? AND active = 1) AS checkRfid,
     (SELECT  count(rfid)
      FROM   member
      WHERE id != ? AND username = ? AND active = 1)  AS checkUsername`,
      [id, rfid, id, username],
      callback
    );
  },

  getcheckEquip: function (data, callback) {
    let id = data.id;
    let rfid = data.rfid;
    let equipment_number = data.equipment_number;
    let serial_number = data.serial_number;

    return db.query(
      `SELECT 
     (SELECT count(rfid)
      FROM  equipment
      WHERE id != ? AND rfid = ? AND active = 1)  AS checkRfid, 
		 (SELECT count(rfid)
      FROM  equipment
      WHERE id != ? AND equipment_number = ? AND active = 1) AS checkEquipNum,
     (SELECT count(rfid)
      FROM  equipment
      WHERE id != ? AND serial_number = ? AND active = 1)  AS checkSerial`,
      [id, rfid, id, equipment_number, id, serial_number],
      callback
    );
  },

  updatedataAdmin: function (data, password, callback) {
    let id = data.id;
    let username = data.username;
    let firstname = data.firstname;
    let lastname = data.lastname;
    let telephone = data.telephone;
    let gender = data.gender;
    let datetime = data.datetime;
    let update_by = data.update_by;

    return db.query(
      password != ""
        ? `UPDATE admin SET username= ? , enc_password= ?, firstname= ? , lastname= ? , telephone= ? ,gender= ?, update_by= ?, update_at=?, active= 1 WHERE id = ? AND active= 1`
        : `UPDATE admin SET username= ? , enc_password= (SELECT enc_password FROM admin WHERE id = ?), firstname= ? , lastname= ? , telephone= ? ,gender= ?, 
        update_by= ?, update_at=?, active= 1 WHERE id = ? AND active= 1`,
      [
        username,
        password != "" ? password : id, //ถ้าหน้าบ้านไม่ได้ส่งรหัสผ่านมาแสดงว่าผู้ใช้ไม่มีการแก้รหัส ให้เอา id ไปดึงรหัสมาใส่่เหมือนเดิม
        firstname,
        lastname,
        telephone,
        gender,
        update_by,
        datetime,
        id,
      ],
      callback
    );
  },

  updatedataDepartmant: function (data, password, callback) {
    let id = data.id;
    let username = data.username;
    let firstname = data.firstname;
    let department_name = data.department_name;
    let description = data.description;
    let datetime = data.datetime;
    let update_by = data.update_by;

    return db.query(
      password != ""
        ? `UPDATE department SET username= ?, enc_password= ?, department_name= ?, description= ?, update_by= ?, update_at= ?,active= 1 WHERE id = ? AND active= 1`
        : `UPDATE department SET username= ?, enc_password= (SELECT enc_password FROM department WHERE id = ?), department_name= ?, description= ?, update_by= ?, 
      update_at= ?,active= 1 WHERE id = ? AND active= 1`,
      [
        username,
        password != "" ? password : id, //ถ้าหน้าบ้านไม่ได้ส่งรหัสผ่านมาแสดงว่าผู้ใช้ไม่มีการแก้รหัส ให้เอา id ไปดึงรหัสมาใส่่เหมือนเดิม
        department_name,
        description,
        update_by,
        datetime,
        id,
      ],
      callback
    );
  },

  updatedataMember: function (data, password, callback) {
    let id = data.id;
    let rfid = data.rfid;
    let username = data.username;
    let firstname = data.firstname;
    let lastname = data.lastname;
    let telephone = data.telephone;
    let gender = data.gender;
    let datetime = data.datetime;
    let update_by = data.update_by;

    return db.query(
      password != ""
        ? `UPDATE member SET rfid= ?, username= ?, enc_password= ?, firstname= ?, lastname= ?, telephone= ? , gender= ?, update_by= ?, update_at= ?, active= 1 WHERE id = ? AND active= 1`
        : `UPDATE member SET rfid= ?, username= ?, enc_password= (SELECT enc_password FROM member WHERE id = ?), firstname= ?, lastname= ?, telephone= ? , gender= ?, 
        update_by= ?, update_at= ?, active= 1 WHERE id = ? AND active= 1`,
      [
        rfid,
        username,
        password != "" ? password : id, //ถ้าหน้าบ้านไม่ได้ส่งรหัสผ่านมาแสดงว่าผู้ใช้ไม่มีการแก้รหัส ให้เอา id ไปดึงรหัสมาใส่่เหมือนเดิม
        firstname,
        lastname,
        telephone,
        gender,
        update_by,
        datetime,
        id,
      ],
      callback
    );
  },

  updatedataEquipment: function (data, callback) {
    let id = data.id;
    let rfid = data.rfid;
    let equipment_name = data.equipment_name;
    let brand = data.brand;
    let model = data.model;
    let equipment_number = data.equipment_number;
    let serial_number = data.serial_number;
    let request_department_id = data.request_department_id;
    let description = data.description;
    let datetime = data.datetime;
    let update_by = data.update_by;

    return db.query(
      `UPDATE equipment SET rfid= ?, equipment_name= ?, brand= ?, model= ?, equipment_number= ?, serial_number= ?, request_department_id= ?, description= ?,
      update_by= ?, update_at=?, active=1 WHERE id = ? AND active= 1`,
      [
        rfid,
        equipment_name,
        brand,
        model,
        equipment_number,
        serial_number,
        request_department_id,
        description,
        update_by,
        datetime,
        id,
      ],
      callback
    );
  },
};
module.exports = EditData;
