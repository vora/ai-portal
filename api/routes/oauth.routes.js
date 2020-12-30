const userUtil = require('../models/user.util');

const SUPPORTED_CLIENTS = [
  {
    id: 'designassistant',
    redirect_uri: 'http://designassistant.dev.ai-global.org',
    name: 'AI Global Design Assistant',
    allowedScopes: ['*'],
  },
];

module.exports = (app) => {
  app.get('/api/oauth/clients/:cid', async (req, res) => {
    res.json(SUPPORTED_CLIENTS.find((c) => c.id == req.params.cid));
  });

  app.post('/api/oauth/authcode', async (req, res) => {
    let user = await req.getUser();
    let {
      client_id,
      code_challenge,
      code_challenge_method,
      redirect_uri,
      response_type,
      scope,
      state,
    } = req.body;
    let client = SUPPORTED_CLIENTS.find((c) => c.id == client_id);
    if (
      !client ||
      !redirect_uri.startsWith(client.redirect_uri) ||
      response_type != 'code' ||
      !user ||
      !client.allowedScopes.includes(scope)
    ) {
      return res.json({ errors: [{ msg: 'Bad oauth request' }] });
    }
    let authCode = req.jwtSign({
      userId: user._id,
      challenge: code_challenge,
      method: code_challenge_method,
    });
    res.json({
      authCode: authCode,
      redirect: `${redirect_uri}?state=${state}&code=${authCode}`,
    });
  });

  app.post('/api/oauth/token', async (req, res) => {
    let { grant_type, code, redirect_uri, client_id, code_verifier } = req.body;
    let client = SUPPORTED_CLIENTS.find((c) => c.id == client_id);
    let decodedCode = req.jwtDecode(code);
    // TODO validate decodedCode challenge & code_verifier
    if (
      grant_type != 'authorization_code' ||
      !decodedCode.userId ||
      !code_verifier ||
      !client
    ) {
      res.json({});
    }
    let user = await userUtil.getById(decodedCode.userId);
    let token = req.jwtSign(userUtil.toTokenJSON(user, client.id));
    res.json({ accessToken: token });
  });
};
