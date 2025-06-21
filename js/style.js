$(document).ready(function() {
    // Eliminamos los estilos inline que estaban en el JS original
    // y los movimos al CSS para mejor rendimiento y mantenibilidad
    
    // Solo mantenemos los efectos interactivos
    $(".numbers").hover(
        function() {
            $(this).css("filter", "brightness(1.2)");
        },
        function() {
            $(this).css("filter", "brightness(1)");
        }
    );
    
    $(".operators").hover(
        function() {
            $(this).css("filter", "brightness(1.2)");
        },
        function() {
            $(this).css("filter", "brightness(1)");
        }
    );
    
    $(".other-operators").hover(
        function() {
            $(this).css("filter", "brightness(1.2)");
        },
        function() {
            $(this).css("filter", "brightness(1)");
        }
    );
    
    // Efecto al hacer clic
    $(".numbers, .operators, .other-operators").on("mousedown", function() {
        $(this).css("transform", "scale(0.95)");
    }).on("mouseup mouseleave", function() {
        $(this).css("transform", "scale(1)");
    });
    
    // Ajuste inicial para pantallas pequeñas
    if (window.innerWidth < 500) {
        $("body").css("padding", "5px");
    }
});