<?php
    // sesion.php
    session_start();

    // Conexión a la base de datos
    $conexion = new mysqli("localhost","root","","registro_tutorias");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['adminUsername'];
        $password = $_POST['adminPassword'];

        echo "Username: $username\n";
        echo "Password: $password\n";
        // Consulta para buscar al usuario en la base de datos
        $query = "SELECT * FROM admin WHERE username = '$username' AND password = '$password'";
        $result = mysqli_query($conexion, $query);

        // Verificar si se encontró al usuario
        if (mysqli_num_rows($result) > 0) {
            // Iniciar la sesión
            $_SESSION['admin'] = $username;
            header("Location: ../php/admin.php"); // Redirigir al dashboard
        } else {
            // Si las credenciales son incorrectas, redirigir al formulario de inicio de sesión
            header("Location: ../cradmin.html");
            exit;
        }
    }
?>