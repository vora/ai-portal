module.exports.subject = ({}) => `RAI: New Account`;
module.exports.text = ({ name, verifyURL }) =>
  `Hi ${name}. Welcome to the RAI portal! Your new account has been created for the RAI Responsible AI Portal.
    To complete the registration, please verify your email ${verifyURL} \n
    Thanks, RAI`;
module.exports.html = ({ name, verifyURL }) =>
  `<strong>Hi ${name}. <br/>Welcome to the RAI portal! Your new account has been created for the RAI Responsible AI Portal.
    To complete the registration, please verify your email <a href="${verifyURL}">${verifyURL}</a><strong>
     <strong><br> Thanks, RAI <br> <img src="https://portal.responsible.ai/logo.png"/>`;
