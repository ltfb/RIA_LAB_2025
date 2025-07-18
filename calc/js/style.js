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

  });
  
  // Theme switcher
  $("#themes").on("change", function () {
    const selected = $(this).val(); // "1", "2", "3" or "4"
    $("body").removeClass("theme_1 theme_2 theme_3 theme_4 theme_5 theme_6 theme_7 theme_8").addClass("theme_" + selected);

    // Only remove inline styles related to themes, not those set by mode switching
    // For example, if you use inline styles for mode switching, don't remove them here
    // If you only use classes for mode, this is safe:
    $(".numbers, .operators, .other-operators, .repeated-operators, #equal, #inputValue, .calc-keys")
      .filter(function() {
        // Only remove style if it was set by theme (optional, for safety)
        return $(this).attr("data-theme-style") === "true";
      })
      .removeAttr("style")
      .removeAttr("data-theme-style");
  });
// Set placeholder="0" for #inputValue on page load
$("#inputValue").attr("placeholder", "0");


// Set Simple Mode as default on page load
document.addEventListener('DOMContentLoaded', function() {
    // Change title to Simple Mode
    var calcTitle = document.getElementById('calcTitle');
    if (calcTitle) calcTitle.textContent = 'Simple Mode';
    // Change button text to switch to Scientific Mode
    var modeBtn = document.getElementById('modeSwitch');
    if (modeBtn) modeBtn.textContent = 'Switch to Scientific Mode';
    // If you have a function to actually switch modes, call it here
    if (typeof modeSwitch === 'function') {
        modeSwitch(true); // Pass a flag to force simple mode if your function supports it
    }
});

// Mode switcher
function modeSwitch(forceSimple = false) {
  // Determine current and new mode
  let currentMode, newMode;
  if (forceSimple) {
    currentMode = "scientific";
    newMode = "simple";
  } else {
    currentMode = $("#calcTitle").text().includes("Simple") ? "simple" : "scientific";
    newMode = currentMode === "simple" ? "scientific" : "simple";
  }

  // Switch button text according to the mode being switched TO
  if (newMode === "scientific") {
    $("#modeSwitch").text("Change to Simple Mode");
    $("#calcTitle").text("Scientific Mode");
    $(".other-operators").show();
    $("#tr1_0").hide();
    $("#tr2_6").show();
    $("#tr1_5").hide();
    $("#tr2_3").hide();
    $("#tr3_1").show();
    $("#tr2_7").hide();
    $("#tr3_5").show();
  } else { // simple mode
    $("#modeSwitch").text("Change to Scientific Mode");
    $("#calcTitle").text("Simple Mode");
    $(".other-operators").hide();
    $("#tr1_0").show();
    $("#tr2_6").hide();
    $("#tr1_5").show();
    $("#tr2_3").show();
    $("#tr3_1").hide();
    $("#tr2_7").show();
    $("#tr3_5").hide();
  }
}
