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
    L.latLng(-34.515594, -58.705654),
    L.latLng(-34.523503, -58.714062),
    L.latLng(-34.519177, -58.719890),
    L.latLng(-34.511089, -58.711374),
    L.latLng(-34.514062, -58.707909),
    L.latLng(-34.513824, -58.707584)
  ]).addTo(map);


  //Zona azul B
  L.polygon([
    L.latLng(-34.528515, -58.707317),
    L.latLng(-34.530668, -58.704234),
    L.latLng(-34.527858, -58.701179),
    L.latLng(-34.530025, -58.698326),
    L.latLng(-34.528456, -58.696612),
    L.latLng(-34.525286, -58.701120),
    L.latLng(-34.526205, -58.702211),
    L.latLng(-34.525098, -58.703802),
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


  var cluster = L.markerClusterGroup();
  cluster.addLayers([
    //Puntos zona azul A
    L.marker([-34.516401, -58.712847]),
    L.marker([-34.517620, -58.714102]),
    L.marker([-34.515640, -58.714606]),
    L.marker([-34.518324, -58.716120]),
    L.marker([-34.514699, -58.710379]),
    L.marker([-34.513909, -58.709843]),
    L.marker([-34.517563, -58.709205]),

    //Puntos zona verde A
    L.marker([-34.521775, -58.705970]),
    L.marker([-34.522659, -58.704618]),
    L.marker([-34.523949, -58.707365]),
    L.marker([-34.523065, -58.704511]),
    L.marker([-34.524444, -58.709811]),

    //Puntos zona azul B
    L.marker([-34.527911, -58.703918]),
    L.marker([-34.528379, -58.702759]),
    L.marker([-34.526505, -58.705098]),
    L.marker([-34.527425, -58.700624]),
    L.marker([-34.527221, -58.705827]),
    L.marker([-34.528220, -58.705581]),
    L.marker([-34.526974, -58.702920])
  ])
  cluster.addTo(map);








}