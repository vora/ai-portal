const userUtil = require('../models/user.util');
const searchUtil = require('../models/search.util');
const resourceUtil = require('../models/resource.util');

module.exports = (app) => {
  app.get('/api/resources', async (req, res) => {
    let { query, featured } = req.query;
    let resources = await resourceUtil.search(query, { featured });
    await searchUtil.create(query);
    res.json(resources);
  });
};
