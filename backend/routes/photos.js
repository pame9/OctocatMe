var _ = require('underscore')
  , mongoose = require('mongoose')
  , fs = require('fs')
  , sys = require('sys')
  , api = require('restler')
  , util = require('util');

var Photo = mongoose.model('Photo');

exports.index = function(req, res) {
  Photo.find({}, function(err, photos) {
    if (err) throw err;
    res.render('photos/index', {photos: photos})
  })
}

exports.new = function(req, res) {
  res.render('photos/new', {photo : new Photo()});
}


exports.create = function(req, res) {
  var photo = new Photo();
  photo.path = '/images/' + req.files.photo_upload.filename;
  var ins = fs.createReadStream(req.files.photo_upload.path);
  var ous = fs.createWriteStream('./public/images/' + req.files.photo_upload.filename);
  util.pump(ins, ous, function(err) {
          if(err) {
            next(err);
          } else {
            photo.save(function(err) {
                var api_key = 'ca2f9dbee60a4eb329d48d13a2907121';
                    api_secret = '0253e61b1570e8dabc147dc7b67b1c57'
                    image_url = 'http://localhost:3030/public/images/' + req.files.photo_upload.filename; 
                    console.log(image_url);
                api.get('http://api.face.com/faces/detect.json?api_key='+api_key+'&api_secret='+api_secret+'&urls='+image_url).on('complete', function(data) {
                  console.log(data);
                  console.log("the object gender is: "+ data.photos[0].tags[0].attributes.gender.value + ". I am  "+data.photos[0].tags[0].attributes.gender.confidence+" % sure");
                  console.log("The object is smiling: "+ data.photos[0].tags[0].attributes.smiling.value + ". I am  "+data.photos[0].tags[0].attributes.smiling.confidence+" % sure");
                });
             })
          }
  }); 
  
 
}
  
exports.edit = function(req, res) {
  Photo.findById(req.params.photo, function(err, record) {
    if (err) throw err;
    res.render('photos/edit', {photo: record})
  })
}


