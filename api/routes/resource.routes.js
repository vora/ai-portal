const searchUtil = require('../models/search.util');
const resourceUtil = require('../models/resource.util');

module.exports = (app) => {
  const firewall = require('../lib/firewall')(app);

  firewall.get(
    '/api/resources',
    async (req, res) => {
      let { query, ...filters } = req.query;
      let resources = await resourceUtil.search(query, filters);
      try {
        await searchUtil.create(JSON.stringify(req.query));
      } catch (e) {}
      res.json(resources.map(resourceUtil.toJSON));
    },
    {
      public: [
        'query',
        'approved',
        'organizations',
        'organizationType',
        'type',
        'path',
        'sortBy',
        'topics',
      ],
    }
  );

  firewall.get(
    '/api/resources/:_id',
    async (req, res) => {
      let resource = await resourceUtil.getById(req.params);
      res.json(resourceUtil.toJSON(resource));
    },
    {
      public: ['_id'],
    }
  );

  firewall.get(
    '/api/resources/all/pendingReview',
    async (req, res) => {
      let resources = await resourceUtil.getAllPending();
      res.json(resources.map(resourceUtil.toJSON));
    },
    { mod: [] }
  );

  firewall.post(
    '/api/resources',
    async (req, res) => {
      try {
        let newResource = await resourceUtil.create(req.body);
        return res.json(resourceUtil.toJSON(newResource));
      } catch (err) {
        res.json({ errors: [{ msg: '' + err }] });
      }
    },
    { user: ['fillme'] }
  );

  firewall.put(
    '/api/resources/:_id',
    async (req, res) => {
      await resourceUtil.update(req.params, req.body);
      res.json({});
    },
    { owner: ['_id', 'fillme'], mod: ['_id', 'fillme'] },
    userIsResourceOwner
  );

  firewall.delete(
    '/api/resources/:_id',
    async (req, res) => {
      await resourceUtil.delete(await resourceUtil.getById(req.params));
      return res.json({});
    },
    { owner: ['_id'], mod: ['_id'] },
    userIsResourceOwner
  );
};

let userIsResourceOwner = async (user, fields) => {
  let resource = await resourceUtil.getById(fields._id);
  return resource.user._id == user._id;
};
