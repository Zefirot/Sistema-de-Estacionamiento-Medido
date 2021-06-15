var ungsLocation = [-34.5221554, -58.7000067];
var map;
var logueado;

function mapa() {
    map = L.map('mapid').setView(ungsLocation, 15);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    let mapa = localStorage.getItem("Mapa");


    switch (mapa) {
        case "estacionamientos":
            mostrarEstacionamientos();
            break;

        case "comercios":
            mostrarComercios();
            break;

        case "deposito":
            mostrarDeposito();
            break;
        case "ubicacion":
            mostrarUbicacion();
            break;
    }


}



function mostrarEstacionamientos() {
    logueado = localStorage.getItem("logueado");
    if(logueado == "true"){
        $("#boton_iniciar_sesion").hide();
        $("#boton_ubicacion").show();
    }

    $(".textoEstacionamiento").text("Estacionamientos Libres");

    $("#boton_estacionamientos").hide();
    $("#boton_comercios").show();

    $(".listaComercios").hide();

    let icon;
    icon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#4838cc;' class='marker-pin'></div><i class='fas fa-university'>",
        iconSize: [18, 42],
        iconAnchor: [13, 42],
        popupAnchor: [0, -35]
    });

    L.marker(ungsLocation, { icon: icon }).bindPopup("Universidad General Sarmiento").addTo(map);


    dibujarZonas();


    icon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#4838cc;' class='marker-pin'></div><i class='fas fa-parking'>",
        iconSize: [18, 38],
        iconAnchor: [15, 42],
        popupAnchor: [0, -35]
    });


    //Se cargan todos los puntos
    var cluster = L.markerClusterGroup();
    for (let index = 0; index < puntos.length; index++) {
        cluster.addLayers([
            L.marker([puntos[index].lat, puntos[index].long], { icon: icon }),
        ])

    }

    cluster.addTo(map);


}

function mostrarComercios() {
    logueado = localStorage.getItem("logueado");
    if(logueado == "true"){
        $("#boton_iniciar_sesion").hide();
        $("#boton_ubicacion").show();
    }

    $(".textoEstacionamiento").text("Comercios Disponibles");

    $("#boton_estacionamientos").show();
    $("#boton_comercios").hide();

    $(".listaComercios").show();

    icon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#4838cc;' class='marker-pin'></div><i class='fas fa-university'>",
        iconSize: [18, 42],
        iconAnchor: [13, 42],
        popupAnchor: [0, -35]
    });


    L.marker(ungsLocation, { icon: icon }).bindPopup("Universidad General Sarmiento").addTo(map);

    dibujarZonas();
    

    icon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#4838cc;' class='marker-pin'></div><i class='fas fa-store'>",
        iconSize: [26, 38],
        iconAnchor: [15, 42],
        popupAnchor: [0, -35]
    });


    //Se cargan todos los puntos
    var cluster = L.markerClusterGroup();
    for (let index = 0; index < puntosComercios.length; index++) {
        cluster.addLayers([
            L.marker([puntosComercios[index].lat, puntosComercios[index].long], { icon: icon })
                .bindPopup("<b>" + datosComercios[index].nombre + "</b>" + "<br>" +
                    "<b>" + "Horario: " + "</b>" + datosComercios[index].horario),
        ])

        
        $("#grupo1").append("<option id=comercio"+index+">"+datosComercios[index].nombre+"</option>");

        $("#comercio"+index).on("click", function(event){
            let nombreComercio = event.target.innerText;
            hacerZoom(nombreComercio);
        });

    }

    cluster.addTo(map);



}

function mostrarDeposito() {
    logueado = localStorage.getItem("logueado");
    if(logueado == "true"){
        $("#boton_iniciar_sesion").hide();
        $("#boton_ubicacion").show();
    }

    $(".listaComercios").hide();

    $(".textoEstacionamiento").text("Su vehículo se encuentra retenido aquí");

    let patente = localStorage.getItem("Patente");
    let ID = localStorage.getItem("ID");

    var url = "https://infraccionesweb.herokuapp.com/api/" + patente + "/acarreos/" + ID;


    icon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#4838cc;' class='marker-pin'></div><i style='font-size: 20px;' class='fas fa-warehouse fa-xs' >",
        iconSize: [20, 40],
        iconAnchor: [13, 42],
        popupAnchor: [0, -35]
    });

    axios.get(url).then(
        function (response) {
            let infraccion = response.data.acarreo;

            let latitud = infraccion.deposito.ubicacion.lat;
            let longitud = infraccion.deposito.ubicacion.lon;

            map.setView([latitud, longitud], 15);

            let popup = "<b>Nombre: </b>" + infraccion.deposito.nombre + "<br>" +
                "<b>Dirección: </b>" + infraccion.deposito.direccion + "<br>" +
                "<b>Horarios: </b>" + infraccion.deposito.horarios + "<br>" +
                "<b>Telefono: </b>" + infraccion.deposito.telefono;

            L.marker([latitud, longitud], { icon: icon }).bindPopup(popup).addTo(map).openPopup();
        });

}

function mostrarUbicacion() {
    logueado = localStorage.getItem("logueado");
    if(logueado == "true"){
        $("#boton_iniciar_sesion").hide();
        $("#boton_ubicacion").hide();
    }

    $(".textoEstacionamiento").text("Su vehículo se encuentra estacionado aquí ");

    $(".listaComercios").hide();

    let icon;
    icon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#4838cc;' class='marker-pin'></div><i class='fas fa-car'>",
        iconSize: [18, 42],
        iconAnchor: [13, 42],
        popupAnchor: [0, -35]
    });

    L.marker([-34.522456, -58.705306], { icon: icon }).addTo(map);


    dibujarZonas();

}


function dibujarZonas() {

    //Zona azul A
    L.polygon([
        L.latLng(-34.517750, -58.702989),
        L.latLng(-34.522102, -58.707602),
        L.latLng(-34.521775, -58.708119),
        L.latLng(-34.525188, -58.711804),
        L.latLng(-34.519177, -58.719890),
        L.latLng(-34.511089, -58.711374),
        L.latLng(-34.514062, -58.707909),
        L.latLng(-34.513824, -58.707584),
    ]).addTo(map);


    //Zona azul B
    L.polygon([
        L.latLng(-34.527957, -58.707862),
        L.latLng(-34.530668, -58.704234),
        L.latLng(-34.527858, -58.701179),
        L.latLng(-34.530025, -58.698326),
        L.latLng(-34.528456, -58.696612),
        L.latLng(-34.525286, -58.701120),
        L.latLng(-34.526205, -58.702211),
        L.latLng(-34.524700, -58.704388),
    ]).addTo(map);

    //Zona verde A
    var latlngs = [
        [-34.527957, -58.707862],
        [-34.520382, -58.699940],
        [-34.517750, -58.702989],
        [-34.522102, -58.707602],
        [-34.521775, -58.708119],
        [-34.525188, -58.711804]
    ]

    L.polygon(latlngs, { color: 'green' }).addTo(map); //Esta linea es necesaria para cambiar el color del poligono


}

function hacerZoom(nombreComercio) {
    
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

function borrarConsulta(){
    localStorage.removeItem("Patente");
    localStorage.removeItem("ID");
}