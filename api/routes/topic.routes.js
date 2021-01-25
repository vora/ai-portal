const topicUtil = require('../models/topic.util');

module.exports = (app) => {
  const firewall = require('../lib/firewall')(app);

  firewall.get(
    '/api/topics',
    async (req, res) => {
      res.json(await topicUtil.getAll());
    },
    { public: [] }
  );

  firewall.post(
    '/api/topics',
    async (req, res) => {
      const { name, desc } = req.body;
      try {
        let newTopic = await topicUtil.create({
          name,
          desc,
        });
        return res.json(topicUtil.toJSON(newTopic));
      } catch (err) {
        res.json({ errors: [err] });
      }
    },
    { mod: [] }
  );

  firewall.delete(
    '/api/topics/:_id',
    async (req, res) => {
      await topicUtil.delete(await topicUtil.getById(req.params));
      return res.json({});
    },
    { mod: ['_id'] }
  );
};
