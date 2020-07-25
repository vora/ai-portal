const mongoose = require('mongoose');
const User = mongoose.model('User');
const LocalStrategy = require('passport-local').Strategy;

const localAuthStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    const options = {
      criteria: { email: email },
      select: 'name username email hashed_password salt',
    };
    User.load(options, (err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
);

module.exports = (passport) => {
  passport.serializeUser((user, cb) => cb(null, user.id));
  passport.deserializeUser((id, cb) =>
    User.load({ criteria: { _id: id } }, cb)
  );
  passport.use(localAuthStrategy);
};
