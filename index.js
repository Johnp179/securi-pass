const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const server = express();
require('dotenv').config();
require("./dbconnection.js");
const accountRoutes = require("./controller/account.js");
const userRoutes = require("./controller/user.js");


if(process.env.NODE_ENV != "production"){
  server.use((req, res, next)=>{
      if(req.headers.origin) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Access-Control-Allow-Headers',"Content-Type");
      res.setHeader('Access-Control-Allow-Methods',"GET, PUT, DELETE, POST");
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
  })
}

server.use(express.json());
server.use(cookieParser());
server.use("/account", accountRoutes);
server.use("/user", userRoutes);


if(process.env.NODE_ENV === "production"){
  server.use(" ",express.static("public/dist"));
  server.get("*",(req, res)=>{
    res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
  })
}

const port = process.env.PORT || 3000;
server.listen(port,()=>{
  console.log(`server started on port ${port}`);
})

