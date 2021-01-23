const userUtil = require('../models/user.util');
const searchUtil = require('../models/search.util');
const resourceUtil = require('../models/resource.util');

module.exports = (app) => {
  app.get('/api/resources', async (req, res) => {
    let { query, ...filters } = req.query;
    let resources = await resourceUtil.search(query, filters);
    try {
      await searchUtil.create(JSON.stringify(req.query));
    } catch (e) {}
    res.json(resources.map(resourceUtil.toJSON));
  });

  app.get('/api/resources/:_id', async (req, res) => {
    let resource = await resourceUtil.getById(req.params);
    res.json(resourceUtil.toJSON(resource));
  });

  app.get('/api/resources/all/pendingReview', async (req, res) => {
    let resources = await resourceUtil.getAllPending();
    res.json(resources.map(resourceUtil.toJSON));
  });

  app.post('/api/resources', async (req, res) => {
    try {
      let newResource = await resourceUtil.create(req.body);
      return res.json(resourceUtil.toJSON(newResource));
    } catch (err) {
      res.json({ errors: [{ msg: '' + err }] });
    }
  });

  app.put('/api/resources/:_id', async (req, res) => {
    await resourceUtil.update(req.params, req.body);
    res.json({});
  });

  app.delete('/api/resources/:_id', async (req, res) => {
    await resourceUtil.delete(await resourceUtil.getById(req.params));
    return res.json({});
  });
};
