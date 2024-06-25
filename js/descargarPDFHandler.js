$(document).ready(function() {
    var form = $("#descargarPDFForm");
    var mensaje = $("#mensaje");

    // Agregar listeners de validación
    agregarListeners("boleta", "boletaHelp", validarBoleta);
    agregarListeners("correo_institucional", "correoHelp", validarCorreo);

    form.on("submit", function(event) {
        event.preventDefault(); // Previene el envío automático del formulario

        var boleta = $('#boleta').val();
        var correo = $('#correo_institucional').val();
        var contrasena = $('#contrasena').val();

        // Verifica las credenciales primero
        $.ajax({
            type: "POST",
            url: "php/verificarUsuario.php",
            data: {
                boleta: boleta,
                correo: correo,
                contrasena: contrasena
            },
            success: function(response) {
                var respuesta = response.trim();
                if (respuesta === "true") {
                    // Credenciales correctas, proceder a obtener el PDF
                    var tempForm = $('<form>', {
                        method: "POST",
                        action: "php/descargarPDF.php",
                        target: "_blank"
                    });

                    tempForm.append($('<input>', {
                        type: "hidden",
                        name: "boleta",
                        value: boleta
                    }));

                    tempForm.append($('<input>', {
                        type: "hidden",
                        name: "correo",
                        value: correo
                    }));

                    tempForm.append($('<input>', {
                        type: "hidden",
                        name: "contrasena",
                        value: contrasena
                    }));

                    $('body').append(tempForm);
                    tempForm.submit();
                    tempForm.remove();

                    // Redirigir a index.html
                    window.location.href = "index.html";

                } else {
                    // Mostrar mensaje de error basado en la respuesta del servidor
                    mensaje.text(respuesta).removeClass("d-none");
                }
            },
            error: function(xhr, status, error) {
                mensaje.text("Error en la solicitud: " + xhr.status).removeClass("d-none");
            }
        });
    });

    // Función para agregar listeners de validación
    function agregarListeners(inputId, helpId, validationFunction) {
        var inputElement = $("#" + inputId);
        inputElement.on('input', function() {
            validationFunction(inputId, helpId);
        });
        inputElement.on('change', function() {
            validationFunction(inputId, helpId);
        });
    }

    // Función para validar que un campo no esté vacío
    function validarCampoVacio(inputId, helpId) {
        var inputElement = $("#" + inputId);
        var helpElement = $("#" + helpId);
        if (inputElement.val().trim() === "") {
            helpElement.removeClass("d-none").text("Este campo no puede estar vacío");
            return false;
        } else {
            helpElement.addClass("d-none");
            return true;
        }
    }
});
