module.exports.subject = ({}) => `RAI: Password Reset`;
module.exports.text = ({ resetURL }) =>
  `You have requested your password on RAI to be reset. Visit ${resetURL} to reset your password. \n \n
   Thanks, RAI`;
module.exports.html = ({ resetURL }) =>
  `<strong>You have requested your password on RAI to be reset. Visit <a href="${resetURL}">${resetURL}</a> to reset your password.<strong><br>
   <strong> <br> Thanks, RAI<br> <img src="https://portal.responsible.ai/logo.png"/>`;
