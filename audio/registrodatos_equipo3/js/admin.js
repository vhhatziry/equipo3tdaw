document.addEventListener("DOMContentLoaded", function(){

    var forms = document.getElementsByClassName("formupdate");

    var createEventHandler = function(form, formId) {
        return function(event){
            event.preventDefault();
            $nombre = validarNombre(formId + "nombre");
            $primer_apellido = validarPrimerApellido(formId + "primer_apellido");
            $segundo_apellido = validarSegundoApellido(formId + "segundo_apellido");
            $telefono = validarTelefono(formId + "telefono");
            $semestre = validarSemestre(formId + "semestre");
            $carrera = validarCarrera(formId + "carrera");
            $correo = validarCorreo(formId + "correo_electronico");
            $contra = validarContra(formId + "contrasena");
            if($nombre && $primer_apellido && $segundo_apellido && $telefono && $semestre && $carrera && $correo && $contra){
                form.submit();
            }else{
                alert("Hay campos incorrectos");
            }
        };
    };

    for(var i = 0; i < forms.length; i++){
        var form = forms[i];
        var formId = form.id;
        form.addEventListener("submit", createEventHandler(form, formId));
    }

    var formc = document.getElementById("formcreate");
    formc.addEventListener("submit", function(event){
        event.preventDefault();

        $nombrec = validarNombre("nombre");
        $primer_apellidoc = validarPrimerApellido("primer_apellido");
        $segundo_apellidoc = validarSegundoApellido("segundo_apellido");
        $telefonoc = validarTelefono("telefono");
        $semestrec = validarSemestre("semestre");
        $carrerac = validarCarrera("carrera");
        $correoc = validarCorreo("correo_electronico");
        $contrac = validarContra("contrasena");
        if($nombrec && $primer_apellidoc && $segundo_apellidoc && $telefonoc && $semestrec && $carrerac && $correoc && $contrac){
            formc.submit();
        }
        else{
            alert("Hay campos incorrectos");
        }
    });
});

//funcion para que se valide el nombre cada que se cambie el texto en el input
function validarNombre(id){
    
    var nombre = document.getElementById(id).value;
    var nombreRegex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚ]+( [a-zA-ZáéíóúÁÉÍÓÚ]+)?$");
    if(nombre == ""){
        document.getElementById(id).style.borderColor = "#ced4da";
        document.getElementById(id).style.borderWidth = "1px";
        return false;
    }
    if(nombreRegex.test(nombre)){
        document.getElementById(id).style.borderColor = "green";
        document.getElementById(id).style.borderWidth = "2px";

        return true;
    }else{
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).style.borderWidth = "2px";
        return false;
    }
}

//funcion para que se valide el apellido cada que se cambie el texto en el input
function validarPrimerApellido(id){
    var apellido = document.getElementById(id).value;
    var apellidoRegex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚ]+( [a-zA-ZáéíóúÁÉÍÓÚ]+)?$");
    if(apellido == ""){
        document.getElementById(id).style.borderColor = "#ced4da";
        document.getElementById(id).style.borderWidth = "1px";
        return false;
    }
    if(apellidoRegex.test(apellido)){
        document.getElementById(id).style.borderColor = "green";
        document.getElementById(id).style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).style.borderWidth = "2px";
        return false;
    }
}

function validarSegundoApellido(id){
    var apellido = document.getElementById(id).value;
    var apellidoRegex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚ]+( [a-zA-ZáéíóúÁÉÍÓÚ]+)?$");
    if(apellido == ""){
        document.getElementById(id).style.borderColor = "#ced4da";
        document.getElementById(id).style.borderWidth = "1px";
        return false;
    }
    if(apellidoRegex.test(apellido)){
        document.getElementById(id).style.borderColor = "green";
        document.getElementById(id).style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).style.borderWidth = "2px";
        return false;
    }
}

function validarTelefono(id){
    var telefono = document.getElementById(id).value;
    var telefonoRegex = new RegExp("^[0-9]{10}$");
    if(telefono == ""){
        document.getElementById(id).style.borderColor = "#ced4da";
        document.getElementById(id).style.borderWidth = "1px";
        return false;
    }

    if(telefonoRegex.test(telefono)){
        document.getElementById(id).style.borderColor = "green";
        document.getElementById(id).style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).style.borderWidth = "2px";
        return false;
    }
}

//funcion que valida que el semestre este entre el 1-9
function validarSemestre(id){
    var semestre = document.getElementById(id).value;
    if(semestre == ""){
        document.getElementById(id).style.borderColor = "#ced4da";
        document.getElementById(id).style.borderWidth = "1px";
        return false;
    }

    if(semestre >= 1 && semestre <= 10){
        document.getElementById(id).style.borderColor = "green";
        document.getElementById(id).style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).style.borderWidth = "2px";
        return false;
    }
}

function validarCarrera(id){
    var carrera = document.getElementById(id).value;

    if(carrera != 0){
        document.getElementById(id).style.borderColor = "green";
        document.getElementById(id).style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).style.borderWidth = "2px";
        return false;
    }
}

//El correo debe terminar con @alumno.ipn.mx
function validarCorreo(id){
    var correo = document.getElementById(id).value;
    var correoRegex = new RegExp("^[a-zA-Z0-9\\.]+@alumno.ipn.mx$");
    if(correo == ""){
        document.getElementById(id).style.borderColor = "#ced4da";
        document.getElementById(id).style.borderWidth = "1px";
        return false;
    }
    if(correoRegex.test(correo)){
        document.getElementById(id).style.borderColor = "green";
        document.getElementById(id).style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).style.borderWidth = "2px";
        return false;
    }
}
//Verifica que la contrasenia no este vacia
function validarContra(id){
    var contra = document.getElementById(id).value;
    if(contra.length == 0){
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).style.borderWidth = "1px";
        return false;
    }
    document.getElementById(id).style.borderColor = "green";
    document.getElementById(id).style.borderWidth = "2px";
    return true;
}


function bordeOriginal(id){
    document.getElementById(id + "boleta").style.borderColor = "#ced4da";
    document.getElementById(id + "boleta").style.borderWidth = "1px";
    document.getElementById(id + "nombre").style.borderColor = "#ced4da";
    document.getElementById(id + "nombre").style.borderWidth = "1px";
    document.getElementById(id + "primer_apellido").style.borderColor = "#ced4da";
    document.getElementById(id + "primer_apellido").style.borderWidth = "1px";
    document.getElementById(id + "segundo_apellido").style.borderColor = "#ced4da";
    document.getElementById(id + "segundo_apellido").style.borderWidth = "1px";
    document.getElementById(id + "telefono").style.borderColor = "#ced4da";
    document.getElementById(id + "telefono").style.borderWidth = "1px";
    document.getElementById(id + "semestre").style.borderColor = "#ced4da";
    document.getElementById(id + "semestre").style.borderWidth = "1px";
    document.getElementById(id + "hombre-div").style.borderColor = "#ced4da";
    document.getElementById(id + "hombre-div").style.borderWidth = "1px";
    document.getElementById(id + "mujer-div").style.borderColor = "#ced4da";
    document.getElementById(id + "mujer-div").style.borderWidth = "1px";
    document.getElementById(id + "carrera").style.borderColor = "#ced4da";
    document.getElementById(id + "carrera").style.borderWidth = "1px";
    document.getElementById(id + "correo_institucional").style.borderColor = "#ced4da";
    document.getElementById(id + "correo_institucional").style.borderWidth = "1px";
}

$('#searchForm').on('show.bs.collapse', function () {
    $('#addForm').collapse('hide');
});

$('#addForm').on('show.bs.collapse', function () {
    $('#searchForm').collapse('hide');
});
