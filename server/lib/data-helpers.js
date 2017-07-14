"use strict";

//////////////////////////////////////////////////////////////////////////////
/////                                                                      ///
////  Defines helper functions for saving and getting shout to database  ////
///                                                                      /////
//////////////////////////////////////////////////////////////////////////////
module.exports = function makeDataHelpers(db) {
  return {

    saveShout: (newShout, callback) => {
      db.collection("shout").insertOne(newShout);
      callback(null, true);
    },

    getShouts: (callback) => {
      db.collection("shout").find().toArray(callback);
    }

  };
};