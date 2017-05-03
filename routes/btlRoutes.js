var express = require('express');
var router = express.Router();
var Battle = require("../models/battleModel");

router.get('/:state', function(req, res, next) {
  Battle.find({state: req.params.state}, function(error, result) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      console.log(result);
      res.send(result);
    } //else
  }); // find callback
}); //get routes for all unmatched, ongoing and completed battles

router.get('/:state/:id', function(req, res, next) {
  Battle.find({_id: req.params.id}, function(error, result) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(result);
    } //else
  }); // find callback
}); //get route for a specific battle

router.post('/', function(req, res, next){
  var btl = new Battle(req.body);
  btl.save(function(err, result){
    if (err) {
      throw(err);
    }   else {
      res.send(result);
    } //else
  }) //save promise
}) // new battle route

router.put('/:id', function(req, res, next) {
  Battle.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, battle){
    if (err) {
      throw err;
    } else {
      console.log("the battle after voting, fresh from the route is", battle);
      res.send(battle);
    }
  }) // update callback
}) // battle put route replace battle with new one

router.delete('/:id', function(req, res, next){
  Battle.findOneAndRemove({_id: req.params.id}, function(err, ongoing){
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(ongoing.data);
    } //else
  }) //mongoose find callback
}) // battle delete route NOTE: admin?

module.exports = router;
