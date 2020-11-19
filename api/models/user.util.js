const mongoose = require('mongoose');
const User = mongoose.model('User');
const email = require('../lib/email');

exports.User = User;

exports.create = async ({ name, email, username }) => {
  let emailToken = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '');
  let user = new User({ name, email, username, emailToken });
  await user.save();
  await email.send.createAccount(email, {
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
