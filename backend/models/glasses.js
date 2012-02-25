
  
var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var GlassesSchema = new Schema({
  color : {type : String},
  gender : {type : String},
  image : {type : String}
});


exports.Shirt = mongoose.model('Shirt', ShirtSchema);