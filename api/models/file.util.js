const mongoose = require('mongoose');
const aws = require('../lib/aws');
const File = mongoose.model('File');

exports.File = File;

exports.signUpload = (fn, type) => {
  fn = fn.replace('/', '').replace('\\', '');
  return aws.createSignedPUTFileURL(fn);
};

exports.createFromAWSUpload = async (awsUploadParams) => {
  let file = new File({
    name: awsUploadParams.name,
    url: aws.filesURL + awsUploadParams.awsStoragePath,
    inAWS: true,
  });
  await file.save();
  return file;
};
