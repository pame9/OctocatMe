var assert = require('assert')
var mongoose = require('mongoose')
require('../models/company')

mongoose.connect("mongodb://localhost/plum_ally_test");

//var Company = require('../models/company').Company
var Company = mongoose.model('Company')

describe('Company', function() {
  it('has a name', function() {
    var company = new Company({name: 'nwc'})
    assert.equal(company.name, 'nwc')
  })
})

describe('persistence', function() {
  it('saves', function(done) {
    Company.collection.drop()
    var company = new Company({name: 'nwc'})
    company.save(function(err) {

      Company.count(function(err, count) {
        assert.equal(count, 1)
        done()
      })

      Company.update({_id: company.id}, {name: 'new work city'}, function(err) {
        if (err) throw err;

        assert.equal(company.name, 'new work city')
      })

    })
  })
})
