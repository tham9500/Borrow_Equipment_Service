const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Register = require("../models/Register");

router.post("/PostRegis", async function (req, res, next) {
  let type_user = req.body.type_user;
  let dataResponse;
  let listDuplicateData = [];

  switch (parseInt(type_user)) {
    ////////////////////////////Admin////////////////////////////////
    case 1: {
      //เช็ค username
      let countID = await getcheckAdmin(req.body.username);
      if (countID > 0) {
        listDuplicateData.push("username");
        dataResponse = { DuplicateData: listDuplicateData };
      } else {
        //เข้ารหัสผ่าน
        let hashPW = await bcrypt.hash(req.body.enc_password, 10);
        //บันทึกข้อมูล
        dataResponse = await postdataAdmin(req.body, hashPW);
      }
      break;
    }

    //////////////////////////Department//////////////////////////////
    case 2: {
      //เช็ค username
      let countID = await getcheckDepart(req.body.username);
      if (countID > 0) {
        listDuplicateData.push("username");
        dataResponse = { DuplicateData: listDuplicateData };
      } else {
        //เข้ารหัสผ่าน
        let hashPW = await bcrypt.hash(req.body.enc_password, 10);
        //บันทึกข้อมูล
        dataResponse = await postdataDepartmant(req.body, hashPW);
      }
      break;
    }

    /////////////////////////////Member///////////////////////////////
    case 3: {
      //เช็ค ข้อมูลซ้ำ
      let countData = await getcheckMember(req.body);
      let checkRfid = countData[0]["checkRfid"];
      let checkUsername = countData[0]["checkUsername"];
      let checkMember_id = countData[0]["checkMember_id"];

      if (checkRfid > 0 || checkUsername > 0 || checkMember_id > 0) {
        if (checkRfid > 0) {
          listDuplicateData.push("rfid");
        }
        if (checkUsername > 0) {
          listDuplicateData.push("username");
        }
        if (checkMember_id > 0) {
          listDuplicateData.push("member_id");
        }
        dataResponse = { DuplicateData: listDuplicateData };
      } else {
        //เข้ารหัสผ่าน
        let hashPW = await bcrypt.hash(req.body.enc_password, 10);
        //บันทึกข้อมูล
        dataResponse = await postdataMember(req.body, hashPW);
      }
      break;
      break;
    }

    ///////////////////////////////Equipment//////////////////////////////
    case 4: {
      //เช็ค ข้อมูลซ้ำ
      let countData = await getcheckEquip(req.body);
      let checkRfid = countData[0]["checkRfid"];
      let checkEquipNum = countData[0]["checkEquipNum"];
      let checkSerial = countData[0]["checkSerial"];

      if (checkRfid > 0 || checkEquipNum > 0 || checkSerial > 0) {
        if (checkRfid > 0) {
          listDuplicateData.push("rfid");
        }
        if (checkEquipNum > 0) {
          listDuplicateData.push("equipment_number");
        }
        if (checkSerial > 0) {
          listDuplicateData.push("serial_number");
        }
        dataResponse = { DuplicateData: listDuplicateData };
      } else {
        //บันทึกข้อมูล
        dataResponse = await postdataEquipment(req.body);
      }

      break;
    }

    default:
      res.json({ status: "Failed", data: "กำหนด Type User ระหว่าง 0-4" });
      break;
  }

  if (typeof dataResponse != "boolean") {
    res.json({ status: "Failed", data: dataResponse });
  } else if (dataResponse) {
    res.json({ status: "Succeed", data: "Insert data successfully" });
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

async function getcheckAdmin(username) {
  return new Promise((resolve, reject) => {
    try {
      Register.getcheckAdmin(username, (err, rows) => {
        if (rows != null) {
          resolve(rows.length);
        } else {
          console.log(err);
          resolve(false);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function getcheckDepart(username) {
  return new Promise((resolve, reject) => {
    try {
      Register.getcheckDepart(username, (err, rows) => {
        if (rows != null) {
          resolve(rows.length);
        } else {
          console.log(err);
          resolve(false);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function getcheckMember(data) {
  return new Promise((resolve, reject) => {
    try {
      Register.getcheckMember(data, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          console.log(err);
          resolve(false);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function getcheckEquip(data) {
  return new Promise((resolve, reject) => {
    try {
      Register.getcheckEquip(data, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          console.log(err);
          resolve(false);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function postdataAdmin(data, password) {
  return new Promise((resolve, reject) => {
    try {
      Register.postdataAdmin(data, password, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function postdataDepartmant(data, password) {
  return new Promise((resolve, reject) => {
    try {
      Register.postdataDepartmant(data, password, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function postdataMember(data, password) {
  return new Promise((resolve, reject) => {
    try {
      Register.postdataMember(data, password, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function postdataEquipment(data) {
  return new Promise((resolve, reject) => {
    try {
      Register.postdataEquipment(data, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

module.exports = router;
