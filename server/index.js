"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  ///////////////////////////////////////////////////////
  /////                                               ///
  //// We have a connection to the db starting here. ////
  ///                                               /////
  ///////////////////////////////////////////////////////
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  ///////////////////////////////////////////////////////////////////
  ///////                                                         ///
  ////// The `data-helpers` module interfaces with the database, ////
  /////  exports function that expects `db` parameter. Pass to  /////
  ////   tweetsRoutes to define routes to interact with data.  //////
  ///                                                         ///////
  ///////////////////////////////////////////////////////////////////
  const DataHelpers = require("./lib/data-helpers.js")(db);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  })
});
