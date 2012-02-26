var _ = require('underscore')
  , mongoose = require('mongoose')
  , fs = require('fs')
  , sys = require('sys')
  , api = require('restler')
  , util = require('util')
  , Canvas = require('canvas')
  , canvas = new Canvas(200,200)
  , Image = Canvas.Image
  , ctx = canvas.getContext('2d'); 

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
            var api_key = 'ca2f9dbee60a4eb329d48d13a2907121';
                api_secret = '0253e61b1570e8dabc147dc7b67b1c57'
                image_url = 'https://royal-blood.showoff.io/images/' + req.files.photo_upload.filename; 
            api.get('http://api.face.com/faces/detect.json?api_key='+api_key+'&api_secret='+api_secret+'&urls='+image_url).on('complete', function(data) {
              console.log(image_url);
              var img = new Image;
              img.onload = function(){
                console.log("you're here");
                var width = img.width, height = img.height;
                ctx.drawImage(img, 0, 0, width, height);
                var center_x = data.photos[0].tags[0].center.x;
                var center_y = data.photos[0].tags[0].center.y;
                var distance = data.photos[0].tags[0].height / 2; 
                data = ctx.getImageData(center_x, center_y, center_x + 3, center_y + 3).data;
                console.log(data);}
               img.src = image_url;
              console.log(data);
              console.log("the object gender is: "+ data.photos[0].tags[0].attributes.gender.value + ". I am  "+data.photos[0].tags[0].attributes.gender.confidence+" % sure");
              console.log("The object is smiling: "+ data.photos[0].tags[0].attributes.smiling.value + ". I am  "+data.photos[0].tags[0].attributes.smiling.confidence+" % sure");
              photo.gender =  data.photos[0].tags[0].attributes.gender.value;
              photo.glass =  data.photos[0].tags[0].attributes.glasses.value;
              photo.save(function{
                 res.render('render');
              })
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


