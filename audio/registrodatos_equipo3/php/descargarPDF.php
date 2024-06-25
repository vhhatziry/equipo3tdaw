<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recuperar los datos del formulario
    $numero_boleta = $_POST['boleta'];
    $correo_institucional = $_POST["correo_institucional"];
    $contrasena = $_POST["contrasena"];

    // Crear un objeto de conexión a la base de datos
    $conexion = new mysqli("localhost", "root", "", "registro_tutorias");

    // Verificar la conexión
    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    }

    // Crear una consulta para verificar si el usuario existe
    $query = "SELECT * FROM alumno WHERE boleta = '$numero_boleta' AND correo_electronico = '$correo_institucional' AND contrasena = '$contrasena'";
    $result = mysqli_query($conexion, $query);

    // Si el usuario no existe, mostrar un mensaje de error
    if (mysqli_num_rows($result) == 0) {
        echo "No se encontró un usuario con los datos proporcionados";
        exit;
    }

    require('../fpdf186/fpdf.php');
    require_once('../qrcode/qrcode.class.php');

    class PDF extends FPDF{
        //Cabecera de mi documento
        function header(){
            //Agregamos un banner, imagen o logo
            //Hacemos referencia al mismo objeto
            $this->Image('../resources/img/bannerE3.png',10,15,190);
            $this->Ln(70);
            $this->SetFont('Arial','B',20);
            $this->Cell(0,10,'Registro de Datos',0,1,'C');
        }
        
        function footer(){
            $this->SetY(-20);
            $this->SetFont('Arial','I',10);
            $this->Cell(0,10,utf8_decode('Página ').$this->PageNo().' de {nb}',0,0,'C');
        }

    }

    // Crear una consulta para obtener los datos del usuario
    $query = "SELECT * FROM alumno WHERE boleta = '$numero_boleta'";
    $result = mysqli_query($conexion, $query);

    // Obtener los datos del usuario
    $row = mysqli_fetch_assoc($result);
    $boleta = $row['boleta'];
    $nombre = $row['nombre'];
    $primer_apellido = $row['primerApe'];
    $segundo_apellido = $row['segundoApe'];
    $telefono = $row['telefono'];
    $semestre = $row['semestre'];
    $carrera = $row['carrera'];
    $preferencia_tutor = $row['tutor_preferido'];
    $correo_institucional = $row['correo_electronico'];
    $contrasena = $row['contrasena'];


    $registro = array(
        'Nombre' => $nombre,
        'Primer Apellido' => $primer_apellido,
        'Segundo Apellido' => $segundo_apellido,
        'Boleta' => $boleta,
        'Telefono' => $telefono,
        'Semestre' => $semestre,
        'Carrera' => $carrera,
        'Preferencia Tutor' => $preferencia_tutor,
        'Correo Institucional' => $correo_institucional,
        'Contraseña' => $contrasena
    );

    // Crear un objeto de la clase PDF
    $pdf = new PDF();
    $pdf->AliasNbPages();
    $pdf->AddPage();
    $pdf->SetFont('Arial','I',14);
    
    $pdf->Ln(5);
    $pdf->Cell(0,10,'Datos de Registro',0,1,'C');
    $pdf->Ln(5);
    foreach($registro as $key => $value){
        $pdf->SetFont('Arial','B',12); // Establece el formato en negritas
        $pdf->Cell(50,10,utf8_decode($key),1,0,'L'); // Alinea las claves a la izquierda
        $pdf->SetFont('Arial','',12); // Restaura el formato regular
        $pdf->Cell(90,10,utf8_decode($value),1,1,'C'); // Alinea los valores a la izquierda
    }

    $qrCode = new QRcode('https://example.com/registro/'.$registro['Boleta'], 'H');
    $qrCode->displayFPDF($pdf, 160, 135, 40, [255, 255, 255], [0, 0, 0]);

    $pdf->Output();
}

?>
