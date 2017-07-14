$(() => {

  ////////////////////////////////////////////////////////////
  /////                                                    ///
  //// toggleslides new shout form when button is clicked ////
  ///                                                    /////
  ////////////////////////////////////////////////////////////
  $(".new-shout").hide();

  $("#nav-buttons .compose").on("click", () => {
    $(".new-shout").slideToggle(() => {
      $(".new-shout textarea").focus();
    });
  });

});