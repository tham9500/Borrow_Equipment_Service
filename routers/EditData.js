const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const EditData = require("../models/EditData");

router.post("/UpdateData", async function (req, res, next) {
  let type_user = req.body.type_user;
  let dataResponse;
  let listDuplicateData = [];
  let hashPW;

  switch (parseInt(type_user)) {
    ////////////////////////////Admin////////////////////////////////
    case 1: {
      //เช็ค username
      let countID = await getcheckAdmin(req.body.username, req.body.id);
      if (countID > 0) {
        listDuplicateData.push("username");

        dataResponse = { DuplicateData: listDuplicateData };
      } else {
        if (req.body.enc_password != "") {
          //เข้ารหัสผ่าน
          hashPW = await bcrypt.hash(req.body.enc_password, 10);
        } else {
          hashPW = "";
        }

        //บันทึกข้อมูล
        dataResponse = await updatedataAdmin(req.body, hashPW);
      }

      break;
    }

    //////////////////////////Department//////////////////////////////
    case 2: {
      //เช็ค username
      let countID = await getcheckDepart(req.body.username, req.body.id);
      if (countID > 0) {
        listDuplicateData.push("username");

        dataResponse = { DuplicateData: listDuplicateData };
      } else {
        if (req.body.enc_password != "") {
          //เข้ารหัสผ่าน
          hashPW = await bcrypt.hash(req.body.enc_password, 10);
        } else {
          hashPW = "";
        }

        //บันทึกข้อมูล
        dataResponse = await updatedataDepartmant(req.body, hashPW);
        console.log(dataResponse);
      }

      break;
    }

    /////////////////////////////Member///////////////////////////////
    case 3: {
      //เช็ค ข้อมูลซ้ำ
      let countData = await getcheckMember(req.body);
      let checkRfid = countData[0]["checkRfid"];
      let checkUsername = countData[0]["checkUsername"];

      if (checkRfid > 0 || checkUsername > 0) {
        if (checkRfid > 0) {
          listDuplicateData.push("rfid");
        }
        if (checkUsername > 0) {
          listDuplicateData.push("username");
        }

        dataResponse = { DuplicateData: listDuplicateData };
      } else {
        if (req.body.enc_password != "") {
          //เข้ารหัสผ่าน
          hashPW = await bcrypt.hash(req.body.enc_password, 10);
        } else {
          hashPW = "";
        }

        //บันทึกข้อมูล
        dataResponse = await updatedataMember(req.body, hashPW);
      }

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
        dataResponse = await updatedataEquipment(req.body);
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
    res.json({ status: "Succeed", data: "Update data successfully" });
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

async function getcheckAdmin(username, id) {
  return new Promise((resolve, reject) => {
    try {
      EditData.getcheckAdmin(username, id, (err, rows) => {
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

async function getcheckDepart(username, id) {
  return new Promise((resolve, reject) => {
    try {
      EditData.getcheckDepart(username, id, (err, rows) => {
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
      EditData.getcheckMember(data, (err, rows) => {
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
      EditData.getcheckEquip(data, (err, rows) => {
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

async function updatedataAdmin(data, password) {
  return new Promise((resolve, reject) => {
    try {
      EditData.updatedataAdmin(data, password, (err, rows) => {
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

async function updatedataDepartmant(data, password) {
  return new Promise((resolve, reject) => {
    try {
      EditData.updatedataDepartmant(data, password, (err, rows) => {
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

async function updatedataMember(data, password) {
  return new Promise((resolve, reject) => {
    try {
      EditData.updatedataMember(data, password, (err, rows) => {
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

async function updatedataEquipment(data) {
  return new Promise((resolve, reject) => {
    try {
      EditData.updatedataEquipment(data, (err, rows) => {
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
