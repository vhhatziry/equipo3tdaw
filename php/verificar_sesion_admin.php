<?php
session_start();

if (isset($_SESSION['admin'])) {
  echo "true"; // Sesión activa
} else {
  echo "false"; // Sesión inactiva
}
?>
