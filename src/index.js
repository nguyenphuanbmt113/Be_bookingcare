const express = require("express");
const cors = require("cors");
const apiWeb = require("./router/api");
import authApi from "./router/authRoute";
import userApi from "./router/userRoute";
import insertDataApi from "./router/insertRoute";
import bookApi from "./router/bookRoute";
const testConectionSQL = require("./config/conectionSQL");
require("dotenv").config();
require("./config/conectionSQL");
const app = express();
const port = 5000;
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
//middware

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
//router
insertDataApi(app);
bookApi(app);
apiWeb(app);
authApi(app);
// userApi(app);
userApi(app);
//conectionSQL
// testConectionSQL();
//port web
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
