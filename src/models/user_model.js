import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_REPS = 10;

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  username: { type: String, unique: true, lowercase: true },
});

UserSchema.set('toJSON', { virtuals: true });

// disabled because returning outside of the promise chains
// could create  an issue by returning befor ethe check has
// been completed
// eslint-disable-next-line consistent-return
UserSchema.pre('save', function beforeUserSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;

  // TODO: do stuff here
  if (!user.isModified('password')) return next();

  // eslint-disable-next-line consistent-return
  bcrypt.genSalt(SALT_REPS, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });
});

// password checking method
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};
// create model class
const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
