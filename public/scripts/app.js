$(document).ready(function () {
  var tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  function createTweetElement(tweetData) {
    var $tweet = $("<article>").addClass("tweet")
      .append($("<header>")
        .append($("<img class='avatar' src='" + tweetData.user.avatars.small + "'>"))
        .append($("<div class='username'>").text(tweetData.user.name))
        .append($("<div class='handle'>").text(tweetData.user.handle))
      ).append($("<section>")
        .text(tweetData.content.text)
      ).append($("<footer>")
        .text("Created: " + tweetData.created_at)
        .append($("<span class='icons'>")
          .append($("<img src='/images/flag.png'>"))
          .append($("<img src='/images/arrows.png'>"))
          .append($("<img src='/images/like.png'>"))
        )
      );
    return $tweet;
  };

  var $tweet = createTweetElement(tweetData);

  console.log($tweet);

  $('#tweets-container').append($tweet);
});