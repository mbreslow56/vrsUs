var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var unmetSchema = new Schema ({
  user: {type: Schema.Types.ObjectId, ref:"User"},
  video: {type: Schema.Types.ObjectId, ref:"Video"}
});

var unmet = mongoose.model("Unmet", recordSchema);
module.exports = unmet;
