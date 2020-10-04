const mongoose = require('mongoose');
const Search = mongoose.model('Search');

exports.Search = Search;

exports.create = async (query) => {
  let search = new Search({ query });
  await search.save();
  return search;
};
