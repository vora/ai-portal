const organizationUtil = require('../models/organization.util');
const resourceUtil = require('../models/resource.util');

module.exports = (app) => {
  app.get('/api/organizations', async (req, res) => {
    let { query, ...filters } = req.query;
    let orgs = await organizationUtil.search(query, filters);
    res.json(orgs.map((o) => organizationUtil.toJSON(o)));
  });

  app.get('/api/organizations/:_id', async (req, res) => {
    let org = await organizationUtil.getById(req.params);
    res.json(organizationUtil.toJSON(org));
  });

  app.put('/api/organizations/:_id', async (req, res) => {
    await organizationUtil.update(req.params, req.body);
    res.json({});
  });

  app.get('/api/organizations/:_id/resources', async (req, res) => {
    let resources = await organizationUtil.getResources(req.params);
    res.json(resources.map((r) => resourceUtil.toJSON(r)));
  });

  app.post('/api/organizations', async (req, res) => {
    try {
      let newOrganization = await organizationUtil.create(req.body);
      return res.json(organizationUtil.toJSON(newOrganization));
    } catch (err) {
      res.json({ errors: [{ msg: '' + err }] });
    }
  });

  app.delete('/api/organizations/:_id', async (req, res) => {
    await organizationUtil.delete(await organizationUtil.getById(req.params));
    return res.json({});
  });
};
