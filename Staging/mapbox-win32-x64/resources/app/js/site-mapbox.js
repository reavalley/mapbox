if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}

L.mapbox.accessToken = 'pk.eyJ1IjoicnVzc3dpY2tzIiwiYSI6InNBT1JaNzgifQ.PVR9hRCwPwyHSPgYkMZ4Rw';
var map = L.mapbox.map('map')
    .setView([54.794, -4.219], 6)
    .addLayer(L.mapbox.tileLayer('russwicks.lmj85aa3'));

//L.mapbox.featureLayer().setGeoJSON(data);

var featureLayer;
    //L.mapbox.featureLayer()
    //.loadURL('https://a.tiles.mapbox.com/v4/russwicks.lmfmomc1/features.json?access_token=pk.eyJ1IjoicnVzc3dpY2tzIiwiYSI6InNBT1JaNzgifQ.PVR9hRCwPwyHSPgYkMZ4Rw&f=1')
    //.loadURL('./data/features.geojson')
    //.on('ready', run);

$.getJSON('./data/features.json', function(data) {
    featureLayer = L.mapbox.featureLayer(data);
    run();
});

function run() {
    // once loaded, and then is added to the map
    var clusterGroup = new L.MarkerClusterGroup();
    featureLayer.eachLayer(function (layer) {

        clusterGroup.addLayer(layer);

        bindPopup(layer);
    });
    map.addLayer(clusterGroup);
}

var popupTemplate = '<div><h1>{0}</h1><p>{1}</p><h2>{2}</h2><p>{3} <a href="mailto:{4}">{4}</a></p></div>';

function bindPopup(layer) {

    var props = layer.feature.properties;

    var content = popupTemplate.format(props["Spinout Name"] + ' (' + props["Founding Year"] + ')',
        props["Targetted Disease Area"] + ' - ' + props["Technology/Therapeutic Modality"],
        props["Originating institute of IP - Name"],
        props["Key Scientific Founder Title"] + ' ' + props["Key Scientific Founder Name"],
        props["Key Scientific Founder Email"]);
    //var content = '<h2>A ferry ride!<\/h2>' +
    //    '<p>From: ' + layer.feature.properties.from + '<br \/>' +
    //    'to: ' + layer.feature.properties.to + '<\/p>';
    layer.bindPopup(content);
}