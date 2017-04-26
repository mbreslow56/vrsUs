var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var unmetSchema = new Schema ({
  battleName: String,
  user: {type: Schema.Types.ObjectId, ref:"User"},
  video: String
});

var unmet = mongoose.model("Unmet", recordSchema);
module.exports = unmet;
