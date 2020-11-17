const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');

const port = process.env.PORT || 5000;
const secret = process.env.SECRET || 'secret.';
const app = express();

require('./api/models/index');
const userUtil = require('./api/models/user.util');

// Force HTTPS
app.use((req, res, next) => {
  if (!req.secure && process.env.NODE_ENV == 'production') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

app.use((req, res, next) => {
  if (
    !req.originalUrl.startsWith('/api/') &&
    ['js', 'json', 'css', 'png', 'map', 'ico', 'txt'].filter((ext) =>
      req.originalUrl.endsWith('.' + ext)
    ).length == 0
  ) {
    // Serve index html
    return res.sendFile(path.join(__dirname, 'build', 'index.html'));
  }
  // Serve API or static build files
  next();
});

app.use(
  require('express-jwt')({
    secret: secret,
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: (req) => {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  })
);

app.use((req, res, next) => {
  req.jwtSign = (obj) => {
    return jwt.sign(obj, secret, {
      algorithm: 'HS256',
    });
  };
  req.getUser = async () => {
    if (req.user) {
      return await userUtil.get({ _id: req.user._id });
    }
    return null;
  };
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use('/', express.static(path.join(__dirname, 'build')));

app.use(express.json());
require('./api/routes/index')(app);

let runServer = () => {
  mongoose.connection
    .on('error', console.warn)
    .on('disconnected', console.warn)
    .once('open', () => {
      console.log(`Serving http://:${port}`);
      app.listen(port);
    });
  return mongoose.connect(process.env.MONGODB_URL, {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoReconnect: true,
  });
};

runServer();
