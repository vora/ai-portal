const userUtil = require('../models/user.util');
const enums = require('../models/enums');
const organizationUtil = require('../models/organization.util');
const resourceUtil = require('../models/resource.util');

module.exports = (app) => {
  const firewall = require('../lib/firewall')(app);

  firewall.post(
    '/api/auth/login',
    async (req, res) => {
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
    },
    { public: ['username', 'password', 'remember'] }
  );

  firewall.get(
    '/api/context',
    async (req, res) => {
      let user = await req.getUser();
      let ctx = { enums: enums };
      if (user) {
        ctx.user = user;
      }
      return res.json(ctx);
    },
    { public: [] }
  );

  firewall.post(
    '/api/auth/reset/password',
    async (req, res) => {
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
    },
    { public: ['username', 'token', 'password'] }
  );

  firewall.post(
    '/api/auth/verify/email',
    async (req, res) => {
      const { username, token } = req.body;
      let user = await userUtil.getByUsernameOrEmail(username);
      let verified = await userUtil.verifyEmail(user, token);
      return res.json({ verified: verified });
    },
    { public: ['username', 'token'] }
  );

  firewall.post(
    '/api/users',
    async (req, res) => {
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
    },
    { public: ['name', 'email', 'username', 'password', 'confirmPassword'] },
    { mod: [] }
  );

  firewall.get(
    '/api/users',
    async (req, res) => {
      let users = await userUtil.getAll();
      return res.json(users.map(userUtil.toJSON));
    },
    { mod: [] }
  );

  firewall.get(
    '/api/users/:_id',
    async (req, res) => {
      let user = await userUtil.getById(req.params);
      return res.json(userUtil.toJSON(user));
    },
    { owner: ['_id'], mod: ['_id'] },
    usersSame
  );

  firewall.put(
    '/api/users/:_id',
    async (req, res) => {
      await userUtil.update(req.params, req.body);
      return res.json(Object.assign({}, req.params, req.body));
    },
    {
      owner: ['name', 'username', 'email', '_id'],
      admin: ['role', 'organizations'],
    }
  );

  firewall.delete(
    '/api/users/:_id',
    async (req, res) => {
      await userUtil.delete(await userUtil.getById(req.params));
      return res.json({});
    },
    {
      owner: ['_id'],
    },
    usersSame
  );

  firewall.get(
    '/api/users/:_id/resources',
    async (req, res) => {
      let resources = await userUtil.getResources(await req.getUser());
      return res.json(resources.map(resourceUtil.toJSON));
    },
    { owner: ['_id'] },
    usersSame
  );

  firewall.get(
    '/api/users/:_id/organizations',
    async (req, res) => {
      let orgs = await userUtil.getOrganizations(await req.getUser());
      return res.json(orgs.map(organizationUtil.toJSON));
    },
    { owner: ['_id'] },
    usersSame
  );
};

let usersSame = async (user, { _id }) => {
  return user._id == _id;
};
