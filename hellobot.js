module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var botPayload = {
    text : 'Ready for some memes, ' + userName + '?'
  };

  // avoid infinite loop
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
}
