const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy=require('passport-facebook').Strategy;
const GOOGLE_CLIENT_ID=`${process.env.GOOGLE_CLIENT_ID}`;
const GOOGLE_CLIENT_SECRET=`${process.env.GOOGLE_CLIENT_SECRET}`;
const FACEBOOK_APP_ID=`${process.env.FACEBOOK_APP_ID}`;
const FACEBOOK_APP_SECRET=`${process.env.FACEBOOK_APP_SECRET}`;
const passport=require('passport');

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    cb(null,profile);
  }
));
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  cb(null,profile);
}
));
passport.serializeUser((user,cb)=>{
    cb(null,user);
})
passport.deserializeUser((user,cb)=>{
    cb(null,user);
})