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

// Buildinate our feature.
var featureLayer = L.mapbox.featureLayer();
    featureLayer.loadURL(dataFileToAdd);
    featureLayer.addTo(map);

// featureLayer.on('ready', function(){
//     this.eachLayer(function(layer){
//         layer.setIcon(L.mapbox.marker.icon({
//             "marker-color": "#8834bb",
//             "marker-size": "small",
//             "marker-symbol": "restaurant"
//         }))
//     });
//     map.fitBounds(featureLayer.getBounds());
// });