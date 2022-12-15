const isAdmin = (req, res, next) => {
  const { role_code } = req.user;
  if (role_code !== "R1") {
    return res.status(490).json({
      EC: 2,
      EM: "khogn co quy truy cap",
    });
  }
  next();
};
const isDevOrAdmin = (req, res, next) => {
  const { role_code } = req.user;
  if (role_code !== "R1" && role_code !== "R2") {
    return {
      EC: 2,
      EM: "ban khong co quyen truy cap dev and admin",
    };
  }
  next();
};
export { isDevOrAdmin, isAdmin };
