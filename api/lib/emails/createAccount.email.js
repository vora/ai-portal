module.exports.subject = ({}) => `AI Global: New Account`;
module.exports.text = ({ name, verifyUrl }) =>
  `Hi ${name}. Thanks for creating your account. ${verifyUrl}`;
module.exports.html = ({ name, verifyUrl }) =>
  `<strong>Hi ${name}. Thanks for creating your account. ${verifyUrl}<strong>`;
