"use strict";

//////////////////////////////////////////////////////////////////////////////
/////                                                                      ///
////  Defines helper functions for saving and getting tweets to database  ////
///                                                                      /////
//////////////////////////////////////////////////////////////////////////////
module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: (newTweet, callback) => {
      db.tweets.push(newTweet);
      callback(null, true);
    },

    getTweets: (callback) => {
      db.collection("tweets").find().toArray(callback);
    }

  };
};