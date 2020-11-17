const mongoose = require('mongoose');
const { ORG_TYPES } = require('./enums');

const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  name: { type: String, required: true },
  shortName: { type: String, default: '' },
  country: { type: String, default: '' },
  city: { type: String, default: '' },
  logoURL: { type: String, default: '' },
  websiteURL: { type: String, default: '' },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  type: { type: String, enum: ORG_TYPES },
});

mongoose.model('Organization', OrganizationSchema);
module.exports = OrganizationSchema;
