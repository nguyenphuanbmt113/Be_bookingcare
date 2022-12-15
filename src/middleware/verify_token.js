import { verifiToken } from "../config/jwt";
import handeError from "./handdleError";
const verifi_token = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    handeError.badRequestErr("requied authrization", res);
  }
  const access_token = token.split(" ")[1];
  const decode = verifiToken(access_token);
  console.log("decode", decode);
  if (decode) {
    req.user = decode;
    next();
  }
};
export default verifi_token;
