$(() => {

     ///////////////////////////////////////
    // in new tweet form,                //
   //  stops redirection from submit,   //
  //   submits tweet to /tweets object //
 ///////////////////////////////////////
  const $form = $("#compose-tweet");

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
    }
  }

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
  }

  $form.on("submit", handleNewTweet);

});