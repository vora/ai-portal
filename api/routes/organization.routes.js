const organizationUtil = require('../models/organization.util');

module.exports = (app) => {
  app.get('/api/organizations', async (req, res) => {
    res.json(await organizationUtil.getAll());
  });

  app.post('/api/organizations', async (req, res) => {
    const { name, desc } = req.body;
    try {
      let newOrganization = await organizationUtil.create({
        name,
        desc,
      });
      return res.json(organizationUtil.toJSON(newOrganization));
    } catch (err) {
      res.json({ errors: [err] });
    }
  });
};
