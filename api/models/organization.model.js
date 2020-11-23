const mongoose = require('mongoose');
const { ORG_TYPES } = require('./enums');

const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  shortName: { type: String, default: '' },
  country: { type: String, default: '' },
  city: { type: String, default: '' },
  logoURL: { type: String, default: '' },
  websiteURL: { type: String, default: '' },
  type: { type: String, enum: ORG_TYPES },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  resources: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', default: [] },
  ],
});

mongoose.model('Organization', OrganizationSchema);
module.exports = OrganizationSchema;
