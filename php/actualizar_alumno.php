<?php
session_start();
header('Content-Type: application/json');

// Asegurarse de que solo los administradores puedan acceder a este script
if (!isset($_SESSION['admin'])) {
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit;
}

require('db.php'); // Incluir archivo de conexión a la base de datos

$nombre = $_POST['nombre'];
$primer_apellido = $_POST['primer_apellido'];
$segundo_apellido = $_POST['segundo_apellido'];
$boleta = $_POST['boleta'];
$telefono = $_POST['telefono'];
$semestre = $_POST['semestre'];
$carrera = $_POST['carrera'];
$preferencia_tutor = $_POST['preferencia_tutor'];
$correo_institucional = $_POST['correo_institucional'];
$contrasena = $_POST['contrasena'];
$tutoria = $_POST['tutoria'];
$tutor = $_POST['tutor'];

// Actualizar los datos del alumno
$query = "UPDATE alumno SET nombre = '$nombre', primerApe = '$primer_apellido', segundoApe = '$segundo_apellido', telefono = '$telefono', semestre = '$semestre', carrera = '$carrera', tutor_preferido = '$preferencia_tutor', correo_electronico = '$correo_institucional', contrasena = '$contrasena' WHERE boleta = '$boleta'";
$result = mysqli_query($conn, $query);

if ($result) {
    // Actualizar la relación del alumno con el tutor y la tutoría
    $query = "UPDATE alumno_tutor SET idTutor = '$tutor', idTutoria = '$tutoria' WHERE boleta = '$boleta'";
    $result = mysqli_query($conn, $query);
    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Error al actualizar la relación del alumno con el tutor y la tutoría: ' . mysqli_error($conn)]);
    }
} else {
    echo json_encode(['error' => 'Error al actualizar los datos del alumno: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
