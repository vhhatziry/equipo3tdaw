$(document).ready(function() {
    const ctx1 = $('#chartAlumnosPorTutoria')[0].getContext('2d');
    const ctx2 = $('#chartAlumnosPorTutor')[0].getContext('2d');
    let chartInstance1 = null;
    let chartInstance2 = null;

    function cargarTutores() {
        $.ajax({
            url: 'php/tutores.php',
            method: 'GET',
            dataType: 'json',
            success: function(tutores) {
                $('#selectTutor').empty().append('<option value="">Select a Tutor</option>');
                tutores.forEach(tutor => {
                    $('#selectTutor').append(`<option value="${tutor.idTutor}">${tutor.nombre}</option>`);
                });
                console.log("Tutores loaded:", tutores);
                if (tutores.length > 0) {
                    $('#selectTutor').val(tutores[0].idTutor).change();
                }
            },
            error: function(xhr, status, error) {
                console.error("Error loading tutors: ", error);
            }
        });
    }

    function cargarDatosTutorias() {
        $.ajax({
            url: 'php/datos_tutorias.php',
            method: 'GET',
            dataType: 'json',
            success: function(datos) {
                console.log("Tutorías data received:", datos);
                updateChart1(datos);
            },
            error: function(xhr, status, error) {
                console.error("Error loading tutorías data: ", error);
            }
        });
    }

    $('#selectTutor').on('change', function() {
        const tutorId = $(this).val();
        console.log("Selected Tutor ID:", tutorId);
    
        if (!tutorId) {
            console.log("No tutor selected or invalid tutor ID.");
            return;
        }
    
        $.ajax({
            url: 'php/datos_por_tutor.php',
            method: 'GET',
            dataType: 'json',
            data: { tutorId: tutorId },
            success: function(datos) {
                console.log("Received data:", datos);
                if (Array.isArray(datos)) {
                    updateChart2(datos);
                } else {
                    console.error("Invalid data format:", datos);
                }
            },
            error: function(xhr, status, error) {
                console.error("Error loading data by tutor: ", error);
                console.error("Response:", xhr.responseText);
            }
        });
    });

    function updateChart1(datos) {
        const labels = datos.map(item => item.nombreTutoria);
        const data = datos.map(item => parseInt(item.numAlumnos, 10));
    
        if (chartInstance1) {
            chartInstance1.destroy();
        }
        chartInstance1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Alumnos por Tutoría',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function updateChart2(datos) {
        const labels = datos.map(item => item.TipoTutoria);
        const data = datos.map(item => item.NumeroTutorados);
        const tutorName = datos.length > 0 ? datos[0].NombreTutor : 'No data';
    
        if (chartInstance2) {
            chartInstance2.destroy();
        }
        chartInstance2 = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: `Número de Tutorados por ${tutorName}`,
                    data: data,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    cargarTutores();
    cargarDatosTutorias();
});
