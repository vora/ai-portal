const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SearchSchema = new Schema({
  query: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

mongoose.model('Search', SearchSchema);
module.exports = SearchSchema;
