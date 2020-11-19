const topicUtil = require('../models/topic.util');

module.exports = (app) => {
  app.get('/api/topics', async (req, res) => {
    res.json(await topicUtil.getAll());
  });

  app.post('/api/topics', async (req, res) => {
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
  });
};
