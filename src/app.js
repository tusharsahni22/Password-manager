const express = require("express");
require("dotenv").config();
const app = express();
require("./database/connection");
const allRoutes = require("./routes/route")
const port = process.env.PORT || 3000
var cors = require('cors');
app.use(cors());


app.use("/api",allRoutes)
app.use("/",(req,res)=>(
  res.send("yeah its live now and Working ")
))
const start = async () => {
  try {
    await app.listen(port || 3000 , () => {
      console.log(`listiening at port:" ${port}`);
    });
  } catch (error) {
    console.log(err);
  }
};
start();
