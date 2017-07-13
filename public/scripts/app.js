$(() => {

  /////////////////////////////////////////////////////////////
  //////                                                    ///
  ///// calculates how long ago given time is from present ////
  ////  (calculated with time given in milliseconds)      /////
  ///                                                    //////
  /////////////////////////////////////////////////////////////
  const timeSince = (time) => {
    const now = Date.now();
    const diff = now - time;
    const diffMinutes = Math.floor((diff / 1000) / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays > 365) {
      return `a long time ago`;
    } else if (diffHours > 23) {
      if (diffDays === 1) {
        return `a day ago`;
      } else {
        return `${diffDays} days ago`;
      }
    } else if (diffMinutes > 59) {
      if (diffHours === 1) {
        return `an hour ago`;
      } else {
        return `${diffHours} hours ago`;
      }
    } else {
      if (diffMinutes === 0) {
        return `just now`;
      } else if (diffMinutes === 1) {
        return `a minute ago`;
      } else {
        return `${diffMinutes} minutes ago`;
      }
    }
  };

  //////////////////////////////////////////////////////
  //////                                             ///
  ///// functions for building tweet element,       ////
  //// seperated from main to increase readability /////
  ///                                             //////
  //////////////////////////////////////////////////////
  const createTweetHeader = (tweetData) => {
    const $header = $("<header>")
      .append($("<img class='avatar' src='" + tweetData.user.avatars.small + "'>"))
      .append($("<div class='username'>").text(tweetData.user.name))
      .append($("<div class='handle'>").text(tweetData.user.handle));
    return $header;
  };

  const createTweetBody = (tweetData) => {
    const $body = $("<section>")
      .text(tweetData.content.text);
    return $body;
  };

  // Icons made by http://www.flaticon.com/authors/madebyoliver from www.flaticon.com
  const createTweetFooter = (tweetData) => {
    const $footer = $("<footer>")
      .text(timeSince(tweetData.created_at))
      .append($("<span class='icons'>")
        .append($("<img src='/images/flag.png'>"))
        .append($("<img src='/images/arrows.png'>"))
        .append($("<img src='/images/like.png'>"))
      );
    return $footer;
  };

  // builds the actual tweet using above functions
  const createTweetElement = (tweetData) => {
    const $tweet = $("<article class='tweet'>")
      .append(createTweetHeader(tweetData))
      .append(createTweetBody(tweetData))
      .append(createTweetFooter(tweetData));
    return $tweet;
  };

  ////////////////////////////////////////////
  //////                                   ///
  ///// takes an array of tweet objects,  ////
  ////  builds element for each          /////
  ///                                   //////
  ////////////////////////////////////////////
  const renderTweets = (tweetsArr) => {
    $("#tweets-container").empty();
    tweetsArr.forEach(function (tweetObj) {
      const tweet = createTweetElement(tweetObj);
      $("#tweets-container").prepend(tweet);
    });
  };

  //////////////////////////////////////
  //////                             ///
  ///// fetch tweets from /tweets,  ////
  ////  renders to page            /////
  ///                             //////
  //////////////////////////////////////
  const fetchTweets = () => {
    $.ajax("/tweets")
      .done(renderTweets);
  };

  fetchTweets();

  /////////////////////////////////////////////
  ///////                                   ///
  ////// in new tweet form,                ////
  /////  stops redirection from submit,   /////
  ////   submits tweet to /tweets object //////
  ///                                   ///////
  /////////////////////////////////////////////
  const resetComposer = () => {
    $("#compose-tweet")[0].reset();
    $(".counter").text("140");
  };

  const validateTweet = (tweet) => {
    if (!tweet) {
      alert("Tweet cannot be empty!");
      return false;
    } else if (tweet.length > 140) {
      alert("Tweet is too long!");
      return false;
    } else {
      return true;
    }
  };

  function handleNewTweet(event) {
    event.preventDefault();
    const $form = $(this);
    const tweetText = $form.find("textarea").val();
    if (validateTweet(tweetText)) {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $form.serialize()
      })
        .done(fetchTweets, resetComposer);
    }
  }

  const $form = $("#compose-tweet");
  $form.on("submit", handleNewTweet);

});