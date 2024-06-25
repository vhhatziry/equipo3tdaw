$(document).ready(function() {
    // Realizar la solicitud AJAX
    $.ajax({
      url: 'php/verificar_sesion_admin.php', // Archivo PHP que verifica la sesión
      type: 'GET', // Método GET ya que solo verificamos
      success: function(response) {
        // Manejar la respuesta del servidor
        if (response === 'true') {
          // Sesión iniciada
          console.log("Sesión de administrador activa.");
        } else {
          // Sesión no iniciada, redirigir a credmin.html
          console.log("Redireccionando a credmin.html");
          window.location.href = 'cradmin.html'; 
        }
      },
      error: function() {
        console.error("Error al verificar la sesión.");
      }
    });
  });
  