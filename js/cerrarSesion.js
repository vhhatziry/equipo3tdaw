$(document).ready(function() {
    // Realizar llamada AJAX para cerrar sesión al cargar la página
    $.ajax({
        url: 'php/cerrar_sesion.php', 
        method: 'POST',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                console.log(response.message);
            } else {
                console.error('Error cerrando la sesión: ' + response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud AJAX para cerrar sesión:', error);
        }
    });
});
