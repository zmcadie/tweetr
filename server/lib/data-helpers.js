"use strict";

//////////////////////////////////////////////////////////////////////////////
/////                                                                      ///
////  Defines helper functions for saving and getting tweets to database  ////
///                                                                      /////
//////////////////////////////////////////////////////////////////////////////
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: (newTweet, callback) => {
<<<<<<< HEAD
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: (callback) => {
      simulateDelay(() => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, db.tweets.sort(sortNewestFirst));
      });
=======
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    getTweets: (callback) => {
      db.collection("tweets").find().toArray(callback);
>>>>>>> feature/mongodb
    }

  };
}