/**
 * Created by russw on 13/07/2016.
 */
function PopupTemplateService(){
    this.getPopupHtml = function (feature) {

        var props = feature.properties;

        var popupTemplate = "<div><h1>{0}</h1><p><ul><li>{1}</li><li>{2}</li><li>{3}</li><li>{4}</li><li>{5}</li><li>{6}</li><li><a href='{7}'>{7}</a></li></ul></p></div><button id='{8}'>delete</button>";

        var selector = String(props["id"]).replaceAll('-', '');
        console.log(selector);
        var content = popupTemplate.format(props["name"],
            props["address1"],
            props["address2"],
            props["address3"],
            props["address4"],
            props["postCode"],
            props["tel"],
            props["url"],
            selector);

        $("#" +selector).on('click', function(){
            console.log("arse");
        });

        return content;
    }
}