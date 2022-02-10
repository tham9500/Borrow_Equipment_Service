const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const DeleteData = require("../models/DeleteData");

router.post("/", async function (req, res, next) {
  let type_user = req.body.type_user;
  let dataResponse;

  switch (parseInt(type_user)) {
    ////////////////////////////Admin////////////////////////////////
    case 1: {
      dataResponse = await deletedataAdmin(req.body);
      break;
    }

    //////////////////////////Department//////////////////////////////
    case 2: {
      dataResponse = await deletedataDepartmant(req.body);
      break;
    }

    /////////////////////////////Member///////////////////////////////
    case 3: {
      dataResponse = await deletedataMember(req.body);
      break;
    }

    ///////////////////////////////Equipment//////////////////////////////
    case 4: {
      dataResponse = await deletedataEquipment(req.body);
      break;
    }

    default:
      res.json({ status: "Failed", data: "กำหนด Type User ระหว่าง 0-4" });
      break;
  }

  if (dataResponse) {
    res.json({ status: "Succeed", data: "Delete data successfully" });
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

async function deletedataAdmin(data) {
  return new Promise((resolve, reject) => {
    try {
      DeleteData.deletedataAdmin(data, (err, rows) => {
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

async function deletedataDepartmant(data) {
  return new Promise((resolve, reject) => {
    try {
      DeleteData.deletedataDepartmant(data, (err, rows) => {
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

async function deletedataMember(data) {
  return new Promise((resolve, reject) => {
    try {
      DeleteData.deletedataMember(data, (err, rows) => {
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

async function deletedataEquipment(data) {
  return new Promise((resolve, reject) => {
    try {
      DeleteData.deletedataEquipment(data, (err, rows) => {
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
