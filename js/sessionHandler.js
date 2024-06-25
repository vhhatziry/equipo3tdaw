$(document).ready(function() {
    var form = $("form");

    // Agregar listeners para validación constante
    agregarListeners('adminUsername', 'usernameHelp');
    agregarListeners('adminPassword', 'passwordHelp');

    form.on("submit", function(event) {
        event.preventDefault(); // Evitar envío automático del formulario

        // Validación de campos
        if (validarNoVacio('adminUsername', 'usernameHelp') && validarNoVacio('adminPassword', 'passwordHelp')) {
            var username = $('#adminUsername').val();
            var password = $('#adminPassword').val();

            // Realizar la solicitud AJAX
            $.ajax({
                type: "POST",
                url: "php/sesion.php",
                data: {
                    adminUsername: username,
                    adminPassword: password
                },
                success: function(response) {
                    var mensaje = $("#mensaje");
                    var respuesta = response.trim();
                    if (respuesta === "true") {
                        window.location.href = "admin.html";
                    } else {
                        mensaje.removeClass("d-none");
                        mensaje.html(respuesta);
                    }
                },
                error: function(xhr, status, error) {
                    var mensaje = $("#mensaje");
                    mensaje.removeClass("d-none");
                    mensaje.html("Error en la solicitud: " + xhr.status);
                }
            });

        } else {
            var mensaje = $("#mensaje");
            mensaje.removeClass("d-none");
            mensaje.html("Favor de llenar todos los campos correctamente");
        }
    });

    // Función para agregar listeners de validación
    function agregarListeners(inputId, helpId) {
        var inputElement = $("#" + inputId);
        inputElement.on('input change', function() {
            validarNoVacio(inputId, helpId);
        });
    }

    // Función de validación de campos no vacíos
    function validarNoVacio(inputId, helpId) {
        var inputElement = $("#" + inputId);
        var helpElement = $("#" + helpId);
        var value = inputElement.val().trim();

        if (value.length > 0) {
            setValid(inputElement, helpElement);
            return true;
        } else {
            setInvalid(inputElement, helpElement, "Este campo no puede estar vacío.");
            return false;
        }
    }

    // Función para establecer un campo como válido
    function setValid(inputElement, helpElement) {
        inputElement.css("borderColor", "green");
        helpElement.text("");
    }

    // Función para establecer un campo como inválido
    function setInvalid(inputElement, helpElement, message) {
        inputElement.css("borderColor", "red");
        helpElement.text(message);
    }
});
