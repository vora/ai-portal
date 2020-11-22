module.exports.subject = ({}) => `AI Global: Password Reset`;
module.exports.text = ({ resetURL }) =>
  `You have requested your password on AI Global to be reset. Visit ${resetURL} to reset your password. \n
   Thanks, AI Global`;
module.exports.html = ({ resetURL }) =>
  `<strong>You have requested your password on AI Global to be reset. Visit ${resetURL} to reset your password.<strong>
   <strong> <br> Thanks, AI Global`;
