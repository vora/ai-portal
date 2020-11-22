module.exports.subject = ({}) => `AI Global: New Account`;
module.exports.text = ({ name, verifyUrl }) =>
  `Hi ${name}. Welcome to the AI Global portal! Your new account has been created for the AI Global Responsible AI Portal.
    To complete the registration, please verify your email${verifyUrl} \n
    Thanks, AI Global`;
module.exports.html = ({ name, verifyUrl }) =>
  `<strong>Hi ${name}. Welcome to the AI Global portal! Your new account has been created for the AI Global Responsible AI Portal.
    To complete the registration, please verify your email ${verifyUrl}<strong>
     <strong><br> Thanks, AI Global <br> <img src="https://portal.dev.ai-global.org/logo.png"/>`;
