var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordSchema = new Schema ({
  //participants: [{type: Schema.Types.ObjectId, ref:"User"}], DEPRACATED- ask
  battleName: String,
  date: Date,
  voteGoal: Number,
  winner: {type: Schema.Types.ObjectId, ref:"User"},
  loser: {type: Schema.Types.ObjectId, ref:"User"},
  winnerVotes: Number,
  winnerVideo: {type: Schema.Types.ObjectId, ref:"Video"}, // url? string??
  loserVotes: Number,
  loserVideo: {type: Schema.Types.ObjectId, ref:"Video"} // url? string??
});


var record = mongoose.model("Record", recordSchema);
module.exports = record;
