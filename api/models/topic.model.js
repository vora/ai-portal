const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '', required: true },
});

mongoose.model('Topic', TopicSchema);

const defaultTopic = {
  name: '',
  description: '',
}

TopicSchema.statics = {
  createTopic: function (newTopic) {
    let newTopicParams = Object.assign({}, defaultTopic, newTopic);
    let newTopic = Topic.create(newTopicParams, function (err, newTopicParams) {
      if (err) {
        console.error('Cannot create Topic - invalid', err);
      } else {
        console.log("Successfully created Topic with name " + newTopicParams.name);
      }
    });
    return newTopic;
  },

  editTopic: function (filter, updateParams) {
    let updated = Topic.updateOne(filter, updateParams, function (err, updateParams) {
      if (err) {
        console.error('Invalid update query', err);
      } else {
        console.log("Successfully updated Topic");
      }
    });
    return updated.ok;
  },

  deleteTopic: function (deleteQuery) {
    let deleted = Topic.deleteOne(deleteQuery, function (err, deleteQuery) {
      if (err) {
        console.error('Invalid delete query', err);
      } else {
        console.log("Successfully deleted topic with param " + deleteQuery);
      }
    });
    return deleted.ok;
  },
}


module.exports = TopicSchema;