<?php
include 'db.php'; // Asegúrate de tener un archivo que gestione la conexión a la base de datos

header('Content-Type: application/json');

// Conexión a la base de datos
$conn = mysqli_connect("localhost", "root", "", "registro_tutorias");

// Verificar la conexión
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}

// Consulta para obtener los tutores
$sql = "SELECT idTutor, nombre FROM tutor";
$result = mysqli_query($conn, $sql);
$tutores = [];

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $tutores[] = $row;
    }
}

// Devolver los tutores como JSON
echo json_encode($tutores);

// Cerrar la conexión
mysqli_close($conn);
?>
