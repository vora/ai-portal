const mongoose = require('mongoose');
const topic = require('./topic.model');
const file = require('./file.model');

const Schema = mongoose.Schema;

const RESOURCE_TYPES = [];
const RESOURCE_PATHS = [];

const ResourceSchema = new Schema({
  description: { type: String, default: '', required: true },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic', default: [], required: true }],
  path: { type: String, enum: RESOURCE_PATHS },
  uploadDate: { type: Date, required: true },
  modified: { type: Date, default: uploadDate },
  license: { type: String, default: '' },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File', default: [], required: true }],
  creationDate: { type: Date, default: uploadDate },
  type: { type: String, enum: RESOURCE_TYPES, required: true },
  name: { type: String, default: '', required: true },
  technical: { type: Boolean, default: false },
  trustIndexCategories: { type: Array, default: [] },
  fundedBy: { type: String, default: '' },
  creator: { type: String, default: '' },
  dataDictLink: { type: String, default: '' },
  sensitiveData: { type: String, default: '' },
  qualityReview: { type: String, default: '' },
  ethicsReview: { type: String, default: '' },
  usage: { type: String, default: '' },
  isConfidential: { type: Boolean, default: false, required: true },
  offensiveContent: { type: String, default: '' },
  numInstances: { type: Number, default: 1 },
  instances: { type: Array, default: [] },
  label: { type: String, default: '' },
  rawData: { type: String, default: '' },
  distribution: { type: String, default: '' },
  personalInfoRemoved: { type: String, default: '' },
  privacyProcedure: { type: String, default: '' },
  individualsIdentified: { type: Boolean, default: false },
  noiseDescription: { type: String, default: '' },
  externalRestrictions: { type: String, default: '' },
})

mongoose.model('Resource', ResourceSchema);

const defaultRes = {
  name: '',
  type: '',
  description: '',
  topics: [],
  uploadDate: Date.now,
  isConfidential: false,
}

ResourceSchema.statics = {
  createRes: function (resAttributes) {
    let newResParams = Object.assign({}, defaultRes, resAttributes);
    let newRes = Resource.create(newResParams, function (err, newResParams) {
      if (err) {
        console.error('Cannot create Resource - invalid', err);
      } else {
        console.log("Successfully created new resource with name " + newResParams.name);
      }
    });
    return newRes;
  },

  editRes: function (filter, updateParams) {
    let updated = Resource.updateOne(filter, updateParams, function (err, updateParams) {
      if (err) {
        console.error('Invalid update query', err);
      } else {
        console.log("Successfully updated resource");
      }
    });
    return updated.ok;
  },

  deleteRes: function (deleteQuery) {
    let deleted = Resource.deleteOne(deleteQuery, function (err, deleteQuery) {
      if (err) {
        console.error('Invalid delete query', err);
      } else {
        console.log("Successfully deleted resource with param " + deleteQuery);
      }
    });
    return deleted.ok;
  },
}


module.exports = ResourceSchema;