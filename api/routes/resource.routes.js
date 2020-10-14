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

  app.post('/api/resources', async (req, res) => {
    const { name, type, desc } = req.body;
    let errors = [];
    if (!name || !type || !desc) {
      errors.push({ msg: 'Please fill in all the required fields' });
    }
    if (errors.length > 0) {
      return res.json({ errors: errors });
    } else {
      try {
        let newResource = await resourceUtil.create({
          name,
          type,
          desc,
        });
        return res.json(newResource.toJSON());
      } catch (err) {
        res.json({ errors: [err] });
      }
    }
  });

  app.put('/api/resources/:_id', async (req, res) => {
    return await resourceUtil.update(req.params, req.body);
  });
};
