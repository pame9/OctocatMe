
  
var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var MouthSchema = new Schema({
  color : {type : String},
  length : {type : String},
  image : {type : String},
  gender : {type: String}
});


exports.Mouth = mongoose.model('Mouth',MouthSchema);
