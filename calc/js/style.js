// Ensure jQuery is loaded before this script in your HTML:
// <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
// <script src="js/style.js"></script>

$(document).ready(function() {
    // Class selection
    if ($(".numbers").length === 0) {
        console.warn('No elements with class "numbers" found.');
    }
    // Make the calculator bigger
    // Move the title to the top by setting the parent container to grid with the title as the first row
    // (Assumes the title has a class like .calc-title and is a sibling above .calc-keys)
    $(".calc-keys").parent().css({
        "display": "grid",
        "grid-template-rows": "auto auto 1fr", // title, input, grid
        "grid-template-columns": "1fr",
        "gap": "16px",
        "justify-items": "center",
        "align-items": "center",
        "margin": "0 auto",
        "width": "fit-content",
        "text-align": "center",
        "background-color": "#1A1F33",
        "color": "white",
        "font-family": "Arial, sans-serif"
    });

    // Center the calculator container
    $(".calculator").css({
        "display": "flex",
        "justify-content": "center",
        "align-items": "center",
        "height": "100vh",
        "width": "100vw"
    });

    $(".calc-keys").css({
        "font-size": "2rem",
        "min-width": "720px",
        "min-height": "480px",
        "display": "grid",
        "grid-template-columns": "repeat(auto-fit, minmax(64px, 1fr))",
        "gap": "8px",
        "align-items": "center",
        "justify-items": "center"
    });

    // Align comboboxes (select elements) inside .calc-keys
    $(".calc-keys select").css({
        "width": "100%",
        "max-width": "120px",
        "font-size": "1.1rem",
        "margin": "0 auto",
        "display": "block",
        "box-sizing": "border-box"
    });
    
    $(".calc-title").css({
        "text-align": "left",
        "justify-self": "start",
    });    
    
    // Center the entire page content vertically and horizontally
    $("body, html").css({
        "height": "100%",
        "margin": "0",
        "padding": "0",
        "display": "flex",
        "justify-content": "center",
        "align-items": "center"
    });

    //Style equal button
    $("#tr6_4").css({
        "color": "#1A4454",
        "background-color": "#4CC2FF",
    });
    
    $("#tr6_4").hover(
        function() {
            $(this).css({
                "background-color": "#47B0E7",
                "color": "white"
            });
        },
        function() {
            $(this).css({
                "background-color": "#4CC2FF",
                "color": "#1A4454"
            });
        }
    );
    
    //Border radius for the calculator keys
    // Set same size for all buttons (.numbers, .operators, #tr6_4)
    $(".numbers, .operators, .other-operators").css({
        "border-radius": "8px",
        "width": "64px",
        "height": "64px",
        "font-size": "2rem",
        "margin": "2px",
        "display": "inline-flex",
        "justify-content": "center",
        "align-items": "center",
        "box-sizing": "border-box"
    });
            $(this).css({
                "background-color": "#4CC2FF",
                "color": "#1A4454"
            });
        }
    );
    

    // Add a visual feedback effect for equal button on click
    $("#tr6_4").on("mousedown", function() {
        $(this).css({
            "background-color": "#41A1D7",
                "color": "#265D7C"
        });
    }).on("mouseup mouseleave", function() {
        $(this).css({
            "background-color": "#4CC2FF",
                "color": "#1A4454"
        });
    });

    //Style the numbers
    $(".numbers").css({
        "color": "white",
        "background-color": "#363A4E",
    });

    // Add a visual feedback effect for .numbers buttons on hover
    $(".numbers").hover(
        function() {
            $(this).css({
                "background-color": "#2D3145",
                "color": "white"
            });
        },
        function() {
            $(this).css({
                "background-color": "#363A4E",
                "color": "white"
            });
        }
    );
    

    // Add a visual feedback effect for .numbers buttons on click
    $(".numbers").on("mousedown", function() {
        $(this).css({
            "background-color": "#22283B",
            "color": "white"
        });
    }).on("mouseup mouseleave", function() {
        $(this).css({
            "background-color": "#363A4E",
            "color": "white"
        });
    });
    //Style the operators
    $(".operators").css({
        "color": "white",
        "background-color": "#2C3145",
    });

     $(".operators").hover(
        function() {
            $(this).css({
                "background-color": "#363A4E",
                "color": "white"
            });
        },
        function() {
            $(this).css({
                "background-color": "#2C3145",
                "color": "white"
            });
        }
    );

    $(".operators").on("mousedown", function() {
        $(this).css({
            "background-color": "#22283B",
            "color": ""
        });
    }).on("mouseup mouseleave", function() {
        $(this).css({
            "background-color": "#2C3145",
            "color": "white"
        });
    })

    if (window.innerWidth >= 768) {// For larger screens
        $(".body").css({
            "font-size": "16px"
        });
    } else if (window.innerWidth < 768) {// For tablet screens
        $(".body").css({
            "font-size": "14px"
        });
    } else if (window.innerWidth < 480) {// For mobile screens
        $(".body").css({
            "font-size": "12px"
        });
    }