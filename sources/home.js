$(document).ready(function(){


    var logueado = localStorage.getItem("logueado");

    if(logueado=="true"){

        $("#texto_logueo").html("Usted esta logueado como:<br>"+localStorage.getItem("correo"));
        $(".subheader").show();

        $("#boton_ubicacion").show();
        $("#boton_iniciar_sesion").hide();
        $("#boton_registrarse").hide();
    }
})

function desloguear() {
    
    localStorage.removeItem("correo");
    localStorage.setItem("logueado", false);

    
    $("#boton_ubicacion").remove();
    $(".subheader").hide();

    $("#boton_iniciar_sesion").show();
    $("#boton_registrarse").show();


}


function consultarEstacionamiento() {
    localStorage.setItem("Mapa", "estacionamientos");
}

function consultarComercios() {
    localStorage.setItem("Mapa", "comercios");
}

function consultarUbicacion() {
    localStorage.setItem("Mapa","ubicacion");
}