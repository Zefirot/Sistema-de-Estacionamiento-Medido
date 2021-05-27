function loguear() {

    //Se guardan los datos obtenidos
    var correo = $("#input_correo").val();
    localStorage.setItem("correo", correo);
    localStorage.setItem("logueado",true);
   
    //Se limpian los imputs
    $("#input_correo").val("");
    $("#input_password").val("");

    //Se oculta/muestan las secciones de interes
    $("#sec_login").hide();
    $("#sec_loginExitoso").show();

    //El boton de home de vuelve invisible para evitar problemas con el "display none" y la posicion de los items
    $(".boton_home").css("visibility","hidden");
    $(".boton_home").css("transition-duration","0s");
   

    actualizar();
}

function desloguear(){
    //Se setean por default los datos para asi estar preparado para otro login
    localStorage.removeItem("correo");
    localStorage.setItem("logueado",false);

    $("#sec_login").show();
    $("#sec_loginExitoso").hide();

    $(".boton_home").css("visibility","visible");
    $(".boton_home").css("transition-duration","0s");

    actualizar();
}

function actualizar() {

    var logueado = localStorage.getItem("logueado");

    if(logueado=="true"){
        $(".subheader").show();
        $("#texto_logueo").html("Usted esta logueado como:<br>"+localStorage.getItem("correo"));
    }else{
        $(".subheader").hide();
    }


}