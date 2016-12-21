// mapbox connection set up stuff.
var mapId = 'sambaldwin05.019h34oc';
var accessToken = 'pk.eyJ1Ijoic2FtYmFsZHdpbjA1IiwiYSI6ImNpbnE0dDJqZzEwNDJ0cWtqdWM5MXpsb3oifQ.V9cC7ebF_7CRrd5tkmIoBA';
// Create the map object with your mapId and token,
// referencing the DOM element where you want the map to go.
L.mapbox.accessToken = accessToken;
var map = L.mapbox.map('map', mapId);

// Set the initial view of the map to the whole US
map.setView([44, -71.6], 8);

// Great, now we have a basic web map!
var dataFileToAdd = 'data/nh_farms.geojson';

// Buildinate our feature layer.
var featureLayer = L.mapbox.featureLayer();
    featureLayer.loadURL(dataFileToAdd);
    featureLayer.addTo(map);

var drawPoints = function(featureLayer) {
  featureLayer.on('ready', function(){
    this.eachLayer(function(layer){
      console.log(layer);
      layer.setIcon(L.mapbox.marker.icon({
        "marker-color": "#8834bb",
        "marker-size": "small",
        "marker-symbol": "farm"
      }));
    });
  });
}

drawPoints(featureLayer);

// featureLayer.setFilter(function(feature){
//   return (feature.properties.season === 'Spring');
// });

$('#season-filter').change(function() {
  var season = '';
  $("select option:selected").each(function() {
      season = $(this).text();
  });
  filterHandler(season);
});

var clearMap = function(map){
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
}

var filterHandler = function(season){
  alert('filterHandler called with ' + season);
  // clearMap(map);
  featureLayer.setFilter(function(feature){
    if (season === 'All'){
      return true;
    }
    else {
      return (feature.properties.season === season);
    }
  });
  drawPoints(featureLayer);
  // featureLayer.addTo(map);
};

var clickHandler = function(e){
  // Init our state.
  $('#info').empty();
  var feature = e.target.feature;
  
  var info = '';
  info += '<div>';
  info += '<h2>' + feature.properties.name + '</h2>';
  // Display some properties if we have them.
  if(feature.properties.season) info += '<p>' + feature.properties.season + '</p>';
  if(feature.properties.description) info += '<p>' + feature.properties.description + '</p>';
  // if(feature.properties.gx_media_links) info += '<p>' + feature.properties.gx_media_links + '</p>';
  
  info += '</div>';
  $('#info').append(info);
};

featureLayer.on('ready', function(){
    this.eachLayer(function(layer){
        layer.on('click', clickHandler);
    })
})
map.on('click', function(){
    $('#info').empty();
})

// Do location things.
var myLocation = L.mapbox.featureLayer().addTo(map);

map.on('locationfound', function(e){
    myLocation.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [ e.latlng.lng, e.latlng.lat ]
        },
        properties: {
            "title": "Current Location",
            "marker-color": "#ff8888",
            "marker-symbol": "star"
        }
    })
})

map.locate({setView: false});
