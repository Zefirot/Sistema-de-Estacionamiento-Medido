let api = 'https://infraccionesweb.herokuapp.com/api/';

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
                    alert("No hay infracciones asociadas a esa patente");
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
    consultar_tipo_infraccion(infraccion);
    $("#datos").prepend($(
        "<tr>" +
            "<th scope='row'>" + infraccion.id + "</th>" +
            "<td>" + infraccion.montoAPagar + "</td>" +
            "<td>" + infraccion.direccionRegistrada + "</td>" +
            "<td>" + infraccion.fechaHoraRegistro + "</td>" +
            "<td>" + localStorage.getItem("tipoInfraccion") + "</td>" +
            "<td>" +
                "<button class='btn btn-success' style='display: none;' id='btn_consultar_ubicacion' type='submit'>Ubicación del Vehículo</button>" +
            "</td>" +
        "</tr>"));
    if(infraccion.existeAcarreo){
        $("#btn_consultar_ubicacion").show();
    }
}

function consultar_tipo_infraccion(infraccion){
    let url_infr = api + '/tiposInfraccion/' +  infraccion.tipoInfraccion;
    axios.get(url_infr).then(
        function(response){
                localStorage.setItem("tipoInfraccion", response.data.tipo.descripcion);
            }
        );
}

function borrar_tabla(){
    $("#cabecera_tabla").hide();
    $("#datos tr").remove(); 
    $("#cerrar_consulta").hide(); 
}