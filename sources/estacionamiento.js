function mapa() {
  var icon;
  var ungsLocation = [-34.5221554, -58.7000067];
  var map = L.map('mapid').setView(ungsLocation, 15); //Punto en donde va a estar centrado el mapa

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  icon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#4838cc;' class='marker-pin'></div><i class='fas fa-university'>",
    iconSize: [18, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -35]
  });

  L.marker(ungsLocation, {icon: icon}).bindPopup("Universidad General Sarmiento").addTo(map);


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


  icon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#4838cc;' class='marker-pin'></div><i class='fas fa-parking'>",
    iconSize: [18, 38],
    iconAnchor: [15, 42],
    popupAnchor: [0, -35]
  });


  //Se cargan todos los puntos
  var cluster = L.markerClusterGroup(); 
  for(let index = 0; index < puntos.length; index++) {
     cluster.addLayers([
       L.marker([puntos[index].lat, puntos[index].long], {icon:icon}),
     ])
      
  }
  
  cluster.addTo(map);


}