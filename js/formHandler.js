$(document).ready(function() {
    var form = $("#registroForm");
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

    form.submit(function(event) {
        event.preventDefault(); // Evitar envío automático del formulario
        if (verificarTodosLosCampos()) {
            verificarExistencia(function(existenciaValida) {
                if (existenciaValida) {
                    mostrarDatosModal(); // Si todo es correcto, mostrar el modal para confirmación
                }
            });
        }
    });

    function verificarExistencia(callback) {
        var boleta = $('#boleta').val();
        var correo = $('#correo_institucional').val();

        $.ajax({
            url: "php/verificar_existencia.php", // Se verifica la existencia de la boleta y el correo
            method: "GET",
            data: { boleta: boleta, correo: correo },
            dataType: "json",
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
        $("#" + inputId).on('input change', function() {
            validationFunction(inputId, helpId);
        });
    }

    function mostrarDatosModal() {
        var nombre = $('#nombre').val();
        var datos = "<p>Hola <strong>" + nombre + "</strong>:</p>" +
                    "<p>Verifica que tus datos sean correctos:</p>" +
                    "<table class='table table-striped'>" +
                    "<tr><th>Nombre:</th><td>" + nombre + "</td></tr>" +
                    "<tr><th>Primer Apellido:</th><td>" + $('#primer_apellido').val() + "</td></tr>" +
                    "<tr><th>Segundo Apellido:</th><td>" + $('#segundo_apellido').val() + "</td></tr>" +
                    "<tr><th>Boleta:</th><td>" + $('#boleta').val() + "</td></tr>" +
                    "<tr><th>Teléfono:</th><td>" + $('#telefono').val() + "</td></tr>" +
                    "<tr><th>Semestre:</th><td>" + $('#semestre').val() + "</td></tr>" +
                    "<tr><th>Carrera:</th><td>" + $('#carrera option:selected').text() + "</td></tr>" +
                    "<tr><th>Preferencia de Tutor:</th><td>" + ($('input[name="preferencia_tutor"]:checked').val() || 'No seleccionado') + "</td></tr>" +
                    "<tr><th>Correo Electrónico:</th><td>" + $('#correo_institucional').val() + "</td></tr>" +
                    "<tr><th>Contraseña:</th><td>" + $('#contrasena').val() + "</td></tr>" +
                    "<tr><th>Tipo de Tutoría:</th><td>" + $('#tutoria option:selected').text() + "</td></tr>" +
                    "<tr><th>Tutor:</th><td>" + $('#tutor option:selected').text() + "</td></tr>" +
                    "</table>";
        
        $('.modal-body').html(datos); // Use innerHTML to insert the table
        $('#confirmModal').modal('show');
    }    

    // Cargar tutorías al cargar la página
    cargarTutorias();

    // Agregar evento para cargar tutores al seleccionar una tutoría
    $("#tutoria").change(cargarTutores);

    // Función para cargar tutorías al inicio
    function cargarTutorias() {
        var tutoriaSelect = $("#tutoria");

        $.ajax({
            url: "php/obtener_tutorias.php",
            method: "GET",
            dataType: "json",
            success: function(tutorias) {
                tutoriaSelect.empty();
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
        var tutorSelect = $("#tutor");

        // Si no se ha seleccionado una tutoría, borra el select de tutores
        if (tutoriaSelect.val() === "") {
            tutorSelect.html('<option value="">Selecciona un tutor...</option>');
            validarTutoria('tutoria', 'tutoriaHelp');
            validarTutor('tutor', 'tutorHelp');
            return;
        }

        var tutoriaSeleccionada = tutoriaSelect.val();

        // Limpiar opciones anteriores del select de tutores
        tutorSelect.html('<option value="">Selecciona un tutor...</option>');

        // Realizar la petición AJAX
        $.ajax({
            url: "php/obtener_tutores.php",
            method: "GET",
            data: {
                tutoria: tutoriaSeleccionada,
                genero: generoPreferido
            },
            dataType: "json",
            success: function(tutores) {
                $.each(tutores, function(index, tutor) {
                    tutorSelect.append(new Option(tutor.nombre, tutor.idTutor));
                });
            }
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

    $("#confirmModalAceptar").click(function() {
        if (verificarTodosLosCampos()) {
            var tempForm = $("<form>").attr({
                method: "POST",
                action: "php/conexionBaseDatos.php",
                target: "_blank"
            });
    
            // Agregar los campos del formulario original al formulario temporal
            form.find("input, select").each(function() {
                var input = $(this).clone();
                if ($(this).is("select")) {
                    var hiddenInput = $("<input>").attr({
                        type: "hidden",
                        name: $(this).attr("name"),
                        value: $(this).val()
                    });
                    tempForm.append(hiddenInput);
                } else {
                    tempForm.append(input);
                }
            });
    
            $("body").append(tempForm);
            tempForm.submit();
            tempForm.remove();
        }
    });
    
});
