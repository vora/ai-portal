const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });

const s3 = new AWS.S3();
