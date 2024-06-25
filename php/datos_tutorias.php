<?php
include 'db.php';

header('Content-Type: application/json');

$sql = "SELECT t.nombreTutoria, COUNT(at.idTutoria) AS numAlumnos
        FROM tutoria t
        LEFT JOIN alumno_tutor at ON t.idTutoria = at.idTutoria
        GROUP BY t.nombreTutoria";

$result = mysqli_query($conn, $sql);
$data = [];

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $data[] = ['nombreTutoria' => $row['nombreTutoria'], 'numAlumnos' => $row['numAlumnos']];
    }
}

echo json_encode($data);
mysqli_close($conn);
?>
