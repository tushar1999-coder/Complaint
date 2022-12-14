import { sendDataToIpfs } from "./dist/file-reading.mjs";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import CryptoJS from "crypto-js";

const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  let relativePath = "./index.html";
  let absolutePath = path.resolve(relativePath);

  res.sendFile(absolutePath);
});

let complaintString;

app.post("/", urlencodedParser, (req, res) => {
  console.log("Got body:", req.body); //req.body is of object type
  console.log("Type of complaint", typeof req.body);

  //encrypt the complainant name
  let response = req.body;

  complaintString = JSON.stringify(response);
  // TODO ye wala project hoga divyanshu ke saath merge
  writeToFile(complaintString);
  res.sendStatus(200);
});

const encrypt = (data) => {
  //encryption logic
  var ciphertext = CryptoJS.AES.encrypt(
    data,
    "tushar divyanshu sneha"
  ).toString();

  console.log("Encoded :", typeof ciphertext);

  // Decrypt
  // var bytes = CryptoJS.AES.decrypt(ciphertext, "tushar divyanshu sneha");
  // var originalText = bytes.toString(CryptoJS.enc.Utf8);

  // console.log("Decoded :", originalText); // 'my message'

  return ciphertext;
};

const writeToFile = (content) => {
  console.log("Writ to file ke andar", typeof content);

  fs.writeFile("./dist/complaint.txt", content, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
    sendDataToIpfs();
  });
};

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
