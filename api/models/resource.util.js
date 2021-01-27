const mongoose = require('mongoose');
const Resource = mongoose.model('Resource');
const Organization = mongoose.model('Organization');
const Topic = mongoose.model('Topic');
const File = mongoose.model('File');
const fileUtil = require('./file.util');
const organizationUtil = require('./organization.util');
const querys = require('../lib/querys');

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
  if (fields.approved) {
    fields.reviewsRemaining = [];
  }
  let result = querys.searchQuery(
    Resource,
    {
      queryFields: ['name', 'desc'],
      anyFields: ['topics', 'organizations', 'type', 'path'],
      exactFields: ['reviewsRemaining'],
      sorts: { byUploadDateAsc: ['uploadDate', 1], byNameAsc: ['name', 1] },
    },
    query,
    fields
  );
  return await populate(result);
};

exports.create = async (params) => {
  let resource = new Resource(params);
  await resource.save();
  resource = exports.update(resource, params);
  return resource;
};

exports.update = async (resource, rawParams) => {
  if (rawParams.files?.length && typeof rawParams.files[0] === 'object') {
    rawParams.files = await Promise.all(
      rawParams.files.map(async (fl) => {
        if (fl.awsStoragePath) {
          return await fileUtil.createFromAWSUpload(fl);
        }
        return fl;
      })
    );
  }
  let result = await querys.execUpdateQuery(
    Resource,
    {
      setParams: [
        'reviewsRemaining',
        'name',
        'desc',
        'type',
        'path',
        'keywords',
        'creationDate',
        'modifiedDate',
        'licenseName',
        'downloadURL',
        'logoURL',
        'technical',
        'trustIndexCategories',
        'fundedBy',
        'creator',
        'dataDictLink',
        'sensitiveData',
        'qualityReview',
        'ethicsReview',
        'usage',
        'featured',
        'isConfidential',
        'offensiveContent',
        'numInstances',
        'instances',
        'label',
        'rawData',
        'personalInfoRemoved',
        'privacyProcedure',
        'individualsIdentified',
        'noiseDescription',
        'externalRestrictions',
        'aiSystemTyupes',
        'version',
        'updateFrequency',
        'unintendedUse',
        'ownerEmail',
        'location',
        'missingInfo',
        'audience',
        'removalRequest',
        'dataset',
        'model',
      ],
      setRefFuncs: {
        topics: exports.setTopics,
        organizations: exports.setOrganizations,
        files: exports.setFiles,
      },
    },
    resource,
    rawParams
  );
  return result;
};

exports.toJSON = (resource) => {
  let { __v, ...obj } = JSON.parse(JSON.stringify(resource));
  obj.organizations = obj.organizations.map(organizationUtil.toJSON);
  obj.files = obj.organizations.map(fileUtil.toJSON);
  return obj;
};

exports.getById = async (id) => {
  return await populate(Resource.findById(id));
};

exports.getAllPending = async () => {
  return await populate(
    Resource.find({ reviewsRemaining: { $exists: true, $not: { $size: 0 } } })
  );
};

exports.getFeatured = async () => {
  return await populate(Resource.find({ featured: true }));
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

exports.setFiles = async (resource, files) => {
  return await querys.execUpdateSetManyToOne(
    Resource,
    'resource',
    resource,
    File,
    'files',
    files
  );
};

exports.setTopics = async (resource, topics) => {
  return await querys.execUpdateSetManyToMany(
    Resource,
    null,
    resource,
    Topic,
    'topics',
    topics
  );
};

exports.setOrganizations = async (resource, orgs) => {
  return await querys.execUpdateSetManyToMany(
    Resource,
    'resources',
    resource,
    Organization,
    'organizations',
    orgs
  );
};

exports.delete = async (id) => {
  return await Resource.deleteOne(id);
};
