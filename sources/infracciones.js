let api = 'https://infraccionesweb.herokuapp.com/api/';

function consultarInfraciones() {
    borrar_contenido();
    let patente = document.getElementById('patente').value;
    let url = api + patente + '/infracciones';

    if (patente != "") {
        axios.get(url).then(
            function (response) {
                let listaInfracciones = response.data.infracciones;
                if (listaInfracciones.length > 0) {
                    $("#cabecera_tabla").show();
                    for (let i = 0; i < listaInfracciones.length; i++) {
                        let infraccion = listaInfracciones[i];
                        dibujarDatos(infraccion);
                    }
                    $("#cerrar_consulta").show();
                } else {
                    $("#msg_sin_infraccion").show();
                }
            }
        );
    } else {
        alert("Debe ingresar una patente");
        document.getElementById("patente").focus();
    }
    
}

function dibujarDatos(infraccion) {
    let tipo_infraccion = consultar_tipo_infraccion(infraccion);
    $("#datos").prepend($(
        "<tr>" +
            "<td>" + infraccion.id + "</td>" +
            "<td>" + infraccion.montoAPagar + "</td>" +
            "<td>" + infraccion.direccionRegistrada + "</td>" +
            "<td>" + infraccion.fechaHoraRegistro + "</td>" +
            "<td>" + tipo_infraccion + "</td>" +
            "<td>" +
                "<a class='btn btn-success' href='mapa.html' onclick='consultarDeposito()' style='display: none;' id='btn_consultar_ubicacion'>Ubicación del Vehículo</a>" +
            "</td>" +
        "</tr>"));
    if (infraccion.existeAcarreo) {
        localStorage.setItem("Patente", infraccion.patente);
        localStorage.setItem("ID", infraccion.id);

        $("#btn_consultar_ubicacion").show();
    }
}

function consultar_tipo_infraccion(infraccion) {
    var url_infr = api + '/tiposInfraccion/' + infraccion.tipoInfraccion;
    var request = new XMLHttpRequest();
    request.open('GET', url_infr, false); 
    request.send(null);
    var respuesta = "";
    if (request.status === 200) {
        respuesta = JSON.parse(request.responseText);
    }
    return respuesta.tipo.descripcion;
}

function borrar_contenido() {
    $("#msg_sin_infraccion").hide();
    $("#cabecera_tabla").hide();
    $("#datos tr").remove();
    $("#cerrar_consulta").hide();
}

function consultarDeposito() {
    localStorage.setItem("Mapa","deposito");
}