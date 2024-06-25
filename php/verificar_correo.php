<?php
session_start();
header('Content-Type: application/json');

// Asegurarse de que solo los administradores puedan acceder a este script
if (!isset($_SESSION['admin'])) {
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit;
}

include 'db.php';

$correo = isset($_POST['correo']) ? $_POST['correo'] : '';
$boleta = isset($_POST['boleta']) ? $_POST['boleta'] : '';

if (empty($correo) || empty($boleta)) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

$correo = $conn->real_escape_string($correo);
$boleta = $conn->real_escape_string($boleta);

// Verificar si el correo ya existe en otro registro
$query = "SELECT * FROM alumno WHERE correo_electronico = '$correo' AND boleta != '$boleta'";
$result = mysqli_query($conn, $query);

if ($result && mysqli_num_rows($result) > 0) {
    echo json_encode(['existe' => true]);
} else {
    echo json_encode(['existe' => false]);
}

mysqli_close($conn);
?>
