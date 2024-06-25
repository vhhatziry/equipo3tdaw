<?php
require 'db.php';

// Verificar si se pasaron parámetros específicos
$tutoriaSeleccionada = isset($_GET['tutoria']) ? $_GET['tutoria'] : '';
$generoPreferido = isset($_GET['genero']) ? $_GET['genero'] : '';

$sql = "SELECT t.idTutor, t.nombre FROM tutor t";

// Si se pasan parámetros, agregar las condiciones
if (!empty($tutoriaSeleccionada) && !empty($generoPreferido)) {
    $sql .= " JOIN tutor_tutoria tt ON t.idTutor = tt.idTutor
              WHERE tt.idTutoria = '$tutoriaSeleccionada' 
              AND t.genero = '$generoPreferido'
              AND t.numAlumnos < 15";
} else {
    $sql .= " WHERE t.numAlumnos < 15";
}

$result = mysqli_query($conn, $sql);


$tutores = array();
while ($row = $result->fetch_assoc()) {
    $tutores[] = $row;
}

// Devolver los tutores como JSON
echo json_encode($tutores);

$conn->close();
?>
