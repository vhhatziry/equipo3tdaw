<?php
session_start(); // Iniciar la sesión

// Destruir todas las variables de sesión
session_unset();
// Destruir la sesión
session_destroy();

// Redirigir a index.html
header("Location: ../sesion.html");
exit;
?>