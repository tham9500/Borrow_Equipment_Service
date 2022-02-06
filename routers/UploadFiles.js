const express = require("express");
const router = express.Router();
const UploadFiles = require("../models/UploadFiles");
const multer = require("multer");
const fs = require("fs");

router.post("/uploadImageProfile", async function (req, res, next) {
  let storageUploadFile = multer.diskStorage({
    destination: (req, file, cb) => {
      const DIR = `././uploads/profiles`;
      cb(null, DIR);
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname;
      cb(null, fileName);
    },
  });

  let UploadFile = multer({ storage: storageUploadFile }).single("file");

  UploadFile(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    if (req.file != undefined) {
      //รับชื่อรูปจากฐานข้อมูล
      let resultDB = await getImageName(req.body["rfid"]);
      let imageName = resultDB[0]["image_file"];

      if (imageName != "") {
        let path = "././uploads/profiles/" + imageName;

        //ลบรูปเก่า
        fs.unlink(path, function (err) {
          if (err) {
            console.error(err);
          } else {
            console.log("File removed:", path);
          }
        });
      }

      UploadFiles.updateImage(
        req.file.filename,
        req.body["rfid"],
        (err, rows) => {
          if (err) {
            console.log(err);
            res.json({ status: "Failed", data: "update data Image fail" });
          } else {
            res.json({ status: "Succeed", data: "Successful image upload" });
          }
        }
      );
    } else {
      res.json({ status: "Failed", data: "undefined file" });
    }
  });
});

async function getImageName(rfid) {
  return new Promise((resolve, reject) => {
    try {
      UploadFiles.getImageName(rfid, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

module.exports = router;
