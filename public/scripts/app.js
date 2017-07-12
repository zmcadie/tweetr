$(document).ready(function () {

///////////////////////////////////////////
// functions for building tweet element, //
// seperated from main to increase       //
// readability                           //
///////////////////////////////////////////
  function createTweetHeader(tweetData) {
    var $header = $("<header>")
      .append($("<img class='avatar' src='" + tweetData.user.avatars.small + "'>"))
      .append($("<div class='username'>").text(tweetData.user.name))
      .append($("<div class='handle'>").text(tweetData.user.handle));
    return $header;
  }

  function createTweetBody(tweetData) {
    var $body = $("<section>")
      .text(tweetData.content.text);
    return $body;
  }

  function createTweetFooter(tweetData) {
    var $footer = $("<footer>")
      .text("Created: " + tweetData.created_at)
      .append($("<span class='icons'>")
        .append($("<img src='/images/flag.png'>"))
        .append($("<img src='/images/arrows.png'>"))
        .append($("<img src='/images/like.png'>"))
      );
    return $footer;
  }

// builds the actual tweet using above functions
  function createTweetElement(tweetData) {
    var $tweet = $("<article class='tweet'>")
      .append(createTweetHeader(tweetData))
      .append(createTweetBody(tweetData))
      .append(createTweetFooter(tweetData));
    return $tweet;
  };

//////////////////////////////////////
// takes an array of tweet objects, //
// builds element for each          //
//////////////////////////////////////
  function renderTweets(tweets) {
    tweets.forEach(function (tweetObj) {
      var tweet = createTweetElement(tweetObj);
      $("#tweets-container").append(tweet);
    })
  }

});