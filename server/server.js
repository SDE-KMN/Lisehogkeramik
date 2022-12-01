const express = require("express");
var cors = require("cors");
const fs = require("fs");
const path = require("path");
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(fileUpload())

app.use("/static", express.static(path.join(__dirname, "../src/BillederFolder/slideshow")));

app.post("/unlinkFile", function(req, res) {
    const file = req.body.file
    fs.unlinkSync(path.join("../src/BillederFolder/slideshow", file))
});

app.post("/appendFile", function(req, res) {
    const file = req.files.file
    const filename = req.files.file.name
    file.mv("../src/BillederFolder/slideshow/" + filename)
});

app.get("/billeder", function(req, res) {
    const images = fs.readdirSync("../src/BillederFolder/slideshow");
    res.json({ billeder: images });
});


const server = app.listen(PORT, () => {
  console.log("Server er startet på 5000");
});