module.exports.subject = ({}) => `AI Global: New Account`;
module.exports.text = ({ name, verifyURL }) =>
  `Hi ${name}. Welcome to the AI Global portal! Your new account has been created for the AI Global Responsible AI Portal.
    To complete the registration, please verify your email ${verifyURL} \n
    Thanks, AI Global`;
module.exports.html = ({ name, verifyURL }) =>
  `<strong>Hi ${name}. <br/>Welcome to the AI Global portal! Your new account has been created for the AI Global Responsible AI Portal.
    To complete the registration, please verify your email <a href="${verifyURL}">${verifyURL}</a><strong>
     <strong><br> Thanks, AI Global <br> <img src="https://portal.ai-global.org/logo.png"/>`;
