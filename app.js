// *Import modules
const twit = require("twit");

// *Load environment variables
require("dotenv").config();

// *Instantiate Object
const twitter = new twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

//* Geographic info of Nepal
const Nepal = ["84.1240", "28.3949"];

// *Instantiate Stream
const stream = twitter.stream("statuses/filter", {
  track: "#explorenepal",
//   geo: Nepal,
});

// *Listen on tweet event
stream.on("tweet",async(tweet)=>{
  if (!isOwnTweet(tweet)) {
    const tweetID = tweet.id_str;
    try {
      // *Retweet tweet
      await retweet(tweetID);
    } catch (e) {
      console.log("Error occurred while retweeting tweet! ")
    }
  }
});

// *Method to check if the user ID is equal to bot user ID
function isOwnTweet(tweet) {
  return tweet.user.id == process.env.BOT_USER_ID;
}

// *Method to retweet
function retweet(id) {
  return new Promise((resolve, reject) => {
    let retweetParams = {id};
    twitter.post("statuses/retweet/:id", retweetParams, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

