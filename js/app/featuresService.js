/**
 * Created by russw on 13/07/2016.
 */
function FeaturesService(){
     this.loadFeatures = function(category, callback){
         $.getJSON('./data/features.json', function (geoJsonData) {
             callback(geoJsonData);
         });
     }
}