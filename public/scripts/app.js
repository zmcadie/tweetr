$(() => {

   /////////////////////////////////////////////////
  // functions for building tweet element,       //
 // seperated from main to increase readability //
/////////////////////////////////////////////////
  const createTweetHeader = (tweetData) => {
    const $header = $("<header>")
      .append($("<img class='avatar' src='" + tweetData.user.avatars.small + "'>"))
      .append($("<div class='username'>").text(tweetData.user.name))
      .append($("<div class='handle'>").text(tweetData.user.handle));
    return $header;
  }

  const createTweetBody = (tweetData) => {
    const $body = $("<section>")
      .text(tweetData.content.text);
    return $body;
  }

  // Icons made by http://www.flaticon.com/authors/madebyoliver from www.flaticon.com
  const createTweetFooter = (tweetData) => {
    const $footer = $("<footer>")
      .text("Created: " + tweetData.created_at)
      .append($("<span class='icons'>")
        .append($("<img src='/images/flag.png'>"))
        .append($("<img src='/images/arrows.png'>"))
        .append($("<img src='/images/like.png'>"))
      );
    return $footer;
  }

  // builds the actual tweet using above functions
  const createTweetElement = (tweetData) => {
    const $tweet = $("<article class='tweet'>")
      .append(createTweetHeader(tweetData))
      .append(createTweetBody(tweetData))
      .append(createTweetFooter(tweetData));
    return $tweet;
  };

   ///////////////////////////////////////
  // takes an array of tweet objects,  //
 //  builds element for each          //
///////////////////////////////////////
  const renderTweets = (tweetsArr) => {
    $("#tweets-container").empty();
    tweetsArr.forEach(function (tweetObj) {
      const tweet = createTweetElement(tweetObj);
      $("#tweets-container").prepend(tweet);
    })
  }

   /////////////////////////////////
  // fetch tweets from /tweets,  //
 //  renders to page            //
/////////////////////////////////
  const fetchTweets = () => {
    $.ajax("/tweets")
    .done(renderTweets)
  };

  fetchTweets();
  setInterval(fetchTweets, 500);

});