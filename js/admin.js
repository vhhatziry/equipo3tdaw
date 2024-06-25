$(document).ready(function() {
    // Listener de validación para el formulario de registro
    $('#registroForm').on('change', 'input', function() {
        validarFormularioRegistro();
    });

    // Listener de validación para el formulario de actualización
    $('#updateForm').on('change', 'input', function() {
        validarFormularioUpdate();
    });

    $('#registroForm').on('change','select', function() {
        validarFormularioRegistro();
    });
    $('#updateForm').on('change','select', function() {
        validarFormularioUpdate();
    });

    // Cargar tutorías y tutores en los filtros al inicio
    cargarTutoriasEnFiltros();
    cargarTutoresEnFiltros();

    // Función para cargar tutorías en el formulario de filtros
    function cargarTutoriasEnFiltros() {
        $.ajax({
            url: 'php/obtener_tutorias.php',
            method: 'GET',
            dataType: 'json',
            success: function(tutorias) {
                var tutoriaSelect = $('#selectTutoria');
                tutoriaSelect.empty();
                tutoriaSelect.append('<option value="">Seleccione una tutoría...</option>');
                $.each(tutorias, function(index, tutoria) {
                    tutoriaSelect.append(new Option(tutoria.nombreTutoria, tutoria.idTutoria));
                });
            },
            error: function(xhr, status, error) {
                console.error("Error loading tutorías: ", error);
                alert('Error cargando las tutorías. Intente nuevamente.');
            }
        });
    }

    // Función para cargar tutores en el formulario de filtros
    // Función para cargar tutores en el formulario de filtros
    function cargarTutoresEnFiltros() {
        $.ajax({
            url: 'php/obtener_tutores.php',
            method: 'GET',
            dataType: 'json',
            success: function(tutores) {
                var tutorSelect = $('#selectTutorFilter');
                tutorSelect.empty();
                tutorSelect.append('<option value="">Seleccione un tutor...</option>');
                $.each(tutores, function(index, tutor) {
                    console.log(tutor);
                    tutorSelect.append(new Option(tutor.nombre, tutor.idTutor));    
                });
            },
            error: function(xhr, status, error) {
                console.error("Error loading tutores: ", error);
                alert('Error cargando los tutores. Intente nuevamente.');
            }
        });
    }

    // Función para validar el formulario de registro
    function validarFormularioRegistro() {
        let valid = true;
        valid &= validarBoleta('boleta', 'boletaHelp');
        valid &= validarNombre('nombre', 'nombreHelp');
        valid &= validarPrimerApellido('primer_apellido', 'primerApellidoHelp');
        valid &= validarSegundoApellido('segundo_apellido', 'segundoApellidoHelp');
        valid &= validarTelefono('telefono', 'telefonoHelp');
        valid &= validarSemestre('semestre', 'semestreHelp');
        valid &= validarCarrera('carrera', 'carreraHelp');
        valid &= validarCorreo('correo_institucional', 'correoHelp');
        valid &= validarContra('contrasena', 'contrasenaHelp');
        valid &= validarTipoTutor('hombre', 'mujer', 'tipoTutorHelp');
        valid &= validarTutoria('tutoria', 'tutoriaHelp');
        valid &= validarTutor('tutor', 'tutorHelp');
        return valid;
    }

    // Función para validar el formulario de actualización
    function validarFormularioUpdate() {
        let valid = true;
        valid &= validarNombre('updateNombre', 'updateNombreHelp');
        valid &= validarPrimerApellido('updatePrimerApellido', 'updatePrimerApellidoHelp');
        valid &= validarSegundoApellido('updateSegundoApellido', 'updateSegundoApellidoHelp');
        valid &= validarTelefono('updateTelefono', 'updateTelefonoHelp');
        valid &= validarSemestre('updateSemestre', 'updateSemestreHelp');
        valid &= validarCarrera('updateCarrera', 'updateCarreraHelp');
        valid &= validarCorreo('updateCorreoInstitucional', 'updateCorreoHelp');
        valid &= validarContra('updateContrasena', 'updateContrasenaHelp');
        valid &= validarTipoTutor('updateHombre', 'updateMujer', 'updateTipoTutorHelp');
        valid &= validarTutoria('updateTutoria', 'updateTutoriaHelp');
        valid &= validarTutor('updateTutor', 'updateTutorHelp');
        return valid;
    }
});
