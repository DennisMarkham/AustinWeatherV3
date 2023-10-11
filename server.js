require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(mongoURI);

const schema = new mongoose.Schema({temp: Number, time: String})

const weatherRecord = mongoose.model("record", schema)



//this did not help with the post problem
//app.use(express.static(__dirname));

//this didn't help either
//const path = require("path");

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/register", function(req, res){

  console.log(req.body);

async function addRecord(){
let newRecord = new weatherRecord({temp: req.body.temp, time: req.body.time})

await newRecord.save();
}
addRecord();

  res.end();
})

app.listen(3000);