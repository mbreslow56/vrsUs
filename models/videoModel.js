var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema ({
  url: String,
  name: String,
  description: String
});

var video = mongoose.model("Video", videoSchema);
module.exports = video;
