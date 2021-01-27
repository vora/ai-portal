module.exports.subject = ({}) => `AI Global: Password Reset`;
module.exports.text = ({ resetURL }) =>
  `You have requested your password on AI Global to be reset. Visit ${resetURL} to reset your password. \n \n
   Thanks, AI Global`;
module.exports.html = ({ resetURL }) =>
  `<strong>You have requested your password on AI Global to be reset. Visit <a href="${resetURL}">${resetURL}</a> to reset your password.<strong><br>
   <strong> <br> Thanks, AI Global<br> <img src="https://portal.ai-global.org/logo.png"/>`;
