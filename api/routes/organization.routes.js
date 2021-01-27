const organizationUtil = require('../models/organization.util');
const resourceUtil = require('../models/resource.util');

module.exports = (app) => {
  const firewall = require('../lib/firewall')(app);

  firewall.get(
    '/api/organizations',
    async (req, res) => {
      let { query, ...filters } = req.query;
      let orgs = await organizationUtil.search(query, filters);
      res.json(orgs.map((o) => organizationUtil.toJSON(o)));
    },
    { public: ['query', 'type'] }
  );

  firewall.get(
    '/api/organizations/:_id',
    async (req, res) => {
      let org = await organizationUtil.getById(req.params);
      res.json(organizationUtil.toJSON(org));
    },
    { public: ['_id'] }
  );

  firewall.put(
    '/api/organizations/:_id',
    async (req, res) => {
      await organizationUtil.update(req.params, req.body);
      res.json({});
    },
    {
      owner: [
        '_id',
        'shortName',
        'country',
        'city',
        'logoURL',
        'websiteURL',
        'type',
        'name',
      ],
      mod: [
        '_id',
        'shortName',
        'country',
        'city',
        'logoURL',
        'websiteURL',
        'type',
        'name',
      ],
    },
    userPartOfOrg
  );

  firewall.get(
    '/api/organizations/:_id/resources',
    async (req, res) => {
      let resources = await organizationUtil.getResources(req.params);
      res.json(resources.map((r) => resourceUtil.toJSON(r)));
    },
    { public: ['_id'] }
  );

  firewall.post(
    '/api/organizations',
    async (req, res) => {
      try {
        let newOrganization = await organizationUtil.create(req.body);
        return res.json(organizationUtil.toJSON(newOrganization));
      } catch (err) {
        res.json({ errors: [{ msg: '' + err }] });
      }
    },
    {
      mod: [
        'shortName',
        'country',
        'city',
        'logoURL',
        'websiteURL',
        'type',
        'name',
      ],
    }
  );

  firewall.delete(
    '/api/organizations/:_id',
    async (req, res) => {
      await organizationUtil.delete(await organizationUtil.getById(req.params));
      return res.json({});
    },
    { mod: ['_id'], owner: ['_id'] },
    userPartOfOrg
  );
};

let userPartOfOrg = async (user, fields) => {
  let org = await organizationUtil.getById(fields._id);
  return org?.members.includes(user._id);
};
