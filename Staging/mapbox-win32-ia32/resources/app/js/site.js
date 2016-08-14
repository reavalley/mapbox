

var mapBox;
var openedDrive;

$(document).ready(function () {

    bindElements();

    mapBox = new Mapbox();
    mapBox.load();
});

function bindElements(){
    $('#driving').on('click', function(){

        if(!openedDrive){
            openedDrive = true;
            mapBox.showDriveControls();
        }
        else{
            var remote = require('remote');
            remote.getCurrentWindow().reload();
        }
    });

    $('#edit').on('click', function(){
        $('#editForm').toggle();
    });

    $('#save').on('click', function(){
        save();
    });
}

function save(){
    var fs = new FileService();
    fs.save(mapBox.loadedData, function(){
        reload();
    })
}

function reload(){
    var remote = require('remote');
    remote.getCurrentWindow().reload();
}

