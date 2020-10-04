const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.User = User;

exports.create = async (params) => {
  let user = new User(params);
  await user.save();
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
