$(document).ready(function() {
    cargarAlumnos();

    function cargarAlumnos() {
        $.ajax({
            url: 'php/obtener_alumnos.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.error) {
                    console.error("Error: ", data.error);
                    return;
                }
                var tabla = $('#tablaAlumnos tbody');
                tabla.empty(); // Limpiar la tabla antes de agregar nuevos datos
                console.log("Datos de los alumnos: ", data);
                data.forEach(function(alumno) {
                    var fila = $('<tr></tr>');
                    fila.append($('<td></td>').text(alumno.boleta));
                    fila.append($('<td></td>').text(alumno.nombre));
                    fila.append($('<td></td>').text(alumno.nombreTutor));
                    fila.append($('<td></td>').text(alumno.nombreTutoria));
                    fila.append($('<td></td>').html('<button class="btn btn-info btn-sm" onclick="editarAlumno(' + alumno.boleta + ')">Editar</button> <button class="btn btn-danger btn-sm" onclick="eliminarAlumno(' + alumno.boleta + ')">Eliminar</button>'));
                    
                    tabla.append(fila);
                });
            },
            error: function() {
                console.error("No se pueden cargar los datos de los alumnos");
            }
        });
    }

    window.editarAlumno = function(boleta) {
        console.log("Editar alumno con boleta: " + boleta);
        // Aquí puedes agregar la lógica para editar un alumno
    };

    window.eliminarAlumno = function(boleta) {
        console.log("Eliminar alumno con boleta: " + boleta);
        // Aquí puedes agregar la lógica para eliminar un alumno
    };
});
