import express from "express";
import cors from "cors";
import userApiRoute from "./router/userRoute";
require("dotenv").config();
require("./config/conectionSQL");
const app = express();
const port = 5100;
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
//middware
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
//router
userApiRoute(app);
//port web
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
