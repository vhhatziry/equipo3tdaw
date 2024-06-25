<?php
session_start();
header('Content-Type: application/json');

// Asegurarse de que solo los administradores puedan acceder a este script
if (!isset($_SESSION['admin'])) {
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit;
}

include 'db.php'; 

$boleta = isset($_POST['boleta']) ? $_POST['boleta'] : '';

if (empty($boleta)) {
    echo json_encode(['error' => 'ID de boleta no proporcionado']);
    exit;
}

// Escapar el ID de la boleta para prevenir inyección SQL
$boleta = $conn->real_escape_string($boleta);

// Preparar y ejecutar la consulta para eliminar el alumno
$query = "DELETE FROM alumno WHERE boleta = '$boleta'";
$result = mysqli_query($conn, $query);

if ($result) {
    // Eliminar la relación del alumno con tutor y tutoria
    $query = "DELETE FROM alumno_tutor WHERE boleta = '$boleta'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Alumno eliminado correctamente.']);
    } else {
        echo json_encode(['error' => 'Error eliminando la relación del alumno: ' . mysqli_error($conn)]);
    }
} else {
    echo json_encode(['error' => 'Error eliminando el alumno: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
