module.exports.subject = ({}) => `AI Global: New Account`;
module.exports.text = ({ name, verifyUrl }) =>
  `Hi ${name}. Welcome to the AI Global portal! Your new account has been created for the AI Global Responsible AI Portal.
    To complete the registration, please verify your email${verifyUrl}`;
module.exports.html = ({ name, verifyUrl }) =>
  `<strong>Hi ${name}. Welcome to the AI Global portal! Your new account has been created for the AI Global Responsible AI Portal.
    To complete the registration, please verify your email ${verifyUrl}<strong>`;
