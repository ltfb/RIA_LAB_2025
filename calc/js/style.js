$(document).ready(function () {  // Warn if no .numbers exist
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

// Function to switch between Bhaskara and Calculator
function switchToBhaskara() {
    if ($("#bhaskaraTable").css("display") === "none") {
      $("#calcTable").hide();
      $("#bhaskaraTable").show();
      $("#modeSwitch").hide();
      $("#calcTitle").text("Bhaskara Mode");
      $("#bhaskaraBtn").text("Switch to Calculator Mode");
    } else {
      $("#calcTable").show();
      $("#bhaskaraTable").hide();
      $("#modeSwitch").show();
      $("#bhaskaraBtn").text("Switch to Bhaskara Mode");
      if ($("#tr1_1").css("display") === "none") {
        $("#calcTitle").text("Simple Mode");
      } else {
        $("#calcTitle").text("Scientific Mode");
      }
    }
}

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
    for(let i = 2; i <= 7; i++) {
      $(`#tr${i}_0`).hide();
    }
    $("#tr2_2").show();
    $("#tr2_3").hide();
    $("#tr3_1").show();
    $("#tr2_7").hide();
    $("#tr3_5").show();
  } else { // simple mode
    $("#modeSwitch").text("Change to Scientific Mode");
    $("#calcTitle").text("Simple Mode");
    $(".other-operators").hide();
    $("#tr1_0").show();
    $("#tr1_5").show();
    $("#tr2_0").hide();
    $("#tr2_2").hide();
    $("#tr2_3").show();
    $("#tr3_1").hide();
    $("#tr2_7").show();
    $("#tr3_5").hide();
  }
}


// Show/hide rows when clicking on #tr1_1
let functionsToggled = false;

$("#tr1_1").on("click", function() {
  functionsToggled = !functionsToggled;
  for (let i = 2; i <= 7; i++) {
    if (functionsToggled) {
      $(`#tr${i}_0`).show();
      $(`#tr${i}_1`).hide();
    } else {
      $(`#tr${i}_0`).hide();
      $(`#tr${i}_1`).show();
    }
  }
});

function menuOptions() {
    var menu = document.getElementById('menuOpts1_2');
    var navLinks = document.getElementById('navLinks');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        navLinks.style.display = 'block';
    } else {
        menu.style.display = 'none';
        navLinks.style.display = 'none';
    }
}

