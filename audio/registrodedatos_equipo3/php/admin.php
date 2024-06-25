<?php

//verifica si se ha iniciado la sesion
session_start();
if (!isset($_SESSION['admin'])) {
    header('Location: ../cradmin.html');
}

$host = "localhost";
$db   = "registro_tutorias";
$user = "root";
$pass = "";
$conexion = new mysqli($host, $user, $pass, $db);

if ($conexion->connect_error) {
    die("Connection failed: " . $conexion->connect_error);
}


$read_executed = false;
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if ($_POST['action'] == 'create') {

        $boleta = $_POST['boleta'];
        $nombre = $_POST['nombre'];
        $primerApe = $_POST['primerApe'];
        $segundoApe = $_POST['segundoApe'];
        $telefono = $_POST['telefono'];
        $semestre = $_POST['semestre'];
        $carrera = $_POST['carrera'];
        $correo = $_POST['correo'];
        $contrasena = $_POST['contrasena'];
        $tutor_preferido = $_POST['tutor_preferido'];

        //Comprueba si la boleta ya existe o el correo ya esta registrado
        $query = "SELECT * FROM alumno WHERE boleta='$boleta' OR correo_electronico='$correo'";
        $result = mysqli_query($conexion, $query);

        if ($result->num_rows > 0) {
            echo "<script>alert('La boleta o correo ya están registrados');</script>";
        } else {
            $query = "INSERT INTO alumno (boleta, nombre, primerApe, segundoApe, telefono, semestre, carrera, correo_electronico, contrasena, tutor_preferido) VALUES ('$boleta', '$nombre', '$primerApe', '$segundoApe', '$telefono', '$semestre', '$carrera', '$correo', '$contrasena', '$tutor_preferido')";
            $result = mysqli_query($conexion, $query);

            //Verifica que se haya insertado correctamente
            if (!$result){
                echo "<script>alert('Error al insertar el registro');</script>";
            }
        }

    } elseif ($_POST['action'] == 'update') {
        $boleta = $_POST['boleta'];
        $nombre = $_POST['nombre'];
        $primerApe = $_POST['primerApe'];
        $segundoApe = $_POST['segundoApe'];
        $telefono = $_POST['telefono'];
        $semestre = $_POST['semestre'];
        $carrera = $_POST['carrera'];
        $correo = $_POST['correo'];
        $contrasena = $_POST['contrasena'];
        $tutor_preferido = $_POST['tutor_preferido'];

        $query = "UPDATE alumno SET nombre='$nombre', primerApe='$primerApe', segundoApe='$segundoApe', telefono='$telefono', semestre='$semestre', carrera='$carrera', correo_electronico='$correo', contrasena='$contrasena', tutor_preferido='$tutor_preferido' WHERE boleta='$boleta'";
    
        $result = mysqli_query($conexion, $query);

        //Verifica que se haya actualizado correctamente
        if (!$result){
            echo "<script>alert('Error al actualizar el registro');</script>";
        }

    } 
    elseif ($_POST['action'] == 'delete') {
        $boleta = $_POST['boleta'];
        $query = "DELETE FROM alumno WHERE boleta='$boleta'";
        $result = mysqli_query($conexion, $query);

        //Verifica que se haya eliminado correctamente
        if (!$result){
            echo "<script>alert('Error al eliminar el registro');</script>";
        }

    }
    //read
    elseif ($_POST['action'] == 'read') {
        //verifica si se ha ingresado al menos un campo
        if ($_POST['sboleta'] == '' && $_POST['snombre'] == '' && $_POST['sprimerApe'] == '' && $_POST['ssegundoApe'] == '' && $_POST['stelefono'] == '' && $_POST['ssemestre'] == '' && $_POST['scarrera'] == '' && $_POST['scorreo_electronico'] == '' && $_POST['scontrasena'] == '' && $_POST['stutor'] == '') {
            echo "<script>alert('Ingresa al menos un campo');</script>";

        } else {
            $query = "SELECT * FROM alumno WHERE ";
            $query .= $_POST['sboleta'] != '' ? "boleta='" . $_POST['sboleta'] . "' AND " : "";
            $query .= $_POST['snombre'] != '' ? "nombre='" . $_POST['snombre'] . "' AND " : "";
            $query .= $_POST['sprimerApe'] != '' ? "primerApe='" . $_POST['sprimerApe'] . "' AND " : "";
            $query .= $_POST['ssegundoApe'] != '' ? "segundoApe='" . $_POST['ssegundoApe'] . "' AND " : "";
            $query .= $_POST['stelefono'] != '' ? "telefono='" . $_POST['stelefono'] . "' AND " : "";
            $query .= $_POST['ssemestre'] != '' ? "semestre='" . $_POST['ssemestre'] . "' AND " : "";
            $query .= $_POST['scarrera'] != '' ? "carrera='" . $_POST['scarrera'] . "' AND " : "";
            $query .= $_POST['scorreo_electronico'] != '' ? "correo_electronico='" . $_POST['scorreo_electronico'] . "' AND " : "";
            $query .= $_POST['scontrasena'] != '' ? "contrasena='" . $_POST['scontrasena'] . "' AND " : "";
            $query .= $_POST['stutor'] != '' ? "tutor_preferido='" . $_POST['stutor'] . "' AND " : "";
            $query = substr($query, 0, -5); // Elimina el último 'AND'

            $result = mysqli_query($conexion, $query);
            $read_executed = true;

        }


    }

    elseif ($_POST['action'] == 'read-all') {
        $query = "SELECT * FROM alumno;";
        $result = mysqli_query($conexion, $query);
        $read_executed = true;
    }
    elseif ($_POST['logout'] == 'true') {
        session_destroy();
        header('Location: ../cradmin.html');
    }
} 

if (!$read_executed) {
    $query = "SELECT * FROM alumno;";
    $result = mysqli_query($conexion, $query);
    //Establece que se ha ejecutado la lectura
    $read_executed = true;
}

?>

<!-- Aquí empieza el HTML -->

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light"> 
        <div class="d-flex">
            <a class="navbar-brand" href="https://www.ipn.mx/" target="_blank">
                <img src="../resources/img/logo_ipn.png" alt="IPN" style="height: 60px;" class="d-inline-block align-top">
            </a>
            <a class="navbar-brand" href="https://www.escom.ipn.mx/" target="_blank">
                <img src="../resources/img/logo_escom.png" alt="ESCOM" style="height: 60px;" class="d-inline-block align-top">
            </a>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="session_destroyIndex.php">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="session_destroyRegistro.php">Registro</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="session_destroyPDF.php">Descargar PDF</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="admin.php">Admin</a>
                </li>
                <li class="nav-item">
                    <form method="post" class="d-inline">
                        <input type="hidden" name="logout" value="true">
                        <button class="btn btn-danger" type="submit">Cerrar Sesión</button>
                    </form>
                </li>
            </ul>
            
        </div>
    </nav>

    <div class="container mt-5">
        <h1 class="mb-4">Dashboard</h1>

        <!-- Botones de acordeon para las opciones de busqueda y de creacion de nuevo registro -->
        <div class="card">
            <div class="card-header">
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <button class="btn btn-primary w-100" type="button" data-toggle="collapse" data-target="#searchForm" aria-expanded="false" aria-controls="searchForm">Buscar</button>
                        </div>
                        <div class="col-sm">
                            <button class="btn btn-primary w-100" type="button" data-toggle="collapse" data-target="#addForm" aria-expanded="false" aria-controls="addForm">Añadir</button>
                        </div>
                        <div class="col-sm">
                            <!-- Boton para mostrar todos los registros -->
                            <form method="post" class="d-inline w-100">
                                <input type="hidden" name="action" value="read-all">
                                <button class="btn btn-primary w-100" type="submit">Mostrar todos</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="collapse" id="searchForm">
                <div class="card card-body">

                <form method="post" id="formRead">
                    <input type="hidden" name="action" value="read">
                    <div class="container">
                        <div class="form-row">
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="sboleta">Boleta</label>
                                    <input type="text" class="form-control" name="sboleta" oninput="validarBoleta('sboleta')" id="sboleta">
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="snombre">Nombre</label>
                                    <input type="text" class="form-control" name="snombre" oninput="validarNombre('snombre')" id="snombre">
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="sprimerApe">Primer Apellido</label>
                                    <input type="text" class="form-control" name="sprimerApe" oninput="validarPrimerApellido('sprimer_apellido')" id="sprimer_apellido">
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="ssegundoApe">Segundo Apellido</label>
                                    <input type="text" class="form-control" name="ssegundoApe" oninput="validarSegundoApellido('ssegundo_apellido')" id="ssegundo_apellido">
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="stelefono">Teléfono</label>
                                    <input type="text" class="form-control" name="stelefono" oninput="validarTelefono('stelefono')" id="stelefono">
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="ssemestre">Semestre</label>
                                    <input type="number" class="form-control" name="ssemestre" oninput="validarSemestre('ssemestre')" id="ssemestre">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="scarrera">Carrera</label>
                            <select class="form-control" name="scarrera" oninput="validarCarrera('scarrera')" id="scarrera">
                                <option value="">Selecciona...</option>
                                <option value="Ingeniería en Sistemas Computacionales">Ingeniería en Sistemas Computacionales</option>
                                <option value="Ingeniería en Inteligencia Artificial">Ingeniería en Inteligencia Artificial</option>
                                <option value="Licenciatura en Ciencia De Datos">Licenciatura en Ciencia De Datos</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="scorreo_electronico">Correo</label>
                            <input type="email" class="form-control" name="scorreo_electronico" oninput="validarCorreo('scorreo_electronico')" id="scorreo_electronico">
                        </div>
                        <div class="form-group">
                            <label for="scontrasena">Contraseña</label>
                            <input type="password" class="form-control" name="scontrasena" oninput="validarContra('scontrasena')" id="scontrasena">
                        </div>
                        <div class="form-group">
                            <label for="stutor">Tutor Preferido</label>
                            <select class="form-control" name="stutor" oninput="validarTutor('stutor')" id="stutor">
                                <option value="">Selecciona...</option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Buscar</button>
                    </div>
                </form>
                    
                </div>
            </div>
            <div class="collapse" id="addForm">
                <div class="card card-body">

                    
                <form method="post" id="formCreate">
                    <input type="hidden" name="action" value="create">
                    <div class="container">
                        <div class="form-row">
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="boleta">Boleta</label>
                                    <input type="text" class="form-control" name="boleta" oninput="validarBoleta('boleta')" id="boleta" required>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="nombre">Nombre</label>
                                    <input type="text" class="form-control" name="nombre" oninput="validarNombre('nombre')" id="nombre" required>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="primerApe">Primer Apellido</label>
                                    <input type="text" class="form-control" name="primerApe" oninput="validarPrimerApellido('primer_apellido')" id="primer_apellido" required>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="segundoApe">Segundo Apellido</label>
                                    <input type="text" class="form-control" name="segundoApe" oninput="validarSegundoApellido('segundo_apellido')" id="segundo_apellido" required>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="telefono">Teléfono</label>
                                    <input type="text" class="form-control" name="telefono" oninput="validarTelefono('telefono')" id="telefono" required>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="semestre">Semestre</label>
                                    <input type="number" class="form-control" name="semestre" oninput="validarSemestre('semestre')" id="semestre" required>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="carrera">Carrera</label>
                            <select class="form-control" name="carrera" oninput="validarCarrera('carrera')" id="carrera" required>
                                <option value="">Selecciona...</option>
                                <option value="Ingeniería en Sistemas Computacionales">Ingeniería en Sistemas Computacionales</option>
                                <option value="Ingeniería en Inteligencia Artificial">Ingeniería en Inteligencia Artificial</option>
                                <option value="Licenciatura en Ciencia De Datos">Licenciatura en Ciencia De Datos</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="correo">Correo</label>
                            <input type="email" class="form-control" name="correo" oninput="validarCorreo('correo_electronico')" id="correo_electronico" required>
                        </div>
                        <div class="form-group">
                            <label for="contrasena">Contraseña</label>
                            <input type="password" class="form-control" name="contrasena" oninput="validarContra('contrasena')" id="contrasena" required>
                        </div>
                        <div class="form-group">
                            <label for="tutor_preferido">Tutor Preferido</label>
                            <select class="form-control" name="tutor_preferido" oninput="validarTutor('tutor')" id="tutor" required>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Crear</button>
                    </div>
                </form>

                </div>
            </div>
        </div>


        <div class="accordion" id="accordionExample">
            <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Boleta</th>
                        <th class="d-none d-md-table-cell">Correo</th>
                        <th class="d-none d-lg-table-cell">Nombre</th>
                        <th class="d-none d-lg-table-cell">Semestre</th>
                        <th class="d-none d-xl-table-cell">Carrera</th>
                        <th class="d-none d-md-table-cell">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $i = 0; while($row = $result->fetch_assoc()): $i++; ?>
                        
                        <tr>
                            <td><?php echo $row['boleta']; ?></td>
                            <td class="d-none d-md-table-cell"><?php echo $row['correo_electronico']; ?></td>
                            <td class="d-none d-lg-table-cell"><?php echo $row['nombre']; ?></td>
                            <td class="d-none d-lg-table-cell"><?php echo $row['semestre']; ?></td>
                            <td class="d-none d-xl-table-cell"><?php echo $row['carrera']; ?></td>
                            <td>
                                <form method="post" class="d-block">
                                    <input type="hidden" name="action" value="delete">
                                    <input type="hidden" name="boleta" value="<?php echo $row['boleta']; ?>">
                                    <button class="btn btn-danger btn-block" type="submit">Eliminar</button>
                                </form>
                            <button class="btn btn-warning btn-block" type="button" data-toggle="collapse" data-target="#collapse<?php echo $i; ?>" aria-expanded="false" aria-controls="collapse<?php echo $i; ?>">Actualizar</button>                            </td>
                        </tr>
                        <tr>
                            <td colspan="6">
                                <div id="collapse<?php echo $i; ?>" class="collapse" aria-labelledby="heading<?php echo $i; ?>" data-parent="#accordionExample">
                                    <div class="card card-body">
                                    
                                    <form method="post" id="<?php echo $i; ?>" class="formUpdate">
                                        <input type="hidden" name="action" value="update">
                                        <input type="hidden" name="boleta" value="<?php echo $row['boleta']; ?>">
                                        <div class="container">
                                            <div class="form-row">
                                                <div class="col-lg-4 col-md-6 col-sm-12">
                                                    <div class="form-group">
                                                        <label for="nombre">Nombre</label>
                                                        <input type="text" class="form-control" name="nombre" value="<?php echo $row['nombre']; ?>" oninput="validarNombre('<?php echo $i; ?>nombre')" id="<?php echo $i; ?>nombre" required>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6 col-sm-12">
                                                    <div class="form-group">
                                                        <label for="primerApe">Primer Apellido</label>
                                                        <input type="text" class="form-control" name="primerApe" value="<?php echo $row['primerApe']; ?>" oninput="validarPrimerApellido('<?php echo $i; ?>primer_apellido')" id="<?php echo $i; ?>primer_apellido" required>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6 col-sm-12">
                                                    <div class="form-group">
                                                        <label for="segundoApe">Segundo Apellido</label>
                                                        <input type="text" class="form-control" name="segundoApe" value="<?php echo $row['segundoApe']; ?>" oninput="validarSegundoApellido('<?php echo $i; ?>segundo_apellido')" id="<?php echo $i; ?>segundo_apellido" required>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6 col-sm-12">
                                                    <div class="form-group">
                                                        <label for="telefono">Teléfono</label>
                                                        <input type="text" class="form-control" name="telefono" value="<?php echo $row['telefono']; ?>" oninput="validarTelefono('<?php echo $i; ?>telefono')" id="<?php echo $i; ?>telefono" required>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6 col-sm-12">
                                                    <div class="form-group">
                                                        <label for="semestre">Semestre</label>
                                                        <input type="number" class="form-control" name="semestre" value="<?php echo $row['semestre']; ?>" oninput="validarSemestre('<?php echo $i; ?>semestre')" id="<?php echo $i; ?>semestre" required>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6 col-sm-12">
                                                    <div class="form-group">
                                                        <label for="carrera">Carrera</label>
                                                        <select class="form-control" name="carrera" oninput="validarCarrera('<?php echo $i; ?>carrera')" id="<?php echo $i; ?>carrera" required>
                                                            <option value="">Selecciona...</option>
                                                            <option value="Ingeniería en Sistemas Computacionales" <?php echo $row['carrera'] == 'Ingeniería en Sistemas Computacionales' ? 'selected' : ''; ?>>Ingeniería en Sistemas Computacionales</option>
                                                            <option value="Ingeniería en Inteligencia Artificial" <?php echo $row['carrera'] == 'Ingeniería en Inteligencia Artificial' ? 'selected' : ''; ?>>Ingeniería en Inteligencia Artificial</option>
                                                            <option value="Licenciatura en Ciencia De Datos" <?php echo $row['carrera'] == 'Licenciatura en Ciencia De Datos' ? 'selected' : ''; ?>>Licenciatura en Ciencia De Datos</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="correo">Correo</label>
                                                <input type="email" class="form-control" name="correo" value="<?php echo $row['correo_electronico'];?>" oninput="validarCorreo('<?php echo $i; ?>correo_electronico')" id="<?php echo $i; ?>correo_electronico" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="contrasena">Contraseña</label>
                                                <input type="password" class="form-control" name="contrasena" value="<?php echo $row['contrasena']; ?>" oninput="validarContra('<?php echo $i; ?>contrasena')" id="<?php echo $i; ?>contrasena" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="tutor_preferido">Tutor Preferido</label>
                                                <select class="form-control" name="tutor_preferido" oninput="validarTutor('<?php echo $i; ?>tutor')" id="<?php echo $i; ?>tutor" required>
                                                    <option value="hombre" <?php echo $row['tutor_preferido'] == 'hombre' ? 'selected' : ''; ?>>Hombre</option>
                                                    <option value="mujer" <?php echo $row['tutor_preferido'] == 'mujer' ? 'selected' : ''; ?>>Mujer</option>
                                                </select>
                                            </div>
                                            <button type="submit" class="btn btn-warning">Actualizar</button>
                                        </div>
                                    </form>

                                    </div>
                                </div>
                            </td>
                        </tr>
                        
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </div>

    <script src="../js/popper.min.js"></script>
    <script src="../js/jquery-3.5.1.slim.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/admin.js"></script>
</body>
</html>