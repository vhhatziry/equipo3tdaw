<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión con la base de datos
    $conexion = new mysqli("localhost", "root", "", "registro_tutorias");
    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    }

    // Recuperar los filtros y el ordenamiento
    $nombre = $_POST['nombre'] ?? '';
    $boleta = $_POST['boleta'] ?? '';
    $tutor = $_POST['tutor'] ?? '';
    $tutoria = $_POST['tutoria'] ?? '';
    $semestre = $_POST['semestre'] ?? '';
    $carrera = $_POST['carrera'] ?? '';
    $orden = $_POST['orden'] ?? 'asc';

    // Construir la consulta con los filtros
    $query = "SELECT a.boleta, a.nombre, t.nombre AS tutor, tut.nombreTutoria 
              FROM alumno a
              LEFT JOIN alumno_tutor at ON a.boleta = at.boleta
              LEFT JOIN tutor t ON at.idTutor = t.idTutor
              LEFT JOIN tutoria tut ON at.idTutoria = tut.idTutoria
              WHERE 1=1";

    if (!empty($nombre)) {
        $query .= " AND a.nombre LIKE '%$nombre%'";
    }
    if (!empty($boleta)) {
        $query .= " AND a.boleta LIKE '%$boleta%'";
    }
    if (!empty($tutor)) {
        $query .= " AND t.idTutor = '$tutor'";
    }
    if (!empty($tutoria)) {
        $query .= " AND tut.idTutoria = '$tutoria'";
    }
    if (!empty($semestre)) {
        $query .= " AND a.semestre = '$semestre'";
    }
    if (!empty($carrera)) {
        $query .= " AND a.carrera = '$carrera'";
    }

    $query .= " ORDER BY a.nombre $orden";

    $result = mysqli_query($conexion, $query);

    $alumnos = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $alumnos[] = $row;
    }

    echo json_encode($alumnos);
    $conexion->close();
}
?>
