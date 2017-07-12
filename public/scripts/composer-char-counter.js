$(() => {

  $(".new-tweet textarea").on("keyup", function () {
    var text = $(this).val();
    var charLeft = 140 - (text.length);
    var counter = $(this).parent().find(".counter")
    counter.text(charLeft);
    if (charLeft < 0) {
       counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
    }
  });

});