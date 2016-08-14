/**
 * Created by russw on 13/07/2016.
 */
function Mapbox(){

    var _this = this;
    this.loadedData;

    this.load = function(){
        mapboxgl.accessToken = 'pk.eyJ1IjoicnVzc3dpY2tzIiwiYSI6InNBT1JaNzgifQ.PVR9hRCwPwyHSPgYkMZ4Rw';

        var bounds = [
            [-14.21, 49.35], // Southwest coordinates
            [3.7, 59.4]  // Northeast coordinates
        ];

        _this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            zoom: 3,
            maxBounds: bounds,
            attributionControl: false
        });
        _this.map.addControl(new mapboxgl.Geolocate({position: 'top-right'}));
        _this.map.addControl(new mapboxgl.Navigation({position: 'top-right'}));

        _this.setupEventHandlers();
    };

    this.showDriveControls = function(){
        _this.map.addControl(new mapboxgl.Directions());
    }

    this.setupEventHandlers = function(){
        _this.map.on('load', function load() {
            _this.run();
        });

        _this.map.on('click', function (e) {
            _this.lngLat = e.lngLat;
            if($('#editForm').is(":visible")){
                console.log(_this.lngLat);
                $('#latitude').val(_this.lngLat.lat);
                $('#longitude').val(_this.lngLat.lng);
            }
        });
    };

    function addLayers(geoJsonData){
        _this.map.addSource("sites", {
            type: "geojson",
            data: geoJsonData
        });

        _this.map.addLayer({
            "id": "rings",
            "type": "circle",
            "source": "sites",
            "paint": {
                "circle-color": "#30D652",
                "circle-radius": 12
            }
        });

        geoJsonData.features.forEach(function(feature) {
            var symbol = feature.properties['marker-symbol'];
            var layerID = 'poi-' + symbol;

            // Add a layer for this symbol type if it hasn't been added already.
            if (!_this.map.getLayer(layerID)) {
                _this.map.addLayer({
                    "id": layerID,
                    "type": "symbol",
                    "source": "sites",
                    "layout": {
                        "icon-image": symbol + "-15",
                        "icon-allow-overlap": true
                    },
                    "filter": ["==", "marker-symbol", symbol]
                });
            }
        });
    }

    this.run = function(){

        var featureService = new FeaturesService();
        featureService.loadFeatures(null, function (geoJsonData) {

            _this.loadedData = geoJsonData;

            addLayers(geoJsonData);

            // When a click event occurs near a marker icon, open a popup at the location of
            // the feature, with description HTML from its properties.
            _this.map.on('click', function (e) {
                var features = _this.map.queryRenderedFeatures(e.point, { layers: ['poi-star'] });

                if (!features.length) {
                    return;
                }

                var feature = features[0];

                var popupService = new PopupTemplateService();
                // Populate the popup and set its coordinates
                // based on the feature found.
                new mapboxgl.Popup()
                    .setLngLat(feature.geometry.coordinates)
                    .setHTML(popupService.getPopupHtml(feature))
                    .addTo(_this.map);
            });

            _this.map.on('mousemove', function (e) {
                var features = _this.map.queryRenderedFeatures(e.point, { layers: ['poi-star'] });
                _this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
            });
        });
    }
}