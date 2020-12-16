const mongoose = require('mongoose');

const { USER_ROLES } = require('./enums');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  emailVerified: { type: Boolean, default: false },
  emailToken: { type: String },
  username: { type: String, unique: true, required: true },
  role: { type: String, default: 'member', enum: USER_ROLES },
  hashedPassword: { type: String },
  salt: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  organizations: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: [] },
  ],
  resources: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', default: [] },
  ],
});

mongoose.model('User', UserSchema);
module.exports = UserSchema;
