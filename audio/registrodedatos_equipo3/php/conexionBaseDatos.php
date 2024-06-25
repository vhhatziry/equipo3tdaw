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

        $contenido = "Nombre: $nombre\n Primer Apellido: $primer_apellido\n Segundo Apellido: $segundo_apellido\n Boleta: $boleta\n Telefono: $telefono\n Semestre: $semestre\n Carrera: $carrera\n Preferencia Tutor: $preferencia_tutor\n Correo Institucional: $correo_institucional\n Contraseña: $contrasena\n";
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

        $conexion = new mysqli("localhost","root","","registro_tutorias");

        if ($conexion->connect_error) {
            die("Conexión fallida: " . $conexion->connect_error);
        }

        $query = "SELECT * FROM alumno WHERE boleta = '$boleta'";
        $result = mysqli_query($conexion, $query);
        //Si existe ya un registro con la boleta dada
        if (mysqli_num_rows($result) > 0) {
            echo "Ya existe un registro con la boleta dada";
            exit;
        }

        $query = "SELECT * FROM alumno WHERE correo_electronico = '$correo_institucional'";
        $result = mysqli_query($conexion, $query);
        //Si existe ya un registro con el correo institucional dado
        if (mysqli_num_rows($result) > 0) {
            echo "Ya existe un registro con el correo institucional dado";
            exit;
        }

        $query = "INSERT INTO alumno (nombre, primerApe, segundoApe, boleta, telefono, semestre, carrera, tutor_preferido, correo_electronico, contrasena) VALUES ('$nombre', '$primer_apellido', '$segundo_apellido', '$boleta', '$telefono', '$semestre', '$carrera', '$preferencia_tutor', '$correo_institucional', '$contrasena')";
        $resultado = mysqli_query($conexion, $query);

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
        

        $pdf = new PDF();
        $pdf->AliasNbPages();
        $pdf ->AddPage();
        
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