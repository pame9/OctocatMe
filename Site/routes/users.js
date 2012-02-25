var _ = require('underscore')
  , mongoose = require('mongoose')

var User = mongoose.model('User')

exports.index = function(req, res) {
  User.find({}, function(err, users) {
    if (err) throw err;
    res.render('users/index', {users: users})
  })
}

exports.new = function(req, res) {
  res.render('users/new', {user : new User()})
}

exports.create = function(req, res) {
  var user = new User(req.body.user)
  user.save(function(err) {
    if (err) throw err;
    res.render('users/show', {user: user})
  })
}

exports.show = function(req, res) {
  User.findById(req.params.user, function(err, record) {
    if (err) throw err;
    res.render('users/show', {user: record})
  })
}

exports.edit = function(req, res) {
  User.findById(req.params.user, function(err, record) {
    if (err) throw err;
    res.render('users/edit', {user: record})
  })
}

exports.update = function(req, res) {
  console.dir(req.body)
  User.update({_id: req.params.user}, req.body.user, function(err) {
    if (err) throw err;
    User.findById(req.params.user, function(err, user) {
      res.render('users/show', {user: user})
    })
  })
}

