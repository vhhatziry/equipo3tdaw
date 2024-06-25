<?php

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

    require('../fpdf186/fpdf.php');
    require_once('../qrcode/qrcode.class.php');
    require('db.php');

    class PDF extends FPDF {
        function header() {
            $this->Image('../resources/img/bannerE3.png', 10, 15, 190);
            $this->Ln(70);
            $this->SetFont('Arial', 'B', 20);
            $this->Cell(0, 10, 'Registro de Datos', 0, 1, 'C');
        }

        function footer() {
            $this->SetY(-20);
            $this->SetFont('Arial', 'I', 10);
            $this->Cell(0, 10, utf8_decode('Página ') . $this->PageNo() . ' de {nb}', 0, 0, 'C');
        }
    }

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $conn->set_charset("utf8");

    // Verificar si ya existe un alumno con la misma boleta o correo
    $query = "SELECT * FROM alumno WHERE boleta = '$boleta' OR correo_electronico = '$correo_institucional'";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(["success" => false, "message" => "Ya existe un registro con la boleta o correo institucional dados"]);
        exit;
    }

    // Insertar el alumno
    $query = "INSERT INTO alumno (nombre, primerApe, segundoApe, boleta, telefono, semestre, carrera, tutor_preferido, correo_electronico, contrasena) 
              VALUES ('$nombre', '$primer_apellido', '$segundo_apellido', '$boleta', '$telefono', '$semestre', '$carrera', '$preferencia_tutor', '$correo_institucional', '$contrasena')";
    $resultado = mysqli_query($conn, $query);

    if ($resultado) {
        // Relacionar el alumno con el tutor y la tutoría
        $query = "INSERT INTO alumno_tutor (boleta, idTutor, idTutoria) VALUES ('$boleta', '$tutor', '$tutoria')";
        $resultado = mysqli_query($conn, $query);

        if ($resultado) {
            // Obtener los nombres del tutor y la tutoría
            $query = "SELECT a.*, t.nombre AS tutor_nombre, tut.nombreTutoria 
                      FROM alumno a
                      JOIN alumno_tutor at ON a.boleta = at.boleta
                      JOIN tutor t ON at.idTutor = t.idTutor
                      JOIN tutoria tut ON at.idTutoria = tut.idTutoria
                      WHERE a.boleta = '$boleta'";
            $result = mysqli_query($conn, $query);
            $row = mysqli_fetch_assoc($result);

            $registro = array(
                'Nombre' => $row['nombre'],
                'Primer Apellido' => $row['primerApe'],
                'Segundo Apellido' => $row['segundoApe'],
                'Boleta' => $row['boleta'],
                'Telefono' => $row['telefono'],
                'Semestre' => $row['semestre'],
                'Carrera' => $row['carrera'],
                'Preferencia Tutor' => $row['tutor_preferido'],
                'Correo Institucional' => $row['correo_electronico'],
                'Contraseña' => $row['contrasena'],
                'Tutoria' => $row['nombreTutoria'],
                'Tutor' => $row['tutor_nombre']
            );

            $pdf = new PDF();
            $pdf->AliasNbPages();
            $pdf->AddPage();
            
            $pdf->SetFont('Arial','I',14);
            $pdf->Ln(5);
            $pdf->Cell(0,10,'Datos de Registro',0,1,'C');
            $pdf->Ln(5);
            foreach($registro as $key => $value) {
                $pdf->SetFont('Arial','B',12); // Establece el formato en negritas
                $pdf->Cell(50,10,utf8_decode($key),1,0,'L'); // Alinea las claves a la izquierda
                $pdf->SetFont('Arial','',12); // Restaura el formato regular
                $pdf->Cell(90,10,utf8_decode($value),1,1,'C'); // Alinea los valores a la izquierda
            }

            $qrCode = new QRcode('https://example.com/registro/'.$registro['Boleta'], 'H');
            $qrCode->displayFPDF($pdf, 160, 135, 40, [255, 255, 255], [0, 0, 0]);

            $pdf->Output();
        } else {
            echo json_encode(["success" => false, "message" => "Error al relacionar al alumno con el tutor y la tutoría: " . mysqli_error($conn). " " . $tutoria]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Error en el registro: " . mysqli_error($conn)]);
    }

    $conn->close();
}
?>
