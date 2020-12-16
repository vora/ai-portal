const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const _email = require('../lib/email');

exports.User = User;

exports.makeSalt = () => {
  return Math.round(new Date().valueOf() * Math.random()) + '';
};

exports.comparePassword = (user, passwordAttempt) => {
  return (
    crypto
      .createHmac('sha1', user.salt)
      .update(passwordAttempt)
      .digest('hex') == user.hashedPassword
  );
};

exports.create = async ({ name, email, username, password }) => {
  let emailToken = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '');
  let salt = exports.makeSalt();
  let hashedPassword = crypto
    .createHmac('sha1', salt)
    .update(password)
    .digest('hex');
  let user = new User({
    name,
    email,
    username,
    emailToken,
    salt,
    hashedPassword,
  });
  await user.save();
  await _email.send.createAccount(email, {
    name: name,
    verifyUrl: `${process.env.BASE_URL}/verify?username=${username}&token=${emailToken}`,
  });
  return user;
};

exports.get = async (where) => {
  return User.findOne(where);
};

exports.update = async (user, params) => {
  return await Model.update({ _id: user._id }, { $set: params }).exec();
};

exports.getByUsernameOrEmail = async (userOrEmail) => {
  let user = await User.findOne({ username: userOrEmail });
  if (user) {
    return user;
  }
  return await User.findOne({ email: userOrEmail });
};

exports.getAll = async () => {
  return await User.find();
};

exports.sendReset = async (user) => {
  let token = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '');
  await email.send.resetPassword(user.email, {
    resetURL: `${process.env.BASE_URL}/reset?username=${user.username}&token=${token}`,
  });
};

exports.toTokenJSON = (user) => {
  let { _id, email, name, username, role } = user;
  return { _id, email, name, username, role };
};

exports.toPrivateJSON = (user) => {
  return { ...user };
};
