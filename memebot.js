var request = require('request');


function send (payload, callback) {
	var path = process.env.SLACKPOST;
	var uri = path;

	request({
		uri: uri,
		method: 'POST',
		body: JSON.stringify(payload)
		}, function (error, response, body) {
		if (error) {
			return callback(error);
		}

		callback(null, response.statusCode, body);
	});
}


module.exports = function (req, res, next) {
	
	var botPayload = {};

	botPayload.text = "Here's a meme!" + "http://i.imgur.com/Kzv9xfy.png";
	botPayload.username = "coolmemebot";
	botPayload.channel = req.body.channel_id;
	botPayload.icon_emoji = ':squirrel:';
	
	send(botPayload, function (error, status, body) {
  		if (error) {
   	 		return next(error);
 	 	} else if (status !== 200) {
    		// inform user that our Incoming WebHook failed
    			return next(new Error('Incoming WebHook: ' + status + ' ' + body));
 	 	} else {
    			return res.status(200).end();
  		}
	});

};
