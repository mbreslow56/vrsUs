// var express = require('express');
// var router = express.Router();
// var Rating = require("../models/ratingModel");
//
// router.get('/:id', function(req, res, next) {
//   Rating.find({id: req.params.id, winner:true}, function(error, result) {
//     if (error) {
//       console.error(error)
//       return next(error);
//     } else {
//       res.send(result);
//     }// else
//   }); // findById callback
// }); // get all good ratings from a certain user
//
// router.post('/', function(req, res, next){
//   var newRate = new Rating(req.body);
//   newRate.save(function(err, result){
//     if (err) {
//       throw(err);
//     }   else {
//       res.send(result);
//     } //else
//   }) //save promise
// }) // rating post route
//
// router.put('/:battleId/:vidNo', function(req, res, next) {
//   Rating.update({$and: {battle: req.params.battleId, video: req.params.vidNo}},{$set: {winner: true}}, {multi: true}, function(err, ratings){
//     if (err) {
//       throw err;
//     } else {
//       res.send(ratings);
//     }
//   }) // update callback
// }) // rating put route set winner to true
//
// module.exports = router;
