$(document).ready(function(){


    var logueado = localStorage.getItem("logueado");

    if(logueado=="true"){

        $("#texto_logueo").html("Usted esta logueado como:<br>"+localStorage.getItem("correo"));
        $(".subheader").show();

        $(".contenedor").prepend($("<a href='' class='botones_navegacion' id='boton_Consultar_Ubicacion'>Consultar ubicacion del vehiculo</a>"));
        $("#boton_iniciar_sesion").hide();
        $("#boton_registrarse").hide();
    }
})

function desloguear() {
    
    localStorage.removeItem("correo");
    localStorage.setItem("logueado", false);

    
    $("#boton_Consultar_Ubicacion").remove();
    $(".subheader").hide();

    $("#boton_iniciar_sesion").show();
    $("#boton_registrarse").show();


}