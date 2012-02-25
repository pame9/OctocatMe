
  
var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var CatSchema = new Schema({
  hair : {type : ObjectId, ref : "HairSchema"},
  hair_color : {type : String},
  language : {type : ObjectId, ref : "LanguageSchema"},
  glasses : {type : ObjectId, ref : "GlassesSchema"}   
});


exports.Cat = mongoose.model('Cat', CatSchema);
