const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Login = require("../models/Login");

router.post("/PostLogin", async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  //เช็ค username ว่าเป็น Admin Member หรือ Department

  //Admin
  if (username.includes("admin")) {
    let dataAdmin = await getcheckAdmin(username); //ข้อมูล Admin ทั้งหมด สำหรับนำมาเช็ค

    if (dataAdmin.length > 0) {
      let hashPW = dataAdmin[0]["enc_password"];

      const match = await bcrypt.compare(password, hashPW); //เปรียบเทียบรหัสผ่าน
      if (match) {
        delete dataAdmin[0]["enc_password"]; //ลบ properties password ไม่ส่งไปหน้าบ้าน

        res.json({ status: "Succeed", data: dataAdmin });
      } else res.json({ status: "Failed", data: "Incorrect password" });
    } else res.json({ status: "Failed", data: "Incorrect username" });
  }

  //Department
  else if (username.includes("dpm")) {
    let dataDpm = await getcheckDepartment(username); //ข้อมูล Department ทั้งหมด สำหรับนำมาเช็ค

    if (dataDpm.length > 0) {
      let hashPW = dataDpm[0]["enc_password"];

      const match = await bcrypt.compare(password, hashPW); //เปรียบเทียบรหัสผ่าน
      if (match) {
        delete dataDpm[0]["enc_password"]; //ลบ properties password ไม่ส่งไปหน้าบ้าน

        res.json({ status: "Succeed", data: dataDpm });
      } else res.json({ status: "Failed", data: "Incorrect password" });
    } else res.json({ status: "Failed", data: "Incorrect username" });

    //Member
  } else {
    let dataMember = await getcheckMember(username); //ข้อมูล Member ทั้งหมด สำหรับนำมาเช็ค

    if (dataMember.length > 0) {
      let hashPW = dataMember[0]["enc_password"];

      const match = await bcrypt.compare(password, hashPW); //เปรียบเทียบรหัสผ่าน
      if (match) {
        delete dataMember[0]["enc_password"]; //ลบ properties password ไม่ส่งไปหน้าบ้าน

        res.json({ status: "Succeed", data: dataMember });
      } else res.json({ status: "Failed", data: "Incorrect password" });
    } else res.json({ status: "Failed", data: "Incorrect username" });
  }
});

async function getcheckAdmin(username) {
  return new Promise((resolve, reject) => {
    try {
      Login.getcheckAdmin(username, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(false);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function getcheckDepartment(username) {
  return new Promise((resolve, reject) => {
    try {
      Login.getcheckDepartment(username, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(false);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function getcheckMember(username) {
  return new Promise((resolve, reject) => {
    try {
      Login.getcheckMember(username, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(false);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}
module.exports = router;
