/**
 * Created by russw on 13/07/2016.
 */
function FileService(){
    var _this = this;
    this.generateGuid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    this.save = function(loadedData, callback){

        var name = $('#name').val();
        var address1 = $('#address1').val();
        var address2 = $('#address2').val();
        var address3 = $('#address3').val();
        var address4 = $('#address4').val();
        var postCode = $('#postCode').val();
        var tel = $('#tel').val();
        var url = $('#url').val();
        var latitude = $('#latitude').val();
        var longitude = $('#longitude').val();

        var newFeature = {
            "type": "Feature",
            "properties": {
                "name": name,
                "address1": address1,
                "address2": address1,
                "address3": address1,
                "address4": address1,
                "postCode": postCode,
                "tel": tel,
                "url": url,
                "marker-color": "#f86767",
                "marker-size": "",
                "marker-symbol": "star",
                "id": _this.generateGuid()
            },
            "geometry": {
                "coordinates": [
                    longitude,
                    latitude
                ],
                "type": "Point"
            },
            "id": _this.generateGuid()
        };

        loadedData.features.push(newFeature);

        var remote = require('remote'); // Load remote component that contains the dialog dependency
        var dialog = remote.require('dialog'); // Load the dialogs component of the OS
        var fs = require('fs');

        var fileName = "./data/features.json";
        // fileName is a string that contains the path and filename created in the save file dialog.
        fs.writeFile(fileName, JSON.stringify(loadedData), function (err) {
            if(err){
                alert("An error occurred creating the file "+ err.message)
            }
            callback();
        });
    }
}