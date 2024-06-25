$(document).ready(function() {
    // Manejador de evento para el botón de eliminar alumno
    $('#tablaAlumnos').on('click', '.btn-delete', function() {
        const boleta = $(this).data('id');
        if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
            $.ajax({
                url: 'php/eliminar_alumno.php',
                method: 'POST',
                data: { boleta: boleta },
                dataType: 'json',
                success: function(data) {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        alert('Alumno eliminado correctamente.');
                        // Recargar los datos de la tabla
                        cargarAlumnos();
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error eliminando alumno: ", error);
                    alert('Error eliminando el alumno. Intente nuevamente.');
                }
            });
        }
    });
});
