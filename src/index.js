import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userApiRoute from "./router/userRoute";
import configCORS from "./config/cors";
import webRoute from "./router/webRoute";
require("dotenv").config();
require("./config/conectionSQL");
const app = express();
const port = 8080;
//middware
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
configCORS(app);
app.use(cookieParser());
//router
userApiRoute(app);
webRoute(app);
//port web
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
