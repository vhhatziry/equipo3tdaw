<?php
session_start();
session_destroy(); // Destruir todas las sesiones activas
echo json_encode(['success' => true, 'message' => 'Sesión cerrada exitosamente.']);
?>
