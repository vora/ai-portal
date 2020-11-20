const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');

require('../api/models/index');
const topicUtil = require('../api/models/topic.util');
const resourceUtil = require('../api/models/resource.util');
const organizationUtil = require('../api/models/organization.util');

const filename = 'AI Global - Resource Portal - New External Resources.csv';

let uploadRow = async (row) => {
  let topic = row.Topic;
  try {
    await topicUtil.create({ name: topic, desc: 'A Topic' });
  } catch (e) {}
  try {
    await organizationUtil.create({
      name: row['Organization'],
      type: row['Organization Type'],
    });
  } catch (e) {}
  let res = {
    path: row.Path,
    type: row.Format.split(', '),
    name: row.Resource,
    desc: row['Description of Resource'],
    downloadURL: row['Download URL'],
  };
  console.log(row);
  try {
    await resourceUtil.create(res);
  } catch (e) {
    console.log(e);
  }
};

(() => {
  let rows = [];
  mongoose.connection
    .on('error', console.warn)
    .on('disconnected', console.warn)
    .once('open', () => {
      fs.createReadStream(filename)
        .pipe(csv())
        .on('data', (row) => {
          rows.push(row);
        })
        .on('end', async () => {
          for (let row of rows) {
            await uploadRow(row);
          }
          mongoose.disconnect();
        });
    });
  mongoose.connect(process.env.MONGODB_URL, {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 10,
    autoReconnect: true,
  });
})();
