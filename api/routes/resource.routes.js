const searchUtil = require('../models/search.util');
const resourceUtil = require('../models/resource.util');
const resourceUpdateFields = [
  'name',
  'desc',
  'type',
  'topics',
  'path',
  'downloadURL',
  'logoURL',
  'modifiedDate',
  'trustIndexCategories',
  'keywords',
  'featured',
  'organizations',
  'files',
  'creator',
  'reviewsRemaining',
  '_id',
  'files',
];
const resourcePostFields = [
  'name',
  'desc',
  'type',
  'path',
  'keywords',
  'creationDate',
  'modifiedDate',
  'licenseName',
  'downloadURL',
  'technical',
  'trustIndexCategories',
  'fundedBy',
  'creator',
  'dataDictLink',
  'sensitiveData',
  'qualityReview',
  'ethicsReview',
  'usage',
  'isConfidential',
  'offensiveContent',
  'numInstances',
  'instances',
  'label',
  'rawData',
  'personalInfoRemoved',
  'privacyProcedure',
  'individualsIdentified',
  'noiseDescription',
  'externalRestrictions',
  'aiSystemTyupes',
  'version',
  'updateFrequency',
  'unintendedUse',
  'ownerEmail',
  'location',
  'missingInfo',
  'audience',
  'removalRequest',
  'dataset',
  'model',
  'topics',
  'organizations',
  'files',
];
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

  firewall.get(
    '/api/resources/all/featured',
    async (req, res) => {
      let resources = await resourceUtil.getFeatured();
      res.json(resources.map(resourceUtil.toJSON));
    },
    {
      public: [],
    }
  );

  firewall.post(
    '/api/resources',
    async (req, res) => {
      try {
        let user = await req.getUser();
        let newResource = await resourceUtil.create({
          ...req.body,
          user: user,
        });
        return res.json(resourceUtil.toJSON(newResource));
      } catch (err) {
        res.json({ errors: [{ msg: '' + err }] });
      }
    },
    {
      user: resourcePostFields,
    }
  );

  firewall.put(
    '/api/resources/:_id',
    async (req, res) => {
      await resourceUtil.update(req.params, req.body);
      res.json({});
    },
    {
      owner: resourceUpdateFields,
      mod: resourceUpdateFields,
    },
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
  return resource.user?._id == user._id;
};
