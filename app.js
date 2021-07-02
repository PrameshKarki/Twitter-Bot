// *Import modules
const fs = require("fs");
const path = require("path");

const twit = require("twit");
const mongoose = require("mongoose");

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

    // TODO:Retweet tweet
});
