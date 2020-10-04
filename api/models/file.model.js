const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  type: { type: String, default: '', required: true },
  URL: { type: String, default: '', required: true },
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
});

mongoose.model('File', FileSchema);

const defaultFile = {
  type: '',
  URL: '',
};

FileSchema.statics = {
  createFile: function (fileAttributes) {
    let newFileParams = Object.assign({}, defaultFile, fileAttributes);
    let newFile = File.create(newFileParams, function (err, newFileParams) {
      if (err) {
        console.error('createFile', err);
      }
    });
    return newFile;
  },

  editFile: function (filter, updateParams) {
    let updated = File.updateOne(filter, updateParams, function (
      err,
      updateParams
    ) {
      if (err) {
        console.error('editFile', err);
      }
    });
    return updated.ok;
  },

  deleteFile: function (deleteQuery) {
    let deleted = File.deleteOne(deleteQuery, function (err, deleteQuery) {
      if (err) {
        console.error('deleteFile', err);
      }
    });
    return deleted.ok;
  },
};

module.exports = FileSchema;
