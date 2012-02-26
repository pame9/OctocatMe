
  
var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var FaceSchema = new Schema({
  color : {type : String},
  length : {type : String},
  image : {type : String},
  gender : {type: String}
});


exports.Face = mongoose.model('Face',FaceSchema);
