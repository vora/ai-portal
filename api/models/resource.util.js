const mongoose = require('mongoose');
const Resource = mongoose.model('Resource');

exports.Resource = Resource;

exports.search = async (query, fields) => {
  return [];
};
