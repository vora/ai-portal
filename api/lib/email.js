const sgMail = require('@sendgrid/mail');
const fs = require('fs');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailsPath = require('path').join(__dirname, 'emails');
const fromEmail = 'noreply@ai-global.org';

module.exports.send = {};

fs.readdirSync(emailsPath).forEach((fn) => {
  if (!fn.includes('.email')) {
    return;
  }
  let name = fn.split('.')[0];
  let template = require('./emails/' + fn);
  module.exports.send[name] = (toEmail, data) =>
    sendEmail(template, data, toEmail);
});

let sendEmail = async (template, data = {}, toEmail) => {
  let templateData = { toEmail: toEmail, fromEmail: fromEmail, ...data };
  let msg = {
    to: toEmail,
    from: fromEmail,
    subject: template.subject(templateData),
    text: template.text(templateData),
    html: template.html(templateData),
  };
  await sgMail.send(msg);
};
