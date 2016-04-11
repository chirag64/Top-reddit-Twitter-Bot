// Dependencies
var request = require("request"),
		TwitterBot = require("node-twitterbot").TwitterBot

// Config options
const POSTS_PER_INTERVAL = 2,
	  	INTERVAL_MINUTES = 60,
	  	MIN_SCORE = 2000,
	  	subreddits = ["worldnews","technology"];

// Twitter Bot credentials
var Bot = new TwitterBot({
  "consumer_secret": "consumer_secret",
  "consumer_key": "consumer_key",
	"access_token": "access_token",
  "access_token_secret": "access_token_secret"
}),
		marker = [],
		url = "https://www.reddit.com/r/" + subreddits.join("+") +"/top.json?t=day";
	

setInterval(TopReddit, (INTERVAL_MINUTES * 60 * 1000));

// This function will be called during every interval
function TopReddit() {
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
    	
	  	// Erase posts made 2 days ago from local memory
			marker[DayBeforeYesterday()] = undefined;

			// Initialize array for today's marker if it is not initialized already
			if (marker[Today()] === undefined) {
				marker[Today()] = [];
			}

	    var posts = body.data.children;
	    var current_interval_posts = 0;

	    // Go through all the reddit posts that have been fetched from reddit API earlier
	    for (i = 0; i < posts.length && current_interval_posts < POSTS_PER_INTERVAL; i++) {

	    	// Tweet post only if it has not been posted before and if the post score is above the required min score
	    	if (marker[Today()][posts[i].data.id] === undefined && marker[Yesterday()][posts[i].data.id] === undefined && posts[i].data.score > MIN_SCORE) {
	    		marker[Today()][posts[i].data.id] = true;
	    		current_interval_posts++;
	    		var linkSuffix = " - http://redd.it/" + posts[i].data.id;
	    		var title = posts[i].data.title;

	    		// Trim the title if total tweet length exceeds 140 characters
	    		if (title.length > (140 - linkSuffix.length)) {
	    			title = title.substring(0, (140 - linkSuffix.length - 3)) + "...";
	    		}

	    		// Post tweet
	    		var twitter_post = title + linkSuffix;
	    		var tweetAction = Bot.addAction("tweet", function(twitter, action, tweet) {
						Bot.tweet(twitter_post);
					});
	    		Bot.now(tweetAction);
	    	}
	    }
    }
    else {
    	console.error("An error occurred while fetching data from: '" + url + "'\nResponse: '" + response.statusCode  + "'\n"  + error);
    }
	})
}

// Returns the date in YYYYMMDD format of the date 48 hours ago
function DayBeforeYesterday() {
	var day = new Date();
	day.setDate(day.getDate() - 2);
	return day.toISOString().substring(0, 10);
}

// Returns the date in YYYYMMDD format of the date 48 hours ago
function Yesterday() {
	var day = new Date();
	day.setDate(day.getDate() - 1);
	return day.toISOString().substring(0, 10);
}

// Returns the current date in YYYYMMDD format
function Today() {
	var day = new Date();
	return day.toISOString().substring(0, 10);
}