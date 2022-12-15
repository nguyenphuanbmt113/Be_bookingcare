const upload_middware = (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  return res.json({ secure_url: req.file.path });
};
export default upload_middware;
