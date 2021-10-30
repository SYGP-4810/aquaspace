function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$( document ).ready(function() {
    // alert("Please wait...");
    $.ajax({
        type: "GET",
        url:setUrl("Store/Store/getStoreProfile"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            
        },
        error: function(errMsg) {
            //window.location.replace("../src/Error"+errMsg.status+".html");
        }
    });
});