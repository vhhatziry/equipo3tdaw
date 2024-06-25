<?php
session_start();
header('Content-Type: application/json');

// Asegurarse de que solo los administradores puedan acceder a este script
if (!isset($_SESSION['admin'])) {
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit;
}

include 'db.php';

$boleta = isset($_GET['boleta']) ? $_GET['boleta'] : '';

if (empty($boleta)) {
    echo json_encode(['error' => 'ID de boleta no proporcionado']);
    exit;
}

// Escapar el ID de la boleta para prevenir inyección SQL
$boleta = mysqli_real_escape_string($conn, $boleta);

// Preparar y ejecutar la consulta
$query = "SELECT a.*, at.idTutor, at.idTutoria 
          FROM alumno a 
          LEFT JOIN alumno_tutor at ON a.boleta = at.boleta 
          WHERE a.boleta = '$boleta'";
$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        $data = mysqli_fetch_assoc($result);
        echo json_encode($data);
    } else {
        echo json_encode(['error' => 'No se encontraron datos para la boleta proporcionada']);
    }
} else {
    echo json_encode(['error' => 'Error ejecutando la consulta: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
