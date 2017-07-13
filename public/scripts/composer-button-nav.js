$(() => {

  ////////////////////////////////////////////////////////////
  /////                                                    ///
  //// toggleslides new tweet form when button is clicked ////
  ///                                                    /////
  ////////////////////////////////////////////////////////////
  $(".new-tweet").hide();

  $("#nav-buttons .compose").on("click", () => {
    $(".new-tweet").slideToggle(() => {
      $(".new-tweet textarea").focus();
    });
  });

});