const express = require("express");
require("dotenv").config();
const app = express();
require("./database/connection");
const allRoutes = require("./routes/route")


app.use("/api",allRoutes)
app.use("/",(req,res)=>(
  res.send("yeah its live now and Working ")
))


const start = async () => {
  try {
    await app.listen(process.env.PORT || 3000 , () => {
      console.log("listiening at port 3000");
    });
  } catch (error) {
    console.log(err);
  }
};
start();
