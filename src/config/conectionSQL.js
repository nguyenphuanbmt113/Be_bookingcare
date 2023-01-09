const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("be-bookingcare", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
const testConectionSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
testConectionSQL();
