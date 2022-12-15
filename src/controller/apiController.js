const handleInit = (req, res) => {
  return res.status(200).json({
    name: "nguyen phu an",
    age: 17,
  });
};
module.exports = {handleInit};
