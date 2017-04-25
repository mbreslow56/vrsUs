var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = new Schema {
  wins: Number,
  losses: Number,
  total: Number
};
var userSchema =  new Schema {
   userName: String,
   passWord: String,
   artistRating: ratingSchema,
   voterRating: ratingSchema,
   videos: [{type: Schema.Types.ObjectId, ref:"Video"}],//videos populate array
   unmetBattles: [{type: Schema.Types.ObjectId, ref:"Unmet"}], //unmetBattles
   ongoingBattles: [{type: Schema.Types.ObjectId, ref:"Battle"}], //battle
   records: [{type: Schema.Types.ObjectId, ref:"Record"}]
};
var user = mongoose.model("User", userSchema);
module.exports = user;
