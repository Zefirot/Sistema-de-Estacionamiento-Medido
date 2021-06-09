function mapa(){
  
    var map = L.map('mapid').setView([-34.543125, -58.713019], 14); //Punto en donde va a estar centrado el mapa

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
  
    cargarDepositos(map);
}


function cargarDepositos(map){

    var url = "https://infraccionesweb.herokuapp.com/api/ABC123/acarreos/42";
    axios.get(url).then(
        function (response) {
            let infraccion = response.data.acarreo;
            
            let latitud = infraccion.deposito.ubicacion.lat;
            let longitud = infraccion.deposito.ubicacion.lon;

            let popup = "<b>Nombre: </b>"+infraccion.deposito.nombre +"<br>"+
                            "<b>Dirección: </b>"+infraccion.deposito.direccion+"<br>"+
                            "<b>Horarios: </b>"+infraccion.deposito.horarios+"<br>"+
                            "<b>Telefono: </b>"+infraccion.deposito.telefono;

            L.marker([latitud,longitud]).bindPopup(popup).addTo(map);
        
    
        });
    
    
}