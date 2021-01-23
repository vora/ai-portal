const AWS = require('aws-sdk');
const { v1: uuidv1 } = require('uuid');

const region = 'us-east-2';
const filesBucket = process.env.S3_FILES_BUCKET || 'ai-portal-files';
exports.filesURL = `https://${filesBucket}.s3.${region}.amazonaws.com/`;

AWS.config.update({ region: region });

const s3 = new AWS.S3();

exports.createSignedPUTFileURL = (fn) => {
  let path = `uploads/${uuidv1()}/${fn}`;
  let clientParams = {
    Bucket: filesBucket,
    Key: path,
  };
  let url = s3.getSignedUrl('putObject', clientParams);
  return { url, path };
};
