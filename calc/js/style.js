$(document).ready(function () {
  // Warn if no .numbers exist
  if ($(".numbers").length === 0) {
    console.warn('No elements with class "numbers" found.');
  }

  // Automatically focus the textarea when the page loads
  $("#inputValue").focus();

  // Equal button visual feedback
  $("#equal")
    .on("mousedown", function () {
      $(this).addClass("equal-active");
    })
    .on("mouseup mouseleave", function () {
      $(this).removeClass("equal-active");
    });

  // Theme switcher
  $("#themes").on("change", function () {
    const selected = $(this).val(); // "1", "2", "3" or "4"
    $("body").removeClass("theme_1 theme_2 theme_3 theme_4 theme_5").addClass("theme_" + selected);

    // Remove inline styles if previously applied
    $(".numbers, .operators, #equal, #inputValue, .calc-keys").removeAttr("style");
  });
});