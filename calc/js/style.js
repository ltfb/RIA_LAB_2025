// Ensure jQuery is loaded before this script in your HTML:
// <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
// <script src="js/style.js"></script>

$(document).ready(function() {
    // Class selection
    if ($(".numbers").length === 0) {
        console.warn('No elements with class "numbers" found.');
    }
    
    $(".numbers").css({
        "color": "white",
        "background-color": "black",
        "font-size": "50px",
        "display": "inline-block",
        "width": "24%",
        "box-sizing": "border-box",
        "margin": "0.5%",
        "text-align": "center"
    });

    // Ensure parent container uses flex to wrap in 4 columns
    // Ensure the parent of the buttons uses flex to order them in rows of 4
    $(".numbers").parent().css({
        "display": "flex",
        "flex-wrap": "wrap",
        "gap": "1%", // optional: adds spacing between buttons
        "justify-content": "flex-start" // aligns buttons to the left in rows
    });
});