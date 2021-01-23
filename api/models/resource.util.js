const mongoose = require('mongoose');
const Resource = mongoose.model('Resource');
const Organization = mongoose.model('Organization');
const Topic = mongoose.model('Topic');
const queryUtil = require('./query.util');

exports.Resource = Resource;

let populate = (resourceQuery) => {
  return resourceQuery
    .populate('organizations', '-__v -organizations')
    .populate('topics', '-__v -topics')
    .populate('files', '-__v -files');
};

exports.search = async (query, fields) => {
  if (fields.organizationType) {
    let orgs = await Organization.find({
      type: fields.organizationType,
    }).select('id');
    fields.organizations = orgs.map((org) => org._id).join(',');
  }
  let result = queryUtil.searchQuery(
    Resource,
    {
      queryFields: ['name', 'desc'],
      anyFields: ['topics', 'organizations', 'type', 'path'],
      sorts: { byUploadDateAsc: ['uploadDate', 1], byNameAsc: ['name', 1] },
    },
    query,
    fields
  );
  return await populate(result);
};

exports.create = async (params) => {
  let resource = new Resource({});
  await resource.save();
  resource = exports.update(resource, params);
  return resource;
};

exports.update = async (resource, rawParams) => {
  let result = await queryUtil.execUpdateQuery(
    Resource,
    {
      setParams: [
        'name',
        'desc',
        'type',
        'path',
        'downloadURL',
        'modifiedDate',
        'trustIndexCategories',
        'keywords',
        'creator',
      ],
      setRefFuncs: {
        topics: exports.setTopics,
        organizations: exports.setOrganizations,
      },
    },
    resource,
    rawParams
  );
  return result;
};

exports.toJSON = (resource) => {
  return JSON.parse(JSON.stringify(resource));
};

exports.getById = async (id) => {
  return await populate(Resource.findById(id));
};

exports.delete = async (resource) => {
  await Resource.deleteOne({ _id: resource._id });
};

exports.addTopic = async (resource, tag) => {
  return await Resource.findByIdAndUpdate(
    resource._id,
    { $addToSet: { topics: tag._id } },
    { new: true, useFindAndModify: false }
  );
};

exports.addOrganization = async (resource, org) => {
  let updatedResource = await Resource.findByIdAndUpdate(
    resource._id,
    { $addToSet: { organizations: org._id } },
    { new: true, useFindAndModify: false }
  );
  await Organization.findByIdAndUpdate(
    org._id,
    { $addToSet: { resources: resource._id } },
    { new: true, useFindAndModify: false }
  );
  return updatedResource;
};

exports.setTopics = async (resource, topics) => {
  return await queryUtil.execUpdateSetManyToMany(
    Resource,
    'resources',
    resource,
    Topic,
    'topics',
    topics
  );
};

exports.setOrganizations = async (resource, orgs) => {
  return await queryUtil.execUpdateSetManyToMany(
    Resource,
    'resources',
    resource,
    Organization,
    'organizations',
    orgs
  );
};
