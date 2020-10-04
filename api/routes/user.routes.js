const nodemailer = require("nodemailer");

const User = require('../models/user.model');
const { user } = require("../models");



module.exports = (app, passport) => {
  //app.get('/', (req, res) => res.json({ test: 1 }));
  app.get('/', (req, res) => { res.render('landing') });

  // register a user in our system
  app.post('/register', (req, res) => {
    const { name, username, email, password, rePassword, type } = req.body;
    let errors = [];

    // check required fields
    if (!name || !email || !password || !rePassword || !username || !type) {
      errors.push({ msg: 'Please fill in all the required fields' });
    }

    // check if passwords match
    if (password != rePassword) errors.push({ msg: 'Passwords do not match' });

    // check password length
    if (password.length < 6) errors.push('Password should be at least 8 characters');

    if (errors.length > 0) {
      // need to handle partials in the views to send error messsages to the user!
      // this code needs to be refactored
      res.render('register', {
        errors,
        name,
        email,
        username,
        password,
        rePassword,
        type
      });
    } else {
      // success!
      User.findOne({ email: email })
        .then(user => {
          if (user) {
            // User already exists
            errors.push({ msg: 'Email is already registered' });
            res.render('register', {
              errors,
              name,
              email,
              username,
              password,
              rePassword,
              type
            });
          } else {
            const newUser = new User({
              name,
              email,
              username,
              type,
            });
            let hashedPass = newUser.encryptPassword(password);
            newUser.hashed_password = hashedPass;
            newUser.createUser(newUser)
              .then(user => {
                res.redirect('/login');
              })
              .catch(err => console.error(err));
          }
        });
    }

    // need to change the credentials later
    let transporter = nodemailer.createTransport({
      host: "mail.example.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'test@example.com', // generated ethereal user
        pass: '1234', // generated ethereal password
      },

      // if not on the host (running from local) then keep this, else delete the next field
      tls: {
        rejectUnauthorized: false
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // need to add 'email sent type message here'
  });

  // login route 
  app.get('/login', (req, res) => {

  });

};
