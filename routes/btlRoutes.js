var express = require('express');
var router = express.Router();
var Unmet = require("../models/unmetModel");

router.post('/unjoined', function(req, res, next){
  var unjoined = new Unmet(req.body);
  unjoined.save(function(err, result){
    if (err) {
      throw(err);
    }
    else {
      res.send(result);
    }
  })
})





module.exports = router;
