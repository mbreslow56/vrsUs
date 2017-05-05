var express = require('express');
var router = express.Router();
var Battle = require("../models/battleModel");
var User = require("../models/userModel");

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

// find a participant of a certain battle
router.get('/:state/:battleId/:participantId/', function(req, res, next) {
  User.find({_id: req.params.participantId}, function(err, participant){
    if (err) {
      throw err;
    } else {
      res.send(participant);
    }
  });
});

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
router.put('/:id/:userId', function(req, res, next) { //req.body = new battle
  if (req.body.video1Ratings.length === req.body.voteGoal) {
    req.body.winner = req.params.userId;
    req.body.date = new Date();
    req.body.state = "completed";
      User.update({_id: {$in :req.body.video1Ratings }}, {$inc: {voterWins: 1}}, function(error, res){
        if (error) {
          return next(error);
        } else {
          User.update({_id: req.body.user1}, {$inc: {artistWins: 1}}, function(err, result){
            if (err) {
              return next(err);
            }
          })
        }//else
      });
  } else if (req.body.video2Ratings.length === req.body.voteGoal){
    req.body.winner = req.params.userId;
    req.body.date = new Date();
    req.body.state = "completed";
    User.update({_id: {$in :req.body.video2Ratings }}, {$inc: {voterWins: 1}}, function(error, res){
      if (error) {
        return next(error);
      } else {
        User.update({_id: req.body.user2}, {$inc: {artistWins: 1}}, function(err, result){
          if (err) {
            return next(err);
          }
        })
      }//else
    });// update
  } //else if
  Battle.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, battle){
    if (err) {
      throw err;
    } else {
      console.log("the battle after voting, fresh from the route is", battle);
      res.send(battle);
    }
  }) // update callback
}) // battle voting route


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
