<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['adminUsername'];
    $password = $_POST['adminPassword'];

    $conexion = new mysqli("localhost", "root", "", "registro_tutorias");

    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    }

    $query = "SELECT * FROM admin WHERE username = '$username'";
    $result = mysqli_query($conexion, $query);

    if (mysqli_num_rows($result) == 0) {
        echo "No se encontró el usuario.";
        exit;
    }

    $row = mysqli_fetch_assoc($result);

    if ($row['password'] !== $password) {
        echo "La contraseña es incorrecta.";
        exit;
    }

    $_SESSION['admin'] = $username;  // Establecer la sesión
    echo "true";
    exit;
}
?>
