const userUtil = require('../models/user.util');
const searchUtil = require('../models/search.util');
const resourceUtil = require('../models/resource.util');

module.exports = (app) => {
  app.get('/api/resources', async (req, res) => {
    let { query, featured } = req.query;
    let resources = await resourceUtil.search(query, { featured });
    try {
      await searchUtil.create(query);
    } catch (e) {}
    res.json(resources);
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
    return await resourceUtil.update(req.params, req.body);
  });

  app.get('/api/resources/:_id', async (req, res) => {
    let resource = await resourceUtil.searchById(req.params);
    res.json(resource);
  });

  app.delete('/api/resources/:_id', async (req, res) => {
    return res.json({});
  });
};
