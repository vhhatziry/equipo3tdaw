<?php
// Conexión a la base de datos (reemplaza con tus credenciales)
$conn = mysqli_connect("localhost", "root", "", "registro_tutorias");

// Verificar la conexión
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}

// Consulta para obtener las tutorías
$sql = "SELECT idTutoria, nombreTutoria FROM tutoria";
$result = mysqli_query($conn, $sql);

$tutorias = array();
while ($row = mysqli_fetch_assoc($result)) {
    $tutorias[] = $row;
}

// Devolver las tutorías como JSON
echo json_encode($tutorias);

// Cerrar la conexión
mysqli_close($conn);
?>
