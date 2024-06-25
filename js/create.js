$(document).ready(function() {
    var form = $("#registroForm");
    var submitButton = $("#submitButton");

    submitButton.click(function(event) {
        event.preventDefault(); // Evita el envío del formulario

        if (verificarTodosLosCampos()) {
            verificarExistencia(function(existenciaValida) {
                if (existenciaValida) {
                    // Recopilar los datos del formulario usando serialize
                    var formData = form.serialize();

                    // Enviar los datos mediante AJAX
                    $.ajax({
                        url: 'php/adminAddAlumno.php',
                        type: 'POST',
                        data: formData,
                        dataType: 'json',
                        success: function(response) {
                            // Manejar la respuesta del servidor
                            console.log(response);
                            alert(response.message);
                            if (response.success) {
                                cargarAlumnos();
                                // Cerrar el modal
                                $('#registroModal').modal('hide');
                            }
                        },
                        error: function(xhr, status, error) {
                            // Manejar errores
                            console.error(xhr.responseText);
                            alert("Error en el registro");
                        }
                    });
                }
            });
        }
    });

    var boletaValida = true; // Estado inicial de validación de la boleta
    var correoValido = true; // Estado inicial de validación del correo

    agregarListeners('nombre', 'nombreHelp', validarNombre);
    agregarListeners('primer_apellido', 'primerApellidoHelp', validarPrimerApellido);
    agregarListeners('segundo_apellido', 'segundoApellidoHelp', validarSegundoApellido);
    agregarListeners('telefono', 'telefonoHelp', validarTelefono);
    agregarListeners('semestre', 'semestreHelp', validarSemestre);
    agregarListeners('carrera', 'carreraHelp', validarCarrera);
    agregarListeners('contrasena', 'contrasenaHelp', validarContra);
    agregarListeners('tutoria', 'tutoriaHelp', validarTutoria);
    agregarListeners('tutor', 'tutorHelp', validarTutor);
    agregarListeners('boleta', 'boletaHelp', validarBoleta);
    agregarListeners('correo_institucional', 'correoHelp', validarCorreo);

    $('#hombre').change(function() {
        validarTipoTutor('hombre', 'mujer', 'tipoTutorHelp');
        cargarTutores();
    });
    $('#mujer').change(function() {
        validarTipoTutor('hombre', 'mujer', 'tipoTutorHelp');
        cargarTutores();
    });

    function verificarExistencia(callback) {
        var boleta = $('#boleta').val();
        var correo = $('#correo_institucional').val();

        $.ajax({
            url: 'php/verificar_existencia.php',
            type: 'GET',
            data: {
                boleta: boleta,
                correo: correo
            },
            dataType: 'json',
            success: function(data) {
                boletaValida = !data.boletaExists;
                correoValido = !data.correoExists;

                if (!boletaValida) {
                    setValidationStyle('boleta', false, 'boletaHelp', "La boleta ya está registrada.");
                } else {
                    setValidationStyle('boleta', true, 'boletaHelp', "");
                }

                if (!correoValido) {
                    setValidationStyle('correo_institucional', false, 'correoHelp', "El correo ya está registrado.");
                } else {
                    setValidationStyle('correo_institucional', true, 'correoHelp', "");
                }

                callback(boletaValida && correoValido);
            }
        });
    }

    function verificarTodosLosCampos() {
        return validarBoleta('boleta', 'boletaHelp') &&
               validarNombre('nombre', 'nombreHelp') &&
               validarPrimerApellido('primer_apellido', 'primerApellidoHelp') &&
               validarSegundoApellido('segundo_apellido', 'segundoApellidoHelp') &&
               validarTelefono('telefono', 'telefonoHelp') &&
               validarSemestre('semestre', 'semestreHelp') &&
               validarCarrera('carrera', 'carreraHelp') &&
               validarContra('contrasena', 'contrasenaHelp') &&
               validarTutoria('tutoria', 'tutoriaHelp') &&
               validarTutor('tutor', 'tutorHelp');
    }

    function agregarListeners(inputId, helpId, validationFunction) {
        var inputElement = $("#" + inputId);
        inputElement.on('input change', function() {
            validationFunction(inputId, helpId);
        });
    }

    function setValidationStyle(inputId, isValid, helpId, message) {
        var element = $("#" + inputId);
        var helpElement = $("#" + helpId);
        if (!isValid) {
            element.css("border-color", "red");
            helpElement.text(message);
        } else {
            element.css("border-color", "green");
            helpElement.text("");
        }
    }

    // Cargar tutorías al cargar la página
    cargarTutorias();

    // Agregar evento para cargar tutores al seleccionar una tutoría
    $("#tutoria").change(cargarTutores);

    // Función para cargar tutorías al inicio
    function cargarTutorias() {
        var tutoriaSelect = $("#tutoria");

        // Realizar la petición AJAX
        $.ajax({
            url: 'php/obtener_tutorias.php', // Se obtienen las tutorías
            type: 'GET',
            dataType: 'json',
            success: function(tutorias) {
                // Llenar el select de tutorías
                $.each(tutorias, function(index, tutoria) {
                    tutoriaSelect.append(new Option(tutoria.nombreTutoria, tutoria.idTutoria));
                });
            }
        });
    }

    // Función para cargar tutores según la tutoría seleccionada
    function cargarTutores() {
        var tutoriaSelect = $("#tutoria");
        var generoPreferido = $('input[name="preferencia_tutor"]:checked').val();

        // Si no se ha seleccionado una tutoría, borra el select de tutores
        if (tutoriaSelect.val() === "") {
            $("#tutor").html('<option value="">Selecciona un tutor...</option>');
            // Llamar a la validación de tutoría para mostrar el mensaje de error
            validarTutoria('tutoria', 'tutoriaHelp');
            // Llamada a la validación de tutor para mostrar el mensaje de error
            validarTutor('tutor', 'tutorHelp');
            return;
        }

        var tutoriaSeleccionada = tutoriaSelect.val();
        var tutorSelect = $("#tutor");

        // Limpiar opciones anteriores del select de tutores
        tutorSelect.html('<option value="">Selecciona un tutor...</option>');

        // Realizar la petición AJAX
        $.ajax({
            url: 'php/obtener_tutores.php',
            type: 'GET',
            data: {
                tutoria: tutoriaSeleccionada,
                genero: generoPreferido
            },
            dataType: 'json',
            success: function(tutores) {
                // Llenar el select de tutores
                $.each(tutores, function(index, tutor) {
                    tutorSelect.append(new Option(tutor.nombre, tutor.idTutor));
                });
            }
        });
    }
});
