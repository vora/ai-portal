module.exports.subject = ({}) => `RAI: Feedback`;
module.exports.text = (feedbackObj) =>
  `${JSON.stringify(feedbackObj, null, 1)}`;
module.exports.html = (feedbackObj) =>
  `${JSON.stringify(feedbackObj, null, 1)}`;
