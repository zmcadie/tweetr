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
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    getTweets: (callback) => {
      db.collection("tweets").find().toArray(callback);
    }

  };
}