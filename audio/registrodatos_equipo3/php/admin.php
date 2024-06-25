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

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if ($_POST['action'] == 'create') {
        $query = "INSERT INTO alumno (boleta, nombre, ...) VALUES ('$boleta', '$nombre', ...)";
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
        } 
    elseif ($_POST['action'] == 'delete') {
        $boleta = $_POST['boleta'];
        $query = "DELETE FROM alumno WHERE boleta='$boleta'";
    }

    if (!$conexion->query($query) === TRUE) {
        echo "Error: " . $query . "<br>" . $conexion->error;
    }

    //Si se sale de la pestana de admin, se cierra la sesion
}



$result = $conexion->query("SELECT * FROM alumno");

if (isset($_POST['logout'])) {
    session_destroy();
    header('Location: ../index.html');
}
?>

<!-- Aquí empieza el HTML -->

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="https://www.escom.ipn.mx/" target="_blank">
            <img src="../resources/img/logo_escom.png" alt="ESCOM" height="30" class="d-inline-block align-top">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="../index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../registro.html">Registro</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../sesion.html">Descargar PDF</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#">Admin</a>
                </li>
            </ul>
        </div>
    </nav>


    <div class="container mt-5">
        <h1 class="mb-4">Dashboard</h1>

        <!-- Botones de acordeon para las opciones de busqueda y de creacion de nuevo registro -->
        <div class="card">
            <div class="card-header">
                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#searchForm" aria-expanded="false" aria-controls="searchForm">Buscar</button>
                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#addForm" aria-expanded="false" aria-controls="addForm">Añadir</button>
            </div>
            <div class="collapse" id="searchForm">
                <div class="card card-body">
                    
                </div>
            </div>
            <div class="collapse" id="addForm">
                <div class="card card-body">
                    
                <form method="post" class="formcreate">
                    <input type="hidden" name="action" value="create">
                    <div class="container">
                        <div class="form-row">
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
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="carrera">Carrera</label>
                                    <select class="form-control" name="carrera" oninput="validarCarrera('carrera')" id="carrera" required>
                                        <option value="">Selecciona...</option>
                                        <option value="Ingeniería en Sistemas Computacionales">Ingeniería en Sistemas Computacionales</option>
                                        <option value="Ingeniería en Inteligencia Artificial">Ingeniería en Inteligencia Artificial</option>
                                        <option value="Licenciatura en Ciencia De Datos">Licenciatura en Ciencia De Datos</option>
                                    </select>
                                </div>
                            </div>
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


        <div class="accordion">
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
                                    
                                    <form method="post" id="<?php echo $i; ?>" class="formupdate">
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
                                                            <option value="Ingeniería en Sistemas Computacionales" <?php echo $row['carrera'] == 'Ingeniería en Sistemas Computacionales' ? 1 : 0; ?>>Ingeniería en Sistemas Computacionales</option>
                                                            <option value="Ingeniería en Inteligencia Artificial" <?php echo $row['carrera'] == 'Ingeniería en Inteligencia Artificial' ? 2 : 0; ?>>Ingeniería en Inteligencia Artificial</option>
                                                            <option value="Licenciatura en Ciencia De Datos" <?php echo $row['carrera'] == 'Licenciatura en Ciencia De Datos' ? 3 : 0; ?>>Licenciatura en Ciencia De Datos</option>
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