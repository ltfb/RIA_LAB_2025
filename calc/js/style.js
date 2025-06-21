$(document).ready(function() {

    // Efecto de hover y click para los botones de números
    $(".numbers").hover(
        function () {
            $(this).addClass("hovered");
        },
        function () {
            $(this).removeClass("hovered");
        }
    ).on("mousedown", function () {
        $(this).addClass("clicked");
    }).on("mouseup mouseleave", function () {
        $(this).removeClass("clicked");
    });

    // Efecto de hover y click para los operadores
    $(".operators").hover(
        function () {
            $(this).addClass("hovered");
        },
        function () {
            $(this).removeClass("hovered");
        }
    ).on("mousedown", function () {
        $(this).addClass("clicked");
    }).on("mouseup mouseleave", function () {
        $(this).removeClass("clicked");
    });

    // Efectos para el botón "="
    $("#tr6_4").on("mousedown", function () {
        $(this).addClass("equal-clicked");
    }).on("mouseup mouseleave", function () {
        $(this).removeClass("equal-clicked");
    });

    // Cambiar tema desde el selector
    $('#themeSelector').on('change', function () {
        const selectedTheme = $(this).val();
        $('body').removeClass('default dark light colorful').addClass(selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    });

    // Cargar tema guardado si existe
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        $('body').removeClass('default dark light colorful').addClass(savedTheme);
        $('#themeSelector').val(savedTheme);
    }
});