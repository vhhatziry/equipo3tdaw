<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $idTutor = $_GET['idTutor'];

    require('db.php');

    $query = "SELECT genero FROM tutor WHERE idTutor = '$idTutor'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $data = mysqli_fetch_assoc($result);
        if ($data) {
            echo json_encode($data);
        } else {
            echo json_encode(["error" => "No se encontró el tutor"]);
        }
    } else {
        echo json_encode(["error" => "Error en la consulta: " . mysqli_error($conn)]);
    }

    $conn->close();
}
?>
