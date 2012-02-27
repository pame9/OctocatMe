
  
var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var CatSchema = new Schema({
  gender : {type : String},
  image : {type : String},
  glasses : {type : String},
  });


exports.Cat = mongoose.model('Cat', CatSchema);
