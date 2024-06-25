<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$database = "registro_tutorias";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $database);

// Checar la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Establecer el conjunto de caracteres a utf8 para soportar caracteres especiales
$conn->set_charset("utf8");
?>
