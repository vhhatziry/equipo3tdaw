document.addEventListener("DOMContentLoaded", function(){

    var forms = document.getElementsByClassName("formUpdate");

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

    //Obtener el formulario de creacion
    var formCreate = document.getElementById("formCreate");
    formCreate.addEventListener("submit", function(event){
        event.preventDefault();
        $boleta = validarBoleta("boleta");
        $nombre = validarNombre("nombre");
        $primer_apellido = validarPrimerApellido("primer_apellido");
        $segundo_apellido = validarSegundoApellido("segundo_apellido");
        $telefono = validarTelefono("telefono");
        $semestre = validarSemestre("semestre");
        $carrera = validarCarrera("carrera");
        $correo = validarCorreo("correo_electronico");
        $contra = validarContra("contrasena");

        if($boleta && $nombre && $primer_apellido && $segundo_apellido && $telefono && $semestre && $carrera && $correo && $contra){
            formCreate.submit();
        }
        else{
            alert("Hay campos incorrectos");
        }
    });

    //Obtener el formulario de busqueda, donde todos los id de los elementos tienen el prefijo s para search
    var formSearch = document.getElementById("formRead");
    formSearch.addEventListener("submit", function(event){
        event.preventDefault();

        //Obtener los valores de los inputs
        $boleta = document.getElementById("sboleta").value;
        $nombre = document.getElementById("snombre").value;
        $primer_apellido = document.getElementById("sprimer_apellido").value;
        $segundo_apellido = document.getElementById("ssegundo_apellido").value;
        $telefono = document.getElementById("stelefono").value;
        $semestre = document.getElementById("ssemestre").value;
        $carrera = document.getElementById("scarrera").value;
        $correo = document.getElementById("scorreo_electronico").value;
        $contra = document.getElementById("scontrasena").value;

        //Como pueden ser buscados por cualquier campo, puede haber campos vacios
        //Por lo que se deben validar los campos que no esten vacios
        //Si el campo esta vacio, se considera que es correcto
        //Si el campo no esta vacio, se valida
        $validos = true;
        if($boleta != "") $validos = $validos && validarBoleta("sboleta");
        if($nombre != "") $validos = $validos && validarNombre("snombre");
        if($primer_apellido != "") $validos = $validos && validarPrimerApellido("sprimer_apellido");
        if($segundo_apellido != "") $validos = $validos && validarSegundoApellido("ssegundo_apellido");
        if($telefono != "") $validos = $validos && validarTelefono("stelefono");
        if($semestre != "") $validos = $validos && validarSemestre("ssemestre");
        if($carrera != "") $validos = $validos && validarCarrera("scarrera");
        if($correo != "") $validos = $validos && validarCorreo("scorreo_electronico");
        if($contra != "") $validos = $validos && validarContra("scontrasena");

        if($validos){
            formSearch.submit();
        }
        else{
            alert("Hay campos incorrectos");
        }
    });
});

//funcion para que se valide el boleta cada que se cambie el texto en el input
function validarBoleta(id){
    var boleta = document.getElementById(id).value;
    var boletaRegex = new RegExp("^[0-9]{10}$");
    if(boleta == ""){
        document.getElementById(id).style.borderColor = "#ced4da";
        document.getElementById(id).style.borderWidth = "1px";
        return false;
    }
    if(boletaRegex.test(boleta)){
        document.getElementById(id).style.borderColor = "green";
        document.getElementById(id).style.borderWidth = "2px";
        return true;
    }else{
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).style.borderWidth = "2px";
        return false;
    }
}

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

