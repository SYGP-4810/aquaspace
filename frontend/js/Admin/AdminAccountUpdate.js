$(document).ready(function(){
    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/getAdmin"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            $("#fName").val(data.fName);
            $("#lName").val(data.lName) ;
            $("#address").val(data.address);
            $("#city").val(data.city);
            $("#telNo").val(data.tp);
        },
        error: function(errMsg) {
            //window.location.replace("/aquaspace/frontend/src/Error"+errMsg.status+".html");
        }
    });
});