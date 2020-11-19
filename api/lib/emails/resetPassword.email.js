module.exports.subject = ({}) => `AI Global: Password Reset`;
module.exports.text = ({ resetURL }) =>
  `Visit ${resetURL} to reset your password.`;
module.exports.html = ({ resetURL }) =>
  `<strong>Visit ${resetURL} to reset your password.<strong>`;
