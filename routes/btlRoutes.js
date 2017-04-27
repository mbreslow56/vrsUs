var express = require('express');
var router = express.Router();
var Unmet = require("../models/unmetModel");
var Battle = require("../models/battleModel");
var Record = require("../models/recordModel");

router.get('/unjoined', function(req, res, next){
  Unmet.find(function(error, result){
    if (error) {
      throw (error);
    } else {
      res.send(result);
    } //else
  })// callback
})// get all unmatched

router.post('/unjoined', function(req, res, next){
  var unjoined = new Unmet(req.body);
  unjoined.save(function(err, result){
    if (err) {
      throw(err);
    }   else {
      res.send(result);
    } //else
  }) //save promise
}) // unjoined post route

router.delete('/unjoined/:id', function(req, res, next){
  Unmet.findOneAndRemove({_id: req.params.id}, function(err,unmatched){
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(unmatched.data);
    } //else
  }) //mongoose find callback
}) // unjoined delete route

router.get('/ongoing', function(req, res, next){
  Battle.find(function(error, result){
    if (error) {
      throw (error);
    } else {
      res.send(result);
    } //else
  })// callback
})// get all unmatched

router.post('/ongoing', function(req, res, next){
  var ongoingB = new Battle(req.body);
  ongoingB.save(function(err, result){
    if (err) {
      throw(err);
    }   else {
      res.send(result);
    } //else
  }) //save promise
}) // unjoined post route


router.delete('/ongoing/:id', function(req, res, next){
  Battle.findOneAndRemove({_id: req.params.id}, function(err, ongoing){
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(ongoing.data);
    } //else
  }) //mongoose find callback
}) // ongoing delete route

router.get('/record', function(req,res,next) {
  Record.find(function(error, result){
    if (error) {
      throw (error);
    } else {
      res.send(result);
    } //else
  })// callback
})// record get route

router.post('/record', function(req, res, next){
  var newRec = new Record(req.body);
  newRec.save(function(err, result){
    if (err) {
      throw(err);
    }   else {
      res.send(result);
    } //else
  }) //save promise
}) // record post route

module.exports = router;
