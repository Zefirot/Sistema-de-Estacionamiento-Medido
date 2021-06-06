function mapa(){
  
    var map = L.map('mapid').setView([-34.543125, -58.713019], 14); //Punto en donde va a estar centrado el mapa

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
  
    cargarDepositos(map);
}


function cargarDepositos(map){

    var url = "https://infraccionesweb.herokuapp.com/api/depositos/";

    axios.get(url).then(
        function (response) {
            let depositos = response.data.depositos;
    
            depositos.forEach(deposito => {
                let latitud = deposito.ubicacion.lat;
                let longitud = deposito.ubicacion.lon;

                let popup = "<b>Nombre: </b>"+deposito.nombre +"<br>"+
                            "<b>Dirección: </b>"+deposito.direccion+"<br>"+
                            "<b>Horarios: </b>"+deposito.horarios+"<br>"+
                            "<b>Telefono: </b>"+deposito.telefono;

                L.marker([latitud,longitud]).bindPopup(popup).addTo(map);
                console.log(deposito);
            });
    
        }
    );

}