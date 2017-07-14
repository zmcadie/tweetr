$(() => {

  ////////////////////////////////////////////////////////
  /////                                                ///
  //// updates character counter while user is typing ////
  ///                                                /////
  ////////////////////////////////////////////////////////

  // ES5 function to preserve scope of `this`
  function updateCounter () {
    const text = $(this).val();
    const charLeft = 140 - (text.length);
    const counter = $(this).parent().find(".counter");
    counter.text(charLeft);
    if (charLeft < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
    }
  }

  $(".new-shout textarea").on("keyup", updateCounter);

});