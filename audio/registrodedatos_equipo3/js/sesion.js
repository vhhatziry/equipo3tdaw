//Crea una validacion de boleta, correo y contrasenia para obtener el PDF de registro

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formDescargarPDF');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        $boleta = validarBoleta('boleta');
        $correo = validarCorreo('correo_institucional');
        $contra = validarContra('contrasena');
        if ($boleta && $correo && $contra) {
            form.submit();
            window.location.href = 'index.html';
        } else {
            alert('Hay campos incorrectos');
        }
    });
});

function validarBoleta(id) {
    var boleta = document.getElementById(id).value;
    var boletaRegex = new RegExp('^[0-9]{10}$');
    if (boleta == '') {
        document.getElementById(id).style.borderColor = '#ced4da';
        document.getElementById(id).style.borderWidth = '1px';
        return false;
    }
    if (!boletaRegex.test(boleta)) {
        document.getElementById(id).style.borderColor = 'red';
        document.getElementById(id).style.borderWidth = '2px';
        return false;
    }
    document.getElementById(id).style.borderColor = 'green';
    document.getElementById(id).style.borderWidth = '2px';
    return true;
}

function validarCorreo(id) {
    var correo = document.getElementById(id).value;
    var correoRegex = new RegExp("^[a-zA-Z0-9\\.]+@alumno.ipn.mx$");
    if (correo == '') {
        document.getElementById(id).style.borderColor = '#ced4da';
        document.getElementById(id).style.borderWidth = '1px';
        return false;
    }
    if (!correoRegex.test(correo)) {
        document.getElementById(id).style.borderColor = 'red';
        document.getElementById(id).style.borderWidth = '2px';
        return false;
    }
    document.getElementById(id).style.borderColor = 'green';
    document.getElementById(id).style.borderWidth = '2px';
    return true;
}

function validarContra(id) {
    var contra = document.getElementById(id).value;
    if (contra == '') {
        document.getElementById(id).style.borderColor = 'red';
        document.getElementById(id).style.borderWidth = '2px';
        return false;
    }
    document.getElementById(id).style.borderColor = 'green';
    document.getElementById(id).style.borderWidth = '2px';
    return true;
}