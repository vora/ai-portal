const mongoose = require('mongoose');
const { FILE_EXTS } = require('./enums');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: { type: String, required: true },
  type_ext: { type: String, enum: FILE_EXTS },
  url: { type: String, default: '' },
  timeframe: { type: String, default: '' },
  purpose: { type: String, default: '' },
  dataCollectMech: { type: String, default: '' },
  samplingStrategy: { type: String, default: '' },
  datasplitRecs: { type: String, default: '' },
  dataCollectionInfo: { type: String, default: '' },
  upstreamSrc: { type: String, default: '' },
  modelType: { type: String, default: '' },
  modelInputs: { type: String, default: '' },
  modelOutputs: { type: String, default: '' },
  datasetFieldRelationships: { type: String, default: '' },
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    default: [],
  },
});

mongoose.model('File', FileSchema);
module.exports = FileSchema;
