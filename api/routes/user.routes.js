const userUtil = require('../models/user.util');
const enums = require('../models/enums');

module.exports = (app) => {
  app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    let user = await userUtil.getByUsernameOrEmail(username);
    if (!user || !user.authenticate(password)) {
      return res.json({ errors: [{ msg: 'Failed to login' }] });
    }
    let token = req.jwtSign(user.toTokenJSON());
    return res.json({
      user: user.toPrivateJSON(),
      token: token,
    });
  });

  app.get('/api/context', async (req, res) => {
    let user = await req.getUser();
    let ctx = { enums: enums };
    if (user) {
      ctx.user = user;
    }
    return res.json(ctx);
  });

  app.post('/api/auth/reset/password', async (req, res) => {
    let user = await req.getUser();
    await userUtil.sendReset(user);
    return res.json({ sent: true });
  });

  app.post('/api/users', async (req, res) => {
    const { name, username, email, password, confirmPassword } = req.body;
    let errors = [];
    if (!name || !email || !password || !confirmPassword || !username) {
      errors.push({ msg: 'Please fill in all the required fields' });
    }
    if (password != confirmPassword)
      errors.push({ msg: 'Passwords do not match' });
    if (errors.length > 0) {
      return res.json({ errors: errors });
    } else {
      try {
        let newUser = await userUtil.create({
          name,
          email,
          username,
          password,
        });
        return res.json(newUser.toPrivateJSON());
      } catch (err) {
        res.json({ errors: [err] });
      }
    }
  });

  app.get('/api/users', async (req, res) => {
    let users = await userUtil.getAll();
    return res.json(users);
  });

  app.put('/api/users/:_id', async (req, res) => {
    await userUtil.update(req.params, req.body);
    return res.json({});
  });

  app.get('/api/users/:_id/resources', async (req, res) => {
    return res.json([]);
  });

  app.get('/api/users/:_id/organizations', async (req, res) => {
    return res.json([]);
  });
};
