const mongoose = require('mongoose');
const crypto = require('crypto');
const org = require('./organization.model');


const Schema = mongoose.Schema;

const USER_TYPES = [];

const UserSchema = new Schema({
  name: { type: String, default: '', required: true },
  email: { type: String, default: '', required: true },
  username: { type: String, default: '', required: true },
  type: { type: String, enum: USER_TYPES, required: true },
  provider: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },
  orgs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: [] }],
  twitter: { type: String },
  github: { type: String },
  google: { type: String },
  linkedin: { type: String },
});

mongoose.model('User', UserSchema);

const defaultUser = {
  name: '',
  email: '',
  username: '',
  type: '',
}

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
};


UserSchema.statics = {
  load: function (options, cb) {
    options.select = options.select || 'name username';
    return this.findOne(options.criteria).select(options.select).exec(cb);
  },

  createUser: function (userAttributes) {
    let newUserParams = Object.assign({}, defaultUser, userAttributes);
    let newUser = User.create(newUserParams, function (err, newUserParams) {
      if (err) {
        console.error('Cannot create User - Invalid', err);
      } else {
        console.log("Successfully created new user with name " + newUserParams.name);
      }
    });
    return newUser;
  },

  editUser: function (filter, updateParams) {
    let updated = User.updateOne(filter, updateParams, function (err, updateParams) {
      if (err) {
        console.error('Invalid update query', err);
      } else {
        console.log("Successfully updated user");
      }
    });
    return updated.ok;
  },

  deleteUser: function (deleteQuery) {
    let deleted = User.deleteOne(deleteQuery, function (err, deleteQuery) {
      if (err) {
        console.error('Invalid delete query', err);
      } else {
        console.log("Successfully deleted user with param " + deleteQuery);
      }
    });
    return deleted.ok;
  },

};


module.exports = UserSchema;
