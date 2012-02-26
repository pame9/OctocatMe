
  var mongooseAuth = require('mongoose-auth')
    , mongoose = require('mongoose')
    , nconf = require('nconf')
    , Schema = mongoose.Schema
    , ObjectId = mongoose.SchemaTypes.ObjectId;

 
  var UserSchema = new Schema({}), User;
        
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
               , appId: "67efa7c78ca83967f2ac"
               , appSecret: "f9ff083165da265a7103f2b3f3eb24e804fbf44f"
               , redirectPath: '/user/confirmed'
               , findOrCreateUser : function (session, accessToken, accessTokenExtra, githubUserMetadata) {
                  session.oauth = accessToken;
                  return session.uid = githubUserMetadata.login;
                }
               }
           },
  date_added: { type : Date, default : new Date().getTime() },

});

mongoose.model('User', UserSchema);

User = mongoose.model('User');