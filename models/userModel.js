var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema =  new Schema ({
   username: String,
   password: String,
   artistWins :Number, //artist rating
   voterWins:Number, //rating
   //battles: [{type: Schema.Types.ObjectId, ref:"Battle"}]
});

UserSchema.plugin(plm);

var User = mongoose.model("User", UserSchema);
module.exports = User;
