const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');

require('../api/models/index');
const topicUtil = require('../api/models/topic.util');
const resourceUtil = require('../api/models/resource.util');
const organizationUtil = require('../api/models/organization.util');

const resourcesFn = 'AI Global - Resource Portal - New External Resources.csv';
const orgsFn = 'AI Global - Resource Portal - Member Organizations.csv';

let parseDate = (d) => {
  let newDate = new Date(d);
  if (Number.isNaN(+newDate)) {
    return null;
  }
  return newDate;
};

let uploadRow = async (row, orgsDb) => {
  let topics = [];
  for (let topic of row.Topic.split(', ')) {
    try {
      topics.push(await topicUtil.create({ name: topic, desc: 'A Topic' }));
    } catch (e) {
      topics.push(await topicUtil.getByName(topic));
    }
  }
  let orgs = [];
  for (let orgName of row.Organization.split(', ')) {
    let org = orgsDb[orgName];
    if (!org) continue;
    try {
      orgs.push(
        await organizationUtil.create({
          name: org['Organizations'],
          type: org['Type'],
          logoURL: `/demo/${org['Github File Name']}`,
          websiteURL: org['URL'],
        })
      );
    } catch (e) {
      orgs.push(await organizationUtil.getByName(org['Organizations']));
    }
  }
  let res = {
    path: row.Path,
    type: row.Format.split(', ').map((f) => f.trim()),
    name: row.Resource,
    desc: row['Description of Resource'],
    downloadURL: row['Download URL'],
    creationDate: parseDate(row['Creation Date']),
    modifiedDate: parseDate(row['Date Modified']),
    uploadDate: parseDate(row['Upload Date']),
    trustIndexCategories: row['Responsible AI Trust Index Category']
      .split(', ')
      .map((c) => c.trim()),
  };
  try {
    let newRes = await resourceUtil.create(res);
    for (let t of topics) {
      await resourceUtil.addTopic(newRes, t);
    }
    for (let o of orgs) {
      await resourceUtil.addOrganization(newRes, o);
    }
  } catch (e) {
    console.log(e);
  }
};

(() => {
  let orgs = {};
  let rows = [];
  mongoose.connection
    .on('error', console.warn)
    .on('disconnected', console.warn)
    .once('open', () => {
      // Auto allow all pending:
      // resourceUtil.getAllPending().then(async (resources) => {
      //   await Promise.all(
      //     resources.map((res) =>
      //       resourceUtil.update(res, { reviewsRemaining: [] })
      //     )
      //   );
      // });
      fs.createReadStream(orgsFn)
        .pipe(csv())
        .on('data', (row) => {
          orgs[row.Organizations] = row;
        })
        .on('end', async () => {
          fs.createReadStream(resourcesFn)
            .pipe(csv())
            .on('data', (row) => {
              rows.push(row);
            })
            .on('end', async () => {
              for (let row of rows) {
                await uploadRow(row, orgs);
              }
              for (let org in Object.values(orgs)) {
                try {
                  await organizationUtil.create({
                    name: org['Organizations'],
                    type: org['Type'],
                    logoURL: `/demo/${org['Github File Name']}`,
                    websiteURL: org['URL'],
                  });
                } catch (e) {}
              }
              mongoose.disconnect();
            });
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
