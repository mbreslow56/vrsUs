var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var battleSchema = new Schema {
  //participants: [{type: Schema.Types.ObjectId, ref:"User"}], DEPRACATED- ask
  voteGoal: Number,
  user1: {type: Schema.Types.ObjectId, ref:"User"},
  user2: {type: Schema.Types.ObjectId, ref:"User"},
  video1: {type: Schema.Types.ObjectId, ref:"Video"}, // url? string??
  video1Votes: Number,
  video2: {type: Schema.Types.ObjectId, ref:"Video"}, // url? string??
  video2Votes: Number
};


var battle = mongoose.model("Battle", battleSchema);
module.exports = battle;
