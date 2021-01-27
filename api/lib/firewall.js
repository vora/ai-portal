const ACCESS_LEVELS = {
  public: { betterThan: [] },
  user: { betterThan: ['public'] },
  owner: { betterThan: ['public', 'user'] },
  mod: { betterThan: ['public', 'user'] },
  admin: { betterThan: ['public', 'user', 'owner', 'mod'] },
};

let firewall = (fields, role, rules) => {
  return rules[role] && fields.every((f) => rules[role].includes(f));
};

let fillRules = (rules) => {
  for (let level in ACCESS_LEVELS) {
    for (let otherLevel in ACCESS_LEVELS) {
      if (
        ACCESS_LEVELS[level].betterThan.includes(otherLevel) &&
        otherLevel in rules
      ) {
        if (!(level in rules)) {
          rules[level] = rules[otherLevel];
        } else {
          rules[level] = [...new Set([...rules[level], ...rules[otherLevel]])];
        }
      }
    }
  }
};

let protect = (method, app, endpoint, endpointHandler, rules, ownerTest) => {
  fillRules(rules);
  app[method](endpoint, async (req, res) => {
    let fields = Object.assign(
      {},
      req.body || {},
      req.query || {},
      req.params || {}
    );
    let keys = Object.keys(fields);
    if (firewall(keys, 'public', rules)) {
      return endpointHandler(req, res);
    }
    let user = await req.getUser();
    if (user) {
      if (user.role == 'mod' && firewall(keys, 'mod', rules)) {
        return endpointHandler(req, res);
      } else if (user.role == 'admin' && firewall(keys, 'admin', rules)) {
        return endpointHandler(req, res);
      } else if (await ownerTest(user, fields)) {
        return endpointHandler(req, res);
      }
    }
    console.log(
      '!?! FIREWALL ACCESS DENIED !?!',
      'request =',
      keys,
      'rules =',
      rules,
      'path =',
      req.method + ' ' + req.path,
      'role =',
      user?.role
    );
    return res.json({ errors: [{ msg: 'Request was blocked.' }] });
  });
};

module.exports = (app) => {
  let firewalledApp = {};
  for (let method of ['get', 'put', 'post', 'delete', 'patch']) {
    if (process.env.DISABLE_FIREWALL == 'true') {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('!!!!! WARNING FIREWALL DISABLED !!!!!');
      console.log('!!!!!  ALL REQUEST ARE ALLOWED  !!!!!');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      firewalledApp[method] = (endpoint, endpointHandler, rules) =>
        app[method](endpoint, endpointHandler);
    } else {
      firewalledApp[method] = (endpoint, endpointHandler, rules, ownerTest) =>
        protect(
          method,
          app,
          endpoint,
          endpointHandler,
          rules || {},
          ownerTest || (async () => false)
        );
    }
  }
  return firewalledApp;
};
