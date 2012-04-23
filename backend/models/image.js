
  
var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var ImageSchema = new Schema({
  feature : {type : String},
  number : {type : String},
  svg : {type : String},
  gender : {type: String}
});


exports.Image = mongoose.model('Image',ImageSchema);
