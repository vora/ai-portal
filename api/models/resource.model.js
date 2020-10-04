const mongoose = require('mongoose');
const topic = require('./topic.model');
const file = require('./file.model');

const Schema = mongoose.Schema;

const RESOURCE_TYPES = [];
const RESOURCE_PATHS = [];

const ResourceSchema = new Schema({
  description: { type: String, default: '', required: true },
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      default: [],
      required: true,
    },
  ],
  path: { type: String, enum: RESOURCE_PATHS },
  uploadDate: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  license: { type: String, default: '' },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      default: [],
    },
  ],
  creationDate: { type: Date, default: Date.now },
  type: { type: String, enum: RESOURCE_TYPES, required: true },
  name: { type: String, required: true },
  technical: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  trustIndexCategories: { type: Array, default: [] },
  fundedBy: { type: String, default: '' },
  creator: { type: String, default: '' },
  dataDictLink: { type: String, default: '' },
  sensitiveData: { type: String, default: '' },
  qualityReview: { type: String, default: '' },
  ethicsReview: { type: String, default: '' },
  usage: { type: String, default: '' },
  isConfidential: { type: Boolean, default: false },
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
});

mongoose.model('Resource', ResourceSchema);
module.exports = ResourceSchema;
