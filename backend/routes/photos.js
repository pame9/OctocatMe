var _ = require('underscore')
  , mongoose = require('mongoose')
  , fs = require('fs')
  , sys = require('sys')
  , api = require('restler')
  , util = require('util');

var Photo = mongoose.model('Photo');
var Cat = mongoose.model('Cat');

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
            console.log(err);
            next(err);
          } else {
            var api_key = 'ca2f9dbee60a4eb329d48d13a2907121';
                api_secret = '0253e61b1570e8dabc147dc7b67b1c57'
                image_url = 'https://royal-blood.showoff.io/images/' + req.files.photo_upload.filename; 
            api.get('http://api.face.com/faces/detect.json?api_key='+api_key+'&api_secret='+api_secret+'&urls='+image_url).on('complete', function(data) {
              console.log("the object gender is: "+ data.photos[0].tags[0].attributes.gender.value + ". I am  "+data.photos[0].tags[0].attributes.gender.confidence+" % sure");
              console.log("The object is smiling: "+ data.photos[0].tags[0].attributes.glasses.value + ". I am  "+data.photos[0].tags[0].attributes.glasses.confidence+" % sure");
              photo.gender =  data.photos[0].tags[0].attributes.gender.value;
              photo.glasses = data.photos[0].tags[0].attributes.glasses.value;
              console.log(data.photos[0].tags[0])
              photo.save(function(err){
                if (err) console.log(err);
                else{
                console.log("you're in!!!");
                res.render('photos/show', {photo: photo});
              }
              });
          });
      }
  });
}

  
exports.edit = function(req, res) {
  Photo.findById(req.params.photo, function(err, record) {
    if (err) throw err;
    res.render('photos/edit', {photo: record})
  })
}

exports.show = function(req, res) {
  console.log(req.user);
}