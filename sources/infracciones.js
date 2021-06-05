
let infraccion_id = document.querySelector('#infraccion_id');
let infraccion_monto = document.querySelector('#monto');
let infraccion_direccion = document.querySelector('#direccion');
let infraccion_fecha_hora = document.querySelector('#fecha_y_hora');
let api = 'https://infraccionesweb.herokuapp.com/api/'


/*
    Devolver:
    direccionRegistrada
    fechaHoraActualizacion
    fechaHoraRegistro
    id
    montoAPagar
    tipoInfraccion

    existeAcarreo -> Nos va a servir para cuando el chabon pregunte por una infraccion con o sin acarreo y
    handlear los errores
*/

function consultarInfraciones(){
    let patente = document.getElementById('patente').value;
    let url = api + patente + '/infracciones';
    //deshabilitar_btn_consultar();
    if(patente != ""){
        axios.get(url).then(
             function(response){
                let listaInfracciones = response.data.infracciones;
                if(listaInfracciones.length > 0){
                    $("#cabecera_tabla").show();
                    for(let i = 0; i < listaInfracciones.length; i++){
                        let infraccion = listaInfracciones[i];
                        dibujarDatos(infraccion);
                    }
                    $("#cerrar_consulta").show();        
                }else{
                    
                }
            }
        );
    }else{
        alert("Debe ingresar una patente");
        document.getElementById("patente").focus();
    }
    //habilitar_btn_consultar();
}

function dibujarDatos(infraccion){
    /*let tipoInfraccion = function(){

    }*/

    $("#datos").prepend($(
        "<tr>" +
            "<th scope='row'>" + infraccion.id + "</th>" +
            "<td>" + infraccion.montoAPagar + "</td>" +
            "<td>" + infraccion.direccionRegistrada + "</td>" +
            "<td>" + infraccion.fechaHoraRegistro + "</td>" +
            "<td>" +
                "<button class='btn btn-success' style='display: none;' id='btn_consultar_ubicacion' type='submit'>Ubicación del Vehículo</button>" +
            "</td>" +
        "</tr>"));
    if(infraccion.existeAcarreo){
        $("#btn_consultar_ubicacion").show();
    }
}

function borrar_tabla(){
    $("#cabecera_tabla").hide();
    $("#datos tr").remove(); 
    $("#cerrar_consulta").hide(); 
}