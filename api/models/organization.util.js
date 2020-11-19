const mongoose = require('mongoose');
const Organization = mongoose.model('Organization');

exports.Organization = Organization;

exports.create = async (params) => {
  let organization = new Organization(params);
  await organization.save();
  return organization;
};

exports.getAll = async () => {
  return await Organization.find();
};

exports.toJSON = async (organization) => {
  return { ...organization };
};
