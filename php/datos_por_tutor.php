<?php
session_start();
header('Content-Type: application/json');

// Asegurarse de que solo los administradores puedan acceder a este script
if (!isset($_SESSION['admin'])) {
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit;
}

require('db.php'); // Incluir archivo de conexión a la base de datos

$tutorId = isset($_GET['tutorId']) ? $_GET['tutorId'] : '';

if (empty($tutorId)) {
    echo json_encode(['error' => 'ID de tutor no proporcionado']);
    exit;
}

// Preparar y ejecutar la consulta
$query = "CALL VerTutoradosPorID('$tutorId')";
$result = mysqli_query($conn, $query);

if ($result) {
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'Error ejecutando la consulta: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
