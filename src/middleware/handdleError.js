import createError from "http-errors";
const badRequestErr = (err, res) => {
  const error = createError.BadRequest(err);
  return res.status(error.status).json({
    EC: 1,
    EM: error.message,
  });
};
const internalServerError = (res) => {
  const error = createError.InternalServerError();
  return res.status(error.status).json({
    EC: 1,
    EM: error.message,
  });
};
const notFound = (req, res) => {
  const error = createError.NotFound();
  return res.status(error.status).json({
    EC: 1,
    EM: error.message,
  });
};
module.exports = { notFound, internalServerError, badRequestErr };
