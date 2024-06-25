document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("registroForm");
    //limpiar todos los campos al cargar la pagina
    form.reset();
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar envío automático del formulario
        
        // Validación de campos
        var boleta = validarBoleta();
        var nombre = validarNombre();
        var primer_apellido = validarPrimerApellido();
        var segundo_apellido = validarSegundoApellido();
        var telefono = validarTelefono();
        var semestre = validarSemestre();
        var tipo_tutor = validarTipoTutor();
        var carrera = validarCarrera();
        var correo = validarCorreo();
        var contra = validarContra();

        if (boleta && nombre && primer_apellido && segundo_apellido && telefono && semestre && tipo_tutor && carrera && correo && contra) {
            form.submit();
            window.location.href = "index.html";
        }
        else {
            alert("Favor de llenar todos los campos correctamente");
        }
    });
});


//funcion para que valide la boleta cada que se cambie el texto en el input
function validarBoleta(){
    var boleta = document.getElementById("boleta").value;
    var boletaRegex = new RegExp("^[0-9]{10}$");
    if(boleta == ""){
        document.getElementById("boleta").style.borderColor = "#ced4da";
        document.getElementById("boleta").style.borderWidth = "1px";
        return false;
    }
    if(boletaRegex.test(boleta)){
        document.getElementById("boleta").style.borderColor = "green";
        document.getElementById("boleta").style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById("boleta").style.borderColor = "red";
        document.getElementById("boleta").style.borderWidth = "2px";
        return false;
    }
}

//funcion para que se valide el nombre cada que se cambie el texto en el input
function validarNombre(){
    var nombre = document.getElementById("nombre").value;
    var nombreRegex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚ]+( [a-zA-ZáéíóúÁÉÍÓÚ]+)?$");
    if(nombre == ""){
        document.getElementById("nombre").style.borderColor = "#ced4da";
        document.getElementById("nombre").style.borderWidth = "1px";
        return false;
    }
    if(nombreRegex.test(nombre)){
        document.getElementById("nombre").style.borderColor = "green";
        document.getElementById("nombre").style.borderWidth = "2px";

        return true;
    }else{
        document.getElementById("nombre").style.borderColor = "red";
        document.getElementById("nombre").style.borderWidth = "2px";
        return false;
    }
}

//funcion para que se valide el apellido cada que se cambie el texto en el input
function validarPrimerApellido(){
    var apellido = document.getElementById("primer_apellido").value;
    var apellidoRegex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚ]+( [a-zA-ZáéíóúÁÉÍÓÚ]+)?$");
    if(apellido == ""){
        document.getElementById("primer_apellido").style.borderColor = "#ced4da";
        document.getElementById("primer_apellido").style.borderWidth = "1px";
        return false;
    }
    if(apellidoRegex.test(apellido)){
        document.getElementById("primer_apellido").style.borderColor = "green";
        document.getElementById("primer_apellido").style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById("primer_apellido").style.borderColor = "red";
        document.getElementById("primer_apellido").style.borderWidth = "2px";
        return false;
    }
}

function validarSegundoApellido(){
    var apellido = document.getElementById("segundo_apellido").value;
    var apellidoRegex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚ]+( [a-zA-ZáéíóúÁÉÍÓÚ]+)?$");
    if(apellido == ""){
        document.getElementById("segundo_apellido").style.borderColor = "#ced4da";
        document.getElementById("segundo_apellido").style.borderWidth = "1px";
        return false;
    }
    if(apellidoRegex.test(apellido)){
        document.getElementById("segundo_apellido").style.borderColor = "green";
        document.getElementById("segundo_apellido").style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById("segundo_apellido").style.borderColor = "red";
        document.getElementById("segundo_apellido").style.borderWidth = "2px";
        return false;
    }
}

function validarTelefono(){
    var telefono = document.getElementById("telefono").value;
    var telefonoRegex = new RegExp("^[0-9]{10}$");
    if(telefono == ""){
        document.getElementById("telefono").style.borderColor = "#ced4da";
        document.getElementById("telefono").style.borderWidth = "1px";
        return false;
    }

    if(telefonoRegex.test(telefono)){
        document.getElementById("telefono").style.borderColor = "green";
        document.getElementById("telefono").style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById("telefono").style.borderColor = "red";
        document.getElementById("telefono").style.borderWidth = "2px";
        return false;
    }
}

//funcion que valida que el semestre este entre el 1-9
function validarSemestre(){
    var semestre = document.getElementById("semestre").value;
    if(semestre == ""){
        document.getElementById("semestre").style.borderColor = "#ced4da";
        document.getElementById("semestre").style.borderWidth = "1px";
        return false;
    }

    if(semestre >= 1 && semestre <= 10){
        document.getElementById("semestre").style.borderColor = "green";
        document.getElementById("semestre").style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById("semestre").style.borderColor = "red";
        document.getElementById("semestre").style.borderWidth = "2px";
        return false;
    }
}

//Valida que este seleccionado alguno de los radio buttons de tutor hombre o mujer
function validarTipoTutor() {
    var hombre = document.getElementById("hombre");
    var mujer = document.getElementById("mujer");
    var hombreChecked = hombre.checked;
    var mujerChecked = mujer.checked;
1
    if (hombreChecked || mujerChecked) {
        document.getElementById("hombre-div").style.borderColor = "green";
        document.getElementById("hombre-div").style.borderWidth = "2px";
        document.getElementById("mujer-div").style.borderColor = "green";
        document.getElementById("mujer-div").style.borderWidth = "2px";
        return true;
    } else {
        document.getElementById("hombre-div").style.borderColor = "red";
        document.getElementById("hombre-div").style.borderWidth = "2px";
        document.getElementById("mujer-div").style.borderColor = "red";
        document.getElementById("mujer-div").style.borderWidth = "2px";
        return false;
    }
}

//Valida que se haya seleccionado una carrera
function validarCarrera(){
    var carrera = document.getElementById("carrera").value;

    if(carrera != 0){
        document.getElementById("carrera").style.borderColor = "green";
        document.getElementById("carrera").style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById("carrera").style.borderColor = "red";
        document.getElementById("carrera").style.borderWidth = "2px";
        return false;
    }
}

//El correo debe terminar con @alumno.ipn.mx
function validarCorreo(){
    var correo = document.getElementById("correo_institucional").value;
    var correoRegex = new RegExp("^[a-zA-Z0-9\\.]+@alumno.ipn.mx$");
    if(correo == ""){
        document.getElementById("correo_institucional").style.borderColor = "#ced4da";
        document.getElementById("correo_institucional").style.borderWidth = "1px";
        return false;
    }
    if(correoRegex.test(correo)){
        document.getElementById("correo_institucional").style.borderColor = "green";
        document.getElementById("correo_institucional").style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById("correo_institucional").style.borderColor = "red";
        document.getElementById("correo_institucional").style.borderWidth = "2px";
        return false;
    }
}
//Verifica que la contrasenia no este vacia
function validarContra(){
    var contra = document.getElementById("contrasena").value;
    if(contra == ""){
        document.getElementById("contra").style.borderColor = "#ced4da";
        document.getElementById("contra").style.borderWidth = "1px";
        return false;
    }
    document.getElementById("contra").style.borderColor = "green";
    document.getElementById("contra").style.borderWidth = "2px";
    return true;
}


function bordeOriginal(){
    document.getElementById("boleta").style.borderColor = "#ced4da";
    document.getElementById("boleta").style.borderWidth = "1px";
    document.getElementById("nombre").style.borderColor = "#ced4da";
    document.getElementById("nombre").style.borderWidth = "1px";
    document.getElementById("primer_apellido").style.borderColor = "#ced4da";
    document.getElementById("primer_apellido").style.borderWidth = "1px";
    document.getElementById("segundo_apellido").style.borderColor = "#ced4da";
    document.getElementById("segundo_apellido").style.borderWidth = "1px";
    document.getElementById("telefono").style.borderColor = "#ced4da";
    document.getElementById("telefono").style.borderWidth = "1px";
    document.getElementById("semestre").style.borderColor = "#ced4da";
    document.getElementById("semestre").style.borderWidth = "1px";
    document.getElementById("hombre-div").style.borderColor = "#ced4da";
    document.getElementById("hombre-div").style.borderWidth = "1px";
    document.getElementById("mujer-div").style.borderColor = "#ced4da";
    document.getElementById("mujer-div").style.borderWidth = "1px";
    document.getElementById("carrera").style.borderColor = "#ced4da";
    document.getElementById("carrera").style.borderWidth = "1px";
    document.getElementById("correo_institucional").style.borderColor = "#ced4da";
    document.getElementById("correo_institucional").style.borderWidth = "1px";
}

let element = document.getElementById('someElementId');
if (element) {
    element.reset();
} else {
    console.log('El elemento no existe!');
}