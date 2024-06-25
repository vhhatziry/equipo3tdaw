<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión con la base de datos
    $conexion = new mysqli("localhost", "root", "", "registro_tutorias");
    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    }

    // Recuperar los datos enviados por GET
    $numero_boleta = $_POST['boleta'];
    $correo_institucional = $_POST["correo"];
    $contrasena = $_POST["contrasena"];

    // Primero, verificar si la boleta existe
    $queryBoleta = "SELECT * FROM alumno WHERE boleta = '$numero_boleta'";
    $resultBoleta = mysqli_query($conexion, $queryBoleta);

    if (mysqli_num_rows($resultBoleta) == 0) {
        echo "No se encontró la boleta de usuario.";
        $conexion->close();
        exit;
    }

    // Segundo, verificar si el correo corresponde a la boleta
    $queryCorreo = "SELECT * FROM alumno WHERE boleta = '$numero_boleta' AND correo_electronico = '$correo_institucional'";
    $resultCorreo = mysqli_query($conexion, $queryCorreo);

    if (mysqli_num_rows($resultCorreo) == 0) {
        echo "El correo ingresado no corresponde a la boleta proporcionada.";
        $conexion->close();
        exit;
    }

    // Tercero, verificar si la contraseña corresponde al correo y la boleta
    $queryContrasena = "SELECT * FROM alumno WHERE boleta = '$numero_boleta' AND correo_electronico = '$correo_institucional' AND contrasena = '$contrasena'";
    $resultContrasena = mysqli_query($conexion, $queryContrasena);

    if (mysqli_num_rows($resultContrasena) == 1) {
        echo "true"; // Todo coincide correctamente
    } else {
        echo "La contraseña ingresada no es correcta.";
    }
    
    $conexion->close();
    exit;
}
?>