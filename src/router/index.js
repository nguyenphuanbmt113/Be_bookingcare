const router = require("express").Router()

router("/", (res, req)=>{
  return res.send("hello word")
})

module.exports = router;