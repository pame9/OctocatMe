
  
var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var EyesSchema = new Schema({
  color : {type : String},
  length : {type : String},
  image : {type : String},
  gender : {type: String}
});


exports.Eyes = mongoose.model('Eyes',EyesSchema);
