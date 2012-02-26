
  
var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var PhotoSchema = new Schema({
  user : {type : String},
  path : {type : String},
  glasses : {type : Boolean},
  gender : {type: String},
  gender_percent : {type : Number},
  moode : {type : String },
  date_added: { type : Date, default : new Date().getTime() }
});

exports.Photo = mongoose.model('Photo', PhotoSchema);