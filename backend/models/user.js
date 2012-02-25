
  var mongooseAuth = require('mongoose-auth')
    , mongoose = require('mongoose')
    , nconf = require('nconf')
    , Schema = mongoose.Schema
    , ObjectId = mongoose.SchemaTypes.ObjectId;

 
  var UserSchema = new Schema({})
        , User;
        
UserSchema.plugin(mongooseAuth, {
     // Here, we attach your User model to every module
     everymodule: {
       everyauth: {
           User: function () {
             return User;
           }
       }
     }, 
   github: {
        everyauth: {
               myHostname: 'http://localhost:3000'
               , appId: conf.github.appId
               , appSecret: conf.github.appSecret
               , redirectPath: '/user/confirmed'
               }
           },
  date_added: { type : Date, default : new Date().getTime() },
}
});

mongoose.model('User', UserSchema);

User = mongoose.model('User');