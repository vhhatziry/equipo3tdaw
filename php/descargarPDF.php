<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión con la base de datos
    $conexion = new mysqli("localhost", "root", "", "registro_tutorias");
    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    }

    // Recuperar los datos enviados por POST
    $numero_boleta = $_POST['boleta'];

    // Consultar información del alumno y su tutoría asignada
    $query = "SELECT a.*, t.nombre AS tutor_nombre, tut.nombreTutoria 
              FROM alumno a
              JOIN alumno_tutor at ON a.boleta = at.boleta
              JOIN tutor t ON at.idTutor = t.idTutor
              JOIN tutor_tutoria tt ON t.idTutor = tt.idTutor
              JOIN tutoria tut ON tt.idTutoria = tut.idTutoria
              WHERE a.boleta = '$numero_boleta'";
    $result = mysqli_query($conexion, $query);

    if (mysqli_num_rows($result) == 0) {
        echo "No se encontró la boleta de usuario.";
        $conexion->close();
        exit;
    }

    $row = mysqli_fetch_assoc($result);

    require('../fpdf186/fpdf.php');
    require_once('../qrcode/qrcode.class.php'); // Asegúrate de tener esta clase QRcode
    
    // Clase extendida para incluir encabezados y pies de página
    class PDF extends FPDF {
        function Header() {
            $this->Image('../resources/img/bannerE3.png', 10, 15, 190);
            $this->Ln(70);
            $this->SetFont('Arial', 'B', 20);
            $this->Cell(0, 10, 'Registro de Datos', 0, 1, 'C');
        }

        function Footer() {
            $this->SetY(-20);
            $this->SetFont('Arial', 'I', 10);
            $this->Cell(0, 10, utf8_decode('Página ') . $this->PageNo() . ' de {nb}', 0, 0, 'C');
        }
    }

    // Crear instancia de PDF y añadir información del alumno
    $pdf = new PDF();
    $pdf->AliasNbPages();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'I', 14);
    $pdf->Ln(5);
    $pdf->Cell(0, 10, 'Datos de Registro', 0, 1, 'C');
    $pdf->Ln(5);

    // Información del registro
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

    foreach ($registro as $key => $value) {
        $pdf->SetFont('Arial','B',12); // Establece el formato en negritas
        $pdf->Cell(50,10,utf8_decode($key),1,0,'L'); // Alinea las claves a la izquierda
        $pdf->SetFont('Arial','',12); // Restaura el formato regular
        $pdf->Cell(90,10,utf8_decode($value),1,1,'C'); // Alinea los valores a la izquierda
    }

    // Generar y añadir el código QR
    $qrCode = new QRcode('https://example.com/registro/' . $registro['Boleta'], 'H');
    $qrCode->displayFPDF($pdf, 160, 135, 40, [255, 255, 255], [0, 0, 0]);

    $pdf->Output("I"); // Envia el PDF directamente al navegador
    $conexion->close();
}
?>
