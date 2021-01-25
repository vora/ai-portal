const fileUtil = require('../models/file.util');

module.exports = (app) => {
  const firewall = require('../lib/firewall')(app);

  firewall.post(
    '/api/files/signUpload',
    async (req, res) => {
      let { name, type } = req.body;
      let { url, path } = fileUtil.signUpload(name, type);
      res.json({ url, path });
    },
    { user: ['name', 'type'] }
  );
};
