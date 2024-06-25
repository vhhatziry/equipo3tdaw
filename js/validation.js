function validarBoleta(id, helpId) {
    var boleta = document.getElementById(id).value;
    var boletaRegex = /^[0-9]{10}$/;
    return setValidationStyle(id, boletaRegex.test(boleta), helpId, "La boleta debe tener 10 dígitos.");
}

function validarNombre(id, helpId) {
    var nombre = document.getElementById(id).value;
    var nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ]+( [a-zA-ZáéíóúÁÉÍÓÚ]+)?$/;
    return setValidationStyle(id, nombreRegex.test(nombre), helpId, "El nombre no es válido.");
}

function validarPrimerApellido(id, helpId) {
    var apellido = document.getElementById(id).value;
    var apellidoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ]+( [a-zA-ZáéíóúÁÉÍÓÚ]+)?$/;
    return setValidationStyle(id, apellidoRegex.test(apellido), helpId, "El apellido no es válido.");
}

function validarSegundoApellido(id, helpId) {
    var apellido = document.getElementById(id).value;
    var apellidoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ]+( [a-zA-ZáéíóúÁÉÍÓÚ]+)?$/;
    return setValidationStyle(id, apellidoRegex.test(apellido), helpId, "El apellido no es válido.");
}

function validarTelefono(id, helpId) {
    var telefono = document.getElementById(id).value;
    var telefonoRegex = /^[0-9]{10}$/;
    return setValidationStyle(id, telefonoRegex.test(telefono), helpId, "El teléfono debe tener 10 dígitos.");
}

function validarSemestre(id, helpId) {
    var semestre = document.getElementById(id).value;
    return setValidationStyle(id, semestre >= 1 && semestre <= 10, helpId, "El semestre debe estar entre 1 y 10.");
}

function validarTipoTutor(hombreId, mujerId, helpId) {
    var hombre = document.getElementById(hombreId).checked;
    var mujer = document.getElementById(mujerId).checked;
    var valid = hombre || mujer;
    setValidationStyle(hombreId, valid, helpId, "Selecciona una preferencia de tutor.");
    setValidationStyle(mujerId, valid, helpId, "Selecciona una preferencia de tutor.");
    return valid;
}

function validarCarrera(id, helpId) {
    var carrera = document.getElementById(id).value;
    return setValidationStyle(id, carrera !== "", helpId, "Selecciona una carrera.");
}

function validarCorreo(id, helpId) {
    var correo = document.getElementById(id).value;
    var correoRegex = /^[a-zA-Z0-9\\.]+@alumno.ipn.mx$/;
    return setValidationStyle(id, correoRegex.test(correo), helpId, "El correo debe terminar con @alumno.ipn.mx.");
}

function validarContra(id, helpId) {
    var contra = document.getElementById(id).value;
    var contraRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return setValidationStyle(id, contraRegex.test(contra), helpId, "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
}

function validarTutoria(id, helpId) {
    var tutoria = document.getElementById(id).value;
    return setValidationStyle(id, tutoria !== "", helpId, "Selecciona una tutoría.");
}

function validarTutor(id, helpId) {
    var tutor = document.getElementById(id).value;
    return setValidationStyle(id, tutor !== "", helpId, "Selecciona un tutor.");
}

function setValidationStyle(elementId, valid, helpId, message) {
    var element = document.getElementById(elementId);
    var helpElement = document.getElementById(helpId);
    if (valid) {
        // Verifica si el elemento es un select
        
        element.style.borderColor = "green";
        element.style.borderWidth = "2px";
        helpElement.textContent = "";
    } else {
        element.style.borderColor = "red";
        element.style.borderWidth = "2px";
        helpElement.textContent = message;
    }
    return valid;
}

function bordeOriginal(elements) {
    elements.forEach(function(id) {
        var element = document.getElementById(id);
        element.style.borderColor = "#ced4da";
        element.style.borderWidth = "1px";
    });
    // Clear help text
    var helpElements = elements.map(function(id) {
        return id + 'Help';
    });
    helpElements.forEach(function(helpId) {
        var helpElement = document.getElementById(helpId);
        helpElement.textContent = "";
    });
}
