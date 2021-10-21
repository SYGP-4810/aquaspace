$(document).ready(function(){
    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/getAdmin"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            
        },
        error: function(errMsg) {
            //window.location.replace("/aquaspace/frontend/src/Error"+errMsg.status+".html");
        }
    });
});