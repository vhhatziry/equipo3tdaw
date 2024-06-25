$(document).ready(function() {
    // Inicialización al cargar la página
    cargarAlumnos();

    // Manejador de evento para el formulario de filtros
    $('#advancedFiltersForm').on('submit', function(event) {
        event.preventDefault();
        cargarAlumnos();
    });

    // Manejador de evento para limpiar filtros
    $('#advancedFiltersForm').on('reset', function(event) {
        // Limpiar los selectores
        $('#selectTutorFilter').val('Seleccione un tutor...');
        $('#selectTutoria').val('Seleccione una tutoría...');
        $('#selectCarrera').val('Seleccione una carrera...');
        // Limpiar los inputs
        $('#inputNombre').val('');
        $('#inputBoleta').val('');
        $('#selectSemestre').val('');
        // Recargar los alumnos
        cargarAlumnos();
    });

    // Agregar listener al select de orden
    $('#orderSelect').on('change', function() {
        cargarAlumnos();
    });
});

function cargarAlumnos() {
    const filtros = {
        nombre: $('#inputNombre').val() || '',
        boleta: $('#inputBoleta').val() || '',
        tutor: $('#selectTutorFilter').val() !== 'Seleccione un tutor...' ? $('#selectTutorFilter').val() : '',
        tutoria: $('#selectTutoria').val() !== 'Seleccione una tutoría...' ? $('#selectTutoria').val() : '',
        semestre: $('#selectSemestre').val() || '',
        carrera: $('#selectCarrera').val() !== 'Seleccione una carrera...' ? $('#selectCarrera').val() : '',
        order: $('#orderSelect').val() || 'asc' // Agregar el orden seleccionado
    };
    $.ajax({
        url: 'php/obtener_alumnos.php',
        method: 'GET',
        data: filtros,
        dataType: 'json',
        success: function(data) {
            if (data.error) {
                alert(data.error);
                return;
            }
            if (data.length > 0) {
                let tableRows = '';
                data.forEach(alumno => {
                    tableRows += `
                        <tr>
                            <td>${alumno.boleta}</td>
                            <td>${alumno.nombre}</td>
                            <td>${alumno.carrera}</td>
                            <td>${alumno.nombreTutor}</td>
                            <td>${alumno.nombreTutoria}</td>
                            <td>
                                <button class="btn btn-warning btn-sm btn-edit" data-id="${alumno.boleta}">Editar</button>
                                <button class="btn btn-danger btn-sm btn-delete" data-id="${alumno.boleta}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
                $('#tablaAlumnos tbody').html(tableRows);
            } else {
                $('#tablaAlumnos tbody').html('<tr><td colspan="6">No se encontraron alumnos.</td></tr>');
            }
        },
        error: function(xhr, status, error) {
            console.error("Error loading students: ", error);
            $('#tablaAlumnos tbody').html('<tr><td colspan="6">Error cargando alumnos. Intente nuevamente.</td></tr>');
        }
    });
}
