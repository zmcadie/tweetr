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
      if (diffMinutes < 1) {
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
  ///// functions for building shout  element,      ////
  //// seperated from main to increase readability /////
  ///                                             //////
  //////////////////////////////////////////////////////
  const createShoutHeader = (shoutData) => {
    const $header = $("<header>")
      .append($("<img class='avatar' src='" + shoutData.user.avatars.small + "'>"))
      .append($("<div class='username'>").text(shoutData.user.name))
      .append($("<div class='handle'>").text(shoutData.user.handle));
    return $header;
  };

  const createShoutBody = (shoutData) => {
    const $body = $("<section>")
      .text(shoutData.content.text);
    return $body;
  };

  // Icons made by http://www.flaticon.com/authors/madebyoliver from www.flaticon.com
  const createShoutFooter = (shoutData) => {
    const $footer = $("<footer>")
      .text(timeSince(shoutData.created_at))
      .append($("<span class='icons'>")
        .append($("<img src='/images/flag.png'>"))
        .append($("<img src='/images/arrows.png'>"))
        .append($("<img src='/images/like.png'>"))
      );
    return $footer;
  };

  const createShoutElement = (shoutData) => {
    const $shout = $("<article class='shout'>")
      .append(createShoutHeader(shoutData))
      .append(createShoutBody(shoutData))
      .append(createShoutFooter(shoutData));
    return $shout;
  };

  /////////////////////////////////////////////////////
  //////                                            ///
  ///// takes an array of shout objects,           ////
  ////  sorts by date and builds element for each /////
  ///                                            //////
  /////////////////////////////////////////////////////
  const sortNewestFirst = (a, b) => {
    return a.created_at - b.created_at;
  };

  // first empties shout container on page
  const renderShouts = (shoutsArr) => {
    $("#shouts-container").empty();
    const sortedShouts = shoutsArr.sort(sortNewestFirst);
    sortedShouts.forEach((shoutObj) => {
      const shout = createShoutElement(shoutObj);
      $("#shouts-container").prepend(shout);
    });
  };

  //////////////////////////////////////
  //////                             ///
  ///// fetch shouts from /shouts,  ////
  ////  renders to page            /////
  ///                             //////
  //////////////////////////////////////
  const fetchShouts = () => {
    $.ajax("/shouts")
      .done(renderShouts);
  };

  fetchShouts();

  /////////////////////////////////////////////
  ///////                                   ///
  ////// in new shout form,                ////
  /////  stops redirection from submit,   /////
  ////   submits shout to /shouts object //////
  ///                                   ///////
  /////////////////////////////////////////////
  const resetComposer = () => {
    $("#compose-shout")[0].reset();
    $(".counter").text("140");
  };

  const validateShout = (shout) => {
    if (!shout) {
      $.flash("shout cannot be empty!");
      return false;
    } else if (shout.length > 140) {
      $.flash("shout is too long!");
      return false;
    } else {
      return true;
    }
  };

  // ES5 function to preserve scope of `this`
  function handleNewShout(event) {
    event.preventDefault();
    const $form = $(this);
    const shoutText = $form.find("textarea").val();
    if (validateShout(shoutText)) {
      $.ajax({
        type: "POST",
        url: "/shouts",
        data: $form.serialize()
      })
        .done(fetchShouts, resetComposer);
    }
  }

  const $form = $("#compose-shout");
  $form.on("submit", handleNewShout);

});