const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
});

mongoose.model('Topic', TopicSchema);
module.exports = TopicSchema;
