const mongoose = require('mongoose');
const Resource = mongoose.model('Resource');
const Organization = mongoose.model('Organization');

exports.Resource = Resource;

let populate = (resourceQuery) => {
  return resourceQuery
    .populate('organizations', '-_id -__v -organizations')
    .populate('topics', '-_id -__v -topics')
    .populate('files', '-_id -__v -files');
};

exports.search = async (query, fields) => {
  return await populate(Resource.find());
};

exports.create = async (params) => {
  let resource = new Resource(params);
  await resource.save();
  return resource;
};

exports.update = async (resource, params) => {
  let { topics, files, organizations, _id, __v, ...cleanParams } = params;
  return await Resource.update(
    { _id: resource._id },
    { $set: cleanParams }
  ).exec();
};

exports.toJSON = (resource) => {
  return JSON.parse(JSON.stringify(resource));
};

exports.getById = async (id) => {
  return await populate(Resource.findById(id));
};

exports.addTopic = async (resource, tag) => {
  return await Resource.findByIdAndUpdate(
    resource._id,
    { $push: { topics: tag._id } },
    { new: true, useFindAndModify: false }
  );
};

exports.addOrganization = async (resource, org) => {
  let updatedResource = await Resource.findByIdAndUpdate(
    resource._id,
    { $push: { organizations: org._id } },
    { new: true, useFindAndModify: false }
  );
  await Organization.findByIdAndUpdate(
    org._id,
    { $push: { resources: resource._id } },
    { new: true, useFindAndModify: false }
  );
  return updatedResource;
};
