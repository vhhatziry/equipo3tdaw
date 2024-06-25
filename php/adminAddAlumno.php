<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
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

    require('db.php');

    $query = "SELECT * FROM alumno WHERE boleta = '$boleta'";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(["success" => false, "message" => "Ya existe un registro con la boleta dada"]);
        exit;
    }

    $query = "SELECT * FROM alumno WHERE correo_electronico = '$correo_institucional'";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(["success" => false, "message" => "Ya existe un registro con el correo institucional dado"]);
        exit;
    }

    $query = "INSERT INTO alumno (nombre, primerApe, segundoApe, boleta, telefono, semestre, carrera, tutor_preferido, correo_electronico, contrasena) VALUES ('$nombre', '$primer_apellido', '$segundo_apellido', '$boleta', '$telefono', '$semestre', '$carrera', '$preferencia_tutor', '$correo_institucional', '$contrasena')";
    $resultado = mysqli_query($conn, $query);

    if ($resultado) {
        // Relacionar el alumno con el tutor y la tutoría
        $query = "INSERT INTO alumno_tutor (boleta, idTutor, idTutoria) VALUES ('$boleta', '$tutor', '$tutoria')";
        $resultado = mysqli_query($conn, $query);
        if ($resultado) {
            echo json_encode(["success" => true, "message" => "Registro exitoso y relación con tutor y tutoría creada"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al relacionar al alumno con el tutor y la tutoría: " . mysqli_error($conn)]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Error en el registro: " . mysqli_error($conn)]);
    }

    $conn->close();
}
?>
