function mapa(){
  
    var map = L.map('mapid').setView([-34.543125, -58.713019], 14); //Punto en donde va a estar centrado el mapa

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  

    cargarDepositos(map);
}


function cargarDepositos(map){

    let patente = localStorage.getItem("Patente");
    let ID = localStorage.getItem("ID");

    var url = "https://infraccionesweb.herokuapp.com/api/"+patente+"/acarreos/"+ID;


    let icon = L.divIcon({
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

            let popup = "<b>Nombre: </b>"+infraccion.deposito.nombre +"<br>"+
                            "<b>Dirección: </b>"+infraccion.deposito.direccion+"<br>"+
                            "<b>Horarios: </b>"+infraccion.deposito.horarios+"<br>"+
                            "<b>Telefono: </b>"+infraccion.deposito.telefono;

            L.marker([latitud,longitud], {icon:icon}).bindPopup(popup).addTo(map).openPopup();
        
    
        });
    
    
}


function borrarDatos(){
    localStorage.removeItem("Patente");
    localStorage.removeItem("ID");
}