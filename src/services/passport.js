/* eslint-disable consistent-return */
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import dotenv from 'dotenv';

import User from '../models/user_model';

// email is username
const localOptions = { usernameField: 'email' };
// dotenv.config({ silent: true });

// option for the jwt strategy
// we'll pass in the jwt in an 'authorization' header
// so passport can ind it there
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};

// DEBUG for dotenv
// console.log(`!:!::::::!:::::${jwtOptions.secretOrKey} is the secret key`);

// username + password authentication strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // find the user by email and check the password using method
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) { return done(null, false); }

    // compare the passwords - is 'password' equal to user.password
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        done(err);
      } else if (!isMatch) {
        done(null, false);
      } else {
        done(null, user);
      }
    });
  });
});

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, (err, user) => {
    if (err) {
      done(err, false);
    } else if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);

export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignin = passport.authenticate('local', { session: false });
