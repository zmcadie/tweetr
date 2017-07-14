$(() => {

  ///////////////////////////////////////////////////////
  /////                                               ///
  //// display random tagline from prepopulated list ////
  ///                                               /////
  ///////////////////////////////////////////////////////

  // database of random taglines
  const taglines = [
    { regOne: "a little ", bold: "loud", regTwo: "er" },
    { regOne: "i can't ", bold: "hear", regTwo: " you" },
    { regOne: "make a little ", bold: "noise", regTwo: "" },
    { regOne: "simon says ", bold: "shout", regTwo: "" },
    { regOne: "", bold: "what", regTwo: "!?!" },
    { regOne: "", bold: "shout", regTwo: " it" },
    // { regOne: "", bold: "", regTwo: "" },
    // { regOne: "", bold: "", regTwo: "" },
    // { regOne: "", bold: "", regTwo: "" },
    // { regOne: "", bold: "", regTwo: "" }
  ];

  const randomTag = (taglines) => {
    const num = Math.floor(Math.random() * taglines.length);
    $("#tagline .reg1").text(taglines[num].regOne);
    $("#tagline .bold").text(taglines[num].bold.toUpperCase());
    $("#tagline .reg2").text(taglines[num].regTwo);
  };

  randomTag(taglines);

});