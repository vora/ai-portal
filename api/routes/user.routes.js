const userUtil = require('../models/user.util');
const enums = require('../models/enums');

module.exports = (app) => {
  app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    let user = await userUtil.getByUsernameOrEmail(username);
    if (!user || !userUtil.comparePassword(user, password)) {
      return res.json({ errors: [{ msg: 'Failed to login' }] });
    }
    let token = req.jwtSign(userUtil.toTokenJSON(user, 'portal'));
    return res.json({
      user: userUtil.toPrivateJSON(user),
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
    // avoid timing attacks
    setTimeout(() => res.json({ done: true }), 1000);
    let { username, token, password } = req.body;
    let user = await req.getUser();
    if (!user && username) {
      user = await userUtil.getByUsernameOrEmail(username);
    }
    if (!token) {
      // user is requesting reset
      await userUtil.sendReset(user);
    } else {
      // user is using reset link
      await userUtil.resetPassword(user, token, password);
    }
    return;
  });

  app.post('/api/auth/verify/email', async (req, res) => {
    const { username, token } = req.body;
    let user = await userUtil.getByUsernameOrEmail(username);
    let verified = await userUtil.verifyEmail(user, token);
    return res.json({ verified: verified });
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
    }
    try {
      let newUser = await userUtil.create({
        name,
        email,
        username,
        password,
      });
      return res.json(userUtil.toPrivateJSON(newUser));
    } catch (err) {
      res.json({ errors: [{ msg: '' + err }] });
    }
  });

  app.get('/api/users', async (req, res) => {
    let users = await userUtil.getAll();
    return res.json(users);
  });

  app.get('/api/users/:_id', async (req, res) => {
    let user = await userUtil.getById(req.params);
    return res.json(userUtil.toJSON(user));
  });

  app.put('/api/users/:_id', async (req, res) => {
    await userUtil.update(req.params, req.body);
    return res.json(Object.assign({}, req.params, req.body));
  });

  app.delete('/api/users/:_id', async (req, res) => {
    await userUtil.delete(await userUtil.getById(req.params));
    return res.json({});
  });

  app.get('/api/users/:_id/resources', async (req, res) => {
    return res.json([]);
  });

  app.get('/api/users/:_id/organizations', async (req, res) => {
    return res.json([]);
  });
};
