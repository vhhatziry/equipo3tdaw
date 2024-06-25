$(document).ready(function() {
    // Manejador de evento para el botón de editar alumno
    $('#tablaAlumnos').on('click', '.btn-edit', function() {
        const boleta = $(this).data('id');
        $.ajax({
            url: 'php/obtener_alumno.php',
            method: 'GET',
            data: { boleta: boleta },
            dataType: 'json',
            success: function(data) {
                if (data.error) {
                    alert(data.error);
                } else {
                    // Llenar el formulario del modal con los datos del alumno
                    $('#updateNombre').val(data.nombre);
                    $('#updatePrimerApellido').val(data.primerApe);
                    $('#updateSegundoApellido').val(data.segundoApe);
                    $('#updateBoleta').val(data.boleta);
                    $('#updateTelefono').val(data.telefono);
                    $('#updateSemestre').val(data.semestre);
                    $('#updateCarrera').val(data.carrera);
                    $('#updateCorreoInstitucional').val(data.correo_electronico);
                    $('#updateContrasena').val(data.contrasena);
                    console.log('Revisando alumno');
                    console.log(data);
                    // Obtener el género del tutor
                    $.ajax({
                        url: 'php/obtener_genero_tutor.php',
                        method: 'GET',
                        data: { idTutor: data.idTutor },
                        dataType: 'json',
                        success: function(tutorData) {
                            if (tutorData.error) {
                                alert(tutorData.error);
                            } else {
                                
                                const generoPreferido = tutorData.genero;
                                $(`input[name="preferencia_tutor"][value="${generoPreferido}"]`).prop('checked', true);

                                // Cargar las tutorías y tutores en los selectores
                                cargarTutoriasYtutores(data.idTutoria, data.idTutor, generoPreferido);
                                validarFormularioUpdate();
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error("Error loading tutor data: ", error);
                            alert('Error cargando los datos del tutor. Intente nuevamente.');
                        }
                    });

                    // Mostrar el modal
                    $('#updateStudentModal').modal('show');
                                              
                }
            },
            error: function(xhr, status, error) {
                console.error("Error loading student data: ", error);
                alert('Error cargando los datos del alumno. Intente nuevamente.');
            }
        });
    });

    // Manejador de evento para el botón de guardar cambios
    $('#updateButton').on('click', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        if (validarFormularioUpdate()) {
            const correoInstitucional = $('#updateCorreoInstitucional').val();
            const boleta = $('#updateBoleta').val();

            // Verificar si el correo es diferente al guardado y si ya existe en otros registros
            $.ajax({
                url: 'php/verificar_correo.php',
                method: 'POST',
                data: {
                    correo: correoInstitucional,
                    boleta: boleta
                },
                dataType: 'json',
                success: function(response) {
                    if (response.existe) {
                        alert('El correo ya está registrado para otro alumno.');
                    } else {
                        // Proceder con la actualización
                        const updateData = $('#updateForm').serialize();
                        $.ajax({
                            url: 'php/actualizar_alumno.php',
                            method: 'POST',
                            data: updateData,
                            dataType: 'json',
                            success: function(data) {
                                if (data.error) {
                                    alert(data.error);
                                } else {
                                    alert('Alumno actualizado correctamente.');
                                    $('#updateStudentModal').modal('hide');
                                    // Recargar los datos de la tabla
                                    cargarAlumnos();
                                }
                            },
                            error: function(xhr, status, error) {
                                console.error("Error updating student data: ", error);
                                alert('Error actualizando los datos del alumno. Intente nuevamente.');
                            }
                        });
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error verifying email: ", error);
                    alert('Error verificando el correo. Intente nuevamente.');
                }
            });
        } else {
            alert('Por favor, corrige los campos marcados.');
        }
    });

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
        return !!valid; // Convertir a booleano
    }

    // Agregar listeners de validación
    agregarListeners('updateNombre', 'updateNombreHelp', validarNombre);
    agregarListeners('updatePrimerApellido', 'updatePrimerApellidoHelp', validarPrimerApellido);
    agregarListeners('updateSegundoApellido', 'updateSegundoApellidoHelp', validarSegundoApellido);
    agregarListeners('updateTelefono', 'updateTelefonoHelp', validarTelefono);
    agregarListeners('updateSemestre', 'updateSemestreHelp', validarSemestre);
    agregarListeners('updateCarrera', 'updateCarreraHelp', validarCarrera);
    agregarListeners('updateCorreoInstitucional', 'updateCorreoHelp', validarCorreo);
    agregarListeners('updateContrasena', 'updateContrasenaHelp', validarContra);
    agregarListeners('updateTutoria', 'updateTutoriaHelp', validarTutoria);
    agregarListeners('updateTutor', 'updateTutorHelp', validarTutor);

    $('#updateHombre').change(function() {
        validarTipoTutor('updateHombre', 'updateMujer', 'updateTipoTutorHelp');
        cargarTutores('updateTutoria', 'updateTutor', 'Hombre');
    });
    $('#updateMujer').change(function() {
        validarTipoTutor('updateHombre', 'updateMujer', 'updateTipoTutorHelp');
        cargarTutores('updateTutoria', 'updateTutor', 'Mujer');
    });

    function agregarListeners(inputId, helpId, validationFunction) {
        var inputElement = $("#" + inputId);
        inputElement.on('input change', function() {
            validationFunction(inputId, helpId);
        });
    }

    function cargarTutoriasYtutores(tutoriaSeleccionada, tutorSeleccionado, generoPreferido) {
        // Seleccionar género preferido
        if (generoPreferido === 'Hombre') {
            $('#updateHombre').prop('checked', true);
        } else {
            $('#updateMujer').prop('checked', true);
        }

        // Cargar tutorías
        $.ajax({
            url: 'php/obtener_tutorias.php',
            method: 'GET',
            dataType: 'json',
            success: function(tutorias) {
                var tutoriaSelect = $('#updateTutoria');
                tutoriaSelect.empty();
                tutoriaSelect.append('<option value="">Selecciona una tutoría...</option>');
                $.each(tutorias, function(index, tutoria) {
                    tutoriaSelect.append(new Option(tutoria.nombreTutoria, tutoria.idTutoria));
                });
                tutoriaSelect.val(tutoriaSeleccionada);

                // Cargar tutores una vez que las tutorías han sido cargadas
                cargarTutores('updateTutoria', 'updateTutor', generoPreferido, tutorSeleccionado);
            }
        });
    }

    function cargarTutores(tutoriaId, tutorId, generoPreferido, tutorSeleccionado) {
        var tutoriaSelect = $("#" + tutoriaId);
        var tutorSelect = $("#" + tutorId);

        // Si no se ha seleccionado una tutoría, borra el select de tutores
        if (tutoriaSelect.val() === "") {
            tutorSelect.html('<option value="">Selecciona un tutor...</option>');
            // Llamar a la validación de tutoría para mostrar el mensaje de error
            validarTutoria(tutoriaId, tutoriaId + 'Help');
            // Llamada a la validación de tutor para mostrar el mensaje de error
            validarTutor(tutorId, tutorId + 'Help');
            return;
        }

        var tutoriaSeleccionada = tutoriaSelect.val();

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
                tutorSelect.val(tutorSeleccionado);
            },
            error: function(xhr, status, error) {
                console.error("Error loading tutores: ", error);
                alert('Error cargando los tutores. Intente nuevamente.');
            }
        });
    }

    // Cuando se cambie la tutoría, cargar los tutores correspondientes
    $('#updateTutoria').change(function() {
        const generoPreferido = $('input[name="preferencia_tutor"]:checked').val();
        cargarTutores('updateTutoria', 'updateTutor', generoPreferido);
    });
});
