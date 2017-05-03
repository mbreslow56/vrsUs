var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = new Schema ({
  user: {type: Schema.Types.ObjectId, ref:"User"},
  video: Number,
  weight: Number,
  battle: {type: Schema.Types.ObjectId, ref:"Battle"},
  winner: Boolean
});


var rating = mongoose.model("Rating", ratingSchema);
module.exports = rating;
