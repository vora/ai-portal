const mongoose = require('mongoose');
const user = require('./user.model');

const Schema = mongoose.Schema;

// need to fill in
const ORG_TYPES = [];

const OrgSchema = new Schema({
  name: { type: String, default: '', required: true },
  shortName: { type: String, default: '' },
  country: { type: String, default: '' },
  city: { type: String, default: '' },
  logoURL: { type: String, default: '' },
  websiteURL: { type: String, default: '' },
  orgUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  orgType: { type: String, enum: ORG_TYPES },
});

mongoose.model('Organization', OrgSchema);

const defaultOrg = {
  name: '',
}

OrgSchema.statics = {
  createOrg: function (orgAttributes) {
    let newOrgParams = Object.assign({}, defaultOrg, orgAttributes);
    let newOrg = Organization.create(newOrgParams, function (err, newOrgParams) {
      if (err) {
        console.log(newOrgParams);
        handleError(err);
      } else {
        console.log("Successfully created new org with name " + newOrgParams.name);
      }
    });
    return newOrg;
  },

  editOrg: function (filter, updateParams) {
    let updated = Organization.updateOne(filter, updateParams, function (err, updateParams) {
      if (err) {
        console.log(updateParams);
        handleError(err);
      } else {
        console.log("Successfully updated org");
      }
    });
    return updated.ok;
  },

  deleteOrg: function (deleteQuery) {
    let deleted = Organization.deleteOne(deleteQuery, function (err, deleteQuery) {
      if (err) {
        console.log(deleteQuery);
        handleError(err);
      } else {
        console.log("Successfully deleted org with param " + deleteQuery);
      }
    });
    return deleted.ok;
  },
}

module.exports = OrgSchema;