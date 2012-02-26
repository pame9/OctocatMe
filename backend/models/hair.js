
  
var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var HairSchema = new Schema({
  color : {type : String},
  length : {type : String},
  image : {type : String},
  gender : {type: String}
});


exports.Hair = mongoose.model('Hair',HairSchema);
  