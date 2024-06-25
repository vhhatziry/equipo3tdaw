<?php
session_start();
header('Content-Type: application/json');

include 'db.php';

// Asumiendo que recibimos 'boleta' o 'correo' como parámetros GET
$boleta = isset($_GET['boleta']) ? $_GET['boleta'] : null;
$correo = isset($_GET['correo']) ? $_GET['correo'] : null;

$response = ['boletaExists' => false, 'correoExists' => false];

if ($boleta) {
    $stmt = mysqli_prepare($conn, "SELECT boleta FROM alumno WHERE boleta = ?");
    mysqli_stmt_bind_param($stmt, "s", $boleta);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    if (mysqli_num_rows($result) > 0) {
        $response['boletaExists'] = true;
    }
    mysqli_stmt_close($stmt);
}

if ($correo) {
    $stmt = mysqli_prepare($conn, "SELECT correo_electronico FROM alumno WHERE correo_electronico = ?");
    mysqli_stmt_bind_param($stmt, "s", $correo);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    if (mysqli_num_rows($result) > 0) {
        $response['correoExists'] = true;
    }
    mysqli_stmt_close($stmt);
}

echo json_encode($response);

mysqli_close($conn);
?>
