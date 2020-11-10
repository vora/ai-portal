const mongoose = require('mongoose');
const Resource = mongoose.model('Resource');

exports.Resource = Resource;

exports.search = async (query, fields) => {
  return await Resource.find();
};

exports.create = async (params) => {
  let resource = new Resource(params);
  await resource.save();
  return resource;
};

exports.update = async (resource, params) => {
  return await Model.update({ _id: resource._id }, { $set: params }).exec();
};
