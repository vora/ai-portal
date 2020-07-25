const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const port = process.env.PORT || 3000;
const app = express();
require('./api/models/index');
require('./api/passport')(passport);
require('./api/routes/index')(app, passport);

let listenHTTP = () => {
  app.listen(port);
  console.log('Listening on port', port);
};

let runServer = () => {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', runServer)
    .once('open', listenHTTP);
  return mongoose.connect(process.env.MONGODB_URL, {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

runServer();
