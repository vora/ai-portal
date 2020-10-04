const { response } = require('express');
const userUtil = require('../models/user.util');

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

  app.get('/api/auth/self', async (req, res) => {
    let user = await req.getUser();
    return res.json(user.toPrivateJSON());
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

  app.put('/api/users/:_id', async (req, res) => {
    return await userUtil.update(req.params, req.body);
  });
};
