import express from "express";
import cors from "cors";
import userApiRoute from "./router/userRoute";
import configCORS from "./config/cors";
require("dotenv").config();
require("./config/conectionSQL");
const app = express();
const port = 8080;
//middware
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ["POST", "GET", "PUT", "DELETE"],
//   })
// );
configCORS(app);
//router
userApiRoute(app);
//port web
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
