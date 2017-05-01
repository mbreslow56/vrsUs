var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var battleSchema = new Schema ({
  state: String, // NOTE: possible states are: unmatched, ongoing, and completed
  weight: Number,
  battleName: String,
  voteGoal: Number,
  user1: {type: Schema.Types.ObjectId, ref:"User"},
  video1: String, //NOTE: left video. first in
  video1Votes: Number,
  user2: {type: Schema.Types.ObjectId, ref:"User"},
  video2: String, //NOTE: right video. second in
  video2Votes: Number,
  date: Date,
  winner: {type: Schema.Types.ObjectId, ref:"User"}
});


var battle = mongoose.model("Battle", battleSchema);
module.exports = battle;
