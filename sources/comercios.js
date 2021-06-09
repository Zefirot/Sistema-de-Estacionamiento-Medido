function mapa() {

    var ungsLocation = [-34.5221554, -58.7000067];
    var map = L.map('mapid').setView(ungsLocation, 14); //Punto en donde va a estar centrado el mapa
  
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    //Se cambia el icono de la ungs para resaltarlo
    var redIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  
    L.marker(ungsLocation, {icon: redIcon}).bindPopup("Universidad General Sarmiento").addTo(map);
  
  
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
  
    //Se cargan todos los puntos
    var cluster = L.markerClusterGroup(); 
    for(let index = 0; index < puntosComercios.length; index++) {
       cluster.addLayers([
         L.marker([puntosComercios[index].lat, puntosComercios[index].long]).bindPopup("Comercio: "+index),
       ])
        
    }
    
    cluster.addTo(map);
  
  
  }