<?php
session_start();
header('Content-Type: application/json');

// Asegurarse de que solo los administradores puedan acceder a este script
if (!isset($_SESSION['admin'])) {
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit;
}

include 'db.php'; // Asegúrate de que este archivo contiene la conexión a la base de datos

// Obtener filtros de la solicitud GET
$nombre = isset($_GET['nombre']) ? $conn->real_escape_string($_GET['nombre']) : '';
$boleta = isset($_GET['boleta']) ? $conn->real_escape_string($_GET['boleta']) : '';
$tutor = isset($_GET['tutor']) ? $conn->real_escape_string($_GET['tutor']) : '';
$tutoria = isset($_GET['tutoria']) ? $conn->real_escape_string($_GET['tutoria']) : '';
$semestre = isset($_GET['semestre']) ? $conn->real_escape_string($_GET['semestre']) : '';
$carrera = isset($_GET['carrera']) ? $conn->real_escape_string($_GET['carrera']) : '';
$order = isset($_GET['order']) && in_array($_GET['order'], ['asc', 'desc']) ? $_GET['order'] : 'asc';

$sql = "SELECT a.boleta, a.nombre, a.primerApe, a.segundoApe, a.carrera, t.nombre AS nombreTutor, tu.nombreTutoria 
        FROM alumno a 
        LEFT JOIN alumno_tutor at ON a.boleta = at.boleta
        LEFT JOIN tutor t ON at.idTutor = t.idTutor
        LEFT JOIN tutoria tu ON at.idTutoria = tu.idTutoria";

$conditions = [];

if (!empty($nombre)) {
    $conditions[] = "(a.nombre LIKE '%$nombre%' OR a.primerApe LIKE '%$nombre%' OR a.segundoApe LIKE '%$nombre%')";
}
if (!empty($boleta)) {
    $conditions[] = "a.boleta LIKE '%$boleta%'";
}
if (!empty($tutor)) {
    $conditions[] = "t.idTutor = '$tutor'";
}
if (!empty($tutoria)) {
    $conditions[] = "tu.idTutoria = '$tutoria'";
}
if (!empty($semestre)) {
    $conditions[] = "a.semestre = '$semestre'";
}
if (!empty($carrera)) {
    $conditions[] = "a.carrera LIKE '%$carrera%'";
}

if (count($conditions) > 0) {
    $sql .= " WHERE " . implode(' AND ', $conditions);
}

// Aplicar orden
$sql .= " ORDER BY a.nombre $order";
//Guardar el query en un archivo d
file_put_contents('queryFilter.txt', $sql);

$result = mysqli_query($conn, $sql);

$alumnos = [];

if ($result && mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $alumnos[] = $row;
    }
    echo json_encode($alumnos);
} else {
    echo json_encode([]);
}

mysqli_close($conn);
?>
