$(document).ready(function () {
  // Warn if no .numbers exist
  if ($(".numbers").length === 0) {
    console.warn('No elements with class "numbers" found.');
  }

  // Layout container styles
  $(".calc-keys").parent().css({
    display: "grid",
    gridTemplateRows: "auto auto 1fr",
    gridTemplateColumns: "1fr",
    gap: "16px",
    justifyItems: "center",
    alignItems: "center",
    margin: "0 auto",
    width: "fit-content",
    textAlign: "center",
    backgroundColor: "#1A1F33",
    color: "white",
    fontFamily: "Arial, sans-serif"
  });

  // Automatically focus the textarea when the page loads
    window.onload = function() {
        document.getElementById('inputValue').focus();
    };

  // Equal button visual feedback
  $("#equal")
    .on("mousedown", function () {
      $(this).css({
        backgroundColor: "#41A1D7",
        color: "#265D7C"
      });
    })
    .on("mouseup mouseleave", function () {
      $(this).css({
        backgroundColor: "#4CC2FF",
        color: "#1A4454"
      });
    });
});